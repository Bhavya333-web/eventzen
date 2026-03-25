import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { MdHome, MdEvent, MdBookmarks, MdPerson, MdLogout, MdMenu } from 'react-icons/md';

const UserLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/user', icon: <MdHome size={22}/>, label: 'Home' },
    { path: '/user/bookings', icon: <MdBookmarks size={22}/>, label: 'My Bookings' },
    { path: '/user/profile', icon: <MdPerson size={22}/>, label: 'Profile' },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a' }}>
      {/* Top Navbar */}
      <nav style={{
        background: 'linear-gradient(135deg, #1a0533, #2d1b69)',
        padding: '0 30px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: '65px',
        borderBottom: '1px solid rgba(180,79,255,0.2)',
        position: 'sticky', top: 0, zIndex: 100
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '35px', height: '35px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '16px'
          }}>⚡</div>
          <span style={{ color: 'white', fontSize: '18px', fontWeight: '800' }}>EventZen</span>
        </div>

        {/* Nav Links */}
        <div style={{ display: 'flex', gap: '5px' }}>
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} end={item.path === '/user'}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '8px 16px', borderRadius: '10px',
                color: isActive ? 'white' : 'rgba(255,255,255,0.6)',
                background: isActive ? 'rgba(180,79,255,0.3)' : 'transparent',
                textDecoration: 'none', fontSize: '14px', fontWeight: '500',
                border: isActive ? '1px solid rgba(180,79,255,0.4)' : '1px solid transparent'
              })}>
              {item.icon} {item.label}
            </NavLink>
          ))}
        </div>

        {/* User Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '35px', height: '35px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: '700', fontSize: '14px'
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{user?.name}</span>
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            color: 'rgba(255,100,100,0.8)', background: 'rgba(255,100,100,0.1)',
            padding: '8px 14px', borderRadius: '10px', fontSize: '13px',
            border: '1px solid rgba(255,100,100,0.2)'
          }}>
            <MdLogout size={16}/> Logout
          </button>
        </div>
      </nav>

      {/* Page Content */}
      <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;