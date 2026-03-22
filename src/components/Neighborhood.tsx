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
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15774.223847372295!2d115.1668858871582!3d-8.71188169999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd246bc4113e11f%3A0xe544158913955684!2sJl.%20Poppies%20I%2C%20Kuta%2C%20Kec.%20Kuta%2C%20Kabupaten%20Badung%2C%20Bali!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className={styles.mapFrame}
          ></iframe>
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
