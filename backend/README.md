# Uber Clone Backend API Documentation

## Overview
RESTful API for a ride-hailing service built with Node.js, Express, and MongoDB.

## Setup

```bash
# Install dependencies 
npm install

# Environment variables (.env)
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

# Start server
npm run dev
```

## Authentication
Protected routes require JWT token provided via:
- Cookie: `token`
- Header: `Authorization: Bearer <token>`

## API Endpoints

### User Routes

#### Register User
```http
POST /users/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "string", // min 3 chars
    "lastname": "string"   // optional, min 3 chars
  },
  "email": "string",      // valid email
  "password": "string"    // min 6 chars
}
```

**Response (201)**
```json
{
  "user": {
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john@example.com",
    "_id": "user_id"
  },
  "token": "jwt_token"
}
```

#### Login User
```http
POST /users/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

#### Get Profile
```http
GET /users/profile
Authorization: Bearer <token>
```

#### Logout
```http
GET /users/logout
Authorization: Bearer <token>
```

### Captain Routes

#### Register Captain
```http
POST /captains/register
Content-Type: application/json

{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plate": "string",
    "capacity": "number",
    "vehicleType": "car|motorcycle|auto"
  }
}
```

#### Login Captain
```http
POST /captains/login
Content-Type: application/json

{
  "email": "string",
  "password": "string"
}
```

#### Get Captain Profile
```http
GET /captains/profile
Authorization: Bearer <token>
```

#### Logout Captain
```http
GET /captains/logout
Authorization: Bearer <token>
```

## Models

### User Schema
```javascript
{
  fullname: {
    firstname: String,  // required, min 3 chars
    lastname: String    // min 3 chars
  },
  email: String,       // required, unique
  password: String,    // required, hashed
  socketId: String     // optional
}
```

### Captain Schema
```javascript
{
  fullname: {
    firstname: String,  // required, min 3 chars
    lastname: String    // required
  },
  email: String,       // required, unique
  password: String,    // required, hashed
  vehicle: {
    color: String,     // required
    plate: String,     // required
    capacity: Number,  // required, min 1
    vehicleType: String // enum: ['car', 'motorcycle', 'auto']
  },
  status: String,      // enum: ['online', 'offline']
  location: {
    lat: Number,
    lng: Number
  },
  socketId: String
}
```

## Error Responses

### 400 Bad Request
- Invalid/missing fields
- User/Captain already exists
- Invalid credentials

### 401 Unauthorized
- Missing/invalid token
- Token blacklisted
- User/Captain not found

### 500 Internal Server Error
- Server-side errors

## WebSocket Events
Real-time communication for ride requests and location updates.

## Folder Structure

```
s:\Development\uber\backend
│
├── config         // Environment and configuration files
├── controllers    // Request handlers for routes
├── middlewares    // Custom middlewares such as authentication 
├── models         // Mongoose models and schemas
├── routes         // API route definitions
└── utils          // Utility functions and helpers (if any)
```

## Additional Documentation

### Advanced Configuration
- Configure environment variables for production and development.
- Customize logging and error handling as needed.

### API Testing
- Use Postman or similar tools to test each endpoint.
- Ensure JWT tokens are included in protected route calls.

### Contribution Guidelines
- Fork the repository and create feature branches.
- Write tests and follow coding standards before submitting a pull request.

### Deployment
- Merge latest changes before deployment.
- Configure environment variables on the production server as in the Setup section.