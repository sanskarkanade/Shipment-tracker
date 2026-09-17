const mongoose = require('mongoose');

const shipmentSchema = new mongoose.Schema(
  {
    referenceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    origin: {
      type: String,
      required: true,
      trim: true
    },

    destination: {
      type: String,
      required: true,
      trim: true
    },

    currentStatus: {
      type: String,
      required: true,
      enum: [
        'Booked',
        'Picked Up',
        'In Transit',
        'Customs Hold',
        'Out for Delivery',
        'Delivered'
      ],
      default: 'Booked'
    },

    expectedDeliveryDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Shipment', shipmentSchema);