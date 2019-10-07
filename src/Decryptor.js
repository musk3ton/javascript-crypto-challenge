var nacl = require('libsodium-wrappers');
var decryptionKey = null;

module.exports.setKey = async (key) => {
    decryptionKey = key;
}

module.exports.decrypt = async (cyphertext, nonce) => {
    if (decryptionKey == null) {
        throw 'no key';
    }
    else {
        return nacl.crypto_secretbox_open_easy(cyphertext, nonce, decryptionKey);
    }
}