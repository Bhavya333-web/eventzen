import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/api';
import { MdAdd, MdEdit, MdDelete, MdClose, MdSearch, MdLocationOn, MdPeople, MdCalendarToday } from 'react-icons/md';

const eventImages = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
];

const eventEmojis = ['🎵', '🎉', '💼', '🎊', '🎭', '🏆', '🎪', '🎨'];

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', date: '', venue: '', capacity: '', status: 'upcoming' });
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => { fetchEvents(); }, []);

  const fetchEvents = async () => {
    const res = await getEvents();
    setEvents(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingEvent) {
        await updateEvent(editingEvent._id, form);
      } else {
        await createEvent(form);
      }
      fetchEvents();
      closeModal();
    } catch (err) {
      alert('Error saving event!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this event?')) {
      await deleteEvent(id);
      fetchEvents();
    }
  };

  const openEdit = (event) => {
    setEditingEvent(event);
    setForm({ ...event, date: event.date.substring(0, 10) });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingEvent(null);
    setForm({ title: '', description: '', date: '', venue: '', capacity: '', status: 'upcoming' });
  };

  const filtered = events.filter(e => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.venue.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || e.status === filter;
    return matchSearch && matchFilter;
  });

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: 'white', fontSize: '14px',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '800' }}>Event Management</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
            {events.length} total events
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
            color: 'white', padding: '12px 22px', borderRadius: '12px',
            fontSize: '14px', fontWeight: '700',
            boxShadow: '0 8px 25px rgba(180,79,255,0.4)',
          }}>
          <MdAdd size={20}/> Create Event
        </motion.button>
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <MdSearch size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }}/>
          <input
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '12px 16px 12px 42px',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px', color: 'white', fontSize: '14px',
            }}
          />
        </div>
        {['all', 'upcoming', 'ongoing', 'completed'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '12px 18px', borderRadius: '12px', fontSize: '13px', fontWeight: '600',
            background: filter === f ? 'linear-gradient(135deg, #b44fff, #ff6eb4)' : 'rgba(255,255,255,0.05)',
            color: filter === f ? 'white' : 'rgba(255,255,255,0.5)',
            border: filter === f ? 'none' : '1px solid rgba(255,255,255,0.1)',
            textTransform: 'capitalize'
          }}>{f}</button>
        ))}
      </div>

      {/* Events Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {filtered.map((event, i) => (
          <motion.div key={event._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            style={{
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '20px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
            {/* Event Banner */}
            <div style={{
              height: '140px',
              background: eventImages[i % eventImages.length],
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '48px', position: 'relative'
            }}>
              {eventEmojis[i % eventEmojis.length]}
              <div style={{
                position: 'absolute', top: '12px', right: '12px',
                padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
                background: event.status === 'upcoming' ? 'rgba(0,212,255,0.9)' : event.status === 'ongoing' ? 'rgba(0,255,150,0.9)' : 'rgba(255,255,255,0.3)',
                color: event.status === 'upcoming' ? '#0f0f1a' : event.status === 'ongoing' ? '#0f0f1a' : 'white',
              }}>{event.status}</div>
            </div>

            {/* Event Content */}
            <div style={{ padding: '18px' }}>
              <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '10px' }}>{event.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px', marginBottom: '14px', lineHeight: 1.5 }}>{event.description}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '7px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  <MdLocationOn size={15} color="#b44fff"/> {event.venue}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  <MdCalendarToday size={15} color="#ff6eb4"/> {new Date(event.date).toLocaleDateString()}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                  <MdPeople size={15} color="#00d4ff"/> {event.capacity} attendees
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => openEdit(event)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    background: 'rgba(180,79,255,0.15)', color: '#b44fff',
                    padding: '9px', borderRadius: '10px', fontSize: '13px', fontWeight: '600',
                    border: '1px solid rgba(180,79,255,0.2)'
                  }}>
                  <MdEdit size={15}/> Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(event._id)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                    background: 'rgba(255,100,100,0.1)', color: '#ff6b6b',
                    padding: '9px', borderRadius: '10px', fontSize: '13px', fontWeight: '600',
                    border: '1px solid rgba(255,100,100,0.2)'
                  }}>
                  <MdDelete size={15}/> Delete
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: '#1a0533', borderRadius: '20px',
              padding: '30px', width: '500px',
              border: '1px solid rgba(180,79,255,0.3)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>
                {editingEvent ? '✏️ Edit Event' : '✨ Create New Event'}
              </h3>
              <MdClose size={24} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }} onClick={closeModal}/>
            </div>
            <form onSubmit={handleSubmit}>
              {[
                { label: 'Event Title', key: 'title', type: 'text', placeholder: 'Enter event title' },
                { label: 'Description', key: 'description', type: 'text', placeholder: 'Describe the event' },
                { label: 'Date', key: 'date', type: 'date' },
                { label: 'Venue', key: 'venue', type: 'text', placeholder: 'Enter venue location' },
                { label: 'Capacity', key: 'capacity', type: 'number', placeholder: 'Max attendees' },
              ].map(field => (
                <div key={field.key} style={{ marginBottom: '15px' }}>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type} required
                    value={form[field.key]}
                    placeholder={field.placeholder}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    style={inputStyle}
                  />
                </div>
              ))}
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '6px' }}>Status</label>
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={inputStyle}>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit" style={{
                  width: '100%', padding: '13px',
                  background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
                  color: 'white', borderRadius: '12px', fontSize: '15px', fontWeight: '700',
                  boxShadow: '0 8px 25px rgba(180,79,255,0.4)'
                }}>
                {editingEvent ? 'Update Event ✓' : 'Create Event ✨'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Events;