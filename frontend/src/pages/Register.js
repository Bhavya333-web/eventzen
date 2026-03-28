import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../services/api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user', adminCode: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Password validation
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters!');
      setLoading(false);
      return;
    }
    if (!/\d/.test(form.password)) {
      setError('Password must contain at least 1 number!');
      setLoading(false);
      return;
    }


    setLoading(true);
    try {
      await registerUser(form);
      setSuccess('Account created! Redirecting...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed!');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#0f0f1a' }}>
      {/* Left Side */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1a0533 100%)',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: '60px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(180,79,255,0.15)', top: '-100px', right: '-100px' }} />
        <div style={{ position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,110,180,0.1)', bottom: '-50px', left: '-50px' }} />

        <div style={{ zIndex: 1, width: '100%', maxWidth: '400px' }}>
          <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '800', marginBottom: '10px', lineHeight: 1.3 }}>
            Start Managing<br />
            <span style={{ background: 'linear-gradient(135deg, #b44fff, #ff6eb4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Your Events Today
            </span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '40px', fontSize: '15px' }}>
            Join thousands of event managers using EventZen
          </p>

          {[
            { icon: '🎯', title: 'Smart Event Scheduling', desc: 'Manage venues and dates effortlessly' },
            { icon: '👥', title: 'Attendee Management', desc: 'Track registrations and guest lists' },
            { icon: '💰', title: 'Budget Tracking', desc: 'Monitor expenses and financial reports' },
            { icon: '🏪', title: 'Vendor Management', desc: 'Coordinate with all your vendors' },
          ].map((feature, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: '15px',
              marginBottom: '16px', padding: '14px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div style={{
                width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
                background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px'
              }}>{feature.icon}</div>
              <div>
                <div style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>{feature.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginTop: '2px' }}>{feature.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side */}
      <div style={{
        width: '480px', background: '#0f0f1a',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', padding: '60px 50px',
      }}>
        <div style={{ marginBottom: '35px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
            padding: '8px 16px', borderRadius: '30px', marginBottom: '25px'
          }}>
            <span style={{ fontSize: '18px' }}>⚡</span>
            <span style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>EventZen</span>
          </div>
          <h2 style={{ color: 'white', fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
            Create Account 🚀
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px' }}>
            Fill in your details to get started
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255,80,80,0.15)', border: '1px solid rgba(255,80,80,0.3)',
            color: '#ff6b6b', padding: '12px 16px', borderRadius: '10px',
            marginBottom: '15px', fontSize: '14px'
          }}>{error}</div>
        )}

        {success && (
          <div style={{
            background: 'rgba(0,255,150,0.15)', border: '1px solid rgba(0,255,150,0.3)',
            color: '#00ff96', padding: '12px 16px', borderRadius: '10px',
            marginBottom: '15px', fontSize: '14px'
          }}>{success}</div>
        )}

        <form onSubmit={handleSubmit}>
          {[
            { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Enter your full name' },
            { label: 'Email Address', key: 'email', type: 'email', placeholder: 'Enter your email' },
            { label: 'Password', key: 'password', type: 'password', placeholder: 'Create a password' },
          ].map((field) => (
            <div key={field.key} style={{ marginBottom: '16px' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '7px' }}>
                {field.label}
              </label>
              <input
                type={field.type} required
                value={form[field.key]}
                onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                placeholder={field.placeholder}
                style={{
                  width: '100%', padding: '13px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px', color: 'white', fontSize: '14px',
                }}
              />

              {field.key === 'password' && (
                <p style={{
                  color: 'rgba(255,255,255,0.3)',
                  fontSize: '11px',
                  marginTop: '5px'
                }}>
                  Min 6 characters with at least 1 number
                </p>
              )}
            </div>
          ))}

          {/* Account Type */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '7px' }}>
              Account Type
            </label>
            <select value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value, adminCode: '' })}
              style={{
                width: '100%', padding: '13px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', color: 'white', fontSize: '14px',
              }}>
              <option value="user">👤 Regular User</option>
              <option value="admin">👑 Admin</option>
            </select>
          </div>

          {/* Admin Code - only shows when admin selected */}
          {form.role === 'admin' && (
            <div style={{ marginBottom: '16px' }}>
              <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '7px' }}>
                🔐 Admin Secret Code
              </label>
              <input
                type="text"
                required
                value={form.adminCode}
                onChange={(e) => setForm({ ...form, adminCode: e.target.value })}
                placeholder="Enter admin secret code"
                style={{
                  width: '100%', padding: '13px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(180,79,255,0.3)',
                  borderRadius: '12px', color: 'white', fontSize: '14px',
                }}
              />
              <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px', marginTop: '5px' }}>
                Contact your system administrator for the admin code
              </p>
            </div>
          )}

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px', marginTop: '8px',
            background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
            color: 'white', borderRadius: '12px',
            fontSize: '15px', fontWeight: '700',
            boxShadow: '0 8px 25px rgba(180,79,255,0.4)',
          }}>
            {loading ? 'Creating Account...' : 'Create Account →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#b44fff', fontWeight: '600', textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;