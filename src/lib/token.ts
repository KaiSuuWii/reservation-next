import { JWTPayload, SignJWT, jwtVerify } from 'jose';


export async function encodeToken({ payload, secret, expiry }: 
  { payload: JWTPayload; secret: string; expiry: string; }): Promise<string> {

  // Convert the key to Uint8Array
  const encoded_secret = new TextEncoder().encode(secret);

  // Create the JWT
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })  // Use HMAC with SHA-256
    .setIssuedAt()  // Set the 'iat' (Issued At) claim to the current time
    .setExpirationTime(expiry)  // Set the token expiration
    .sign(encoded_secret);  // Sign with your secret key (HMAC key)

  return token;  // Return the token
}


export async function decodeToken({ token, secret }: 
  { token: string; secret: string }): Promise<JWTPayload> {

  // Convert the key to Uint8Array
  const encoded_secret = new TextEncoder().encode(secret);

  // Verifying the token
  const { payload } = await jwtVerify(token, encoded_secret);  
  return payload;
}