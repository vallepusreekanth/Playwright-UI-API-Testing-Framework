import CryptoJS from 'crypto-js';
import fs from 'fs';
import path from 'path';

const secretKey = "Srikanth Vallepu"; // Access the secret key from environment variables

export const encryptEnv = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8')
  if(!data.BASE_URL){
    console.log("Already Encrypted");
    return;
  }
  const encryptedData = CryptoJS.AES.encrypt(data, secretKey).toString();
  fs.writeFileSync(filePath, encryptedData, 'utf-8');
  console.log("Finished encryption");
}

export const decryptEnv = (filePath) => {
  if (process.env.BASE_URL) {
    console.log("Already Decrypted");
    return;
  }
  const data = fs.readFileSync(filePath, 'utf-8')
  const bytes = CryptoJS.AES.decrypt(data, secretKey)
  const decryptedData = bytes.toString(CryptoJS.enc.Utf8)
  fs.writeFileSync(filePath, decryptedData, 'utf-8');
  console.log("Finished decryption");
}

export const encryptAll = () => {
  const configDir = path.join(__dirname, 'config');
  const files = fs.readdirSync(configDir);

  files.forEach(file => {
      if (file.startsWith('.env.')) {
          const filePath = path.join(configDir, file);
          encryptEnv(filePath);
      }
  });
};
