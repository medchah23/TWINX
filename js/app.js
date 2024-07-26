const wrapper = document.getElementById("wrapper"),
    signupHeader = document.getElementById("signupHeader"),
    loginHeader = document.getElementById("loginHeader");

loginHeader.addEventListener("click", () => {
  wrapper.classList.add("active");
});

signupHeader.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

function createPopupb(message, status, callback = null) {
  // Remove any existing popup
  const existingPopup = document.querySelector('.popup');
  if (existingPopup) {
    existingPopup.remove();
  }

  const popup = document.createElement('div');
  popup.classList.add('popup', status);

  // Create message element
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  popup.appendChild(messageElement);

  // Create button container if callback is provided
  if (callback) {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const confirmButton = document.createElement('button');
    confirmButton.classList.add('confirm-button');
    confirmButton.innerText = 'Confirm';
    confirmButton.onclick = () => {
      callback(true);
      document.body.removeChild(popup);
    };

    const cancelButton = document.createElement('button');
    cancelButton.classList.add('cancel-button');
    cancelButton.innerText = 'Cancel';
    cancelButton.onclick = () => {
      callback(false);
      document.body.removeChild(popup);
    };

    buttonContainer.appendChild(confirmButton);
    buttonContainer.appendChild(cancelButton);

    popup.appendChild(buttonContainer);
  }

  document.body.appendChild(popup);

  // Add show class to popup after a short delay for animation
  setTimeout(() => {
    popup.classList.add('show');
  }, 10);

  // Remove popup after a timeout if no callback is provided
  if (!callback) {
    setTimeout(() => {
      popup.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(popup);
      }, 300);
    }, 3000);
  }
}

function createPopup(message, status) {
  const popup = document.createElement("div");
  popup.classList.add("popup", status);
  popup.innerText = message;

  document.body.appendChild(popup);

  setTimeout(() => {
    popup.classList.add("show");
  }, 10);

  setTimeout(() => {
    popup.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 300);
  }, 3000);
}

function ischaine(ch) {
  let b = false;
  let i = 0;
  while (!b && i < ch.length) {
    const char = ch[i].toUpperCase();
    if (char > "Z" || char < "A") {
      b = true;
    } else {
      i++;
    }
  }
  return b;
}

function removeShakeAnimation(element) {
  element.addEventListener('animationend', () => {
    element.classList.remove('error');
  });
}

