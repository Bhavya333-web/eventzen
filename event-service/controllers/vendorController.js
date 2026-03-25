const Vendor = require('../models/Vendor');

exports.getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vendors' });
  }
};

exports.createVendor = async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    res.status(500).json({ message: 'Error creating vendor' });
  }
};

exports.updateVendor = async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(vendor);
  } catch (err) {
    res.status(500).json({ message: 'Error updating vendor' });
  }
};

exports.deleteVendor = async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: 'Vendor deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting vendor' });
  }
};