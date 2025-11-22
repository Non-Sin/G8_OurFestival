document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const submitBtn = document.querySelector("button[type='submit']");

    // Inputs เดิม
    const firstNameInput = document.querySelector(".firstname");
    const surnameInput = document.querySelector(".surname");
    const phoneInput = document.querySelector(".tel");
    const emailInput = document.querySelector(".email");
    
    // [เพิ่มใหม่] ประกาศตัวแปรสำหรับ Input อายุ
    const ageInput = document.querySelector(".age");
    const ageErrorMsg = document.querySelector(".error-age");

    const genderInputs = document.querySelectorAll('input[name="gender"]');
    const genderContainer = document.querySelector(".gender-container");
    const genderErrorMsg = document.querySelector(".error-gender");

    const nameErrorMsg = document.querySelector(".error-firstname");
    const surnameErrorMsg = document.querySelector(".error-surname");
    const phoneErrorMsg = document.querySelector(".error-tel");
    const emailErrorMsg = document.querySelector(".error-email");

    // Icons
    const phoneIcon = document.querySelector(".tel-icon");
    const emailIcon = document.querySelector(".email-icon");

    const patterns = {
        name: /^[a-zA-Z\u0E00-\u0E7F\s]+$/, 
        phone: /^0[0-9]{9}$/, 
        email: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
        age: /^[1-9][0-9]{0,1}$/ 
    };

    function toggleError(isValid, errorElement) {
        if (!errorElement) return;
        if (isValid) errorElement.classList.remove("show");
        else errorElement.classList.add("show");
    }

    function checkGenderValidity() {
        let isChecked = false;
        genderInputs.forEach(input => {
            if (input.checked) isChecked = true;
        });
        return isChecked;
    }

    function checkFormValidity() {
        const isNameValid = patterns.name.test(firstNameInput.value);
        const isSurnameValid = patterns.name.test(surnameInput.value);
        const isPhoneValid = patterns.phone.test(phoneInput.value);
        const isEmailValid = patterns.email.test(emailInput.value);
        

        const isAgeValid = patterns.age.test(ageInput.value);

        const isGenderValid = checkGenderValidity();

        if (isGenderValid) {
            toggleError(true, genderErrorMsg);
        }

        if (isNameValid && isSurnameValid && isPhoneValid && isEmailValid && isGenderValid && isAgeValid) {
            submitBtn.disabled = false;
        } else {
            submitBtn.disabled = true;
        }
    }
    
    function validateField(input, pattern, errorElement) {
        if (input.value.match(pattern)) {
            input.style.borderColor = "#2ecc71";
            toggleError(true, errorElement);
            return true;
        } else if (input.value === "") {
            input.style.borderColor = "transparent";
            toggleError(true, errorElement);
            return false;
        } else {
            input.style.borderColor = "#ff3333";
            toggleError(false, errorElement);
            return false;
        }
    }
    
    
    function validateWithIcon(input, pattern, iconElement, originalIconClass, errorElement) {
         const checkIcon = "fa-circle-check";
         if (input.value.match(pattern)) {
            input.style.borderColor = "#2ecc71";
            iconElement.style.color = "#2ecc71";
            if (iconElement.classList.contains(originalIconClass)) {
                iconElement.classList.replace(originalIconClass, checkIcon);
            }
            toggleError(true, errorElement);
            return true;
        } else {
            if (input.value === "") {
                input.style.borderColor = "transparent";
                iconElement.style.color = "#888"; 
                if (iconElement.classList.contains(checkIcon)) {
                    iconElement.classList.replace(checkIcon, originalIconClass);
                }
                toggleError(true, errorElement); 
            } else {
                input.style.borderColor = "#ff3333";
                iconElement.style.color = "#ff3333";
                if (iconElement.classList.contains(checkIcon)) {
                    iconElement.classList.replace(checkIcon, originalIconClass);
                }
                toggleError(false, errorElement); 
            }
            return false;
        }
    }

    // --- Event Listeners ---

    firstNameInput.addEventListener("keyup", () => {
        validateField(firstNameInput, patterns.name, nameErrorMsg);
        checkFormValidity();
    });

    surnameInput.addEventListener("keyup", () => {
        validateField(surnameInput, patterns.name, surnameErrorMsg);
        checkFormValidity();
    });

    phoneInput.addEventListener("keyup", () => {
        validateWithIcon(phoneInput, patterns.phone, phoneIcon, "fa-phone", phoneErrorMsg);
        checkFormValidity();
    });

    emailInput.addEventListener("keyup", () => {
        validateWithIcon(emailInput, patterns.email, emailIcon, "fa-envelope", emailErrorMsg);
        checkFormValidity();
    });


    ageInput.addEventListener("keyup", () => {
        validateField(ageInput, patterns.age, ageErrorMsg);
        checkFormValidity();
    });

    ageInput.addEventListener("change", () => {
        validateField(ageInput, patterns.age, ageErrorMsg);
        checkFormValidity();
    });

    genderInputs.forEach(input => {
        input.addEventListener("change", () => {
            checkFormValidity(); 
        });
    });

    checkFormValidity();

    form.addEventListener("submit", (e) => {
        if (submitBtn.disabled) {
            e.preventDefault();
        }
    });
});