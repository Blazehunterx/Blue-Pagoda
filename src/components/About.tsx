"use client";
// Version: V8-QUALITY-OPTIMIZATION

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

      // Quality settings for lower-res panos
      const sceneConfig = {
        hfov: 110,      // Start zoomed out
        minHfov: 80,    // Limit zooming in (to avoid pixelation)
        maxHfov: 130,   // Limit zooming out
        autoLoad: true,
        type: 'equirectangular',
        haov: 360,
        vaov: 180,
        backgroundColor: [0, 0, 0]
      };

      const scenes = {
        entrance: {
          title: 'Welcome to Blue Pagoda',
          panorama: '/tour/entrance.png',
          ...sceneConfig
        },
        pool: {
          title: 'Oasis Pool & Sun Deck',
          panorama: '/tour/pool.png',
          ...sceneConfig
        },
        clubhouse: {
          title: 'Modern Clubhouse & Lounge',
          panorama: '/tour/clubhouse.png',
          ...sceneConfig
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
              sceneFadeDuration: 1000,
              hfov: 110
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
              <h3 className={styles.tourTitle}>360° Virtual Walkthrough</h3>
              <p className={styles.tourDesc}>
                Experience the atmosphere of our clubhouse and residences from anywhere in the world. 
                Move around, look closer, and feel the tranquility.
              </p>
              
              <div style={{ padding: '20px 0', border: '2px solid transparent' }}>
                {!showTour ? (
                  <button 
                    onClick={() => setShowTour(true)}
                    style={{
                      background: '#1a365d',
                      color: 'white',
                      padding: '16px 32px',
                      borderRadius: '8px',
                      fontSize: '18px',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      border: 'none',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px'
                    }}
                  >
                    <span>📍</span>
                    <span>Enter Interactive 360° Tour</span>
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
                    <div id="panorama" className={styles.panorama} style={{ minHeight: '450px' }}></div>
                  </div>
                )}
              </div>
              <p style={{ fontSize: '11px', color: '#666', marginTop: '10px' }}>
                Tip: Use your mouse or finger to drag and look around. Total 360° immersion.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
