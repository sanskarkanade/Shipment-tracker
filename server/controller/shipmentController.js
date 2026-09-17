const shipment = require('../models/shipment.js');
const shipmentHistory = require('../models/shipmentHistory.js');


exports.createShipment = async (req, res) => {
    try {
        const { referenceNumber, origin, destination, currentStatus, expectedDeliveryDate} = req.body;

        const newShipment = await shipment.create({ referenceNumber, origin, destination, currentStatus, expectedDeliveryDate });

        await shipmentHistory.create({ shipmentId: newShipment._id, status: newShipment.currentStatus});

        res.status(201).json(newShipment);
    }
    catch (err) {
        res.status(500).json({ message: 'Create Shipment failed', error: err.message });
    }
};


exports.getAllShipments = async (req, res) => {
    try {
        const allShipment = await shipment.find();

        res.status(200).json(allShipment);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to get shipments', error: err.message });
    }
};


exports.getShipmentById = async (req, res) => {
    try {
        const shipmentData = await shipment.findById(req.params.id);

        if (!shipmentData) {
            return res.status(404).json({ message: 'Shipment not found' });
        }

        res.status(200).json(shipmentData);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to get shipment', error: err.message });
    }
};


exports.updateShipmentStatus = async (req, res) => {
    try {
        const shipmentData = await shipment.findById(req.params.id);

        if (!shipmentData) {
            return res.status(404).json({ message: 'Shipment not found' });
        }

        const { status } = req.body;

        shipmentData.currentStatus = status;

        await shipmentData.save();

        await shipmentHistory.create({ shipmentId: shipmentData._id, status: status });

        res.status(200).json(shipmentData);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to update shipment status', error: err.message });
    }
};

exports.getShipmentHistory = async (req, res) => {
    try {
        const history = await shipmentHistory.find({ shipmentId: req.params.id }).populate('shipmentId', 'referenceNumber').sort({ timestamp: 1 });

        res.status(200).json(history);
    }
    catch (err) {
        res.status(500).json({ message: 'Failed to get shipment history', error: err.message });
    }
};