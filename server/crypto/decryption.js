const CryptoJS = require('crypto-js');
require('dotenv').config();

module.exports.dataDecryption = text => {
  const bytes = CryptoJS.AES.decrypt(text, process.env.cryptoKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
