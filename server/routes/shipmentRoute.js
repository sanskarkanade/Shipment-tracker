const express = require('express');

const router = express.Router();

const {
  createShipment,
  getAllShipments,
  getShipmentById,
  updateShipmentStatus,
  getShipmentHistory
} = require('../controllers/shipmentController');

router.post('/', createShipment);
router.get('/', getAllShipments);
router.get('/:id', getShipmentById);
router.patch('/:id/status', updateShipmentStatus);
router.get('/:id/history', getShipmentHistory);

module.exports = router;