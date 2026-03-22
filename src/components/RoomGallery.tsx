"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import RoomCard from './RoomCard';
import styles from './RoomGallery.module.css';

import RoomModal from './RoomModal';

interface Room {
  id: number;
  name: string;
  idrPrice: string;
  image: string;
  electricity: string;
}

const STATIC_ROOMS: Room[] = Array.from({ length: 24 }, (_, i) => {
  const id = i + 1;
  let price = "8.5M IDR";
  let electricity = "Including Electricity";
  
  if (id === 1) {
    price = "18M IDR";
    electricity = "Excluding Electricity";
  } else if (id === 2) {
    price = "12M IDR";
    electricity = "Excluding Electricity";
  } else if (id >= 22) {
    price = "4.5M IDR";
    electricity = "Including Electricity";
  }

  return {
    id,
    name: `Residence Room ${id}`,
    idrPrice: price,
    electricity,
    image: `https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&room=${id}`
  };
});

const RoomGallery = () => {
  const [rooms, setRooms] = useState<Room[]>(STATIC_ROOMS);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      const { data, error } = await supabase
        .from('bp_rooms')
        .select('*');
      
      if (data && data.length > 0 && !error) {
        setRooms(data);
      }
    };
    fetchRooms();
  }, []);

  return (
    <section id="rooms" className={styles.gallery}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Our Residences</h2>
          <p className={styles.subtitle}>Discover your perfect Balinese sanctuary</p>
        </div>
        
        <div className={styles.grid}>
          {rooms.map((room) => (
            <RoomCard 
              key={room.id} 
              {...room} 
              onViewDetails={() => setSelectedRoom(room)}
            />
          ))}
        </div>
      </div>

      <RoomModal 
        room={selectedRoom} 
        onClose={() => setSelectedRoom(null)} 
      />
    </section>
  );
};

export default RoomGallery;
