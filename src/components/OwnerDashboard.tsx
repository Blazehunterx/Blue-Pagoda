"use client";

import React, { useState, useEffect } from 'react';
import { 
  getAllBookings, 
  updateBookingStatus, 
  Booking, 
  getBookedDatesForRoom, 
  manualCreateBooking 
} from '@/lib/bookingService';
import { Check, X, Calendar, User, Mail, Clock, LayoutGrid, Plus } from 'lucide-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, isToday, parseISO } from 'date-fns';
import calendarStyles from './BookingCalendar.module.css';
import styles from './OwnerDashboard.module.css';

const OwnerDashboard = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Room Explorer States
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [roomBookings, setRoomBookings] = useState<Date[]>([]);
  
  // Manual Booking States
  const [manualName, setManualName] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualStart, setManualStart] = useState<Date | null>(null);
  const [manualEnd, setManualEnd] = useState<Date | null>(null);
  const [manualLoading, setManualLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      loadBookings();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (selectedRoom) {
      loadRoomData(selectedRoom);
    }
  }, [selectedRoom]);

  const loadBookings = async () => {
    setLoading(true);
    const { data } = await getAllBookings();
    if (data) setBookings(data);
    setLoading(false);
  };

  const loadRoomData = async (roomNum: number) => {
    const dates = await getBookedDatesForRoom(roomNum);
    setRoomBookings(dates);
  };

  const handleStatusUpdate = async (id: string, status: 'pending' | 'confirmed' | 'cancelled') => {
    const { error } = await updateBookingStatus(id, status);
    if (!error) loadBookings();
  };

  const handleManualBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRoom || !manualStart || !manualEnd || !manualName) return;

    setManualLoading(true);
    const { error } = await manualCreateBooking({
      room_id: 1,
      assigned_room_number: selectedRoom,
      guest_name: manualName,
      guest_email: manualEmail || 'manual@entry.local',
      check_in: format(manualStart, 'yyyy-MM-dd'),
      check_out: format(manualEnd, 'yyyy-MM-dd'),
      status: 'confirmed'
    });

    setManualLoading(false);
    if (error) {
      alert(error.message);
    } else {
      setManualName('');
      setManualEmail('');
      setManualStart(null);
      setManualEnd(null);
      loadBookings();
      loadRoomData(selectedRoom);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'bluepagoda2026') setIsAuthenticated(true);
    else alert('Incorrect password');
  };

  const isRoomOccupiedToday = (roomNum: number) => {
    return bookings.some(b => 
      b.assigned_room_number === roomNum && 
      b.status === 'confirmed' &&
      isToday(parseISO(b.check_in))
    );
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
            <button type="submit" className={calendarStyles.bookButton}>Access Bookings</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Blue Pagoda Admin</h1>
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
          <div className={styles.statLabel}>Total Reservations</div>
        </div>
      </div>

      <section className={styles.roomGridSection}>
        <h3 className={styles.panelTitle}><LayoutGrid size={24} /> Room Explorer (1-17)</h3>
        <div className={styles.roomGrid}>
          {Array.from({ length: 17 }, (_, i) => i + 1).map(num => (
            <div 
              key={num} 
              className={`${styles.roomCard} ${selectedRoom === num ? styles.roomCardActive : ''} ${isRoomOccupiedToday(num) ? styles.roomCardOccupied : ''}`}
              onClick={() => setSelectedRoom(num)}
            >
              <span className={styles.roomNum}>{num}</span>
              <span className={styles.roomLabel}>Studio</span>
            </div>
          ))}
        </div>
      </section>

      {selectedRoom && (
        <div className={styles.detailPanel}>
          <div>
            <h3 className={styles.panelTitle}><Calendar size={24} /> Studio #{selectedRoom} Schedule</h3>
            <DatePicker
              inline
              selected={null}
              onChange={() => {}}
              highlightDates={roomBookings}
              minDate={new Date()}
            />
            <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#666' }}>
              Red dot in background means occupied today.
            </p>
          </div>

          <div className={styles.manualForm}>
            <h3 className={styles.panelTitle}><Plus size={24} /> Manual Booking</h3>
            <div className={calendarStyles.dateRangeGrid}>
              <div className={calendarStyles.dateInputGroup}>
                <label>Check In</label>
                <DatePicker
                  selected={manualStart}
                  onChange={(date: Date | null) => setManualStart(date)}
                  className={calendarStyles.datePicker}
                  placeholderText="Start Date"
                  excludeDates={roomBookings}
                />
              </div>
              <div className={calendarStyles.dateInputGroup}>
                <label>Check Out</label>
                <DatePicker
                  selected={manualEnd}
                  onChange={(date: Date | null) => setManualEnd(date)}
                  className={calendarStyles.datePicker}
                  placeholderText="End Date"
                  minDate={manualStart || new Date()}
                  excludeDates={roomBookings}
                />
              </div>
            </div>
            
            <input 
              type="text" 
              placeholder="Guest Name (e.g. Existing Guest)" 
              className={calendarStyles.inputField}
              value={manualName}
              onChange={(e) => setManualName(e.target.value)}
            />
            
            <button 
              className={calendarStyles.bookButton} 
              onClick={handleManualBooking}
              disabled={manualLoading || !manualStart || !manualEnd || !manualName}
            >
              {manualLoading ? 'Blocking...' : 'Confirm Manual Entry'}
            </button>
          </div>
        </div>
      )}

      <div className={styles.bookingList} style={{ marginTop: '48px' }}>
        <h3 className={styles.panelTitle} style={{ padding: '24px 24px 0' }}>All Active Bookings</h3>
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
                    <button className={`${styles.actionBtn} ${styles.confirmBtn}`} onClick={() => handleStatusUpdate(booking.id, 'confirmed')}><Check size={18} /></button>
                    <button className={`${styles.actionBtn} ${styles.cancelBtn}`} onClick={() => handleStatusUpdate(booking.id, 'cancelled')}><X size={18} /></button>
                  </>
                )}
                {booking.status !== 'pending' && (
                   <button className={styles.actionBtn} onClick={() => handleStatusUpdate(booking.id, 'pending')} style={{ fontSize: '0.7rem' }}>Reset</button>
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
