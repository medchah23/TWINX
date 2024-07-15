const wrapper = document.getElementById("wrapper"),
  signupHeader = document.getElementById("signupHeader"),
  loginHeader = document.getElementById("loginHeader");

loginHeader.addEventListener("click", () => {
  wrapper.classList.add("active");
});

signupHeader.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

function ischaine(ch) {
  let b = false;
  let i = 0;
  while (!b && i < ch.length) {
    char = ch[i].toUpperCase();
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

  const name = document.getElementById("firstName");
  const secondname = document.getElementById("secondName");
  const phone = document.getElementById("phoneNumber");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const street = document.getElementById("street");
  const city = document.getElementById("city");
  const zip = document.getElementById("zipCode");
  const security = document.getElementById("securityQuestion");

  let isValid = true;

  if (ischaine(name.value) || name.value.length == 0 || name.value.length > 15) {
    name.placeholder = "Name not valid";
    name.classList.add("error");
    isValid = false;
    removeShakeAnimation(name);
  } else {
    name.classList.remove("error");
  }

  if (ischaine(secondname.value) || secondname.value.length == 0 || secondname.value.length > 15) {
    secondname.placeholder = "Last name not valid";
    secondname.classList.add("error");
    isValid = false;
    removeShakeAnimation(secondname);
  } else {
    secondname.classList.remove("error");
  }

  if (phone.value.length !== 8 || isNaN(phone.value)) {
    phone.placeholder = "Phone number not valid";
    phone.classList.add("error");
    isValid = false;
    removeShakeAnimation(phone);
  } else {
    phone.classList.remove("error");
  }

  const test2 = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email.value.match(test2)) {
    email.placeholder = "Email not valid";
    email.classList.add("error");
    isValid = false;
    removeShakeAnimation(email);
  } else {
    email.classList.remove("error");
  }

  const test1 = /^[a-zA-Z0-9._%+-]+$/;
  if (!test1.test(password.value)) {
    password.placeholder = "Password not valid";
    password.classList.add("error");
    isValid = false;
    removeShakeAnimation(password);
  } else {
    password.classList.remove("error");
  }

  if (zip.value.length !== 5 || isNaN(zip.value)) {
    zip.placeholder = "Zip code not valid";
    zip.classList.add("error");
    isValid = false;
    removeShakeAnimation(zip);
  } else {
    zip.classList.remove("error");
  }

  if (street.value === "") {
    street.placeholder = "Street not valid";
    street.classList.add("error");
    isValid = false;
    removeShakeAnimation(street);
  } else {
    street.classList.remove("error");
  }

  if (city.value === "") {
    city.placeholder = "City not valid";
    city.classList.add("error");
    isValid = false;
    removeShakeAnimation(city);
  } else {
    city.classList.remove("error");
  }

  if (security.value === "") {
    security.classList.add("error");
    isValid = false;
    removeShakeAnimation(security);
  } else {
    security.classList.remove("error");
  }

  if (isValid) {
    console.log("Form submitted successfully");
  }
}

document.querySelector(".form.signup form").addEventListener("submit", signin);
