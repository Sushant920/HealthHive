import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCqYkHR77AelL733hJfGOw9MBVRHJnmkR0",
    authDomain: "healthhivee.firebaseapp.com",
    projectId: "healthhivee",
    storageBucket: "healthhivee.appspot.com",
    messagingSenderId: "515910469037",
    appId: "1:515910469037:web:725e82356253f518d6cd24",
    measurementId: "G-XLG0LLZZ3J"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector('.auth-form');

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (!email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                alert("Login successful!");
                console.log("User:", userCredential.user);
                // Redirect to dashboard or main page if needed
                window.location.href = "QR-Code-Scanner-main/index.html";
            })
            .catch((error) => {
                alert("Error: " + error.message);
                console.error(error);
            });
    });
});
