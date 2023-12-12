import React,{useEffect,useState} from 'react'
import { getDoc,doc } from 'firebase/firestore'
import { db,storage } from '../../config/firebase'
import { useParams } from 'react-router-dom'
import {ref,getDownloadURL} from 'firebase/storage'

const Showevents = () => {
    const { eventid } = useParams();
    const [eventData, seteventData] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);


    useEffect(() => {
        const fetcheventData = async () => {
          try {
            const docRef = doc(db, "events", eventid);
            const event = await getDoc(docRef);
            seteventData(event.data());
          } catch (error) {
            console.error('Error fetching club data:', error);
          }
        };
    
        fetcheventData();
      }, [eventid]);

      useEffect(() => {
        if (eventData && eventData.image) {
          const imageRef = ref(storage, eventData.image);
          getDownloadURL(imageRef)
            .then((url) => {
              setImageUrl(url);
            })
            .catch((error) => {
              console.error('Error fetching image URL: ', error);
            });
        }
      }, [eventData]);
    

      return (
        <div>
          <h1>Event Data</h1>
          {eventData ? (
            <div>
              <p>Name: {eventData.name}</p>
              <p>Description: {eventData.description}</p>
              {imageUrl && <img src={imageUrl} className='clubimg'/>}
              {/* Add more properties as needed */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
    };
    

export default Showevents