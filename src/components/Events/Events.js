import React from 'react'
import { db } from '../../config/firebase'
import { collection,getDocs } from 'firebase/firestore'
import { Link } from 'react-router-dom'
import { useEffect,useState } from 'react'

const Events = () => {
    const [eventlist, seteventList] = useState([]);
    const [eventid, seteventid]=useState("");
    const eventCollectionRef = collection(db, 'events');

    const geteventList = async () => {
        let filteredData = []; // Declare filteredData with the appropriate scope
        try {
          const data = await getDocs(eventCollectionRef);
          filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          seteventList(filteredData);
        } catch (err) {
          console.error(err);
        }
      };
      useEffect(() => {
  
      geteventList();
    }, []);



  return (
    
    <div>
      {eventlist.map((event) => (
        <div>
          <div> 
          <Link to={`/Showevents/${event.id}`}> 
                <h2 onClick={()=> seteventid(event.id)}>{event.name}</h2>
                </Link>
                <small>{event.description}</small>
                
                <span class ="left-container-arrow"></span>
            </div>
           
          
          
          
          
          
        </div>
      ))}
       <button className='btn-primary'><Link to = '/createevents'>Create event</Link></button> 
      
    </div>
  )
}

export default Events
