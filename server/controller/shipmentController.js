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
        const { search, status } = req.query;

        const filter = {};

        if (search) {
            filter.referenceNumber = {
                $regex: search,
                $options: 'i'
            };
        }

        if (status) {
            filter.currentStatus = status;
        }

        const allShipment = await shipment.find(filter);

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
            return res.status(404).json({
                message: 'Shipment not found'
            });
        }

        const { status } = req.body;

        const statusFlow = [
            'Booked',
            'Picked Up',
            'In Transit',
            'Customs Hold',
            'Out for Delivery',
            'Delivered'
        ];

        const currentIndex = statusFlow.indexOf(shipmentData.currentStatus);
        const newIndex = statusFlow.indexOf(status);

        if (newIndex === -1) {
            return res.status(400).json({
                message: 'Invalid shipment status'
            });
        }

        if (newIndex <= currentIndex) {
            return res.status(400).json({
                message: `Shipment cannot move from ${shipmentData.currentStatus} to ${status}`
            });
        }

        shipmentData.currentStatus = status;

        await shipmentData.save();

        await shipmentHistory.create({
            shipmentId: shipmentData._id,
            status: status
        });

        res.status(200).json(shipmentData);
    }
    catch (err) {
        res.status(500).json({
            message: 'Failed to update shipment status',
            error: err.message
        });
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