"use client";

import React from 'react';
import { X, Square, Home, Wind, Waves } from 'lucide-react';
import BookingCalendar from './BookingCalendar';
import styles from './RoomModal.module.css';

interface Room {
  id: number;
  name: string;
  idrPrice: string;
  image: string;
  electricity: string;
}

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
}

const RoomModal = ({ room, onClose }: RoomModalProps) => {
  if (!room) return null;

  // Placeholder details
  const details = {
    sqm: 45,
    beds: 1,
    description: "Experience unparalleled luxury in our masterfully designed suites. Each room offers a seamless blend of traditional Balinese architecture and modern Apple-inspired minimalism.",
    features: [
      { icon: <Square size={18} />, label: "45 sqm Area" },
      { icon: <Wind size={18} />, label: room.electricity },
      { icon: <Home size={18} />, label: "Master Bedroom" },
      { icon: <Waves size={18} />, label: "Pool Access" }
    ]
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={styles.content}>
          <div className={styles.gallery}>
            <div className={styles.mainImage}>
              <img src={room.image} alt={room.name} />
            </div>
          </div>

          <div className={styles.info}>
            <h2 className={styles.title}>{room.name}</h2>
            <p className={styles.price}>{room.idrPrice} <span className={styles.perNight}>per month</span></p>
            
            <div className={styles.featuresGrid}>
              {details.features.map((feature, i) => (
                <div key={i} className={styles.featureItem}>
                  <span className={styles.featureIcon}>{feature.icon}</span>
                  <span className={styles.featureLabel}>{feature.label}</span>
                </div>
              ))}
            </div>

            <p className={styles.description}>{details.description}</p>

            <div className={styles.bookingContainer}>
              <BookingCalendar roomId={room.id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
