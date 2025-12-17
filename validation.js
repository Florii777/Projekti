/**
 * Ky file përdoret për validimin e:
 *  - Login Form
 *  - Register Form
 *  - Contact Form
 */


/* =========================
   FUNKSIONE NDIHMËSE 
   ========================= */
const ValidationUtils = {

    // Kontrollon nëse email-i është në format të saktë
    isValidEmail: function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Kontrollon numrin e telefonit (minimum 10 shifra)
    isValidPhone: function(phone) {
        const digitsOnly = phone.replace(/\D/g, '');
        return digitsOnly.length >= 10;
    },

    // Kontrollon forcën e password-it
    // Minimum: 8 karaktere, 1 shkronjë e madhe, 1 e vogël dhe 1 numër
    isStrongPassword: function(password) {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        return passwordRegex.test(password);
    },

    // Fshin mesazhin e gabimit
    clearError: function(errorElement) {
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.style.display = 'none';
        }
    },

    // Shfaq mesazhin e gabimit
    showError: function(errorElement, message) {
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
    },

    // Heq klasën e gabimit nga input-i
    removeErrorClass: function(input) {
        if (input) {
            input.classList.remove('error');
        }
    },

    // Shton klasën e gabimit në input
    addErrorClass: function(input) {
        if (input) {
            input.classList.add('error');
        }
    }
};


/* =========================
   VALIDIMI I LOGIN FORM
   ========================= */
function validateLoginForm() {

    const email = document.getElementById('loginEmail');
    const password = document.getElementById('loginPassword');

    const emailError = document.getElementById('loginEmailError');
    const passwordError = document.getElementById('loginPasswordError');
    const successMessage = document.getElementById('loginFormSuccess');

    let isValid = true;

    // Pastron gabimet e mëparshme
    ValidationUtils.clearError(emailError);
    ValidationUtils.clearError(passwordError);
    ValidationUtils.removeErrorClass(email);
    ValidationUtils.removeErrorClass(password);

    // Validimi i email-it
    if (!email.value.trim()) {
        ValidationUtils.showError(emailError, 'Email është i detyrueshëm');
        ValidationUtils.addErrorClass(email);
        isValid = false;
    } else if (!ValidationUtils.isValidEmail(email.value.trim())) {
        ValidationUtils.showError(emailError, 'Email nuk është në format të saktë');
        ValidationUtils.addErrorClass(email);
        isValid = false;
    }

    // Validimi i password-it
    if (!password.value) {
        ValidationUtils.showError(passwordError, 'Password është i detyrueshëm');
        ValidationUtils.addErrorClass(password);
        isValid = false;
    } else if (password.value.length < 6) {
        ValidationUtils.showError(passwordError, 'Password duhet të ketë së paku 6 karaktere');
        ValidationUtils.addErrorClass(password);
        isValid = false;
    }

    // Mesazh suksesi nëse forma është valide
    if (isValid && successMessage) {
        successMessage.textContent = 'Login u krye me sukses!';
        successMessage.style.display = 'block';
    }

    return isValid;
}


/* =========================
   VALIDIMI I REGISTER FORM
   ========================= */
function validateRegisterForm() {

    const name = document.getElementById('registerName');
    const email = document.getElementById('registerEmail');
    const phone = document.getElementById('registerPhone');
    const password = document.getElementById('registerPassword');
    const confirmPassword = document.getElementById('registerConfirmPassword');
    const agreeTerms = document.getElementById('agreeTerms');

    let isValid = true;

    // Validimi i emrit
    if (!name.value.trim()) {
        alert('Emri është i detyrueshëm');
        isValid = false;
    }

    // Validimi i email-it
    if (!ValidationUtils.isValidEmail(email.value.trim())) {
        alert('Email nuk është valid');
        isValid = false;
    }

    // Validimi i numrit të telefonit (nëse plotësohet)
    if (phone.value.trim() && !ValidationUtils.isValidPhone(phone.value.trim())) {
        alert('Numri i telefonit nuk është valid');
        isValid = false;
    }

    // Validimi i password-it
    if (!ValidationUtils.isStrongPassword(password.value)) {
        alert('Password duhet të jetë më i fortë');
        isValid = false;
    }

    // Kontrollon përputhjen e password-eve
    if (password.value !== confirmPassword.value) {
        alert('Password-et nuk përputhen');
        isValid = false;
    }

    // Kontrollon nëse janë pranuar kushtet
    if (!agreeTerms.checked) {
        alert('Duhet të pranoni kushtet');
        isValid = false;
    }

    return isValid;
}


/* =========================
   VALIDIMI I CONTACT FORM
   ========================= */
function validateContactForm() {

    const name = document.getElementById('contactName');
    const email = document.getElementById('contactEmail');
    const phone = document.getElementById('contactPhone');
    const subject = document.getElementById('contactSubject');
    const message = document.getElementById('contactMessage');

    let isValid = true;

    // Kontrolli i fushave të zbrazëta
    if (!name.value || !email.value || !phone.value || !subject.value || !message.value) {
        alert('Të gjitha fushat janë të detyrueshme');
        isValid = false;
    }

    // Validimi i email-it
    if (!ValidationUtils.isValidEmail(email.value.trim())) {
        alert('Email nuk është valid');
        isValid = false;
    }

    // Validimi i numrit të telefonit
    if (!ValidationUtils.isValidPhone(phone.value.trim())) {
        alert('Numri i telefonit nuk është valid');
        isValid = false;
    }

    return isValid;
}


/* =========================
   AKTIVIZIMI I VALIDIMIT
   ========================= */
document.addEventListener('DOMContentLoaded', function() {

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateLoginForm();
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateRegisterForm();
        });
    }

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            validateContactForm();
        });
    }
});
