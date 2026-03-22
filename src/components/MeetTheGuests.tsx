import React from 'react';
import styles from './MeetTheGuests.module.css';
import { MessageSquare, Quote } from 'lucide-react';

const GUEST_STORIES = [
  {
    name: "Mila & Thomas",
    origin: "Germany",
    room: "Room 12",
    length: "3 Months",
    story: "Blue Pagoda isn't just a place to stay; it's a family. We came for a week and stayed for three months. The sunrise from the clubhouse is the best way to start a working day.",
    photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Alex Riva",
    origin: "Italy",
    room: "Room 4",
    length: "6 Weeks",
    story: "I've stayed in many places in Bali, but the community here is special. Everyone knows your name, and Poekie's cooking at the clubhouse feels like home.",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
  },
  {
    name: "Sarah Jenkins",
    origin: "Australia",
    room: "Room 22",
    length: "1 Month",
    story: "Perfect for digital nomads. The Wi-Fi is rock solid, and when you need a break, the pool is right there. It's the perfect balance of work and Bali life.",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
  }
];

const MeetTheGuests = () => {
  return (
    <section id="community" className={styles.community}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tagline}>The Blue Pagoda Family</span>
          <h2 className={styles.title}>Meet the Guests</h2>
          <p className={styles.subtitle}>
            Hear from the wonderful people who have called Blue Pagoda home. More than a residence, we're a community.
          </p>
        </div>

        <div className={styles.grid}>
          {GUEST_STORIES.map((guest, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.imageWrapper}>
                <img src={guest.photo} alt={guest.name} className={styles.photo} />
                <div className={styles.roomBadge}>{guest.room}</div>
              </div>
              <div className={styles.content}>
                <Quote className={styles.quoteIcon} size={24} />
                <p className={styles.story}>{guest.story}</p>
                <div className={styles.footer}>
                  <div className={styles.info}>
                    <h4 className={styles.name}>{guest.name}</h4>
                    <span className={styles.meta}>{guest.origin} • {guest.length} Stay</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.ctaBox}>
          <div className={styles.ctaContent}>
            <MessageSquare className={styles.ctaIcon} size={32} />
            <div className={styles.ctaText}>
              <h3>Share Your Story</h3>
              <p>Are you a current or past resident? We'd love to hear about your time here.</p>
            </div>
            <a href="https://wa.me/6287818384628" className={styles.ctaButton}>Reach Out</a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheGuests;
