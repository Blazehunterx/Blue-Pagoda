"use client";
// Version: V10-NO-BLACK-BORDERS-FIX

import React, { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';

const About = () => {
  const [showTour, setShowTour] = useState(false);
  const [currentScene, setCurrentScene] = useState('entrance');
  const viewerRef = useRef<any>(null);

  // Initialize and handle scene changes
  useEffect(() => {
    if (showTour) {
      // @ts-ignore
      const pannellum = window.pannellum;

      if (!pannellum) return;

      // Settings for "Seamless Wide-View" (No black borders)
      const sceneConfig = {
        hfov: 110,
        minHfov: 80,
        maxHfov: 130,
        autoLoad: true,
        type: 'equirectangular',
        haov: 150,        // Horizontal Angle of View (covers the image width)
        vaov: 80,         // Vertical Angle of View
        vOffset: 0,
        // STRICT LIMITS: This prevents seeing the "black void"
        minLon: -75,      // Half of haov
        maxLon: 75,       // Half of haov
        minLat: -30,
        maxLat: 30,
        backgroundColor: [26, 54, 93], // Match our Navy theme instead of black
        compass: false,
        mouseZoom: false
      };

      const scenes = {
        entrance: {
          title: 'Welcome to Blue Pagoda',
          panorama: '/tour/entrance.png',
          ...sceneConfig,
          haov: 180,      // Entrance is a bit wider
          minLon: -90,
          maxLon: 90
        },
        pool: {
          title: 'Oasis Pool & Sun Deck',
          panorama: '/tour/pool.png',
          ...sceneConfig,
          haov: 200,
          minLon: -100,
          maxLon: 100
        },
        clubhouse: {
          title: 'Modern Clubhouse & Lounge',
          panorama: '/tour/clubhouse.png',
          ...sceneConfig,
          haov: 160,
          minLon: -80,
          maxLon: 80
        }
      };

      const panoramaEl = document.getElementById('panorama');
      if (!panoramaEl) return;

      if (!viewerRef.current) {
        try {
          viewerRef.current = pannellum.viewer('panorama', {
            default: {
              firstScene: currentScene,
              author: 'Blue Pagoda Kuta Bali',
              sceneFadeDuration: 800
            },
            scenes: scenes
          });
        } catch (err) {
          console.error("Pannellum Error:", err);
        }
      } else {
        viewerRef.current.loadScene(currentScene);
      }
    }
  }, [showTour, currentScene]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy();
        viewerRef.current = null;
      }
    };
  }, []);

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
              <h3 className={styles.tourTitle}>Interactive Virtual Experience</h3>
              <p className={styles.tourDesc}>
                Take a high-definition look at our residence. Drag to explore the clubhouse, 
                pool, and entrance in full detail.
              </p>
              
              <div style={{ padding: '20px 0' }}>
                {!showTour ? (
                  <button 
                    onClick={() => setShowTour(true)}
                    style={{
                      background: '#1a365d',
                      color: 'white',
                      padding: '20px 40px',
                      borderRadius: '12px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      border: 'none',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <span>🧭</span>
                    <span>Experience Full HD Tour</span>
                  </button>
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
                    <div id="panorama" className={styles.panorama} style={{ minHeight: '450px', background: '#1a365d' }}></div>
                  </div>
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
