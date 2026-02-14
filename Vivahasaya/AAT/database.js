const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Create/open database
const db = new sqlite3.Database(path.join(__dirname, 'inquiries.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database table
const initializeDatabase = () => {
    db.run(`
        CREATE TABLE IF NOT EXISTS inquiries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            phone TEXT,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'new'
        )
    `, (err) => {
        if (err) {
            console.error('Error creating table:', err);
        } else {
            console.log('Inquiries table ready');
        }
    });
};

// Function to save inquiry
const saveInquiry = (data, callback) => {
    const { name, email, phone, message } = data;
    
    db.run(
        `INSERT INTO inquiries (name, email, phone, message) VALUES (?, ?, ?, ?)`,
        [name, email, phone || '', message],
        function(err) {
            if (err) {
                callback(err, null);
            } else {
                callback(null, { id: this.lastID, success: true });
            }
        }
    );
};

// Function to get all inquiries
const getAllInquiries = (callback) => {
    db.all(`SELECT * FROM inquiries ORDER BY created_at DESC`, (err, rows) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, rows);
        }
    });
};

// Function to get inquiry by ID
const getInquiryById = (id, callback) => {
    db.get(`SELECT * FROM inquiries WHERE id = ?`, [id], (err, row) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, row);
        }
    });
};

// Function to update inquiry status
const updateInquiryStatus = (id, status, callback) => {
    db.run(
        `UPDATE inquiries SET status = ? WHERE id = ?`,
        [status, id],
        function(err) {
            if (err) {
                callback(err);
            } else {
                callback(null);
            }
        }
    );
};

// Close database connection gracefully
const closeDatabase = () => {
    db.close((err) => {
        if (err) {
            console.error('Error closing database:', err);
        } else {
            console.log('Database connection closed');
        }
    });
};

module.exports = {
    db,
    saveInquiry,
    getAllInquiries,
    getInquiryById,
    updateInquiryStatus,
    closeDatabase
};
