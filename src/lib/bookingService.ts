import { supabase } from './supabase';
import { format, addDays, isWithinInterval, parseISO, eachDayOfInterval } from 'date-fns';

export interface Booking {
  id?: string;
  room_id: number; // Logical ID (always 1 for Studio)
  assigned_room_number?: number; // 1-17
  guest_name: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const TOTAL_ROOMS = 17;

/**
 * NEW: Pooled Availability Logic
 * A date is only "booked" if ALL 17 rooms are occupied.
 */
export const getBookedDates = async (roomId: number): Promise<Date[]> => {
  const { data, error } = await supabase
    .from('bp_bookings')
    .select('check_in, check_out, assigned_room_number')
    .neq('status', 'cancelled');

  if (error) return [];

  // Count bookings per day
  const dailyCounts: Record<string, number> = {};
  
  data.forEach((booking: any) => {
    const range = eachDayOfInterval({
      start: parseISO(booking.check_in),
      end: parseISO(booking.check_out)
    });

    range.forEach(day => {
      const dStr = format(day, 'yyyy-MM-dd');
      dailyCounts[dStr] = (dailyCounts[dStr] || 0) + 1;
    });
  });

  // A date is blocked only if all 17 rooms are full
  const blockedDates = Object.entries(dailyCounts)
    .filter(([_, count]) => count >= TOTAL_ROOMS)
    .map(([dStr, _]) => parseISO(dStr));

  return blockedDates;
};

/**
 * NEW: Auto-Allocation Logic
 * Find the first available room number from 1-17.
 */
export const createBooking = async (booking: Omit<Booking, 'id' | 'status' | 'assigned_room_number'>) => {
  const checkIn = parseISO(booking.check_in);
  const checkOut = parseISO(booking.check_out);

  // 1. Get all active bookings that might overlap
  const { data: overlaps, error: overlapError } = await supabase
    .from('bp_bookings')
    .select('check_in, check_out, assigned_room_number')
    .neq('status', 'cancelled');

  if (overlapError) return { error: overlapError };

  // 2. Find first room number with no overlap
  let assignedRoom = -1;
  for (let r = 1; r <= TOTAL_ROOMS; r++) {
    const hasOverlap = overlaps.some(b => {
      if (b.assigned_room_number !== r) return false;
      const bStart = parseISO(b.check_in);
      const bEnd = parseISO(b.check_out);
      return (checkIn <= bEnd && checkOut >= bStart);
    });

    if (!hasOverlap) {
      assignedRoom = r;
      break;
    }
  }

  if (assignedRoom === -1) {
    return { error: { message: 'All studios are fully booked for these dates.' } };
  }

  // 3. Insert the booking with the auto-assigned room
  const { data, error } = await supabase
    .from('bp_bookings')
    .insert([{ 
      ...booking, 
      assigned_room_number: assignedRoom,
      status: 'pending' 
    }])
    .select();

  return { data, error };
};

export const getAllBookings = async () => {
  const { data, error } = await supabase
    .from('bp_bookings')
    .select('*')
    .order('check_in', { ascending: true });
  return { data, error };
};

export const updateBookingStatus = async (bookingId: string, status: Booking['status']) => {
  const { data, error } = await supabase
    .from('bp_bookings')
    .update({ status })
    .eq('id', bookingId)
    .select();
  return { data, error };
};
/**
 * NEW: Room-Specific Availability Logic (for Owner)
 * Fetches dates occupied by a specific unit only.
 */
export const getBookedDatesForRoom = async (roomNumber: number): Promise<Date[]> => {
  const { data, error } = await supabase
    .from('bp_bookings')
    .select('check_in, check_out')
    .eq('assigned_room_number', roomNumber)
    .neq('status', 'cancelled');

  if (error) return [];

  const bookedDates: Date[] = [];
  data.forEach((booking: any) => {
    const range = eachDayOfInterval({
      start: parseISO(booking.check_in),
      end: parseISO(booking.check_out)
    });
    bookedDates.push(...range);
  });

  return bookedDates;
};

/**
 * NEW: Manual Owner Booking
 * Bypasses auto-allocation to place a guest in a specific room.
 */
export const manualCreateBooking = async (booking: Booking) => {
  const { data, error } = await supabase
    .from('bp_bookings')
    .insert([{ 
      ...booking,
      status: 'confirmed' // Owner bookings are confirmed instantly
    }])
    .select();

  return { data, error };
};
