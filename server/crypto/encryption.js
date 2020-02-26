const CryptoJS = require('crypto-js');
require('dotenv').config();

module.exports.dataEncryption = text => {
  const encryptedData = CryptoJS.AES.encrypt(
    text,
    process.env.cryptoKey,
  ).toString();
  return encryptedData;
};
