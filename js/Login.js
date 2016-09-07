var $ = require("jquery");

function openSignUp(){
  element = document.getElementById('loginDiv');

  element.style.display = "none";

  currentElement = document.getElementById('signUpDiv');
  // Show again
  currentElement.style.display = "";
}

function openLogin(){
  element = document.getElementById('signUpDiv');
  // Hide
  element.style.display = "none";

  currentElement = document.getElementById('loginDiv');
  // Show again
  currentElement.style.display = "";
}
