# Form Validation System

A comprehensive form validation system built with Node.js, Express, and EJS. This application provides robust client-side and server-side validation for user submissions with a modern, responsive interface.

## Features

### 🎯 Core Functionality
- **Advanced Form Validation**: Comprehensive validation rules for username, email, age, gender, interests, bio, password, and terms agreement
- **Password Strength Meter**: Real-time password strength assessment (Weak/Medium/Strong)
- **RESTful API**: Full CRUD operations via REST endpoints
- **Client-Side Routing**: Smooth navigation between form and entries view
- **Edit Functionality**: Update existing submissions with validation
- **Responsive Design**: Modern UI that works on all devices

### 🔒 Validation Rules
- **Username**: 3-30 characters (letters, numbers, spaces)
- **Email**: Valid email format
- **Age**: Integer between 18-100
- **Gender**: Required selection (Male, Female, Other)
- **Interests**: At least one interest selected
- **Bio**: 20-250 characters
- **Password**: Minimum 8 characters with uppercase, lowercase, number, and special character
- **Terms**: Must agree to terms and conditions

### 📊 Data Management
- **In-Memory Storage**: Temporary data persistence during runtime
- **Submission History**: View all submissions with timestamps
- **Edit Panel**: Update existing entries
- **Statistics**: Track total submissions

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **EJS** - Template engine

### Frontend
- **Tailwind CSS** - Utility-first CSS framework
- **Vanilla JavaScript** - Client-side logic
- **HTML5** - Markup

### Development Tools
- **Nodemon** - Auto-restart on code changes
- **ESLint** - Code quality

## Project Structure

```
Form Validation System/
├── index.html                    # Main HTML file (legacy)
├── package.json                  # Project dependencies and scripts
├── script.js                     # Server-side application logic
├── views/
│   ├── index.ejs                # Main form interface
│   ├── submissions.ejs          # Submissions list and edit panel
│   └── success.ejs              # Success page after submission
└── README.md                     # This documentation
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Form-Validation-System
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   # or
   npm run dev
   ```

The application will be available at `http://localhost:3000`

## Usage

### Basic Usage
1. **Access the Form**: Navigate to `http://localhost:3000` in your browser
2. **Fill out the form**: Complete all required fields with valid data
3. **Submit**: Click the submit button to save your entry
4. **View Submissions**: Click "Entries" to view all submissions
5. **Edit Entries**: Click the edit button on any submission to modify it

### API Endpoints

#### Form & Navigation
- `GET /` - Display the main form
- `GET /submissions` - Display all submissions

#### REST API
- `GET /api/submissions` - Get all submissions (JSON)
- `GET /api/submissions/:id` - Get specific submission by ID
- `POST /api/submissions` - Create new submission
- `PUT /api/submissions/:id` - Update existing submission

## API Documentation

### Create Submission (POST /api/submissions)

**Request Body**:
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "age": 25,
  "gender": "male",
  "interests": ["coding", "music"],
  "bio": "Software developer with 5 years experience",
  "agree": true,
  "password": "SecurePass123!",
  "confirmPassword": "SecurePass123!"
}
```

**Response**:
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "age": 25,
  "gender": "male",
  "interests": ["coding", "music"],
  "bio": "Software developer with 5 years experience",
  "agree": true,
  "password": "SecurePass123!",
  "passwordStrength": "Strong",
  "timestamp": "2026-07-03 10:30:00",
  "updatedAt": "2026-07-03 10:30:00"
}
```

### Get All Submissions (GET /api/submissions)

**Response**:
```json
{
  "items": [
    {
      "id": 1,
      "username": "john_doe",
      "email": "john@example.com",
      "age": 25,
      "gender": "male",
      "interests": ["coding", "music"],
      "bio": "Software developer with 5 years experience",
      "agree": true,
      "password": "SecurePass123!",
      "passwordStrength": "Strong",
      "timestamp": "2026-07-03 10:30:00",
      "updatedAt": "2026-07-03 10:30:00"
    }
  ],
  "total": 1
}
```

### Get Specific Submission (GET /api/submissions/:id)

**Response**:
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "age": 25,
  "gender": "male",
  "interests": ["coding", "music"],
  "bio": "Software developer with 5 years experience",
  "agree": true,
  "password": "SecurePass123!",
  "passwordStrength": "Strong",
  "timestamp": "2026-07-03 10:30:00",
  "updatedAt": "2026-07-03 10:30:00"
}
```

### Update Submission (PUT /api/submissions/:id)

**Request Body**:
```json
{
  "username": "john_doe_updated",
  "email": "john.updated@example.com",
  "age": 26,
  "gender": "female",
  "interests": ["coding", "design", "music"],
  "bio": "Senior software developer with 6 years experience",
  "agree": true,
  "password": "UpdatedPass123!",
  "confirmPassword": "UpdatedPass123!"
}
```

## Development

### Scripts

- `npm start` - Start the application in production mode
- `npm run dev` - Start the application with auto-restart (if configured)
- `npm test` - Run tests (currently not implemented)

### Features in Development

- [ ] Unit tests for validation functions
- [ ] Integration tests for API endpoints
- [ ] Authentication and authorization
- [ ] Persistent storage (database)
- [ ] Email notifications
- [ ] Admin dashboard

## Project Notes

This project was created as part of the Cognifyz Task 5 assignment. It demonstrates:

- Full-stack web development skills
- Form validation best practices
- RESTful API design
- Modern web development practices
- Error handling and user feedback