function signin(event) {
  event.preventDefault();

  // Retrieve form elements
  const cin = document.getElementById("cin");
  const name = document.getElementById("firstName");
  const secondname = document.getElementById("secondName");
  const phone = document.getElementById("phoneNumber");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const street = document.getElementById("street");
  const city = document.getElementById("city");
  const zip = document.getElementById("zipCode");
  const security = document.getElementById("securityQuestion");
  const securityAnswer = document.getElementById("securityAnswer");
  function removeError(element) {
    element.classList.remove("error");
  }
  let isValid = true;
  function validateName(input) {
    return !ischaine(input.value) && input.value.length > 0 && input.value.length <= 15;
  }

  function validateNumeric(input) {
    return input.value.length === 8 && !isNaN(input.value);
  }

  function validateEmail(input) {
    const test = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return test.test(input.value);
  }

  function validatePassword(input) {
    const test = /^[a-zA-Z0-9._%+-]+$/;
    return test.test(input.value);
  }

  function validateZip(input) {
    return input.value.length === 4 && !isNaN(input.value);
  }

  // Perform individual validations
  if (!validateName(name)) {
    name.value = "";
    name.placeholder = "Name not valid";
    name.classList.add("error");
    removeShakeAnimation(name);
    isValid = false;
  } else {
    removeError(name);
  }

  if (!validateName(secondname)) {
    secondname.value = "";
    secondname.placeholder = "Last name not valid";
    secondname.classList.add("error");
    removeShakeAnimation(secondname);
    isValid = false;
  } else {
    removeError(secondname);
  }

  if (!validateNumeric(cin)) {
    cin.value = "";
    cin.placeholder = "Cin number not valid";
    cin.classList.add("error");
    removeShakeAnimation(cin);
    isValid = false;
  } else {
    removeError(cin);
  }

  if (!validateNumeric(phone)) {
    phone.value = "";
    phone.placeholder = "Phone number not valid";
    phone.classList.add("error");
    removeShakeAnimation(phone);
    isValid = false;
  } else {
    removeError(phone);
  }

  if (!validateEmail(email)) {
    email.value = "";
    email.placeholder = "Email not valid";
    email.classList.add("error");
    removeShakeAnimation(email);
    isValid = false;
  } else {
    removeError(email);
  }

  if (!validatePassword(password)) {
    password.value = "";
    password.placeholder = "Password not valid";
    password.classList.add("error");
    removeShakeAnimation(password);
    isValid = false;
  } else {
    removeError(password);
  }

  if (!validateZip(zip)) {
    zip.value = "";
    zip.placeholder = "Zip code not valid";
    zip.classList.add("error");
    removeShakeAnimation(zip);
    isValid = false;
  } else {
    removeError(zip);
  }

  if (street.value === "") {
    street.value = "";
    street.placeholder = "Street not valid";
    street.classList.add("error");
    removeShakeAnimation(street);
    isValid = false;
  } else {
    removeError(street);
  }

  if (city.value === "") {
    city.placeholder = "City not valid";
    city.classList.add("error");
    removeShakeAnimation(city);
    isValid = false;
  } else {
    removeError(city);
  }

  if (security.selectedIndex === 0 || securityAnswer.value === "") {
    securityAnswer.value = "";
    securityAnswer.placeholder = "Answer not valid";
    securityAnswer.classList.add("error");
    removeShakeAnimation(securityAnswer);
    isValid = false;
  } else {
    removeError(securityAnswer);
  }

  // If all validations pass, proceed to fetch data
  if (isValid) {
    const data = {
      cin: cin.value,
      firstName: name.value,
      secondName: secondname.value,
      phoneNumber: phone.value,
      email: email.value,
      password: password.value,
      street: street.value,
      city: city.value,
      zipCode: zip.value,
      securityQuestion: security.value,
      securityAnswer: securityAnswer.value,
    };

    fetch('php/signin.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
        .then(response => response.text()) // Get the response as text first
        .then(text => {
          try {
            const data = JSON.parse(text); // Parse the text as JSON
            if (data.status === 'success') {
              setTimeout(() => {
                createPopupb("Registration succeeded", "success", (confirmed) => {
                  if (confirmed) {
                    wrapper.classList.add("active");
                  }
                });
              }, 3000);
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
            createPopup('An error occurred. Please try again.', 'error');
          }
        })
        .catch(error => {
          console.error('Fetch error:', error);
          createPopup('An error occurred during fetch. Please try again.', 'error');
        });
  }}

document.getElementById('signupForm').addEventListener('submit', signin);

function login(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail1");
  const password = document.getElementById("loginPassword1");

  let isValid = true;  // Initialize isValid

  const test2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.value.match(test2)) {
    email.value = "";
    email.placeholder = "Email not valid";
    email.classList.add("error");
    removeShakeAnimation(email);
    isValid = false;
  } else {
    email.classList.remove("error");
  }

  const test1 = /^[a-zA-Z0-9._%+-]+$/;
  if (!test1.test(password.value)) {
    password.value = "";
    password.placeholder = "Password not valid";
    password.classList.add("error");
    removeShakeAnimation(password);
    isValid = false;
  } else {
    password.classList.remove("error");
  }

  if (!isValid) {
    return;
  }

  const data = {
    loginEmail: email.value,
    loginPassword: password.value
  };

  fetch('php/login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          createPopup("Login succeeded", "success");

          setTimeout(() => {
            window.location.href = 'home.html';
          }, 3000);
        } else {
          createPopup(data.message, data.status);
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        createPopup('An error occurred. Please try again.', 'error');
      });
}
  document.getElementById('loginForm').addEventListener('submit', login);
