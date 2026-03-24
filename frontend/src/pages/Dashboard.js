import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getEvents } from '../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { MdEvent, MdPeople, MdAttachMoney, MdTrendingUp, MdLocationOn, MdCalendarToday } from 'react-icons/md';

const Dashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents().then(res => setEvents(res.data));
  }, []);

  const upcoming = events.filter(e => e.status === 'upcoming').length;
  const ongoing = events.filter(e => e.status === 'ongoing').length;
  const completed = events.filter(e => e.status === 'completed').length;
  const totalCapacity = events.reduce((sum, e) => sum + e.capacity, 0);

  const statsCards = [
    { title: 'Total Events', value: events.length, icon: '🎯', color: '#b44fff', bg: 'linear-gradient(135deg, rgba(180,79,255,0.2), rgba(180,79,255,0.05))', border: 'rgba(180,79,255,0.3)' },
    { title: 'Upcoming Events', value: upcoming, icon: '🚀', color: '#00d4ff', bg: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))', border: 'rgba(0,212,255,0.3)' },
    { title: 'Total Capacity', value: totalCapacity, icon: '👥', color: '#ff6eb4', bg: 'linear-gradient(135deg, rgba(255,110,180,0.2), rgba(255,110,180,0.05))', border: 'rgba(255,110,180,0.3)' },
    { title: 'Completed', value: completed, icon: '✅', color: '#00ff96', bg: 'linear-gradient(135deg, rgba(0,255,150,0.2), rgba(0,255,150,0.05))', border: 'rgba(0,255,150,0.3)' },
  ];

  const barData = events.slice(0, 6).map(e => ({
    name: e.title.substring(0, 8) + '..',
    capacity: e.capacity
  }));

  const pieData = [
    { name: 'Upcoming', value: upcoming || 1 },
    { name: 'Ongoing', value: ongoing || 1 },
    { name: 'Completed', value: completed || 1 },
  ];

  const COLORS = ['#b44fff', '#ff6eb4', '#00d4ff'];

  const cardStyle = {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px',
    padding: '20px',
    border: '1px solid rgba(255,255,255,0.08)',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

      {/* Header */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '800' }}>Dashboard Overview</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
          Welcome to your event management hub
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {statsCards.map((card, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            style={{
              background: card.bg, borderRadius: '16px',
              padding: '20px', border: `1px solid ${card.border}`,
              cursor: 'pointer'
            }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{card.icon}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', fontWeight: '500', marginBottom: '4px' }}>{card.title}</div>
            <div style={{ color: card.color, fontSize: '32px', fontWeight: '800' }}>{card.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px', marginBottom: '24px' }}>

        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          style={cardStyle}>
          <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
            Event Capacity Overview
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)"/>
              <XAxis dataKey="name" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}/>
              <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 11 }}/>
              <Tooltip contentStyle={{ background: '#1a0533', border: '1px solid rgba(180,79,255,0.3)', borderRadius: '10px', color: 'white' }}/>
              <Bar dataKey="capacity" fill="url(#barGradient)" radius={[6,6,0,0]}/>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#b44fff"/>
                  <stop offset="100%" stopColor="#ff6eb4"/>
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={cardStyle}>
          <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
            Event Status
          </h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value">
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]}/>
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#1a0533', border: '1px solid rgba(180,79,255,0.3)', borderRadius: '10px', color: 'white' }}/>
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
            {pieData.map((entry, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: COLORS[i] }}></div>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>{entry.name}</span>
                </div>
                <span style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>{entry.value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Events */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={cardStyle}>
        <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
          Recent Events
        </h3>
        {events.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)' }}>
            No events yet. Create your first event!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {events.slice(0, 5).map((event, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.03)',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
                    background: `linear-gradient(135deg, ${COLORS[i % 3]}, ${COLORS[(i+1) % 3]})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px'
                  }}>🎯</div>
                  <div>
                    <div style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>{event.title}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '3px' }}>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                        📍 {event.venue}
                      </span>
                      <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                        📅 {new Date(event.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                    👥 {event.capacity}
                  </span>
                  <span style={{
                    padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
                    background: event.status === 'upcoming' ? 'rgba(0,212,255,0.15)' : event.status === 'ongoing' ? 'rgba(0,255,150,0.15)' : 'rgba(255,255,255,0.1)',
                    color: event.status === 'upcoming' ? '#00d4ff' : event.status === 'ongoing' ? '#00ff96' : 'rgba(255,255,255,0.5)',
                    border: `1px solid ${event.status === 'upcoming' ? 'rgba(0,212,255,0.3)' : event.status === 'ongoing' ? 'rgba(0,255,150,0.3)' : 'rgba(255,255,255,0.1)'}`
                  }}>{event.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;