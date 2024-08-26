import CryptoJS from "crypto-js";

const secretkey:string = (import.meta.env.VITE_SECRET_KEY_CRYPTO as string);
const encryptObject = (password : string) => {
  try {
    const encryptedObject = CryptoJS.AES.encrypt(
      password,
      secretkey
    ).toString();
    return encryptedObject;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};

export default encryptObject