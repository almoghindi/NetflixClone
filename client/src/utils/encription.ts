import CryptoJS from "crypto-js";

const secretkey:string = (import.meta.env.VITE_SECRET_KEY_CRYPTO as string);

export const encryptString = (password : string) => {
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


export const encryptObject = (object: Object) => {
  try {
    const encryptedObject = CryptoJS.AES.encrypt(
      JSON.stringify(object),
      secretkey
    ).toString();
    return encryptedObject;
  } catch (error) {
    console.error("Encryption error:", error);
    return null;
  }
};


export const decryptObject = (ciphertext: string) => {
  if (!ciphertext) {
    return null;
  }

  try {
    const bytes = CryptoJS.AES.decrypt(ciphertext, secretkey);
    const decryptedObject = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));


    if (decryptedObject.user) {
      const { user, ...rest } = decryptedObject;
      return {
        ...rest,
        ...user,
      };
    }

    console.log(decryptedObject);
    return decryptedObject;
  } catch (error) {
    console.error("Decryption error:", error);
    return null;
  }
};

