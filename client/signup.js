// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCqYkHR77AelL733hJfGOw9MBVRHJnmkR0",
    authDomain: "healthhivee.firebaseapp.com",
    projectId: "healthhivee",
    storageBucket: "healthhivee.appspot.com",
    messagingSenderId: "515910469037",
    appId: "1:515910469037:web:725e82356253f518d6cd24",
    measurementId: "G-XLG0LLZZ3J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function () {
    // Get form elements
    const signUpForm = document.querySelector('.auth-form');
    const nameInput = document.querySelector('input[name="name"]');
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');

    // Form submit event listener
    signUpForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = nameInput.value;
        const email = emailInput.value;
        const password = passwordInput.value;

        if (!name || !email || !password) {
            alert("All fields are required!");
            return;
        }

        // Create user with Firebase Auth
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert("Account created successfully!");

                // You can optionally store additional user details here (e.g., name) in Firestore or Realtime Database.
                console.log("User:", user);

                // Optionally, redirect to the login page
                window.location.href = "login.html";
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert("Error: " + errorMessage);
                console.error("Error:", error);
            });
    });
});
