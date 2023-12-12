import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

const HomePage = () => {
  const userId = localStorage.getItem('userId');
  let navigate = useNavigate();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const docRef = doc(db, 'students', userId);
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

  const clearUserIdInLocalStorage = () => {
    localStorage.removeItem('userId');
  };

  const logout = async () => {
    try {
      await signOut(auth);
      clearUserIdInLocalStorage();
      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  const toggleMenu = () => {
    console.log('Toggling submenu');
    setIsSubMenuOpen(!isSubMenuOpen);
  };

  return (
    <div className="container">
      <div className="navbar">
        <img src=" ./DYPlogo.png" alt="" className="logo" />
        <nav>
          <ul>
            <li><Link to='/HomePage'>Home </Link></li>
           
            <li><Link to='/Profile'> Profile </Link></li>
          </ul>
          {userData && (
            <div>
              {imageUrl && (
                <img src={imageUrl} className="user-pic" onClick={toggleMenu} alt="User" />
              )}
              <div className={`sub-menu-wrap ${isSubMenuOpen ? 'open-menu' : ''}`} id="subMenu">
                <div className="sub-menu">
                  <div className="user-info">
                    {imageUrl && (
                      <img src={imageUrl} className="user-pic" alt="User" onClick={toggleMenu} />
                    )}
                    <h2 className="text">{userData.name}</h2>
                  </div>
                  <hr />
                  <a href="#" className="sub-menu-link">
                    <img src="" alt="Icon" />
                    <p>Edit Profile</p>
                    <span></span>
                  </a>

                  <a href="#" className="sub-menu-link">
                    <img src="" alt="Icon" />
                    <p>Setting and Privacy</p>
                    <span></span>
                  </a>

                  <a href="#" className="sub-menu-link">
                    <img src="" alt="Icon" />
                    <p>Help and Support</p>
                    <span></span>
                  </a>

                  <a href="#" className="sub-menu-link">
                    <img src="" alt="Icon" />
                    <p>Setting</p>
                    <span></span>
                  </a>
                  <a href="#" className="sub-menu-link">
                    <img src="" alt="Icon" />
                    <p className="logout" onClick={logout}>Logout</p>
                    <span></span>
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>

      <div className="row">
        <div className="col">
          <h1 className="hp">DYPIU</h1>
          <p className="hpp">
          D Y Patil International University, Akrudi, Pune is one of the finest private universities in India, which is providing the highly-skilled talent to the nation and overseas. The university has recently become operational as a state private university and offering the best quality higher education in the field of engineering, management, international business, graphic design, biotechnology, journalism, and mass communication.
          </p>
          
          <button type="button"><Link to='/map'>MAPS</Link></button>
        </div>
        <div className="col">
          <div className="card card1">
            <h5><Link to="/club">Clubs</Link></h5>
          </div>
          <div className="card card2">
            <h5><Link to="/Events">Events</Link></h5>


          </div>
          <div className="card card3">
            <h5><a href="https://learning.dypiu.ac.in/">Moodle</a></h5>
          </div>
          <div className="card card4">
            <h5><a href="https://dypiu.collpoll.com/home">Collpoll</a></h5>


          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;

































