import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getEvents, getAttendeesByEvent } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const eventsRes = await getEvents();
        const allBookings = [];
        for (const event of eventsRes.data) {
          const attendeesRes = await getAttendeesByEvent(event._id);
          const userBooking = attendeesRes.data.find(a => a.email === user.email);
          if (userBooking) {
            allBookings.push({ ...userBooking, event });
          }
        }
        setBookings(allBookings);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchBookings();
  }, [user]);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '800' }}>My Bookings 🎟️</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
          All events you have registered for
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)' }}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>⏳</div>
          Loading your bookings...
        </div>
      ) : bookings.length === 0 ? (
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: '20px',
          padding: '60px', textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎟️</div>
          <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>No bookings yet!</h3>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Go to Home and book your first event!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {bookings.map((booking, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
                padding: '20px', border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{
                  width: '55px', height: '55px', borderRadius: '14px',
                  background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '24px', flexShrink: 0
                }}>🎟️</div>
                <div>
                  <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700' }}>{booking.event.title}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginTop: '3px' }}>
                    📍 {booking.event.venue} · 📅 {new Date(booking.event.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                <span style={{
                  padding: '4px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                  background: 'rgba(0,255,150,0.15)', color: '#00ff96',
                  border: '1px solid rgba(0,255,150,0.3)'
                }}>✅ Confirmed</span>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>
                  Booked on {new Date(booking.registeredAt).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MyBookings;