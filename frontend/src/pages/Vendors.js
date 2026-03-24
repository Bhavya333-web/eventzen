import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getEvents } from '../services/api';
import { MdAdd, MdDelete, MdEdit, MdClose, MdSearch, MdPhone, MdEmail, MdStore } from 'react-icons/md';

const vendorCategories = ['Catering', 'Photography', 'Decoration', 'Music', 'Security', 'Transport', 'Technology', 'Other'];

const categoryEmojis = {
  'Catering': '🍽️', 'Photography': '📸', 'Decoration': '🎨',
  'Music': '🎵', 'Security': '🔒', 'Transport': '🚗',
  'Technology': '💻', 'Other': '📦'
};

const categoryColors = {
  'Catering': '#00ff96', 'Photography': '#ff6eb4', 'Decoration': '#b44fff',
  'Music': '#ffd700', 'Security': '#ff6b6b', 'Transport': '#00d4ff',
  'Technology': '#4facfe', 'Other': '#a29bfe'
};

const Vendors = () => {
  const [vendors, setVendors] = useState([]);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingVendor, setEditingVendor] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [form, setForm] = useState({
    name: '', category: 'Catering', phone: '',
    email: '', price: '', eventId: '', status: 'active', notes: ''
  });

  useEffect(() => {
    getEvents().then(res => setEvents(res.data));
    const saved = localStorage.getItem('eventzen_vendors');
    if (saved) setVendors(JSON.parse(saved));
  }, []);

  const saveVendors = (data) => {
    setVendors(data);
    localStorage.setItem('eventzen_vendors', JSON.stringify(data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingVendor) {
      saveVendors(vendors.map(v => v.id === editingVendor.id ? { ...form, id: v.id } : v));
    } else {
      saveVendors([...vendors, { ...form, id: Date.now() }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Remove this vendor?')) {
      saveVendors(vendors.filter(v => v.id !== id));
    }
  };

  const openEdit = (vendor) => {
    setEditingVendor(vendor);
    setForm(vendor);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingVendor(null);
    setForm({ name: '', category: 'Catering', phone: '', email: '', price: '', eventId: '', status: 'active', notes: '' });
  };

  const filtered = vendors.filter(v => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = filterCategory === 'all' || v.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const inputStyle = {
    width: '100%', padding: '12px 16px',
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '10px', color: 'white', fontSize: '14px',
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.03)',
    borderRadius: '16px', padding: '20px',
    border: '1px solid rgba(255,255,255,0.08)',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
        <div>
          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '800' }}>Vendor Management</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
            {vendors.length} vendors registered
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
            color: 'white', padding: '12px 22px', borderRadius: '12px',
            fontSize: '14px', fontWeight: '700',
            boxShadow: '0 8px 25px rgba(180,79,255,0.4)',
          }}>
          <MdAdd size={20}/> Add Vendor
        </motion.button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: 'Total Vendors', value: vendors.length, icon: '🏪', color: '#b44fff' },
          { label: 'Active', value: vendors.filter(v => v.status === 'active').length, icon: '✅', color: '#00ff96' },
          { label: 'Categories', value: [...new Set(vendors.map(v => v.category))].length, icon: '📂', color: '#00d4ff' },
          { label: 'Total Value', value: `₹${vendors.reduce((s, v) => s + Number(v.price || 0), 0).toLocaleString()}`, icon: '💰', color: '#ffd700' },
        ].map((card, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: 'rgba(255,255,255,0.03)', borderRadius: '16px',
              padding: '18px', border: '1px solid rgba(255,255,255,0.08)',
            }}>
            <div style={{ fontSize: '26px', marginBottom: '8px' }}>{card.icon}</div>
            <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', marginBottom: '4px' }}>{card.label}</div>
            <div style={{ color: card.color, fontSize: '22px', fontWeight: '800' }}>{card.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Search & Filter */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
          <MdSearch size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }}/>
          <input placeholder="Search vendors..." value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ ...inputStyle, paddingLeft: '42px' }}/>
        </div>
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}
          style={{ ...inputStyle, width: 'auto', minWidth: '150px' }}>
          <option value="all">All Categories</option>
          {vendorCategories.map(c => <option key={c} value={c}>{categoryEmojis[c]} {c}</option>)}
        </select>
      </div>

      {/* Vendors Grid */}
      {filtered.length === 0 ? (
        <div style={{ ...cardStyle, textAlign: 'center', padding: '60px' }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>🏪</div>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>No vendors yet!</h3>
          <p style={{ color: 'rgba(255,255,255,0.4)' }}>Click "Add Vendor" to register your first vendor</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {filtered.map((vendor, i) => (
            <motion.div key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              style={{
                background: 'rgba(255,255,255,0.03)', borderRadius: '20px',
                overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)',
              }}>
              {/* Banner */}
              <div style={{
                height: '80px', padding: '16px',
                background: `linear-gradient(135deg, ${categoryColors[vendor.category]}20, ${categoryColors[vendor.category]}05)`,
                borderBottom: `1px solid ${categoryColors[vendor.category]}20`,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '12px',
                    background: `${categoryColors[vendor.category]}30`,
                    border: `1px solid ${categoryColors[vendor.category]}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px'
                  }}>{categoryEmojis[vendor.category]}</div>
                  <div>
                    <div style={{ color: 'white', fontWeight: '700', fontSize: '15px' }}>{vendor.name}</div>
                    <span style={{
                      padding: '2px 8px', borderRadius: '10px', fontSize: '11px',
                      background: `${categoryColors[vendor.category]}20`,
                      color: categoryColors[vendor.category],
                    }}>{vendor.category}</span>
                  </div>
                </div>
                <span style={{
                  padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600',
                  background: vendor.status === 'active' ? 'rgba(0,255,150,0.2)' : 'rgba(255,107,107,0.2)',
                  color: vendor.status === 'active' ? '#00ff96' : '#ff6b6b',
                }}>{vendor.status}</span>
              </div>

              {/* Content */}
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                  {vendor.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                      <MdPhone size={14} color="#b44fff"/> {vendor.phone}
                    </div>
                  )}
                  {vendor.email && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.5)', fontSize: '13px' }}>
                      <MdEmail size={14} color="#ff6eb4"/> {vendor.email}
                    </div>
                  )}
                  {vendor.price && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ffd700', fontSize: '14px', fontWeight: '700' }}>
                      💰 ₹{Number(vendor.price).toLocaleString()}
                    </div>
                  )}
                  {vendor.eventId && (
                    <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>
                      🎯 {events.find(e => e._id === vendor.eventId)?.title || 'Event'}
                    </div>
                  )}
                  {vendor.notes && (
                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '12px', fontStyle: 'italic' }}>
                      "{vendor.notes}"
                    </div>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => openEdit(vendor)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                      background: 'rgba(180,79,255,0.15)', color: '#b44fff',
                      padding: '8px', borderRadius: '10px', fontSize: '13px', fontWeight: '600',
                      border: '1px solid rgba(180,79,255,0.2)'
                    }}>
                    <MdEdit size={14}/> Edit
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(vendor.id)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                      background: 'rgba(255,100,100,0.1)', color: '#ff6b6b',
                      padding: '8px', borderRadius: '10px', fontSize: '13px', fontWeight: '600',
                      border: '1px solid rgba(255,100,100,0.2)'
                    }}>
                    <MdDelete size={14}/> Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
          overflowY: 'auto', padding: '20px'
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: '#1a0533', borderRadius: '20px', padding: '30px', width: '500px',
              border: '1px solid rgba(180,79,255,0.3)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>
                {editingVendor ? '✏️ Edit Vendor' : '🏪 Add New Vendor'}
              </h3>
              <MdClose size={24} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }} onClick={closeModal}/>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                {[
                  { label: 'Vendor Name', key: 'name', type: 'text', placeholder: 'Company name' },
                  { label: 'Phone', key: 'phone', type: 'text', placeholder: 'Contact number' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'Email address' },
                  { label: 'Price (₹)', key: 'price', type: 'number', placeholder: 'Service price' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                    <input type={field.type} value={form[field.key]}
                      onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder} style={inputStyle}/>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                    {vendorCategories.map(c => <option key={c} value={c}>{categoryEmojis[c]} {c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Status</label>
                  <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} style={inputStyle}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '15px' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Assign to Event</label>
                <select value={form.eventId} onChange={(e) => setForm({ ...form, eventId: e.target.value })} style={inputStyle}>
                  <option value="">-- Select Event (Optional) --</option>
                  {events.map(e => <option key={e._id} value={e._id}>{e.title}</option>)}
                </select>
              </div>

              <div style={{ marginTop: '15px', marginBottom: '25px' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Notes</label>
                <input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Any additional notes..."
                  style={inputStyle}/>
              </div>

              <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit" style={{
                  width: '100%', padding: '13px',
                  background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
                  color: 'white', borderRadius: '12px', fontSize: '15px', fontWeight: '700',
                  boxShadow: '0 8px 25px rgba(180,79,255,0.4)'
                }}>
                {editingVendor ? 'Update Vendor ✓' : 'Add Vendor 🏪'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Vendors;