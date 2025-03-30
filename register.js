import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js"
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"


// Your web app's Firebase configuration


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
const signUp=document.getElementById('submitSignUp');
signUp.addEventListener('click', (event)=> {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const auth=getAuth();
    const db=getFirestore();
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email:email,
            name:name,
            phone:phone
        };
        showMessage('Account Created Successfully','signUpMessage');
        const docRef=doc(db,"users",user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='login.html';
        })
        .catch((error)=>{
            console.error("error writing document",error);

        });

    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already exists !!!','signUpMessage');
        }
        else{
            showMessage('Unable to create user','signUpMessage');
        }
    })
});

