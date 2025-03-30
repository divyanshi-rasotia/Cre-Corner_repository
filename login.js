import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=> {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        showMessage('Login is successfull','signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href = 'profile.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/invalid-credential'){
            showMessage('Incorrect Email or Password','signInMessage');
        }
        else{
            showMessage('Account does not Exist','signInMessage')
        }
    })
});


   
  