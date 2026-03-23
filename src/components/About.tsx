"use client";
// Version: V12-REAL-VIDEO-TOUR

import React, { useState } from 'react';
import styles from './About.module.css';

const About = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  // Cinematic images for the "Pre-Play" motion background
  const tourImgs = [
    '/tour/entrance.png',
    '/tour/pool.png',
    '/tour/clubhouse.png'
  ];

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
                <h4>Meet the Owners</h4>
                <p>Welcome to our sanctuary</p>
              </div>
            </div>
          </div>
          
          <div className={styles.textColumn}>
            <span className={styles.tagline}>Our Philosophy</span>
            <h2 className={styles.title}>A Letter from the Founder</h2>
            <div className={styles.message}>
              <p>
                "When we founded Blue Pagoda Kuta Bali, our goal was to create more than just a place to stay. 
                We wanted a sanctuary where modern minimalism meets the soul of Balinese hospitality."
              </p>
              <p>
                "We pride ourselves on the personal touch. Whether it's your first time in Bali or your tenth return, 
                we ensure your experience is as clear, comfortable, and beautiful as the pagoda that stands for our name."
              </p>
              <p className={styles.signature}>— The Blue Pagoda Team</p>
            </div>
            
            <div className={styles.tourSection}>
              <h3 className={styles.tourTitle}>Cinematic Tour</h3>
              <p className={styles.tourDesc}>
                Experience our residence through the lens. From the tranquil pool to the modern clubhouse, 
                see why Blue Pagoda is your next sanctuary.
              </p>
              
              <div className={styles.videoWrapper} onClick={() => setIsPlaying(true)}>
                {!isPlaying ? (
                  <>
                    {/* Cinematic Ken Burns Motion Background */}
                    <div className={styles.kenBurnsContainer}>
                      {tourImgs.map((img, index) => (
                        <div 
                          key={index} 
                          className={styles.kenBurnsSlide} 
                          style={{ backgroundImage: `url(${img})` }}
                        />
                      ))}
                    </div>
                    
                    {/* Play Overlay */}
                    <div className={styles.videoOverlay}>
                      <div className={styles.playButton}>▶</div>
                      <span className={styles.videoTag}>Watch the Film</span>
                    </div>
                  </>
                ) : (
                  <video 
                    className={styles.videoPlayer} 
                    controls 
                    autoPlay 
                    src="/tour/tour.mp4"
                    poster="/tour/poster.jpg"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
