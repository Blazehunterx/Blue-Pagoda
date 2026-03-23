"use client";
import React, { useState } from 'react';
import styles from './Neighborhood.module.css';
import dynamic from 'next/dynamic';

const Map = dynamic<any>(() => import('./InteractiveMap'), { 
  ssr: false,
  loading: () => <div className={styles.mapPlaceholder}>Loading Map...</div>
});

const HOTSPOTS = [
  {
    name: "Blue Pagoda Kuta Bali",
    time: "You Are Here",
    type: "Our Residence",
    desc: "Your home base in Kuta. A serene sanctuary just steps from the action.",
    lat: -8.7171,
    lng: 115.1706
  },
  {
    name: "Pepe & Poekie",
    time: "At Residence",
    type: "Our Local Indonesian Kitchen",
    desc: "Authentic Indonesian flavors from one of our own residents. Highly recommended for a local culinary journey.",
    link: "https://poekie-pepe-menu.vercel.app/",
    lat: -8.7188,
    lng: 115.1706
  },
  {
    name: "Kuta Beach",
    time: "2 Mins",
    type: "Surfing & Sunsets",
    desc: "The heartbeat of Bali, just a short stroll away.",
    lat: -8.7193,
    lng: 115.1686
  },
  {
    name: "Poppies Lane I & II",
    time: "1 Min",
    type: "Dining & Shopping",
    desc: "Explore famous local eateries and boutique shops.",
    lat: -8.7161,
    lng: 115.1710
  },
  {
    name: "Beachwalk Mall",
    time: "5 Mins",
    type: "Luxury Shopping",
    desc: "World-class brands and cinema experience nearby.",
    lat: -8.7150,
    lng: 115.1680
  },
  {
    name: "Ngurah Rai Airport",
    time: "15-20 Mins",
    type: "Global Connection",
    desc: "Quick access to the international airport for seamless arrivals and departures.",
    lat: -8.7484,
    lng: 115.1671
  },
  {
    name: "Waterbom Bali",
    time: "10 Mins",
    type: "Family & Fun",
    desc: "Asia's #1 waterpark, perfect for a day of excitement and relaxation.",
    lat: -8.7286,
    lng: 115.1694
  },
  {
    name: "Kuta Art Market",
    time: "5 Mins",
    type: "Local Crafts",
    desc: "Discover unique Balinese souvenirs and traditional handcrafted items.",
    lat: -8.7270,
    lng: 115.1706
  },
  {
    name: "Lippo Mall Kuta",
    time: "8 Mins",
    type: "Cinema & Dining",
    desc: "A modern mall with a great cinema, food court, and local fashion brands.",
    lat: -8.7297,
    lng: 115.1666
  },
  {
    name: "Discovery Mall",
    time: "10 Mins",
    type: "Beachfront Mall",
    desc: "One of the few malls that opens directly onto the beach. Great for sunset walks.",
    lat: -8.7280,
    lng: 115.1675
  },
  {
    name: "Mal Bali Galeria",
    time: "15 Mins",
    type: "Large Shopping Hub",
    desc: "A massive complex featuring international brands, a department store, and DFS Duty Free.",
    lat: -8.7067,
    lng: 115.1760
  },
  {
    name: "Jimbaran Beach",
    time: "20 Mins",
    type: "Seafood Dining",
    desc: "Famous for its beachfront candlelit seafood dinners. A must-visit experience.",
    lat: -8.7750,
    lng: 115.1660
  },
  {
    name: "Legian Street",
    time: "5 Mins",
    type: "Nightlife & Bars",
    desc: "The center of Bali's nightlife, filled with clubs, bars, and late-night shopping.",
    lat: -8.7003,
    lng: 115.1590
  },
  {
    name: "Local Warungs",
    time: "Walking Distance",
    type: "Authentic Food",
    desc: "The best Nasi Campur is right around the corner.",
    lat: -8.7175,
    lng: 115.1720
  }
];

const Neighborhood = () => {
  const [activeSpot, setActiveSpot] = useState(HOTSPOTS[0]);

  return (
    <section id="location" className={styles.neighborhood}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tagline}>The Perfect Location</span>
          <h2 className={styles.title}>Your Neighborhood Guide</h2>
          <p className={styles.subtitle}>
            In the heart of Kuta, yet tucked away for peace. Everything you need is within steps.
          </p>
        </div>
        
        <div className={styles.scrollWrapper}>
          <div className={styles.grid}>
            {HOTSPOTS.map((spot, i) => (
              <div 
                key={i} 
                className={`${styles.card} ${activeSpot.name === spot.name ? styles.activeCard : ''}`}
                onClick={() => setActiveSpot(spot)}
              >
                <div className={styles.cardInfo}>
                  <span className={styles.timeLabel}>{spot.time}</span>
                  <h3 className={styles.cardTitle}>{spot.name}</h3>
                  <span className={styles.type}>{spot.type}</span>
                  <p className={styles.desc}>{spot.desc}</p>
                  {spot.link && (
                    <a href={spot.link} target="_blank" rel="noopener noreferrer" className={styles.menuLink}>
                      View Menu →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.mapConcept}>
          <Map activeSpot={activeSpot} hotspots={HOTSPOTS} />
          <div className={styles.mapOverlay}>
            <p><strong>Blue Pagoda Kuta Bali</strong></p>
            <p>Jl. Poppies Lane I, Kuta</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Neighborhood;
