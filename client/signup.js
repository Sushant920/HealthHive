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

document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");

    signupForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!name || !email || !password) {
            alert("All fields are required!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Account created successfully!");
                console.log("User:", userCredential.user);
                window.location.href = "login.html"; // Redirect after signup
            })
            .catch((error) => {
                alert("Error: " + error.message);
                console.error(error);
            });
    });
});
