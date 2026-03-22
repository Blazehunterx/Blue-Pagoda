import React from 'react';
import styles from './RoomCard.module.css';

interface RoomCardProps {
  id: number;
  name: string;
  idrPrice: string;
  image: string;
  onViewDetails: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({ name, image, idrPrice, onViewDetails }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={name} className={styles.image} loading="lazy" />
        <div className={styles.overlay}>
          <button className={styles.button} onClick={onViewDetails}>View Details</button>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>{idrPrice} / month</p>
      </div>
    </div>
  );
};

export default RoomCard;
