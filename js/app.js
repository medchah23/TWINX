const wrapper = document.getElementById("wrapper"),
  signupHeader = document.getElementById("signupHeader"),
  loginHeader = document.getElementById("loginHeader");

loginHeader.addEventListener("click", () => {
  wrapper.classList.add("active");
});

signupHeader.addEventListener("click", () => {
  wrapper.classList.remove("active");
});
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

  let isValid = true;

  if (ischaine(name.value) || name.value.length == 0 || name.value.length > 15) {
    name.value = "";
    name.placeholder = "Name not valid";
    name.classList.add("error");
    removeShakeAnimation(name);
    isValid = false;
  } else {
    name.classList.remove("error");
  }

  if (ischaine(secondname.value) || secondname.value.length == 0 || secondname.value.length > 15) {
    secondname.value = "";
    secondname.placeholder = "Last name not valid";
    secondname.classList.add("error");
    removeShakeAnimation(secondname);
    isValid = false;
  } else {
    secondname.classList.remove("error");
  }

  if (cin.value.length !== 8 || isNaN(cin.value)) {
    cin.value = "";
    cin.placeholder = "Cin number not valid";
    cin.classList.add("error");
    removeShakeAnimation(cin);
    isValid = false;
  } else {
    cin.classList.remove("error");
  }

  if (phone.value.length !== 8 || isNaN(phone.value)) {
    phone.value = "";
    phone.placeholder = "Phone number not valid";
    phone.classList.add("error");
    removeShakeAnimation(phone);
    isValid = false;
  } else {
    phone.classList.remove("error");
  }

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

  if (zip.value.length !== 4 || isNaN(zip.value)) {
    zip.value = "";
    zip.placeholder = "Zip code not valid";
    zip.classList.add("error");
    removeShakeAnimation(zip);
    isValid = false;
  } else {
    zip.classList.remove("error");
  }

  if (street.value === "") {
    street.value = "";
    street.placeholder = "Street not valid";
    street.classList.add("error");
    removeShakeAnimation(street);
    isValid = false;
  } else {
    street.classList.remove("error");
  }

  if (city.value === "") {
    city.placeholder = "City not valid";
    city.classList.add("error");
    removeShakeAnimation(city);
    isValid = false;
  } else {
    city.classList.remove("error");
  }

  if (security.selectedIndex === 0 || securityAnswer.value === "") {
    securityAnswer.value = "";
    securityAnswer.placeholder = "Answer not valid";
    securityAnswer.classList.add("error");
    removeShakeAnimation(securityAnswer);
    isValid = false;
  } else {
    securityAnswer.classList.remove("error");
  }

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

    fetch('PhP/signin.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('responseMessage').innerText = data.message;
      })
      .catch(error => console.error('Error:', error));
  }
}
document.getElementById('signupForm').addEventListener('submit', signin);

function login(event) {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const data = {
    loginEmail: email,
    loginPassword: password
  };

  fetch('PhP/login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      createPopup(data.message, data.status);
      if (data.status === 'success') {
        setTimeout(() => {
          window.location.href = 'home.html'; // Replace 'home.html' with your home page URL
        }, 3000);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      createPopup('An error occurred. Please try again.', 'error');
    });
}

document.getElementById('loginForm').addEventListener('submit', login);

