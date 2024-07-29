function createPopupWithRedirect(message, status, redirectUrl) {
    const popup = document.createElement("div");
    popup.classList.add("popup", status);

    // Add message
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    popup.appendChild(messageElement);

    // Add countdown timer
    const countdownElement = document.createElement("div");
    countdownElement.id = "countdown";
    countdownElement.innerText = "Redirecting in 5 seconds...";
    popup.appendChild(countdownElement);

    // Add loading bar
    const loadingBar = document.createElement("div");
    loadingBar.classList.add("loading-bar");
    popup.appendChild(loadingBar);

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.classList.add("show");
    }, 10);

    let countdown = 5;
    const interval = setInterval(() => {
        countdown--;
        countdownElement.innerText = `Redirecting in ${countdown} seconds...`;
        if (countdown === 0) {
            clearInterval(interval);
            window.location.href = redirectUrl;
        }
    }, 1000);

    setTimeout(() => {
        popup.classList.remove("show");
        setTimeout(() => {
            document.body.removeChild(popup);
        }, 300);
    }, 6000);
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

function removeShakeAnimation(element) {
    element.addEventListener('animationend', () => {
        element.classList.remove('error');
    });
}

function removeError(element) {
    element.classList.remove("error");
}

function validateEmail(input) {
    const test = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return test.test(input.value);
}

function check(event) {
    event.preventDefault(); // Prevent default form submission
    const security = document.getElementById("security-question");
    const email = document.getElementById("email");
    const securityAnswer = document.getElementById("security-answer");

    let isValid = true;

    if (security.selectedIndex === 0 || securityAnswer.value === "") {
        securityAnswer.value = "";
        securityAnswer.placeholder = "Answer not valid";
        securityAnswer.classList.add("error");
        removeShakeAnimation(securityAnswer);
        isValid = false;
    } else {
        removeError(securityAnswer);
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

    if (!isValid) return;
    const data = {
        email: email.value,
        securityQuestion: security.value,
        securityAnswer: securityAnswer.value
    };

    fetch('php/password.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                createPopupWithRedirect("Email Sent", "success", "./otp.html");
            } else {
                createPopup(data.message, data.status);
            }
        })
        .catch(error => {
            console.error('Fetch error:', error);
            createPopup('An error occurred during fetch. Please try again.', 'error');
        });

}

document.getElementById('securityForm').addEventListener('submit', check);
