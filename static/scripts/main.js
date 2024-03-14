/**
 * Cipher a text contain within a file (.txt in that case) 
 * @param {*} htmlId HTML id of the button
 * @param {*} cipherDecision Change the behevior of the function: cipher if true else decipher
 */
function applyCipherOrDecipherOnFile(htmlId, cipherDecision) 
{
  let button = document.getElementById(htmlId);

  button.onclick = function () {
    let fileInput = document.getElementById("file-input");
    let file = fileInput.files[0];

    let fileReader = new FileReader();

    fileReader.onload = function (event) {
      let fileContent = event.target.result;
      let fileContent_toString = fileContent.toString();

      let decalage = parseInt(
        document.getElementById("Decalage-screen").value,
        10
      );

      let encryptedContent = ceasarCipher(
        fileContent_toString,
        decalage,
        cipherDecision
      );

      // Create a new Blob with the encrypted content
      let encryptedBlob = new Blob([encryptedContent], { type: "text/plain" });

      // Create a temporary URL for the encrypted Blob
      let encryptedURL = URL.createObjectURL(encryptedBlob);

      // Create a temporary anchor element to trigger the download
      let downloadLink = document.createElement("a");
      downloadLink.href = encryptedURL;
      downloadLink.download = "encrypted.txt";
      downloadLink.click();

      // Clean up the temporary resources
      URL.revokeObjectURL(encryptedURL);
    };

    fileReader.readAsText(file);
  };
}

/**
 * Cipher or decipher a message using the "Ceasar cipher"
 * @param {*} message Text you want to cipher or decipher
 * @param {*} k Cipher key
 * @param {*} isCipher Change the behevior of the function: cipher if true else decipher
 * @returns The ciphered or deciphred message
 */
function ceasarCipher(message, k, isCipher) 
{
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
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
function applyCipherOrDecipher(htmLid, cipherDecision) 
{
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

applyCipherOrDecipherOnFile("encrypt-button", true);
applyCipherOrDecipherOnFile("decrypt-button", false);
