"use client";

import React from 'react';
import { X, Square, Home, Wind, Waves } from 'lucide-react';
import styles from './RoomModal.module.css';

interface Room {
  id: number;
  name: string;
  price: string;
  image: string;
  description?: string;
  sqm?: number;
  beds?: number;
  amenities?: string[];
}

interface RoomModalProps {
  room: Room | null;
  onClose: () => void;
}

const RoomModal = ({ room, onClose }: RoomModalProps) => {
  if (!room) return null;

  // Placeholder details
  const details = {
    sqm: room.sqm || 45,
    beds: room.beds || 1,
    description: room.description || "Experience unparalleled luxury in our masterfully designed suites. Each room offers a seamless blend of traditional Balinese architecture and modern Apple-inspired minimalism.",
    features: [
      { icon: <Square size={18} />, label: "45 sqm Area" },
      { icon: <Home size={18} />, label: "Master Bedroom" },
      { icon: <Wind size={18} />, label: "Air Conditioning" },
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
            <div className={styles.thumbnails}>
              {[1, 2, 3].map(i => (
                <div key={i} className={styles.thumb}>
                  <img src={room.image} alt={`${room.name} view ${i}`} />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.info}>
            <h2 className={styles.title}>{room.name}</h2>
            <p className={styles.price}>{room.price} <span className={styles.perNight}>per night</span></p>
            
            <div className={styles.featuresGrid}>
              {details.features.map((feature, i) => (
                <div key={i} className={styles.featureItem}>
                  <span className={styles.featureIcon}>{feature.icon}</span>
                  <span className={styles.featureLabel}>{feature.label}</span>
                </div>
              ))}
            </div>

            <p className={styles.description}>{details.description}</p>

            <button className={styles.bookButton} onClick={() => window.open('https://wa.me/6287818384628', '_blank')}>
              Book This Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomModal;
