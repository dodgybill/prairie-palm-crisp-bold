const PREFIX = "pn1.";

function bytesToB64(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s);
}

function b64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function roomKey(roomId: number): Promise<CryptoKey> {
  const material = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`patriotnet.v10.room.${roomId}`),
  );
  return crypto.subtle.importKey("raw", material, "AES-GCM", false, [
    "encrypt",
    "decrypt",
  ]);
}

export async function encryptText(
  roomId: number,
  plain: string,
): Promise<string> {
  if (typeof crypto === "undefined" || !crypto.subtle) {
    return PREFIX + btoa(unescape(encodeURIComponent(plain)));
  }
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await roomKey(roomId);
  const cipher = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    new TextEncoder().encode(plain),
  );
  const packed = new Uint8Array(iv.length + cipher.byteLength);
  packed.set(iv, 0);
  packed.set(new Uint8Array(cipher), iv.length);
  return PREFIX + bytesToB64(packed);
}

export async function decryptText(
  roomId: number,
  payload: string,
): Promise<string> {
  if (!payload.startsWith(PREFIX)) return payload;
  const raw = payload.slice(PREFIX.length);
  try {
    if (typeof crypto === "undefined" || !crypto.subtle) {
      return decodeURIComponent(escape(atob(raw)));
    }
    const packed = b64ToBytes(raw);
    const iv = packed.slice(0, 12);
    const data = packed.slice(12);
    const key = await roomKey(roomId);
    const plain = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data,
    );
    return new TextDecoder().decode(plain);
  } catch {
    try {
      return atob(raw);
    } catch {
      return payload;
    }
  }
}
