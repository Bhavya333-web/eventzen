import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  MdDashboard, MdEvent, MdPeople,
  MdAttachMoney, MdManageAccounts, MdLogout, MdMenu, MdStore
} from 'react-icons/md';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { path: '/', icon: <MdDashboard size={22}/>, label: 'Dashboard' },
    { path: '/events', icon: <MdEvent size={22}/>, label: 'Events' },
    { path: '/attendees', icon: <MdPeople size={22}/>, label: 'Attendees' },
    { path: '/budget', icon: <MdAttachMoney size={22}/>, label: 'Budget' },
    { path: '/vendors', icon: <MdStore size={22}/>, label: 'Vendors' },
    { path: '/users', icon: <MdManageAccounts size={22}/>, label: 'Users' },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f1a' }}>
      {/* Sidebar */}
      <div style={{
        width: collapsed ? '75px' : '250px',
        background: 'linear-gradient(180deg, #1a0533 0%, #0f0f1a 100%)',
        borderRight: '1px solid rgba(180,79,255,0.15)',
        transition: 'width 0.3s',
        display: 'flex',
        flexDirection: 'column',
        padding: '25px 0',
        position: 'fixed',
        height: '100vh',
        zIndex: 100,
        overflow: 'hidden'
      }}>
        {/* Logo */}
        <div style={{
          padding: '0 20px 30px',
          display: 'flex', alignItems: 'center', gap: '12px',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          marginBottom: '10px'
        }}>
          <div style={{
            width: '38px', height: '38px', borderRadius: '10px', flexShrink: 0,
            background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px'
          }}>⚡</div>
          {!collapsed && (
            <span style={{ color: 'white', fontSize: '20px', fontWeight: '800', whiteSpace: 'nowrap' }}>
              EventZen
            </span>
          )}
        </div>

        {/* Nav Items */}
        <nav style={{ flex: 1, padding: '0 12px' }}>
          {!collapsed && (
            <div style={{ color: 'rgba(255,255,255,0.25)', fontSize: '11px', fontWeight: '600', padding: '0 10px', marginBottom: '8px', letterSpacing: '1px' }}>
              MAIN MENU
            </div>
          )}
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '11px 12px',
                marginBottom: '4px',
                color: isActive ? 'white' : 'rgba(255,255,255,0.5)',
                background: isActive ? 'linear-gradient(135deg, rgba(180,79,255,0.3), rgba(255,110,180,0.2))' : 'transparent',
                textDecoration: 'none',
                borderRadius: '12px',
                border: isActive ? '1px solid rgba(180,79,255,0.3)' : '1px solid transparent',
                transition: 'all 0.2s',
                fontSize: '14px',
                fontWeight: isActive ? '600' : '400',
                whiteSpace: 'nowrap',
                overflow: 'hidden'
              })}
            >
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              {!collapsed && item.label}
            </NavLink>
          ))}
        </nav>

        {/* User & Logout */}
        <div style={{ padding: '15px 12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {!collapsed && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 12px', marginBottom: '8px',
              background: 'rgba(255,255,255,0.05)', borderRadius: '12px'
            }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: '700', fontSize: '14px'
              }}>
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <div style={{ overflow: 'hidden' }}>
                <div style={{ color: 'white', fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '11px' }}>{user?.role}</div>
              </div>
            </div>
          )}
          <button onClick={handleLogout} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: 'rgba(255,100,100,0.8)', background: 'rgba(255,100,100,0.1)',
            padding: '10px 12px', borderRadius: '12px', width: '100%',
            fontSize: '14px', fontWeight: '500',
            border: '1px solid rgba(255,100,100,0.15)',
            whiteSpace: 'nowrap', overflow: 'hidden'
          }}>
            <MdLogout size={18} style={{ flexShrink: 0 }}/> {!collapsed && 'Logout'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        marginLeft: collapsed ? '75px' : '250px',
        flex: 1,
        transition: 'margin-left 0.3s',
        minHeight: '100vh'
      }}>
        {/* Top Bar */}
        <div style={{
          background: 'rgba(15,15,26,0.95)',
          backdropFilter: 'blur(10px)',
          padding: '15px 25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          position: 'sticky', top: 0, zIndex: 99
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <MdMenu size={24} style={{ cursor: 'pointer', color: '#b44fff' }}
              onClick={() => setCollapsed(!collapsed)}/>
            <div>
              <h2 style={{ color: 'white', fontSize: '16px', fontWeight: '700' }}>
                Welcome back, {user?.name}! 👋
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
          </div>

          {/* Top right badges */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              padding: '6px 14px', borderRadius: '20px',
              background: 'linear-gradient(135deg, rgba(180,79,255,0.2), rgba(255,110,180,0.2))',
              border: '1px solid rgba(180,79,255,0.3)',
              color: '#b44fff', fontSize: '12px', fontWeight: '600'
            }}>
              ⚡ EventZen Pro
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div style={{ padding: '25px', background: '#0f0f1a', minHeight: 'calc(100vh - 65px)' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;