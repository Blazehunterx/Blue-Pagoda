import React from 'react';
import { MessageCircle } from 'lucide-react';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={`${styles.header} glass`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoText}>BLUE PAGODA</span>
        </div>
        
        <nav className={styles.nav}>
          <a href="#rooms">Rooms</a>
          <a href="#about">About</a>
          <a href="https://wa.me/628123456789" className="btn-primary" target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} className={styles.icon} />
            Book Now
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
