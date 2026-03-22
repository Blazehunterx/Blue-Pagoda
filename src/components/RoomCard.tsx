import React from 'react';
import styles from './RoomCard.module.css';

interface RoomCardProps {
  id: number;
  name: string;
  image: string;
  price: string;
}

const RoomCard: React.FC<RoomCardProps> = ({ name, image, price }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} className={styles.image} loading="lazy" />
        <div className={styles.overlay}>
          <button className="btn-primary">View Details</button>
        </div>
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.price}>From {price} / night</p>
      </div>
    </div>
  );
};

export default RoomCard;
