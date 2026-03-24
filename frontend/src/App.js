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
import Layout from './components/Layout';
import Vendors from './pages/Vendors';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<PrivateRoute><Layout /></PrivateRoute>}>
            <Route index element={<Dashboard />} />
            <Route path="events" element={<Events />} />
            <Route path="attendees" element={<Attendees />} />
            <Route path="budget" element={<Budget />} />
            <Route path="users" element={<Users />} />
            <Route path="vendors" element={<Vendors />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;