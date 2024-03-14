/**
 * Cipher or decipher a message using the "Ceasar cipher"
 * @param {*} message Text you want to cipher or decipher
 * @param {*} k Cipher key
 * @param {*} isCipher Change the behevior of the function: cipher if true else decipher
 * @returns The ciphered or deciphred message
 */
function ceasarCipher(message, k, isCipher) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let temp = message.split("");

  for (let i = 0; i < message.length; i++) {
    let char = temp[i];

    if (alphabet.includes(char)) {
      if (isCipher) {
        temp[i] = alphabet[(alphabet.indexOf(temp[i]) + k) % alphabet.length];
      } else {
        let newIndex = (alphabet.indexOf(temp[i]) - k) % alphabet.length;
        if (newIndex < 0) {
          newIndex += alphabet.length;
        }
        temp[i] = alphabet[newIndex];
      }
    }
  }
  return temp.join("");
}

/**
 * Apply the "DRY" to the button behevior
 * @param {*} htmLid HTML id of the button
 * @param {*} cipherDecision Change the behevior of the function: cipher if true else decipher
 */
function applyCipherOrDecipher(htmLid, cipherDecision) {
  let result = document.getElementById(htmLid);

  result.onclick = function () {
    let message = document.getElementById("Message-screen").value;
    let decalage = parseInt(
      document.getElementById("Decalage-screen").value,
      10
    );
    try {
      let rsultsOfcipher = ceasarCipher(message, decalage, cipherDecision);
      document.getElementById("ComputedCipher-screen").value = rsultsOfcipher;
    } catch (error) {
      alert(error);
    }
  };
}
applyCipherOrDecipher("sendToCipher", true);
applyCipherOrDecipher("sendToDecipher", false);
