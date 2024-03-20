/*const CryptoJS = require("crypto-js");

function encryptData(data, key) {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
    return encryptedData;
}
const generateEncryptionKey = () => {
    return CryptoJS.lib.WordArray.random(16).toString(); // Une clé de 16 octets (128 bits) est recommandée pour AES-128
};

const encryptionKey = generateEncryptionKey();

const firebaseConfig = {
    apiKey: "AIzaSyAfEo-YYE3ubRQtYKXdrga-6dVEcfQ28DA",
    authDomain: "lehavrebaiedesanges.firebaseapp.com",
    projectId: "lehavrebaiedesanges",
    storageBucket: "lehavrebaiedesanges.appspot.com",
    messagingSenderId: "595254873813",
    appId: "1:595254873813:web:59895e20dd23ff7ca75c5c",
    measurementId: "G-K9CZ82377L"
};

const encryptedFirebaseConfig = encryptData(firebaseConfig, encryptionKey);

const test = encryptData('fatuhiva', "7699a511088eb50804596981684ab8bb");

console.log("Données sensibles cryptées :", test);
*/