// import axios from 'axios';

let email = document.querySelector("#email");
let username = document.querySelector("#username");
let password = document.querySelector("#password");
let key = document.querySelector("#key");
let btn = document.querySelector("#btn");

btn.addEventListener('click', async () => {
    if(key.value.length != 6) {
        key.value = "";
        key.style.borderColor = "red";
        key.setAttribute("placeholder", "enter a 6 digit number");
    }
    else{
        console.log(email.value);
        console.log(username.value);
        console.log(password.value);
        console.log(key.value);
        axios.post('http://localhost:3000/register', {
            "email": `${email.value}`,
            "username": `${username.value}`,
            "password": `${password.value}`,
            "key": `${key.value}`
        })
        .then(response => {
            if(response.data == "success") {
                alert("Registration Successful, You will be redirected to login page");
                window.location.href = 'http://localhost:3000/login';
            }
            else if(response.data == "email"){
                alert("Email id is already registered");
            }
            else if(response.data == "username") {
                alert("Username is already in use");
            }
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});