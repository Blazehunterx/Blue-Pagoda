import React from 'react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link'; // Assuming Next.js Link component based on the instruction
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={`${styles.header} glass`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-hGzIYXbfj0VYWQfeG1vQkGO6e6rtoM5Hg&s" 
            alt="Blue Pagoda Logo" 
            className={styles.logoImage}
          />
          <span className={styles.logoText}>Blue Pagoda</span>
        </Link>
        
        <nav className={styles.nav}>
          <a href="#rooms">Rooms</a>
          <a href="#about">About</a>
          <a 
          href="https://wa.me/6287818384628" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-primary"
        >
          <MessageCircle size={18} />
          <span>Book Now</span>
        </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
