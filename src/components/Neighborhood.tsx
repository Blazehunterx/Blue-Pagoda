import React from 'react';
import styles from './Neighborhood.module.css';

const HOTSPOTS = [
  {
    name: "Pepe & Poekie",
    time: "At Residence",
    type: "Our Local Indonesian Kitchen",
    desc: "Authentic Indonesian flavors from one of our own residents. Highly recommended for a local culinary journey.",
    link: "https://poekie-pepe-menu.vercel.app/"
  },
  {
    name: "Kuta Beach",
    time: "2 Mins",
    type: "Surfing & Sunsets",
    desc: "The heartbeat of Bali, just a short stroll away."
  },
  {
    name: "Poppies Lane I & II",
    time: "1 Min",
    type: "Dining & Shopping",
    desc: "Explore famous local eateries and boutique shops."
  },
  {
    name: "Beachwalk Mall",
    time: "5 Mins",
    type: "Luxury Shopping",
    desc: "World-class brands and cinema experience nearby."
  },
  {
    name: "Ngurah Rai Airport",
    time: "15-20 Mins",
    type: "Global Connection",
    desc: "Quick access to the international airport for seamless arrivals and departures."
  },
  {
    name: "Waterbom Bali",
    time: "10 Mins",
    type: "Family & Fun",
    desc: "Asia's #1 waterpark, perfect for a day of excitement and relaxation."
  },
  {
    name: "Kuta Art Market",
    time: "5 Mins",
    type: "Local Crafts",
    desc: "Discover unique Balinese souvenirs and traditional handcrafted items."
  },
  {
    name: "Local Warungs",
    time: "Walking Distance",
    type: "Authentic Food",
    desc: "The best Nasi Campur is right around the corner."
  }
];

const Neighborhood = () => {
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
              <div key={i} className={styles.card}>
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
          <div className={styles.mapPlaceholder}>
            <span>[ Interactive Neighborhood Map ]</span>
          </div>
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
