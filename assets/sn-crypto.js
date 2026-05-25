// ============================================================
// SN-CRYPTO — Hybrid public-key encryption for lead data
// Architecture: RSA-OAEP-2048 wraps a per-lead AES-256-GCM key.
// Private key is stored encrypted locally with PBKDF2(passphrase)+AES-GCM.
// Public key is published to Pantry so /start can fetch + encrypt.
//
// USAGE (in order):
//   /leads (first run):
//     const { publicJwk, encryptedPrivate } = await SNCrypto.setupNewVault(passphrase)
//     → publish publicJwk to Pantry; save encryptedPrivate to localStorage
//   /leads (subsequent):
//     const privateKey = await SNCrypto.unlockVault(encryptedPrivate, passphrase)
//     const lead = await SNCrypto.decryptLead(encLead, privateKey)
//   /start:
//     const publicKey = await SNCrypto.importPublicKey(publicJwk)
//     const encLead = await SNCrypto.encryptLead(lead, publicKey)
// ============================================================
(function(global){
  const subtle = (global.crypto && global.crypto.subtle) || null;
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  // ── base64 helpers ──
  function b64(buf) {
    const bytes = new Uint8Array(buf);
    let s = '';
    for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
    return btoa(s);
  }
  function fromB64(s) {
    const bin = atob(s);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return bytes.buffer;
  }
  function randomBytes(n) {
    const a = new Uint8Array(n);
    global.crypto.getRandomValues(a);
    return a;
  }

  // ── Public/private RSA-OAEP-2048 keypair ──
  async function generateKeyPair() {
    return await subtle.generateKey(
      { name: 'RSA-OAEP', modulusLength: 2048, publicExponent: new Uint8Array([1,0,1]), hash: 'SHA-256' },
      true,
      ['encrypt', 'decrypt']
    );
  }
  async function exportPublicJwk(publicKey) {
    return await subtle.exportKey('jwk', publicKey);
  }
  async function importPublicKey(jwk) {
    return await subtle.importKey('jwk', jwk, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt']);
  }
  async function exportPrivateRaw(privateKey) {
    return await subtle.exportKey('pkcs8', privateKey);
  }
  async function importPrivateRaw(pkcs8) {
    return await subtle.importKey('pkcs8', pkcs8, { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['decrypt']);
  }

  // ── PBKDF2 + AES-GCM for passphrase-protected private key ──
  async function deriveKeyFromPassphrase(passphrase, salt) {
    const material = await subtle.importKey('raw', enc.encode(passphrase), 'PBKDF2', false, ['deriveKey']);
    return await subtle.deriveKey(
      { name: 'PBKDF2', salt, iterations: 250000, hash: 'SHA-256' },
      material,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }
  async function encryptPrivateWithPassphrase(privateKey, passphrase) {
    const pkcs8 = await exportPrivateRaw(privateKey);
    const salt = randomBytes(16);
    const iv = randomBytes(12);
    const key = await deriveKeyFromPassphrase(passphrase, salt);
    const ct = await subtle.encrypt({ name: 'AES-GCM', iv }, key, pkcs8);
    return {
      v: 1,
      salt: b64(salt),
      iv: b64(iv),
      ct: b64(ct)
    };
  }
  async function decryptPrivateWithPassphrase(blob, passphrase) {
    const salt = new Uint8Array(fromB64(blob.salt));
    const iv = new Uint8Array(fromB64(blob.iv));
    const key = await deriveKeyFromPassphrase(passphrase, salt);
    const pkcs8 = await subtle.decrypt({ name: 'AES-GCM', iv }, key, fromB64(blob.ct));
    return await importPrivateRaw(pkcs8);
  }

  // ── Hybrid lead encryption ──
  // We encrypt only the sensitive fields (name, phone, about, notes, consent).
  // Outer metadata (id, date, status, budget) stays plaintext so the dashboard
  // can sort/filter/merge without unlocking the vault.
  const SENSITIVE_FIELDS = ['name', 'phone', 'email', 'about', 'notes', 'consent'];

  async function encryptLead(lead, publicKey) {
    // Split lead into outer (plaintext) and inner (encrypted)
    const inner = {};
    const outer = {};
    for (const k of Object.keys(lead)) {
      if (SENSITIVE_FIELDS.includes(k)) inner[k] = lead[k];
      else outer[k] = lead[k];
    }
    // Generate ephemeral AES key
    const aesKey = await subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt']);
    const aesRaw = await subtle.exportKey('raw', aesKey);
    // Encrypt inner with AES
    const iv = randomBytes(12);
    const ct = await subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, enc.encode(JSON.stringify(inner)));
    // Wrap AES key with RSA-OAEP
    const wrappedKey = await subtle.encrypt({ name: 'RSA-OAEP' }, publicKey, aesRaw);
    return Object.assign({}, outer, {
      encrypted: true,
      v: 1,
      iv: b64(iv),
      ct: b64(ct),
      k: b64(wrappedKey)
    });
  }

  async function decryptLead(encLead, privateKey) {
    if (!encLead || !encLead.encrypted) return encLead;
    const aesRaw = await subtle.decrypt({ name: 'RSA-OAEP' }, privateKey, fromB64(encLead.k));
    const aesKey = await subtle.importKey('raw', aesRaw, { name: 'AES-GCM' }, false, ['decrypt']);
    const iv = new Uint8Array(fromB64(encLead.iv));
    const pt = await subtle.decrypt({ name: 'AES-GCM', iv }, aesKey, fromB64(encLead.ct));
    const inner = JSON.parse(dec.decode(pt));
    // Merge back: outer fields + decrypted inner fields, drop encryption markers
    const merged = Object.assign({}, encLead, inner);
    delete merged.encrypted; delete merged.v; delete merged.iv; delete merged.ct; delete merged.k;
    return merged;
  }

  // ── High-level vault helpers ──
  async function setupNewVault(passphrase) {
    if (!passphrase || passphrase.length < 8) throw new Error('סיסמת הצפנה חייבת להיות לפחות 8 תווים');
    const kp = await generateKeyPair();
    const publicJwk = await exportPublicJwk(kp.publicKey);
    const encryptedPrivate = await encryptPrivateWithPassphrase(kp.privateKey, passphrase);
    return { publicJwk, encryptedPrivate };
  }
  async function unlockVault(encryptedPrivate, passphrase) {
    return await decryptPrivateWithPassphrase(encryptedPrivate, passphrase);
  }

  global.SNCrypto = {
    available: !!subtle,
    setupNewVault,
    unlockVault,
    importPublicKey,
    encryptLead,
    decryptLead,
    // exposed for backup/restore
    _b64: b64,
    _fromB64: fromB64
  };
})(window);
