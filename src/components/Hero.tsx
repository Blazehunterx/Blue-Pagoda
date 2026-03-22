import React from 'react';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.logoBadge}>
          {/* Stylized Pagoda Icon */}
          <div className={styles.logoContainer}>
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSK-hGzIYXbfj0VYWQfeG1vQkGO6e6rtoM5Hg&s" 
            alt="Blue Pagoda Official Logo" 
            className={styles.heroLogo}
          />
        </div>
        </div>
        <h1 className="hero-title">Blue Pagoda</h1>
        <p className="sub-title">Kuta Bali</p>
        <div className={styles.description}>
          Experience modern tranquility in the heart of Bali.
          A premium residence designed for clarity and comfort.
        </div>
        <div className={styles.ctaGroup}>
          <a href="#rooms" className="btn-primary">Explore Rooms</a>
        </div>
      </div>
      
      {/* Background Decorative Elements */}
      <div className={styles.background}>
        <div className={styles.circle1}></div>
        <div className={styles.circle2}></div>
      </div>
    </section>
  );
};

export default Hero;
