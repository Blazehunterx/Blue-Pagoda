"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';

const About = () => {
  const [showTour, setShowTour] = useState(false);
  const viewerRef = useRef<any>(null);

  const [currentScene, setCurrentScene] = useState('entrance');

  useEffect(() => {
    if (showTour) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
      script.onload = () => {
        const scenes = {
          entrance: {
            title: 'Welcome to Blue Pagoda',
            panorama: '/tour/entrance.jpg',
            autoLoad: true
          },
          pool: {
            title: 'Oasis Pool & Sun Deck',
            panorama: '/tour/pool.jpg',
            autoLoad: true
          },
          clubhouse: {
            title: 'Modern Clubhouse & Lounge',
            panorama: '/tour/clubhouse.jpg',
            autoLoad: true
          }
        };

        // @ts-ignore
        viewerRef.current = pannellum.viewer('panorama', {
          default: {
            firstScene: currentScene,
            author: 'Blue Pagoda Kuta Bali',
            sceneFadeDuration: 1000
          },
          scenes: scenes
        });
      };
      document.body.appendChild(script);

      return () => {
        if (viewerRef.current) viewerRef.current.destroy();
        document.head.removeChild(link);
        document.body.removeChild(script);
      };
    }
  }, [showTour, currentScene]);

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
              <h3 className={styles.tourTitle}>360° Virtual Walkthrough</h3>
              <p className={styles.tourDesc}>
                Experience the atmosphere of our clubhouse and residences from anywhere in the world. 
                Move around, look closer, and feel the tranquility.
              </p>
              
              {!showTour ? (
              ) : (
                <div className={styles.tourWrapper}>
                  <div className={styles.sceneSwitcher}>
                    <button 
                      className={currentScene === 'entrance' ? styles.activeScene : ''} 
                      onClick={() => setCurrentScene('entrance')}
                    >
                      Entrance
                    </button>
                    <button 
                      className={currentScene === 'pool' ? styles.activeScene : ''} 
                      onClick={() => setCurrentScene('pool')}
                    >
                      Pool
                    </button>
                    <button 
                      className={currentScene === 'clubhouse' ? styles.activeScene : ''} 
                      onClick={() => setCurrentScene('clubhouse')}
                    >
                      Clubhouse
                    </button>
                  </div>
                  <div id="panorama" className={styles.panorama}></div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
