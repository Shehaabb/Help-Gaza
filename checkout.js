document.addEventListener('DOMContentLoaded', (event) => {
  const form = document.getElementById('donationForm');
  form.addEventListener('submit', validateForm);
});

function validateForm(e) {
  e.preventDefault();
  let nameInput = document.getElementById('name');
  let name = nameInput.value.trim();
  let emailInput = document.getElementById("email");
  let email = emailInput.value.trim();
  let phoneInput = document.getElementById("phone");
  let phone = phoneInput.value.trim();
  let ccnInput = document.getElementById("ccn");
  let ccn = ccnInput.value.trim().replace(/\s+/g, "");
  let expiryInput = document.getElementById("expiry");
  let expiry = expiryInput.value.trim();
  let cvvInput = document.getElementById("cvv");
  let cvv = cvvInput.value.trim();

  let isValid = true; 

  // Name validation
  if (name === "") {
    alert("Name is required.");
    nameInput.placeholder = "Name is required.";
    nameInput.classList.add('invalid-placeholder');
    isValid = false;
  } else {
    let nameRegex = /^[A-Za-z\s'-]+$/;
    if (!nameRegex.test(name)) {
      nameInput.value = "";
      alert("Invalid name! Names should not include numbers or special characters.");
      nameInput.placeholder = "Invalid name!";
      nameInput.classList.add('invalid-placeholder');
      isValid = false;
    } else {
      nameInput.classList.remove('invalid-placeholder');
    }
  }

  // Email validation
  if (email === "") {
    alert("Email is required.");
    emailInput.placeholder = "Email is required";
    emailInput.classList.add('invalid-placeholder');
    isValid = false;
  } else {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      emailInput.value = "";
      emailInput.placeholder = "Invalid Email!";
      emailInput.classList.add('invalid-placeholder');
      isValid = false;
    } else {
      emailInput.classList.remove('invalid-placeholder');
    }
  }

  // Phone validation
  let phoneRegex = /^\+?[0-9]{10,15}$/;
  if (phone !== "" && !phoneRegex.test(phone)) {
    alert("Enter a valid phone number with 10-15 digits, starting with '+' if needed.");
    phoneInput.value = "";
    phoneInput.placeholder = "Invalid Phone Number!";
    phoneInput.classList.add('invalid-placeholder');
    isValid = false;
  } else if (phone !== "") {
    phoneInput.classList.remove('invalid-placeholder');
  }

  // Credit Card Number validation
  let ccnRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  if (!ccnRegex.test(ccn)) {
    alert("Please enter a valid credit card number.");
    ccnInput.value = '';
    ccnInput.classList.add('invalid-placeholder');
    ccnInput.placeholder = "Invalid Credit Card Number!";
    isValid = false;
  } else {
    ccnInput.classList.remove('invalid-placeholder');
  }

  // Expiry date validation
  let expiryDate = new Date(expiry + "-01");
  let currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  if (expiryDate <= currentDate) {
    alert("Please enter a valid expiry date that is in the future");
    isValid = false;
  }

  // CVV validation
  let cvvPattern = /^[0-9]{3,4}$/;
  if (!cvvPattern.test(cvv)) {
    alert("Please enter a valid CVV. It should contain 3 or 4 digits.");
    cvvInput.value = "";
    cvvInput.placeholder = "Invalid CVV!";
    cvvInput.classList.add('invalid-placeholder');
    isValid = false;
  } else {
    cvvInput.classList.remove('invalid-placeholder');
  }


  if (isValid) {
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);
    localStorage.setItem('phone', phone);
    localStorage.setItem('ccn', ccn);
    localStorage.setItem('expiry', expiry);
    localStorage.setItem('cvv', cvv);
    window.location.href = 'profile.html';
    return true;
  } else {
    return false;
  }
}
document.getElementById('yourFormId').addEventListener('submit', validateForm);
