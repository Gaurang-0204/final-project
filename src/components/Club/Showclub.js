import React, { useState, useEffect } from 'react';
import { getDoc, doc, getDocs, where, query, collection } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { useParams } from 'react-router-dom';
import { ref, getDownloadURL } from 'firebase/storage';
import '../Login.css';

const Showclub = () => {
  const { clubid } = useParams();
  const [clubData, setClubData] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchClubData = async () => {
      try {
        const docRef = doc(db, 'club', clubid);
        const club = await getDoc(docRef);
        setClubData(club.data());
      } catch (error) {
        console.error('Error fetching club data:', error);
      }
    };

    fetchClubData();
  }, [clubid]);

  useEffect(() => {
    const fetchImages = async () => {
      if (clubData && clubData.images && clubData.images.length > 0) {
        const imagePromises = clubData.images.map(async (imagePath) => {
          const imageRef = ref(storage, imagePath);
          try {
            const imageUrl = await getDownloadURL(imageRef);
            return imageUrl;
          } catch (error) {
            console.error('Error fetching image URL: ', error);
            return null;
          }
        });

        const resolvedImageUrls = await Promise.all(imagePromises);
        setImageUrls(resolvedImageUrls.filter((url) => url !== null));
      }
    };

    fetchImages();
  }, [clubData]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const collectionRef = collection(db, 'events');
        const querySnapshot = await getDocs(
          query(collectionRef, where('clubname', '==', clubData.name))
        );

        if (querySnapshot.empty) {
          console.log(`No events found for clubname: ${clubData.name}`);
          setEvents([]);
          return;
        }

        const eventsData = [];
        querySnapshot.forEach((doc) => {
          eventsData.push({ id: doc.id, ...doc.data() });
        });

        setEvents(eventsData);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    if (clubData) {
      fetchEvents();
    }
  }, [clubData]);

  return (
    <div className='fullpage'>
       <h1>DY PATIL INTERNATIONAL UNIVERSITY</h1>
      <h1>Club Data</h1>
      {clubData ? (
        <div className="details-club"> 
          <div>
          <p>Name: {clubData.name}</p>
          <p>Description: {clubData.description}</p>
          </div>
          {/* Display images here */}
          {imageUrls.length > 0 && (
            <div>
              <h2></h2>
              <div className="image-container">
                {imageUrls.map((imageUrl, index) => (
                  <img key={index} src={imageUrl} className="clubimg" alt={`Image ${index + 1}`} />
                ))}
              </div>
            </div>
          )}
          {/* Display events here */}
          {events.length > 0 && (
            <div>
              <h2>Events</h2>
              <ul>
                {events.map((event) => (
                  <li key={event.id}>{event.name}</li>
                  // Add more event details as needed
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Showclub;

