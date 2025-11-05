import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBQUiwWb-7TmVSbyXgJt5QKTwSW1DUeCn4",
  authDomain: "netflix-38700.firebaseapp.com",
  projectId: "netflix-38700",
  storageBucket: "netflix-38700.appspot.com",
  messagingSenderId: "302337945200",
  appId: "1:302337945200:web:2d2a96bc1a12e913118eb5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      email,
      authProvider: "local"
    });

  } catch (err) {
    console.error("Signup Error:", err);
    toast.error(err.code.split('/')[1].split('-').join(" "));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error("Login Error:", err);
    toast.error(err.code.split('/')[1].split('-').join(" "));
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, signup, login, logout };
