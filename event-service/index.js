const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.log('MongoDB connection failed:', err));

const eventRoutes = require('./routes/eventRoutes');
const vendorRoutes = require('./routes/vendorRoutes');

app.use('/api/events', eventRoutes);
app.use('/api/vendors', vendorRoutes);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Event service running on port ${PORT}`);
});
