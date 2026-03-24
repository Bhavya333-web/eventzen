import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getEvents, createBudget, getBudget, addExpense } from '../services/api';
import { MdAdd, MdDelete, MdAttachMoney, MdClose } from 'react-icons/md';

const Budget = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState('');
  const [budget, setBudget] = useState(null);
  const [showBudgetForm, setShowBudgetForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [budgetForm, setBudgetForm] = useState({ totalBudget: '' });
  const [expenseForm, setExpenseForm] = useState({ name: '', amount: '', category: 'venue' });
  const [loading, setLoading] = useState(false);

  useEffect(() => { getEvents().then(res => setEvents(res.data)); }, []);

  useEffect(() => {
    if (selectedEvent) {
      getBudget(selectedEvent)
        .then(res => setBudget(res.data))
        .catch(() => setBudget(null));
    }
  }, [selectedEvent]);

  const totalExpenses = budget?.expenses?.reduce((sum, e) => sum + Number(e.amount), 0) || 0;
  const remaining = (budget?.totalBudget || 0) - totalExpenses;
  const percentage = budget?.totalBudget ? Math.min(100, Math.round((totalExpenses / budget.totalBudget) * 100)) : 0;

  const handleCreateBudget = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await createBudget({ eventId: selectedEvent, totalBudget: Number(budgetForm.totalBudget) });
      setBudget(res.data);
      setShowBudgetForm(false);
    } catch (err) { alert('Error creating budget!'); }
    setLoading(false);
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await addExpense(selectedEvent, expenseForm);
      setBudget(res.data);
      setExpenseForm({ name: '', amount: '', category: 'venue' });
      setShowExpenseForm(false);
    } catch (err) { alert('Error adding expense!'); }
    setLoading(false);
  };

  const categories = ['venue', 'catering', 'decoration', 'marketing', 'technology', 'other'];
  const categoryColors = {
    venue: '#b44fff', catering: '#00ff96', decoration: '#ff6eb4',
    marketing: '#ffd700', technology: '#00d4ff', other: '#ff6b6b'
  };
  const categoryEmojis = {
    venue: '🏛️', catering: '🍽️', decoration: '🎨',
    marketing: '📢', technology: '💻', other: '📦'
  };

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
          <h2 style={{ color: 'white', fontSize: '24px', fontWeight: '800' }}>Budget Tracker</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '14px', marginTop: '4px' }}>
            Track expenses and manage event budgets
          </p>
        </div>
        {selectedEvent && budget && (
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowExpenseForm(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
              color: 'white', padding: '12px 22px', borderRadius: '12px',
              fontSize: '14px', fontWeight: '700',
              boxShadow: '0 8px 25px rgba(180,79,255,0.4)',
            }}>
            <MdAdd size={20}/> Add Expense
          </motion.button>
        )}
      </div>

      {/* Select Event */}
      <div style={{ ...cardStyle, marginBottom: '20px' }}>
        <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '10px' }}>
          💰 Select Event to Track Budget
        </label>
        <select value={selectedEvent} onChange={(e) => setSelectedEvent(e.target.value)} style={inputStyle}>
          <option value="">-- Choose an Event --</option>
          {events.map(e => <option key={e._id} value={e._id}>{e.title}</option>)}
        </select>
      </div>

      {selectedEvent && !budget && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ ...cardStyle, textAlign: 'center', padding: '50px', marginBottom: '20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>💰</div>
          <h3 style={{ color: 'white', fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>No Budget Set</h3>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: '25px' }}>Set a budget for this event to start tracking expenses</p>
          <motion.button
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowBudgetForm(true)}
            style={{
              padding: '12px 30px',
              background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
              color: 'white', borderRadius: '12px', fontSize: '15px', fontWeight: '700',
              boxShadow: '0 8px 25px rgba(180,79,255,0.4)'
            }}>
            Set Budget 💰
          </motion.button>
        </motion.div>
      )}

      {budget && (
        <>
          {/* Budget Summary Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
            {[
              { label: 'Total Budget', value: `₹${budget.totalBudget?.toLocaleString()}`, color: '#b44fff', bg: 'rgba(180,79,255,0.15)', border: 'rgba(180,79,255,0.3)', icon: '💎' },
              { label: 'Total Expenses', value: `₹${totalExpenses.toLocaleString()}`, color: '#ff6b6b', bg: 'rgba(255,107,107,0.15)', border: 'rgba(255,107,107,0.3)', icon: '💸' },
              { label: 'Remaining', value: `₹${remaining.toLocaleString()}`, color: remaining >= 0 ? '#00ff96' : '#ff6b6b', bg: remaining >= 0 ? 'rgba(0,255,150,0.15)' : 'rgba(255,107,107,0.15)', border: remaining >= 0 ? 'rgba(0,255,150,0.3)' : 'rgba(255,107,107,0.3)', icon: remaining >= 0 ? '✅' : '⚠️' },
            ].map((card, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: card.bg, borderRadius: '16px',
                  padding: '20px', border: `1px solid ${card.border}`,
                }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }}>{card.icon}</div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginBottom: '4px' }}>{card.label}</div>
                <div style={{ color: card.color, fontSize: '26px', fontWeight: '800' }}>{card.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Progress Bar */}
          <div style={{ ...cardStyle, marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Budget Usage</span>
              <span style={{ color: percentage > 80 ? '#ff6b6b' : '#00ff96', fontSize: '14px', fontWeight: '700' }}>{percentage}%</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{
                  height: '10px', borderRadius: '10px',
                  background: percentage > 80 ? 'linear-gradient(135deg, #ff6b6b, #ff4444)' : 'linear-gradient(135deg, #b44fff, #ff6eb4)',
                }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>₹0</span>
              <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '12px' }}>₹{budget.totalBudget?.toLocaleString()}</span>
            </div>
          </div>

          {/* Expenses List */}
          <div style={cardStyle}>
            <h3 style={{ color: 'white', fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>
              💸 Expense Breakdown
            </h3>
            {!budget.expenses || budget.expenses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.3)' }}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>📝</div>
                <div>No expenses added yet!</div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {budget.expenses.map((exp, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.03)',
                      borderRadius: '12px',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                        background: `${categoryColors[exp.category]}20`,
                        border: `1px solid ${categoryColors[exp.category]}40`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px'
                      }}>{categoryEmojis[exp.category]}</div>
                      <div>
                        <div style={{ color: 'white', fontWeight: '600', fontSize: '14px' }}>{exp.name}</div>
                        <span style={{
                          padding: '2px 8px', borderRadius: '10px', fontSize: '11px',
                          background: `${categoryColors[exp.category]}20`,
                          color: categoryColors[exp.category],
                          border: `1px solid ${categoryColors[exp.category]}40`
                        }}>{exp.category}</span>
                      </div>
                    </div>
                    <div style={{ color: '#ff6b6b', fontSize: '16px', fontWeight: '700' }}>
                      ₹{Number(exp.amount).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Set Budget Modal */}
      {showBudgetForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: '#1a0533', borderRadius: '20px', padding: '30px', width: '420px',
              border: '1px solid rgba(180,79,255,0.3)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>💰 Set Event Budget</h3>
              <MdClose size={24} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }} onClick={() => setShowBudgetForm(false)}/>
            </div>
            <form onSubmit={handleCreateBudget}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Total Budget (₹)</label>
                <input required type="number" value={budgetForm.totalBudget}
                  onChange={(e) => setBudgetForm({ totalBudget: e.target.value })}
                  placeholder="Enter total budget amount"
                  style={inputStyle}/>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit" style={{
                  width: '100%', padding: '13px',
                  background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
                  color: 'white', borderRadius: '12px', fontSize: '15px', fontWeight: '700',
                }}>
                {loading ? 'Setting...' : 'Set Budget ✓'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Add Expense Modal */}
      {showExpenseForm && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: '#1a0533', borderRadius: '20px', padding: '30px', width: '420px',
              border: '1px solid rgba(180,79,255,0.3)',
              boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
            }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '700' }}>💸 Add Expense</h3>
              <MdClose size={24} style={{ cursor: 'pointer', color: 'rgba(255,255,255,0.5)' }} onClick={() => setShowExpenseForm(false)}/>
            </div>
            <form onSubmit={handleAddExpense}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Expense Name</label>
                <input required value={expenseForm.name}
                  onChange={(e) => setExpenseForm({ ...expenseForm, name: e.target.value })}
                  placeholder="e.g. Venue booking"
                  style={inputStyle}/>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Amount (₹)</label>
                <input required type="number" value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  placeholder="Enter amount"
                  style={inputStyle}/>
              </div>
              <div style={{ marginBottom: '25px' }}>
                <label style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Category</label>
                <select value={expenseForm.category}
                  onChange={(e) => setExpenseForm({ ...expenseForm, category: e.target.value })}
                  style={inputStyle}>
                  {categories.map(c => <option key={c} value={c}>{categoryEmojis[c]} {c}</option>)}
                </select>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                type="submit" style={{
                  width: '100%', padding: '13px',
                  background: 'linear-gradient(135deg, #b44fff, #ff6eb4)',
                  color: 'white', borderRadius: '12px', fontSize: '15px', fontWeight: '700',
                }}>
                {loading ? 'Adding...' : 'Add Expense ✓'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Budget;