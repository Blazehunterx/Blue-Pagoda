"use client";

import React, { useState, useEffect } from 'react';
import { getAllBookings, updateBookingStatus, Booking } from '@/lib/bookingService';
import { Check, X, Calendar, User, Mail, Clock } from 'lucide-react';
import styles from './OwnerDashboard.module.css';

const OwnerDashboard = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      loadBookings();
    }
  }, [isAuthenticated]);

  const loadBookings = async () => {
    setLoading(true);
    const { data, error } = await getAllBookings();
    if (data) setBookings(data);
    setLoading(false);
  };

  const handleStatusUpdate = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    const { error } = await updateBookingStatus(id, status);
    if (!error) {
      loadBookings();
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bluepagoda2026') {
      setIsAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.loginOverlay}>
        <div className={styles.loginCard}>
          <h2>Owner Dashboard</h2>
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Access Key" 
              className={styles.inputField}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <button type="submit" className={styles.bookButton}>Access Bookings</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Reservations</h1>
        <button onClick={loadBookings} className={styles.actionBtn} title="Refresh">
          <Clock size={20} />
        </button>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{bookings.filter(b => b.status === 'pending').length}</div>
          <div className={styles.statLabel}>Pending</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{bookings.filter(b => b.status === 'confirmed').length}</div>
          <div className={styles.statLabel}>Confirmed</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{bookings.length}</div>
          <div className={styles.statLabel}>Total Stays</div>
        </div>
      </div>

      <div className={styles.bookingList}>
        <div className={styles.tableHeader}>
          <span>Guest</span>
          <span>Studio</span>
          <span className={styles['hide-mobile']}>Contact</span>
          <span>Check In</span>
          <span>Check Out</span>
          <span>Status</span>
          <span>Actions</span>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>Loading your bookings...</div>
        ) : bookings.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center' }}>No bookings found yet.</div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className={styles.bookingRow}>
              <div style={{ fontWeight: 600 }}>{booking.guest_name}</div>
              <div style={{ fontWeight: 700, color: 'var(--accent)' }}>#{booking.assigned_room_number || '?'}</div>
              <div className={styles['hide-mobile']} style={{ opacity: 0.6, fontSize: '0.85rem' }}>{booking.guest_email}</div>
              <div>{booking.check_in}</div>
              <div>{booking.check_out}</div>
              <div>
                <span className={`${styles.status} ${styles[booking.status]}`}>
                  {booking.status}
                </span>
              </div>
              <div className={styles.actions}>
                {booking.status === 'pending' && (
                  <>
                    <button 
                      className={`${styles.actionBtn} ${styles.confirmBtn}`}
                      onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                    >
                      <Check size={18} />
                    </button>
                    <button 
                      className={`${styles.actionBtn} ${styles.cancelBtn}`}
                      onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                    >
                      <X size={18} />
                    </button>
                  </>
                )}
                {booking.status !== 'pending' && (
                   <button 
                   className={styles.actionBtn}
                   onClick={() => handleStatusUpdate(booking.id, 'pending')}
                   style={{ fontSize: '0.7rem' }}
                 >
                   Reset
                 </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;
