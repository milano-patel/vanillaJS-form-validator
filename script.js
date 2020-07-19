const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input,message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
};

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
};

// CHeck email's validity
function isValidEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value).toLowerCase())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Check required fields

function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === '') {
            showError(input,`${getFieldName(input)} is Required`);
        } else {
            showSuccess(input);
        }
    });
}

// Check passwords match

function checkPassword(input1, input2) {
    if (input2.value !== input1.value) {
        showError(password2, 'Password doesn not match');
    }
}

//Get Fieldname
function getFieldName(field){
    return field.id.charAt(0).toUpperCase() + field.id.slice(1);
}

//Check the length

function checkLength(input,min,max){
    if(input.value.length < min) {
        showError(input,`${getFieldName(input)} must be longer than ${min} characters`);
    } else if (input.value.length > max) {
        showError(input,`${getFieldName(input)} must be shorter than ${max} characters`);
    }
};

// Event Listeners

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    checkRequired([username,email,password,password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    isValidEmail(email);
    checkPassword(password,password2);
});

