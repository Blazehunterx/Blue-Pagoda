"use client";

import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { format, differenceInDays, addDays } from 'date-fns';
import { getBookedDates, createBooking } from '@/lib/bookingService';
import styles from './BookingCalendar.module.css';

interface BookingCalendarProps {
  roomId: number;
}

const BookingCalendar: React.FC<BookingCalendarProps> = ({ roomId }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [bookedDates, setBookedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const loadDates = async () => {
      const dates = await getBookedDates(roomId);
      setBookedDates(dates);
    };
    loadDates();
  }, [roomId]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!startDate || !endDate || !name || !email) return;

    setLoading(true);
    setMessage(null);

    const { error } = await createBooking({
      room_id: roomId,
      guest_name: name,
      guest_email: email,
      check_in: format(startDate, 'yyyy-MM-dd'),
      check_out: format(endDate, 'yyyy-MM-dd')
    });

    setLoading(false);
    if (error) {
      setMessage({ type: 'error', text: error.message || 'Error booking dates. It might be taken!' });
    } else {
      setMessage({ type: 'success', text: 'Booking request sent! We will contact you shortly.' });
      setStartDate(null);
      setEndDate(null);
      setName('');
      setEmail('');
      // Refresh booked dates
      const updatedDates = await getBookedDates(roomId);
      setBookedDates(updatedDates);
    }
  };

  const nights = startDate && endDate ? differenceInDays(endDate, startDate) : 0;
  const pricePerNight = 8500000 / 30; // Approximation for display
  const totalPrice = nights > 0 ? (nights * pricePerNight).toLocaleString() : 0;

  return (
    <div className={styles.bookingContainer}>
      <h4 className={styles.calendarTitle}>Reserve Your Stay</h4>
      
      {message && (
        <div className={message.type === 'success' ? styles.successMsg : styles.errorMsg}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleBooking}>
        <div className={styles.dateRangeGrid}>
          <div className={styles.dateInputGroup}>
            <label>Check In</label>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              excludeDates={bookedDates}
              className={styles.datePicker}
              placeholderText="Select date"
              required
            />
          </div>
          <div className={styles.dateInputGroup}>
            <label>Check Out</label>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate || new Date()}
              excludeDates={bookedDates}
              className={styles.datePicker}
              placeholderText="Select date"
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <label>Full Name</label>
          <input 
            type="text" 
            className={styles.inputField} 
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Email Address</label>
          <input 
            type="email" 
            className={styles.inputField} 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>

        {nights > 0 && (
          <div className={styles.pricePreview}>
            <div>
              <strong>{nights} Night{nights > 1 ? 's' : ''}</strong>
              <small style={{ display: 'block', opacity: 0.6 }}>Estimated Value</small>
            </div>
            <div className={styles.priceTotal}>
              IDR {totalPrice}
            </div>
          </div>
        )}

        <button 
          type="submit" 
          className={styles.bookButton}
          disabled={loading || !startDate || !endDate}
        >
          {loading ? 'Processing...' : 'Confirm Reservation Request'}
        </button>
      </form>
      
      <p style={{ fontSize: '12px', textAlign: 'center', marginTop: '16px', color: '#666' }}>
        No payment required now. The owner will review your request.
      </p>
    </div>
  );
};

export default BookingCalendar;
