import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Popup from '../Popup/Popup';
import { storage } from '../../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';
import './club.css';

const Club = () => {
  const [clublist, setClubList] = useState([]);
  const [clubid, setclubid] = useState('');
  const [currentSlide, setCurrentSlide] = useState(0);
  const clubCollectionRef = collection(db, 'club');

  const getClubList = async () => {
    try {
      const data = await getDocs(clubCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setClubList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getClubList();
  }, []);

  const truncateDescription = (description, wordsCount) => {
    const words = description.split(' ');
    if (words.length > wordsCount) {
      return words.slice(0, wordsCount).join(' ') + '...';
    }
    return description;
  };

  const handleSlide = (direction) => {
    if (direction === 'prev') {
      setCurrentSlide((prev) => (prev > 0 ? prev - 1 : clublist.length - 1));
    } else {
      setCurrentSlide((prev) => (prev < clublist.length - 1 ? prev + 1 : 0));
    }
  };

  return (
    <div className='clubfirst'>
      <div className='cards'>
        <TransitionGroup className='card-slider'>
          {clublist
            .slice(currentSlide, currentSlide + 3)
            .map((club, index) => (
              <CSSTransition
                key={index}
                timeout={500}
                classNames='slide'
                appear
                in
              >
                <div className='item'>
                  <div className='direction'>
                    <Link to={`/Showclub/${club.id}`}>
                      <h2 onClick={() => setclubid(club.id)}>{club.name}</h2>
                    </Link>
                    <small>{truncateDescription(club.description, 70)}</small>
                    <span className='left-container-arrow'></span>
                  </div>
                </div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      </div>

      <div className='navigation-buttons'>
        <button className='prev-btn' onClick={() => handleSlide('prev')}>
          &#9665;
        </button>
        <button className='next-btn' onClick={() => handleSlide('next')}>
          &#9655;
        </button>
      </div>

      <button className='btn-primary'>
        <Link to='/createclub'>Create New Club</Link>
      </button>
    </div>
  );
};

export default Club;
