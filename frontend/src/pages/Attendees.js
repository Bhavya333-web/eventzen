import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getEvents, getAttendeesByEvent, registerAttendee, deleteAttendee } from '../services/api';
import { MdAdd, MdDelete, MdPeople, MdEmail, MdEvent, MdClose } from 'react-icons/md';

const Attendees = () => {
  const [events, setEvents] = useState([]);
  const [attendees, setAttendees] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', email: '' });
  const [search, setSearch] = useState('');

  useEffect(() => {
    getEvents().then(res => setEvents(res.data));
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      getAttendeesByEvent(selectedEvent).then(res => setAttendees(res.data));
    }
  }, [selectedEvent]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerAttendee({ ...form, eventId: selectedEvent });
      getAttendeesByEvent(selectedEvent).then(res => setAttendees(res.data));
      setShowForm(false);
      setForm({ name: '', email: '' });
    } catch (err) {
      alert('Error registering attendee!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Remove this attendee?')) {
      await deleteAttendee(id);
      getAttendeesByEvent(selectedEvent).then(res => setAttendees(res.data));
    }
  };

  const filtered = attendees.filter(a =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: 'white', fontSize: '14px',
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px', padding: '20px',
    border: '1px solid rgba(255,255,255,0.08)',
  };

  const selectedEventData = events.find(e => e._id === selectedEvent);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '800' }}>Attendee Management</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
            Track and manage event attendees
          </p>
        </div>
        {selectedEvent && (
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
              color: 'white', padding: '12px 22px', borderRadius: '12px',
              fontSize: '14px', fontWeight: '700',
              boxShadow: '0 8px 25px rgba(180,79,255,0.4)',
            }}>
            <MdAdd size={20}/> Register Attendee
          </motion.button>
        )}
      </div>

      {/* Select Event */}
      <div style={{ ...cardStyle, marginBottom: '20px' }}>
        <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '10px' }}>
          🎯 Select Event to Manage Attendees
        </label>
        <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} style={inputStyle}>
          <option value="">-- Choose an Event --</option>
          {events.map(e => (
            <option key={e._id} value={e._id}>{e.title}</option>
          ))}
        </select>
      </div>

      {/* Selected Event Info */}
      {selectedEventData && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            marginBottom: '20px', padding: '16px 20px',
            background: 'linear-gradient(135deg, rgba(180,79,255,0.15), rgba(255,110,180,0.1))',
            borderRadius: '14px', border: '1px solid rgba(180,79,255,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between'
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>🎪</span>
            <div>
              <div style={{ color: 'white', fontWeight: '700', fontSize: '15px' }}>{selectedEventData.title}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>📍 {selectedEventData.venue} · 📅 {new Date(selectedEventData.date).toLocaleDateString()}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '15px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#b44fff', fontSize: '22px', fontWeight: '800' }}>{attendees.length}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Registered</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#00d4ff', fontSize: '22px', fontWeight: '800' }}>{selectedEventData.capacity}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Capacity</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ color: '#00ff96', fontSize: '22px', fontWeight: '800' }}>
                {Math.round((attendees.length / selectedEventData.capacity) * 100)}%
              </div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>Filled</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Search */}
      {selectedEvent && (
        <div style={{ position: 'relative', marginBottom: '20px' }}>
          <input
            placeholder="Search attendees by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '42px' }}
          />
          <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }}>🔍</span>
        </div>
      )}

      {/* Attendees Grid */}
      {selectedEvent && (
        <div style={cardStyle}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <MdPeople size={22} color="#b44fff"/>
            <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700' }}>
              Attendees ({filtered.length})
            </h3>
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '50px', color: 'rgba(255,255,255,0.3)' }}>
              <div style={{ fontSize: '48px', marginBottom: '15px' }}>👥</div>
              <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>No attendees yet!</div>
              <div style={{ fontSize: '13px' }}>Click "Register Attendee" to add someone</div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {filtered.map((a, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ y: -3 }}
                  style={{
                    padding: '16px',
                    background: 'rgba(255,255,255,0.03)',
                    borderRadius: '14px',
                    border: '1px solid rgba(255,255,255,0.08)',
                    display: 'flex', flexDirection: 'column', gap: '10px'
                  }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '42px', height: '42px', borderRadius: '50%', flexShrink: 0,
                      background: `linear-gradient(135deg, #b44fff, #ff6eb4)`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: '700', fontSize: '16px'
                    }}>
                      {a.name.charAt(0).toUpperCase()}
                    </div>
                    <div style={{ flex: 1, overflow: 'hidden' }}>
                      <div style={{ color: 'white', fontWeight: '600', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.name}</div>
                      <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{a.email}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
                      background: 'rgba(0,255,150,0.15)', color: '#00ff96',
                      border: '1px solid rgba(0,255,150,0.3)'
                    }}>{a.status}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                      onClick={() => handleDelete(a.id)}
                      style={{
                        background: 'rgba(255,100,100,0.1)', color: '#ff6b6b',
                        padding: '5px 10px', borderRadius: '8px', fontSize: '12px',
                        border: '1px solid rgba(255,100,100,0.2)',
                        display: 'flex', alignItems: 'center', gap: '4px'
                      }}>
                      <MdDelete size={13}/> Remove
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Register Modal */}
      {showForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: '#1a0533', borderRadius: '20px', padding: '30px', width: '440px',
              border: '1px solid rgba(180,79,255,0.3)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>👤 Register Attendee</h3>
              <MdClose size={24} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }} onClick={() => setShowForm(false)}/>
            </div>
            <form onSubmit={handleRegister}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Full Name</label>
                <input required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Enter attendee name"
                  style={inputStyle}/>
              </div>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Email Address</label>
                <input required type="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Enter email address"
                  style={inputStyle}/>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit" style={{
                  width: '100%', padding: '13px',
                  background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
                  color: 'white', borderRadius: '12px', fontSize: '15px', fontWeight: '700',
                  boxShadow: '0 8px 25px rgba(180,79,255,0.4)'
                }}>
                Register Attendee ✓
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Attendees;