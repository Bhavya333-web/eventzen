const express = require('express');
const router = express.Router();
const { getAllVendors, createVendor, updateVendor, deleteVendor } = require('../controllers/vendorController');

router.get('/', getAllVendors);
router.post('/', createVendor);
router.put('/:id', updateVendor);
router.delete('/:id', deleteVendor);

module.exports = router;