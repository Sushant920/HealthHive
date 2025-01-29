// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqYkHR77AelL733hJfGOw9MBVRHJnmkR0",
    authDomain: "healthhivee.firebaseapp.com",
    projectId: "healthhivee",
    storageBucket: "healthhivee.appspot.com", // FIXED storage bucket
    messagingSenderId: "515910469037",
    appId: "1:515910469037:web:725e82356253f518d6cd24",
    measurementId: "G-XLG0LLZZ3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  // FIXED: Pass `app` when initializing auth

// Wait for DOM to load before adding event listener
document.addEventListener("DOMContentLoaded", function () {
    const submit = document.getElementById('submit');
    
    if (submit) {  // Ensure the button exists
        submit.addEventListener("click", function (event) {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (!email || !password) {
                alert("Please enter both email and password.");
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    alert("Account created successfully!");
                    console.log("User:", user);
                })
                .catch((error) => {
                    alert(error.message);
                    console.error("Error:", error.code, error.message);
                });
        });
    } else {
        console.error("Submit button not found!");
    }
});
