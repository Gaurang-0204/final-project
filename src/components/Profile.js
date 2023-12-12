import React from 'react'
import { getDoc, doc } from 'firebase/firestore';
import { db,storage } from '../config/firebase';
import { useState,useEffect } from 'react';
import { ref, getDownloadURL } from 'firebase/storage';

const Profile = () => {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, "students", userId);
        const club = await getDoc(docRef);
        setUserData(club.data());
      } catch (error) {
        console.error('Error fetching club data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  useEffect(() => {
    if (userData && userData.image) {
      const imageRef = ref(storage, userData.image);
      getDownloadURL(imageRef)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.error('Error fetching image URL: ', error);
        });
    }
  }, [userData]);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {userData ? (
       <div className="profile-details">
         <div className="image-container">
         {imageUrl && <img src={imageUrl} className='clubimg'/>}
         </div>
         <div className="text-container">
          <p>Name: {userData.name}</p>
          <p>Description: {userData.description}</p>
          {/* Add more properties as needed */}
        </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
  


export default Profile
