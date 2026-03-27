import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  
  if (form.password.length < 6) {
    setError('Password must be at least 6 characters!');
    return;
  }

  setLoading(true);
  try {
    const res = await loginUser(form);
    login(res.data.user, res.data.token);
    if (res.data.user.role === 'admin') {
      navigate('/');
    } else {
      navigate('/user');
    }
  } catch (err) {
    setError('Invalid email or password!');
  }
  setLoading(false);
};

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      background: '#0f0f1a',
    }}>
      {/* Left Side - Image & Branding */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(135deg, #1a0533 0%, #2d1b69 50%, #1a0533 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '60px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background circles */}
        <div style={{
          position: 'absolute', width: '400px', height: '400px',
          borderRadius: '50%', background: 'rgba(180,79,255,0.15)',
          top: '-100px', left: '-100px'
        }}/>
        <div style={{
          position: 'absolute', width: '300px', height: '300px',
          borderRadius: '50%', background: 'rgba(255,110,180,0.1)',
          bottom: '-50px', right: '-50px'
        }}/>
        <div style={{
          position: 'absolute', width: '200px', height: '200px',
          borderRadius: '50%', background: 'rgba(180,79,255,0.1)',
          bottom: '100px', left: '50px'
        }}/>

        {/* Event images grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '40px', zIndex: 1 }}>
          {[
            { bg: 'linear-gradient(135deg, #667eea, #764ba2)', label: '🎵 Music Events' },
            { bg: 'linear-gradient(135deg, #f093fb, #f5576c)', label: '🎉 Celebrations' },
            { bg: 'linear-gradient(135deg, #4facfe, #00f2fe)', label: '💼 Conferences' },
            { bg: 'linear-gradient(135deg, #43e97b, #38f9d7)', label: '🎊 Parties' },
          ].map((item, i) => (
            <div key={i} style={{
              width: '140px', height: '100px',
              background: item.bg,
              borderRadius: '15px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '14px', fontWeight: '600',
              boxShadow: '0 8px 25px rgba(0,0,0,0.3)',
              transform: i % 2 === 0 ? 'rotate(-2deg)' : 'rotate(2deg)'
            }}>
              {item.label}
            </div>
          ))}
        </div>

        <h1 style={{
          color: 'white', fontSize: '36px', fontWeight: '800',
          textAlign: 'center', zIndex: 1, lineHeight: 1.3
        }}>
          Manage Events<br/>
          <span style={{ background: 'linear-gradient(135deg, #b44fff, #ff6eb4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Like a Pro
          </span>
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', textAlign: 'center', marginTop: '15px', zIndex: 1, fontSize: '15px' }}>
          Plan, manage and track all your events in one beautiful platform
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '30px', marginTop: '40px', zIndex: 1 }}>
         {[
            { value: 'Seamless', label: 'Planning' },
            { value: 'Powerful', label: 'Tracking' },
            { value: 'Effortless', label: 'Management' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ color: '#b44fff', fontSize: '18px', fontWeight: '800' }}>{stat.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div style={{
        width: '480px',
        background: '#0f0f1a',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '60px 50px',
      }}>
        {/* Logo */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
            padding: '8px 16px', borderRadius: '30px', marginBottom: '30px'
          }}>
            <span style={{ fontSize: '18px' }}>⚡</span>
            <span style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>EventZen</span>
          </div>
          <h2 style={{ color: 'white', fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>
            Welcome back! 👋
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '15px' }}>
            Sign in to your account to continue
          </p>
        </div>

        {error && (
          <div style={{
            background: 'rgba(255,80,80,0.15)', border: '1px solid rgba(255,80,80,0.3)',
            color: '#ff6b6b', padding: '12px 16px', borderRadius: '10px',
            marginBottom: '20px', fontSize: '14px'
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
              Email Address
            </label>
            <input
              type="email" required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              style={{
                width: '100%', padding: '14px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', color: 'white', fontSize: '14px',
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>
              Password
            </label>
            <input
              type="password" required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              style={{
                width: '100%', padding: '14px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px', color: 'white', fontSize: '14px',
              }}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px',
            background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
            color: 'white', borderRadius: '12px',
            fontSize: '16px', fontWeight: '700',
            boxShadow: '0 8px 25px rgba(180,79,255,0.4)',
            transition: 'transform 0.2s',
          }}>
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '25px', fontSize: '14px', color: 'rgba(255,255,255,0.4)' }}>
          Don't have an account?{' '}
          <Link to="/register" style={{ color: '#b44fff', fontWeight: '600', textDecoration: 'none' }}>
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;