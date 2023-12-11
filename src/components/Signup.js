import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../config/firebase";
import { storage } from "../config/firebase";
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import "./Login.css";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName,setuserName]=useState("");
  const [prn, setPrn]=useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const paths = `students/${v4()}-${imageUpload?.name}`;
  let navigate = useNavigate();
  const studentCollectionRef = collection(db, 'students');

  const uploadFile = () => {
    if (imageUpload === null) return;

    const imageRef = ref(storage, paths);

    return uploadBytes(imageRef, imageUpload).then((snapshot) => {
      console.log('Image uploaded successfully');
    });
  };
  const onSubmit = async () => {
    try {
      const docRef = await addDoc(studentCollectionRef, {
        email: email, // Use camelCase for property names
        name: userName,
        prn:prn,
        image: paths,
      });

      console.log('Document written with ID: ', docRef.id);

     
    } catch (err) {
      console.error('Error adding document: ', err);
    }
  };

  const signUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      setError(""); // Clear any previous error message
      setLoading(true);

      try {
        // Use `createUserWithEmailAndPassword` to create a new user
        await createUserWithEmailAndPassword(auth, email, password);
        await uploadFile();
        await onSubmit();
        navigate("/");
      } catch (error) {
        setError("Failed to create an account: " + error.message);
      }

      setLoading(false);
    }
  }

  return (
    <div >
      <header className="showcase">
        <div className="showcase-content">
          <div className="formm">
            
            <div className="btn">
              <h4>{error}</h4>
            </div>
            <form>
              <h1>Sign Up</h1>
              
              <div className="info">
              <input
                  className="email"
                  type="name"
                  name="username"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                />
                <input
                  className="email"
                  type="name"
                  name="prn"
                  placeholder="PRN"
                  value={prn}
                  onChange={(e) => setPrn(e.target.value)}
                />

                <input 
                type="file"  className="file-input"
                onChange={(event) => setImageUpload(event.target.files[0])} 
                />
                <br/>
                <br/>
                <input
                  className="email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
             
                <input
                  className="email"
                  type="password"
                  name="Password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  className="email"
                  type="password"
                  name="Password"
                  placeholder="Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                
              </div>
              <div className="btn">
                <button
                  disabled={loading}
                  onClick={signUp}
                  className="btn-primary"
                >
                  Sign up
                </button>
              </div>
              <div className="help"></div>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}


