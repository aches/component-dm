/**
 *
 *@since 2.0
 *@author zhiguo
 *@Date 2018/12/26 16:45
 */

const CryptoJS = require('crypto-js');
//密钥
var key = CryptoJS.enc.Utf8.parse('BE5391696F815E7A');

//偏移量
var iv = CryptoJS.enc.Utf8.parse('84524711D4D5060D');


//解密方法


//加密方法
function Encrypt(word) {
  const srcs = CryptoJS.enc.Utf8.parse(word);
  const encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
  return encrypted.ciphertext.toString().toUpperCase();
}

module.exports = {
  encrypt: Encrypt
};