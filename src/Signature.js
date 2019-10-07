var _nacl = require('libsodium-wrappers');
var nacl, keys;

var load = async () => {
	await _nacl.ready;
	nacl = _nacl;
};

(async () => {
	await load();
	keys = nacl.crypto_sign_keypair();
})();

module.exports.verifyingKey = async () => {
	await load();
	return keys.publicKey;
}

module.exports.sign = async (msg) => {
	return nacl.crypto_sign(msg, keys.privateKey);
}