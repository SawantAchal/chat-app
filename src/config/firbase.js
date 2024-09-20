// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { getFirestore , doc , setDoc, collection, query, where, getDocs } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const signup = async(username , email, password) =>{
    try {
        const res = await createUserWithEmailAndPassword(auth , email , password);
        const user = res.user;
        //to store data in firebase database
        await setDoc(doc(db , "users" , user.uid) , {
          id:user.uid,
          username:username.toLowerCase(),
          email,
          name:'',
          avatar:'',
          bio:'Hey , i am using chat app' ,
          lastSeen:Date.now()
        })
        //to store chat data 
        await setDoc(doc(db, "chats" , user.uid),{
          chatData:[]
        })
         toast.success("Account created successfully!");
    } catch (error) {
        console.error(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async(email , password) => {
  try {
    await signInWithEmailAndPassword( auth , email , password)
    toast.success("Login Successfully")
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

const logout = async () => {
  try {
    await  signOut(auth)
  } catch (error) {
    console.error(error)
    toast.error(error.code.split('/')[1].split('-').join(' '))
  }
}

const resetPassword = async(email) => {
  if (!email) {
    toast.error("Enter your email")
    return null;
  }
  try {
    const userRef = collection(db , 'users');
    const q = query(userRef , where('email' , '==' , email))
    const querySnap = await getDocs(q)
    if (!querySnap.empty) {
      await sendPasswordResetEmail(auth , email)
      toast.success("Reset Email Sent")
    }else{
      toast.error("Email doesn't exists")
    }
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

export {signup , login , logout , auth , db , resetPassword}