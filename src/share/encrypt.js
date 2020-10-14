/**
 * @desc 加密方法
 */

import CryptoJS from 'crypto-js';

const CryptoJSKey = CryptoJS.enc.Utf8.parse('xizh199710052020');
const CryptoJSKeyIV = CryptoJS.enc.Utf8.parse('2020xizh19971005');
const CryptoJSKeyMode = {
    iv: CryptoJSKeyIV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
}

export const encode = word => {
    return CryptoJS.AES.encrypt(word, CryptoJSKey, CryptoJSKeyMode).toString();
}

export const decode = word => {
    return CryptoJS.AES.decrypt(word, CryptoJSKey, CryptoJSKeyMode).toString(CryptoJS.enc.Utf8);
}
export default {
    encode,
    decode
}