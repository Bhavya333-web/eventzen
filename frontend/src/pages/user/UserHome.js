
import { getEvents, getAttendeesByEvent, registerAttendee } from '../../services/api';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { MdLocationOn, MdCalendarToday, MdPeople, MdSearch } from 'react-icons/md';

const eventImages = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
];

const eventEmojis = ['🎵', '🎉', '💼', '🎊', '🎭', '🏆'];

const UserHome = () => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [bookingSuccess, setBookingSuccess] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    getEvents().then(res => setEvents(res.data));
  }, []);

 const handleBook = async (event) => {
  try {
    const attendeesRes = await getAttendeesByEvent(event._id);
    const alreadyRegistered = attendeesRes.data.find(a => a.email === user.email);
    if (alreadyRegistered) {
      alert('You are already registered for this event!');
      return;
    }
    await registerAttendee({
      name: user.name,
      email: user.email,
      eventId: event._id,
      status: 'registered'
    });
    setBookingSuccess(`Successfully booked for ${event.title}!`);
    setTimeout(() => setBookingSuccess(''), 3000);
  } catch (err) {
    alert('Booking failed! Please try again.');
  }
};

  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || e.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(180,79,255,0.2), rgba(255,110,180,0.1))',
        borderRadius: '20px', padding: '40px',
        border: '1px solid rgba(180,79,255,0.2)',
        marginBottom: '30px', textAlign: 'center'
      }}>
        <h1 style={{ color: 'white', fontSize: '32px', fontWeight: '800', marginBottom: '10px' }}>
          Welcome back, {user?.name}! 👋
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', marginBottom: '25px' }}>
          Discover and book amazing events happening around you
        </p>

        {/* Search */}
        <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
          <MdSearch size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }}/>
          <input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '14px 16px 14px 46px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px', color: 'white', fontSize: '15px',
            }}
          />
        </div>
      </div>

      {/* Success Message */}
      {bookingSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: 'rgba(0,255,150,0.15)', border: '1px solid rgba(0,255,150,0.3)',
            color: '#00ff96', padding: '14px 20px', borderRadius: '12px',
            marginBottom: '20px', textAlign: 'center', fontWeight: '600'
          }}>
          ✅ {bookingSuccess}
        </motion.div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '25px' }}>
        {['all', 'upcoming', 'ongoing'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '10px 20px', borderRadius: '10px', fontSize: '13px', fontWeight: '600',
            background: filter === f ? 'linear-gradient(135deg, #b44fff, #ff6eb4)' : 'rgba(255,255,255,0.05)',
            color: filter === f ? 'white' : 'rgba(255,255,255,0.5)',
            border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.1)',
            textTransform: 'capitalize'
          }}>{f === 'all' ? '🎯 All Events' : f === 'upcoming' ? '🚀 Upcoming' : '🔥 Ongoing'}</button>
        ))}
        <div style={{ marginLeft: 'auto', color: 'rgba(255,255,255,0.4)', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
          {filtered.length} events found
        </div>
      </div>

      {/* Events Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {filtered.map((event, i) => (
          <motion.div key={event._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -5 }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '20px', overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
            {/* Banner */}
            <div style={{
              height: '150px',
              background: eventImages[i % eventImages.length],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '52px', position: 'relative'
            }}>
              {eventEmojis[i % eventEmojis.length]}
              <div style={{
                position: 'absolute', top: '12px', right: '12px',
                padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700',
                background: event.status === 'upcoming' ? 'rgba(0,212,255,0.9)' : event.status === 'ongoing' ? 'rgba(0,255,150,0.9)' : 'rgba(255,255,255,0.3)',
                color: '#0f0f1a'
              }}>{event.status}</div>
            </div>

            {/* Content */}
            <div style={{ padding: '18px' }}>
              <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{event.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '12px', lineHeight: 1.5 }}>{event.description}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  <MdLocationOn size={14} color="#b44fff"/> {event.venue}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  <MdCalendarToday size={14} color="#ff6eb4"/> {new Date(event.date).toLocaleDateString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  <MdPeople size={14} color="#00d4ff"/> {event.capacity} seats available
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => handleBook(event)}
                disabled={event.status === 'completed'}
                style={{
                  width: '100%', padding: '11px',
                  background: event.status === 'completed' ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #b44fff, #ff6eb4)',
                  color: event.status === 'completed' ? 'rgba(255,255,255,0.3)' : 'white',
                  borderRadius: '10px', fontSize: '14px', fontWeight: '700',
                  boxShadow: event.status === 'completed' ? 'none' : '0 5px 15px rgba(180,79,255,0.3)',
                  border: 'none'
                }}>
                {event.status === 'completed' ? '❌ Event Ended' : '🎟️ Book Now'}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default UserHome;