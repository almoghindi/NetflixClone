import CryptoJS from 'crypto-js';

const decryptObject = (password: string ) : string | null=> {
    const secretKey: string = (process.env.SECRET_KEY_CRYPTO as string);
    try {
        return CryptoJS.AES.decrypt(password, secretKey).toString(CryptoJS.enc.Utf8);
        
    } catch (error) {
        console.error("Decryption error:", error);
        return null;
    }
};

export default decryptObject