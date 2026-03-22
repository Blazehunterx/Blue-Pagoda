"use client";
// Build: V4-STABLE-TOUR-FIX

import React, { useEffect, useRef, useState } from 'react';
import styles from './About.module.css';

const About = () => {
  const [showTour, setShowTour] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [currentScene, setCurrentScene] = useState('entrance');
  const viewerRef = useRef<any>(null);
  const panoramaContainerRef = useRef<HTMLDivElement>(null);

  // Load Pannellum once
  useEffect(() => {
    if (showTour && !isScriptLoaded) {
      console.log("Loading Pannellum scripts...");
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js';
      script.onload = () => {
        console.log("Pannellum script loaded.");
        setIsScriptLoaded(true);
      };
      document.body.appendChild(script);
    }
  }, [showTour, isScriptLoaded]);

  // Handle scene changes and initialization
  useEffect(() => {
    // Only proceed if showTour is true, script is loaded, and the container exists
    if (showTour && isScriptLoaded) {
      console.log("Attempting to initialize/switch tour scene:", currentScene);
      
      const scenes = {
        entrance: {
          title: 'Welcome to Blue Pagoda',
          panorama: '/tour/entrance.png',
          autoLoad: true
        },
        pool: {
          title: 'Oasis Pool & Sun Deck',
          panorama: '/tour/pool.png',
          autoLoad: true
        },
        clubhouse: {
          title: 'Modern Clubhouse & Lounge',
          panorama: '/tour/clubhouse.png',
          autoLoad: true
        }
      };

      // Ensure the "panorama" ID exists in the DOM
      const panoramaEl = document.getElementById('panorama');
      if (!panoramaEl) {
        console.warn("Panorama container not found in DOM yet. Retrying...");
        return;
      }

      // @ts-ignore
      if (typeof pannellum === 'undefined') {
        console.error("Pannellum global object not found despite script load.");
        return;
      }

      if (!viewerRef.current) {
        try {
          console.log("Initializing new Pannellum viewer...");
          // @ts-ignore
          viewerRef.current = pannellum.viewer('panorama', {
            default: {
              firstScene: currentScene,
              author: 'Blue Pagoda Kuta Bali',
              sceneFadeDuration: 800
            },
            scenes: scenes,
            autoLoad: true
          });
        } catch (err) {
          console.error("Error initializing Pannellum:", err);
        }
      } else {
        console.log("Loading existing scene:", currentScene);
        viewerRef.current.loadScene(currentScene);
      }
    }
  }, [isScriptLoaded, showTour, currentScene]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (viewerRef.current) {
        console.log("Destroying Pannellum viewer...");
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
              
              <div className={styles.tourWrapper}>
                {!showTour ? (
                  <div className={styles.tourPlaceholder} onClick={() => setShowTour(true)}>
                    <span className={styles.playIcon}>📍</span>
                    <span>Enter Interactive 360° Tour</span>
                  </div>
                ) : (
                  <>
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
                    {/* Panorama container is always rendered when showTour is true */}
                    <div id="panorama" className={styles.panorama}></div>
                  </>
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
