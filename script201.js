document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('phone').addEventListener('input', validatePhone);
document.getElementById('password').addEventListener('input', validatePassword);

function validateEmail() {
    const email = document.getElementById('email').value;
    const emailError = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        emailError.textContent = 'Please enter a valid email address.';
        emailError.style.display = 'block';
        return false;
    } else {
        emailError.textContent = '';
        emailError.style.display = 'none';
        return true;
    }
}

function validatePhone() {
    const phone = document.getElementById('phone').value;
    const phoneError = document.getElementById('phoneError');
    const phonePattern = /^\d{10}$/;

    if (!phonePattern.test(phone)) {
        phoneError.textContent = 'Please enter a valid phone number (10 digits).';
        phoneError.style.display = 'block';
        return false;
    } else {
        phoneError.textContent = '';
        phoneError.style.display = 'none';
        return true;
    }
}

function validatePassword() {
    const password = document.getElementById('password').value;
    const passwordError = document.getElementById('passwordError');
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!passwordPattern.test(password)) {
        passwordError.textContent = 'Password must be at least 8 characters long, include a letter, a number, and a special character.';
        passwordError.style.display = 'block';
        return false;
    } else {
        passwordError.textContent = '';
        passwordError.style.display = 'none';
        return true;
    }
}

function validateForm() {
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPhoneValid && isPasswordValid) {
        window.location.href = "success.html";
    }

    return isEmailValid && isPhoneValid && isPasswordValid;
}
