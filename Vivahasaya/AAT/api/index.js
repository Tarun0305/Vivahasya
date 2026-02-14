const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const { saveInquiry, getAllInquiries, getInquiryById, updateInquiryStatus } = require('../database');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes

// API endpoint to save inquiry
app.post('/api/inquiry', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({
            success: false,
            message: 'Name, Email, and Message are required fields'
        });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please enter a valid email address'
        });
    }

    // Save to database
    saveInquiry({ name, email, phone, message }, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({
                success: false,
                message: 'Error saving inquiry. Please try again.'
            });
        }

        res.status(201).json({
            success: true,
            message: 'Thank you! Your inquiry has been received. Our team will contact you soon!',
            id: result.id
        });
    });
});

// API endpoint to get all inquiries (for admin)
app.get('/api/inquiries', (req, res) => {
    getAllInquiries((err, rows) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching inquiries'
            });
        }
        res.json({
            success: true,
            data: rows
        });
    });
});

// API endpoint to get single inquiry
app.get('/api/inquiry/:id', (req, res) => {
    const { id } = req.params;

    getInquiryById(id, (err, row) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching inquiry'
            });
        }
        if (!row) {
            return res.status(404).json({
                success: false,
                message: 'Inquiry not found'
            });
        }
        res.json({
            success: true,
            data: row
        });
    });
});

// API endpoint to update inquiry status
app.put('/api/inquiry/:id/status', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({
            success: false,
            message: 'Status is required'
        });
    }

    updateInquiryStatus(id, status, (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error updating inquiry status'
            });
        }
        res.json({
            success: true,
            message: 'Inquiry status updated successfully'
        });
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// Export the app for Vercel
module.exports = app;
