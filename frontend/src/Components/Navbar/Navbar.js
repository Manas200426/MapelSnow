import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import styles from './Navbar.module.css'; // Import CSS module
import logo from "../../assets/logo.png"


function Navbar({ userName }) {
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      // Redirect to login page after signout
      navigate('/login');
    }).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logo} alt="MapleSnow Logo" />
      </div>
      <div className={styles.user}>
        {userName && <span>Welcome, {userName}</span>}
      </div>
      <div className={styles.actions}>
        {userName ?
          <button className={styles.signOutButton} onClick={handleSignOut}>Sign Out</button> :
          <Link to="/login" className={styles.loginLink}>Login</Link>
        }
      </div>
    </nav>
  );
}

export default Navbar;
