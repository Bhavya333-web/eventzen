import axios from 'axios';

const AUTH_URL = 'http://localhost:5001/api';
const EVENT_URL = 'http://localhost:5002/api';
const ATTENDEE_URL = 'http://localhost:5172/api';
const BUDGET_URL = 'http://localhost:5003/api';

const getToken = () => localStorage.getItem('token');

const authHeaders = () => ({
  headers: { Authorization: `Bearer ${getToken()}` }
});

// Auth APIs
export const registerUser = (data) => axios.post(`${AUTH_URL}/auth/register`, data);
export const loginUser = (data) => axios.post(`${AUTH_URL}/auth/login`, data);
export const getUsers = () => axios.get(`${AUTH_URL}/auth/users`, authHeaders());
// Event APIs
export const getEvents = () => axios.get(`${EVENT_URL}/events`);
export const createEvent = (data) => axios.post(`${EVENT_URL}/events`, data, authHeaders());
export const updateEvent = (id, data) => axios.put(`${EVENT_URL}/events/${id}`, data, authHeaders());
export const deleteEvent = (id) => axios.delete(`${EVENT_URL}/events/${id}`, authHeaders());

// Vendor APIs
export const getVendors = () => axios.get(`${EVENT_URL}/vendors`);
export const createVendor = (data) => axios.post(`${EVENT_URL}/vendors`, data, authHeaders());
export const updateVendor = (id, data) => axios.put(`${EVENT_URL}/vendors/${id}`, data, authHeaders());
export const deleteVendor = (id) => axios.delete(`${EVENT_URL}/vendors/${id}`, authHeaders());

// Attendee APIs
export const getAttendeesByEvent = (eventId) => axios.get(`${ATTENDEE_URL}/attendee/event/${eventId}`);
export const registerAttendee = (data) => axios.post(`${ATTENDEE_URL}/attendee`, data);
export const deleteAttendee = (id) => axios.delete(`${ATTENDEE_URL}/attendee/${id}`);

// Budget APIs
export const createBudget = (data) => axios.post(`${BUDGET_URL}/budget`, data);
export const getBudget = (eventId) => axios.get(`${BUDGET_URL}/budget/${eventId}`);
export const addExpense = (eventId, data) => axios.post(`${BUDGET_URL}/budget/${eventId}/expense`, data);