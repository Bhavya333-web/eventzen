import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div style={{ marginBottom: '25px' }}>
        <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '800' }}>My Profile 👤</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
          Your account information
        </p>
      </div>

      <div style={{ maxWidth: '600px' }}>
        {/* Avatar Card */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(180,79,255,0.2), rgba(255,110,180,0.1))',
          borderRadius: '20px', padding: '35px',
          border: '1px solid rgba(180,79,255,0.2)',
          marginBottom: '20px', textAlign: 'center'
        }}>
          <div style={{
            width: '90px', height: '90px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontSize: '36px', fontWeight: '800',
            margin: '0 auto 20px', boxShadow: '0 10px 30px rgba(180,79,255,0.4)'
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <h3 style={{ color: 'white', fontSize: '22px', fontWeight: '800', marginBottom: '5px' }}>{user?.name}</h3>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '15px' }}>{user?.email}</p>
          <span style={{
            padding: '6px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: '600',
            background: 'rgba(0,212,255,0.15)', color: '#00d4ff',
            border: '1px solid rgba(0,212,255,0.3)'
          }}>👤 {user?.role}</span>
        </div>

        {/* Info Card */}
        <div style={{
          background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
          padding: '25px', border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <h4 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
            Account Details
          </h4>
          {[
            { label: 'Full Name', value: user?.name, icon: '👤' },
            { label: 'Email Address', value: user?.email, icon: '📧' },
            { label: 'Account Type', value: user?.role, icon: '🎭' },
            { label: 'User ID', value: `#${user?.id}`, icon: '🔑' },
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '14px 0',
              borderBottom: i < 3 ? '1px solid rgba(255,255,255,0.06)' : 'none'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>{item.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>{item.label}</span>
              </div>
              <span style={{ color: 'white', fontSize: '14px', fontWeight: '600' }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default UserProfile;