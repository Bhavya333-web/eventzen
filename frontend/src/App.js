import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Events from './pages/Events';
import Attendees from './pages/Attendees';
import Budget from './pages/Budget';
import Users from './pages/Users';
import Vendors from './pages/Vendors';
import Layout from './components/Layout';
import UserLayout from './components/UserLayout';
import UserHome from './pages/user/UserHome';
import MyBookings from './pages/user/MyBookings';
import UserProfile from './pages/user/UserProfile';

const AdminRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!token) return <Navigate to="/login" />;
  if (user.role !== 'admin') return <Navigate to="/user" />;
  return children;
};

const UserRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!token) return <Navigate to="/login" />;
  if (user.role === 'admin') return <Navigate to="/" />;
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Admin Routes */}
    
          <Route path="/" element={<AdminRoute><Layout /></AdminRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="events" element={<Events />} />
            <Route path="attendees" element={<Attendees />} />
            <Route path="budget" element={<Budget />} />
            <Route path="vendors" element={<Vendors />} />
            <Route path="users" element={<Users />} />
          </Route>

          {/* User Routes */}
          
          <Route path="/user" element={<UserRoute><UserLayout /></UserRoute>}>
            <Route index element={<UserHome />} />
            <Route path="bookings" element={<MyBookings />} />
            <Route path="profile" element={<UserProfile />} />
          </Route>
          <Route path="*" element={<Navigate to="/login" />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;