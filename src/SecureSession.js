var _nacl = require('libsodium-wrappers');
var nacl, serverKeys, clientPublicKey;

var load = async () => {
    await _nacl.ready;
    nacl = _nacl;
    serverKeys = nacl.crypto_kx_keypair();
};

module.exports.setClientPublicKey = async (key) => {
    if (typeof (clientPublicKey) != 'undefined') {
        throw 'client public key already set';
    } else {
        clientPublicKey = key;
    }
}

module.exports.serverPublicKey = async () => {
    await load();

    return serverKeys.publicKey;
}

module.exports.decrypt =  (ciphertext, nonce) => {
    const sharedKeys = nacl.crypto_kx_server_session_keys(serverKeys.publicKey, serverKeys.privateKey, clientPublicKey);
    return  nacl.crypto_secretbox_open_easy(ciphertext,nonce,sharedKeys.sharedRx);
}

module.exports.encrypt =  (msg) => {
    const sharedKeys = nacl.crypto_kx_server_session_keys(serverKeys.publicKey, serverKeys.privateKey, clientPublicKey);
    var nonce =  nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES);
    var ciphertext = nacl.crypto_secretbox_easy(msg, nonce, sharedKeys.sharedTx);
    return {ciphertext, nonce};
}
