import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getUsers } from '../services/api';
import { MdPeople, MdAdminPanelSettings, MdPerson, MdSearch } from 'react-icons/md';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getUsers()
      .then(res => { setUsers(res.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const admins = users.filter(u => u.role === 'admin').length;
  const regular = users.filter(u => u.role === 'user').length;

  const gradients = [
    'linear-gradient(135deg, #b44fff, #ff6eb4)',
    'linear-gradient(135deg, #4facfe, #00f2fe)',
    'linear-gradient(135deg, #43e97b, #38f9d7)',
    'linear-gradient(135deg, #fa709a, #fee140)',
    'linear-gradient(135deg, #667eea, #764ba2)',
    'linear-gradient(135deg, #f093fb, #f5576c)',
  ];

  const cardStyle = {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px', padding: '20px',
    border: '1px solid rgba(255,255,255,0.08)',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

      {/* Header */}
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '800' }}>User Management</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
          Manage all registered users
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Users', value: users.length, icon: '👥', color: '#b44fff', bg: 'rgba(180,79,255,0.15)', border: 'rgba(180,79,255,0.3)' },
          { label: 'Admins', value: admins, icon: '👑', color: '#ffd700', bg: 'rgba(255,215,0,0.15)', border: 'rgba(255,215,0,0.3)' },
          { label: 'Regular Users', value: regular, icon: '👤', color: '#00d4ff', bg: 'rgba(0,212,255,0.15)', border: 'rgba(0,212,255,0.3)' },
        ].map((card, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: card.bg, borderRadius: '16px',
              padding: '20px', border: `1px solid ${card.border}`,
            }}>
            <div style={{ fontSize: '30px', marginBottom: '10px' }}>{card.icon}</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '4px' }}>{card.label}</div>
            <div style={{ color: card.color, fontSize: '30px', fontWeight: '800' }}>{card.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '20px' }}>
        <MdSearch size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }}/>
        <input
          placeholder="Search users by name or email..."
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

      {/* Users Grid */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: 'rgba(255,255,255,0.3)' }}>
          <div style={{ fontSize: '40px', marginBottom: '15px' }}>⏳</div>
          <div>Loading users...</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {filtered.map((user, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '16px', padding: '20px',
                border: '1px solid rgba(255,255,255,0.08)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                textAlign: 'center', gap: '12px'
              }}>

              {/* Avatar */}
              <div style={{
                width: '64px', height: '64px', borderRadius: '50%',
                background: gradients[i % gradients.length],
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '24px', fontWeight: '800',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)'
              }}>
                {user.name.charAt(0).toUpperCase()}
              </div>

              {/* Info */}
              <div>
                <h4 style={{ color: 'white', fontSize: '15px', fontWeight: '700', marginBottom: '4px' }}>{user.name}</h4>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>{user.email}</p>
              </div>

              {/* Role Badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '5px',
                padding: '5px 14px', borderRadius: '20px',
                background: user.role === 'admin' ? 'rgba(255,215,0,0.15)' : 'rgba(0,212,255,0.15)',
                border: `1px solid ${user.role === 'admin' ? 'rgba(255,215,0,0.3)' : 'rgba(0,212,255,0.3)'}`,
                color: user.role === 'admin' ? '#ffd700' : '#00d4ff',
                fontSize: '12px', fontWeight: '600'
              }}>
                {user.role === 'admin' ? <MdAdminPanelSettings size={14}/> : <MdPerson size={14}/>}
                {user.role}
              </div>

              {/* Joined date */}
              <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px' }}>
                Joined {new Date(user.created_at).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default Users;