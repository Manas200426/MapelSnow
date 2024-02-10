import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import styles from './Home.module.css'; // Import CSS module
import Navbar from '../../Components/Navbar/Navbar';

function Home(props) {
  return (
    <div className={styles.snowCanadaTheme}>
      <Navbar className={styles.navbar} /> {/* Include Navbar component here */}
      
      <div className={styles.centeredSearchBox}>
        <input type="text" className={styles.searchInput} placeholder="Search for a city or state in Canada" />
        <button className={styles.searchButton}>Search</button>
      </div>
    </div>
  );
}

export default Home;
