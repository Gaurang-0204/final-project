import  {React,useState,useEffect}from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { db, storage } from '../../config/firebase';
import { ref, getDownloadURL } from 'firebase/storage';

function Header() {

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
      


        <Nav>
            <Logo src="/DYPlogo.png" />
            <NavMenu>
                <a>
                    
                    <span><Link to='/HomePage'>Home</Link></span>
                </a>
                <a>
                    
                    <span><Link to='/Profile'>Profile</Link></span>
                </a>
                <a>
                    
                    <span>Recents</span>
                </a>
                <a>
                    
                    <span>Coming events</span>
                </a>
                <a>
                    
                    <span>Feedback</span>
                </a>
                <a>
                    
                    <span>Contact</span>
                </a>
            </NavMenu>
            

            {userData && (
        <div>
          {imageUrl && (
            <img src={imageUrl} className="user-pic" onClick={toggleMenu} alt="User" />
          )}
          <div className={`sub-menu-wrap ${isSubMenuOpen ? 'open-menu' : ''}`} id="subMenu">
            <div className="sub-menu">
              <div className="user-info">
                {imageUrl && (
                  <UserImg src={imageUrl} className="user-pic" alt="User" onClick={toggleMenu} />
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
  
  </Nav>
            
            
       
    )
}

export default Header

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`

const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
    a {
        display: flex; 
        align-items: center;
        padding: 0 12px;
        cursor: pointer;

        img {
            height: 20px;
        }

        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;

            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0; 
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }

        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`

const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
`
