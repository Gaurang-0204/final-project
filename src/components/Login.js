import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../config/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { db } from "../config/firebase";
import { collection, where, getDocs,query } from "firebase/firestore";
import "./Login.css";
import smallImage from "./GoogleLogo.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const setUserIdInLocalStorage = (userId) => {
    localStorage.setItem("userId", userId);
  };

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const collectionRef = collection(db, "students");
      const querySnapshot = await getDocs(
        query(collectionRef, where("email", "==", email))
      );

      if (querySnapshot.empty) {
        console.log("User not found");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.id;

      await signInWithEmailAndPassword(auth, email, password);

      setUserIdInLocalStorage(userId);

      navigate("/HomePage");
    } catch (err) {
      console.error(err);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const googleUser = result.user;

      const collectionRef = collection(db, "students");
      const querySnapshot = await getDocs(
        query(collectionRef, where("email", "==", googleUser.email))
      );

      if (querySnapshot.empty) {
        console.log("User not found");
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userId = userDoc.id;

      setUserIdInLocalStorage(userId);

      navigate("/HomePage");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div id="root">
      <header className="showcase">
        <div className="showcase-content">
          <div className="formm">
            <form onSubmit={signIn}>
              <h1>Welcome...</h1>
              <div className="info">
                <input
                  className="email"
                  type="email"
                  name="email"
                  placeholder="Email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                  className="email"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="btn">
                <button type="submit" className="btn-primary">
                  Sign In
                </button>
              </div>
              <div className="btn">
                <button onClick={signInWithGoogle} className="btn-google">
                  <img src={smallImage} alt="Small Icon" /> Sign In with Google
                </button>
              </div>
            </form>
          </div>
          <div className="signup">
            <p>Don't have an account? </p>
            <Link to="/Signup">Sign up </Link>
          </div>
        </div>
      </header>
    </div>
  );
}


