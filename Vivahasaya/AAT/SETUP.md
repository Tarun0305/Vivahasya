# Vivahasya Wedding Planner - Setup Guide

A beautiful Indian wedding planning website with database-backed inquiry management system.

## Features

✨ **Inquiry Form with Database Connectivity**
- Collect customer inquiries with validation
- Data stored in SQLite database
- Real-time success/error popup notifications

🎨 **Beautiful UI**
- Bootstrap 5 responsive design
- Theme toggle (Light/Dark mode)
- Smooth animations and transitions

📊 **Database Management**
- SQLite database for inquiry storage
- Track inquiry status
- Admin APIs for viewing inquiries

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Step 1: Install Dependencies

Open PowerShell/Command Prompt in the project directory and run:

```bash
npm install
```

This will install:
- Express.js (web framework)
- SQLite3 (database)
- CORS (cross-origin support)
- Body-parser (request parsing)

### Step 2: Start the Server

```bash
npm start
```

You should see:
```
╔════════════════════════════════════════╗
║   Vivahasya Wedding Planner Server     ║
║   Running on http://localhost:3000     ║
╚════════════════════════════════════════╝
```

### Step 3: Open in Browser

Navigate to `http://localhost:3000` in your web browser.

## How It Works

### Frontend Form Submission
1. User fills the inquiry form with name, email, phone, and wedding details
2. Frontend validates the data
3. Data is sent to the backend via Fetch API
4. Toast notification shows success/error message
5. Form resets on successful submission

### Backend Processing
1. Server receives POST request at `/api/inquiry`
2. Data is validated on the server side
3. Inquiry is saved to SQLite database
4. Response is sent back to frontend with success/error message

### Database Schema
```sql
CREATE TABLE inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    status TEXT DEFAULT 'new'
)
```

## API Endpoints

### POST /api/inquiry
Save a new inquiry
- **Body**: `{ name, email, phone?, message }`
- **Response**: `{ success: true/false, message, id? }`

### GET /api/inquiries
Get all inquiries
- **Response**: `{ success: true, data: [...] }`

### GET /api/inquiry/:id
Get single inquiry
- **Response**: `{ success: true, data: {...} }`

### PUT /api/inquiry/:id/status
Update inquiry status
- **Body**: `{ status }`
- **Response**: `{ success: true, message }`

## Project Structure

```
AAT/
├── index.html          # Main HTML file
├── script.js           # Frontend JavaScript (Form handling + Toast notifications)
├── styles.css          # Custom CSS styles
├── server.js           # Express backend server
├── database.js         # SQLite database setup & functions
├── package.json        # Node.js dependencies
├── inquiries.db        # SQLite database (auto-created)
└── ...other assets
```

## Troubleshooting

### Port 3000 Already in Use
If port 3000 is already in use, modify `server.js`:
```javascript
const PORT = 3001; // Change to another port
```

### Database Issues
The `inquiries.db` file is auto-created. To reset:
1. Stop the server (Ctrl+C)
2. Delete `inquiries.db`
3. Restart the server

### CORS Issues
If you're accessing from a different port, update the server configuration in `server.js`.

## Customization

### Validation Rules
Edit `validateInquiryForm()` in `script.js` to change validation logic.

### Toast Notification Style
Customize `showToast()` function in `script.js` to change notification appearance.

### Button Text
Edit the button in `index.html` (around line 680) to customize submit button text.

## Future Enhancements

- Email notifications on inquiry submission
- Admin dashboard for inquiry management
- Payment gateway integration
- Calendar/booking system
- Photo gallery management
- Multi-language support

## Support

For issues or feature requests, please contact support@vivahasya.in

---

**Happy Wedding Planning! 💍**
