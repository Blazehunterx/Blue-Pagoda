import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.imageColumn}>
            <div className={styles.imageWrapper}>
              <img 
                src="/owner.jpg" 
                alt="Blue Pagoda Owner" 
                className={styles.image}
              />
              <div className={styles.imageCaption}>
                <h4>The People Behind Blue Pagoda</h4>
                <p>Welcome to our sanctuary</p>
              </div>
            </div>
          </div>
          
          <div className={styles.textColumn}>
            <span className={styles.tagline}>A Personal Welcome</span>
            <h2 className={styles.title}>Meet Your Hosts</h2>
            <div className={styles.message}>
              <p>
                "When we founded Blue Pagoda Kuta Bali, our goal was to create more than just a place to stay. 
                We wanted a sanctuary where modern minimalism meets the soul of Balinese hospitality."
              </p>
              <p>
                "As travelers ourselves, we understand that it's the personal touches that make a stay memorable. 
                Whether it's your first time in Bali or your tenth return, we are here to ensure your experience 
                is as clear, comfortable, and beautiful as the pagoda that stands for our name."
              </p>
              <p className={styles.signature}>— The Blue Pagoda Team</p>
            </div>
            
            <div className={styles.tourConcept}>
              <h3>Virtual Walkthrough</h3>
              <p>
                Coming soon: An interactive POV journey through our clubhouse, pool area, and residence 
                interiors. Experience the atmosphere before you even arrive.
              </p>
              <div className={styles.tourPlaceholder}>
                <span className={styles.playIcon}>▶</span>
                <span>Virtual Tour Preview</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
