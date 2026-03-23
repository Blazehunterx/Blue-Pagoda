import { supabase } from './supabase';
import { format, addDays, isWithinInterval, parseISO } from 'date-fns';

export interface Booking {
  id?: string;
  room_id: number;
  guest_name: string;
  guest_email: string;
  check_in: string; // ISO Date
  check_out: string; // ISO Date
  status: 'pending' | 'confirmed' | 'cancelled';
}

/**
 * Fetch all existing bookings for a room to determine unavailable dates.
 */
export const getBookedDates = async (roomId: number): Promise<Date[]> => {
  const { data, error } = await supabase
    .from('bp_bookings')
    .select('check_in, check_out')
    .eq('room_id', roomId)
    .neq('status', 'cancelled');

  if (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }

  const bookedDates: Date[] = [];
  data.forEach((booking: any) => {
    let current = parseISO(booking.check_in);
    const end = parseISO(booking.check_out);
    
    while (current <= end) {
      bookedDates.push(new Date(current));
      current = addDays(current, 1);
    }
  });

  return bookedDates;
};

/**
 * Submit a new booking request.
 * The database trigger 'tr_no_double_bookings' will handle the overlap check.
 */
export const createBooking = async (booking: Omit<Booking, 'id' | 'status'>) => {
  const { data, error } = await supabase
    .from('bp_bookings')
    .insert([{ ...booking, status: 'pending' }])
    .select();

  return { data, error };
};

/**
 * Fetch all bookings for the owner dashboard.
 */
export const getAllBookings = async () => {
  const { data, error } = await supabase
    .from('bp_bookings')
    .select('*')
    .order('check_in', { ascending: true });

  return { data, error };
};

/**
 * Update a booking status (Owner action).
 */
export const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
  const { data, error } = await supabase
    .from('bp_bookings')
    .update({ status })
    .eq('id', bookingId)
    .select();

  return { data, error };
};
