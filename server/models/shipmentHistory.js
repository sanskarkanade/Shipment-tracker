const mongoose = require('mongoose');

const shipmentHistorySchema = new mongoose.Schema(
  {
    shipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Shipment',
      required: true
    },

    status: {
      type: String,
      required: true,
      enum: [
        'Booked',
        'Picked Up',
        'In Transit',
        'Customs Hold',
        'Out for Delivery',
        'Delivered'
      ]
    },

    timestamp: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model('ShipmentHistory', shipmentHistorySchema);