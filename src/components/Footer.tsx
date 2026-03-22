import React from 'react';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <h3>BLUE PAGODA</h3>
            <p>Kuta Bali Residence</p>
          </div>
          <div className={styles.links}>
            <div className={styles.column}>
              <h4>Explore</h4>
              <a href="#hero">Home</a>
              <a href="#rooms">Rooms</a>
              <a href="#about">About</a>
            </div>
            <div className={styles.column}>
              <h4>Contact</h4>
              <p>Gg. Sorga Jl. Poppies Lane I</p>
              <p>Kuta, Bali 80361</p>
              <p>WhatsApp: +62 812 3456 789</p>
            </div>
          </div>
        </div>
        <div className={styles.bottom}>
          <p>&copy; {new Date().getFullYear()} Blue Pagoda Kuta Bali. Designed with clarity.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
