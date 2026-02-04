# Vivahasya - Wedding Planner Database Setup

## Setup Instructions

### 1. Install Node.js and Dependencies
Make sure you have Node.js installed. Then, install the required packages:

```bash
npm install
```

This will install:
- **express**: Web server framework
- **cors**: Cross-Origin Resource Sharing
- **body-parser**: Parse incoming request bodies
- **sqlite3**: Database (SQLite)

### 2. Start the Server
```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

### 3. How It Works

#### Frontend (HTML Form)
The inquiry form in `index.html` has been enhanced to:
- Collect name, email, phone (optional), and wedding details
- Submit data to the backend via POST request

#### Backend (Node.js + Express)
- **Endpoint**: `POST /api/send-inquiry`
- **Database**: SQLite (automatically creates `inquiries.db`)
- **Table**: `inquiries` table with columns:
  - `id`: Auto-incrementing primary key
  - `name`: Customer name
  - `email`: Customer email
  - `phone`: Customer phone (optional)
  - `message`: Wedding details
  - `created_at`: Timestamp of submission

#### Database
- Uses SQLite3 for data storage
- Database file: `inquiries.db` (created automatically)
- Table is created on first run

### 4. API Endpoints

#### Send Inquiry
```
POST /api/send-inquiry
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "message": "We want a traditional wedding..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Inquiry sent successfully! We will contact you soon.",
  "id": 1
}
```

**Response (Error):**
```json
{
  "success": false,
  "message": "Name, email, and message are required"
}
```

#### Get All Inquiries (Admin)
```
GET /api/inquiries
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+91 98765 43210",
      "message": "We want a traditional wedding...",
      "created_at": "2026-02-04 10:30:00"
    }
  ]
}
```

### 5. Project Structure
```
AAT/
├── index.html          # Main website
├── script.js           # Frontend & form submission logic
├── styles.css          # Website styling
├── server.js           # Node.js server with database connection
├── package.json        # Project dependencies
├── inquiries.db        # SQLite database (auto-created)
└── README.md           # This file
```

### 6. Database Browser
To view inquiries in the database, you can use:
- **SQLite Browser**: Download from https://sqlitebrowser.org/
- **VSCode Extension**: Install "SQLite" extension
- **Command Line**: `sqlite3 inquiries.db "SELECT * FROM inquiries;"`

### 7. Troubleshooting

**Port already in use:**
```bash
# Change PORT in server.js or use a different port
# PORT=3001 npm start
```

**Module not found:**
```bash
# Reinstall dependencies
npm install
```

**Database permission error:**
- Ensure the directory has write permissions
- Delete `inquiries.db` and restart the server to recreate it

### 8. Next Steps
- Add email notification functionality
- Implement admin dashboard to view inquiries
- Add database backup system
- Implement inquiry status tracking
- Add payment integration if needed

---

**Created**: February 4, 2026
**Version**: 1.0.0
