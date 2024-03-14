import { ceasarCipher } from "./main.js";

function generateRandomPassword(length) {
	var allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
	var password = '';
	for (var i = 0; i < length; i++) {
	  var randomIndex = Math.floor(Math.random() * allChars.length);
	  password += allChars.charAt(randomIndex);
	}
	return password;
  }
  

function testCeasar(k) {
	var randomPassword = generateRandomPassword(12);
	var cipher = ceasarCipher(randomPassword,k,true);
	var decipher = ceasarCipher(cipher,k,false);
	
	if (decipher === randomPassword) {
	    console.log(`Case n-${k}: ${randomPassword} and ${cipher} are correct`);
	  } else {
	    console.log(`Case n-${k}: ${randomPassword} and ${cipher} Not correct`);
	}
}

for (let index = 0; index < 1000000; index++) {	
	testCeasar(index);
}
