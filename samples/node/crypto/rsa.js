/**
 * HOW TO GENERATE RSA KEY
 * 
 * 1. generate RSA keypair:
 * 
 * $ openssl genrsa -aes256 -out rsa-key.pem 2048
 * (enter password to protect the RSA key)
 * 
 * 2. export private key:
 * 
 * $ openssl rsa -in rsa-key.pem -outform PEM -out rsa-prv.pem
 * (enter password)
 * 
 * 3. export public key:
 * 
 * $ openssl rsa -in rsa-key.pem -outform PEM -pubout -out rsa-pub.pem
 * (enter password)
 */

const
    fs = require('fs'),
    crypto = require('crypto');

function loadKey(file) {
    return fs.readFileSync(file, 'utf8');
}

let
    prvKey = loadKey('./rsa-prv.pem'),
    pubKey = loadKey('./rsa-pub.pem'),
    message = 'Hello, world!';

// encrypt by private key, then decrypt by public key:
let enc_by_prv = crypto.privateEncrypt(prvKey, Buffer.from(message, 'utf8'));
console.log('encrypted by private key: ' + enc_by_prv.toString('hex'));

let dec_by_pub = crypto.publicDecrypt(pubKey, enc_by_prv);
console.log('decrypted by public key: ' + dec_by_pub.toString('utf8'));

// encrypt by public key, then decrypt by private key:
let enc_by_pub = crypto.publicEncrypt(pubKey, Buffer.from(message, 'utf8'));
console.log('encrypted by public key: ' + enc_by_pub.toString('hex'));

let dec_by_prv = crypto.privateDecrypt(prvKey, enc_by_pub);
console.log('decrypted by private key: ' + dec_by_prv.toString('utf8'));
