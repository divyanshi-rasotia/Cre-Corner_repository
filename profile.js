import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBTPul3mRk0CJNR898vn3OhRJ4SvugW3yY",
  authDomain: "cre-corner.firebaseapp.com",
  projectId: "cre-corner",
  storageBucket: "cre-corner.firebasestorage.app",
  messagingSenderId: "230812868544",
  appId: "1:230812868544:web:1392c85ef54e76461d3225",
  measurementId: "G-6V4994SWKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

document.addEventListener('DOMContentLoaded', async function () {
    const loggedInUserId = localStorage.getItem('loggedInUserId');

    if (!loggedInUserId) {
        alert('You need to log in first.');
        window.location.href = 'login.html';
        return;
    }

    try {
        // Fetch user details from Firestore
        const docRef = doc(db, "users", loggedInUserId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = docSnap.data(); // Get user data from Firestore

            // Display user details on the profile page
            document.getElementById('userDisplay').textContent = userData.name || 'Not Set';
            document.getElementById('emailDisplay').textContent = userData.email || 'Not Set';
            document.getElementById('phoneDisplay').textContent = userData.phone || 'Not Set';
        } else {
            alert('User data not found. Please try logging in again.');
            window.location.href = 'login.html';
        }
    } catch (error) {
        console.error("Error fetching user data: ", error);
        alert('Failed to load profile. Please try again.');
        window.location.href = 'login.html';
    }

    // Logout functionality
    document.getElementById('logoutButton').addEventListener('click', function () {
        localStorage.removeItem('loggedInUserId');
        alert('You have been logged out.');
        window.location.href = 'login.html';
    });
});