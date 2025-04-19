# Rydeon Ride booking App

This project is an Uber-like ride-hailing system that demonstrates real-time ride handling, geolocation tracking, and map integration using Node.js/Express on the backend and React on the frontend.

## Backend

- **Technologies:** Node.js, Express, Socket.IO, MongoDB.
- **Overview:**  
  - Handles ride creation, fare calculations, ride confirmations, and ride lifecycle management.
  - Uses Socket.IO to emit events for real-time notifications to clients (users and captains).
- **Key Files:**
  - `controllers/ride.controller.js`: Manages ride-related operations (create ride, get fare, confirm/start/end ride) and sends real-time notifications.
  - `socket.js`: Initializes Socket.IO, manages client connection, and provides a function to send messages based on socket IDs.
  - `models/`: Contains data models for users, captains, rides, etc.
  - `services/`: Implements business logic for rides and maps functionalities, such as getting location coordinates and fare calculations.

## Frontend

- **Technologies:** React, Google Maps API, Axios, GSAP.
- **Overview:**  
  - Provides a user interface for finding trips, tracking rides, and managing ride requests in real-time.
  - Implements live tracking using Google Maps and listens for Socket.IO events for smooth user experience.
- **Key Files:**
  - `pages/Home.jsx`: The main page where users search for rides. It manages location inputs, displays suggestions, calculates fare/distance, and initiates ride requests.
  - `pages/Riding.jsx`: Displays ride details (including driver and vehicle info) once a ride is confirmed and handles navigation upon ride events.
  - `components/LiveTracking.jsx`: Integrates Google Maps to provide real-time tracking of the current position.
  - Additional components include `LocationSearchPanel`, `VehiclePanel`, `ConfirmRide`, `LookingForDriver`, and `WaitingForDriver` for various steps in the ride booking process.
  - `context/SocketContext` & `context/usercontext`: Provide global state and Socket.IO connection data for real-time updates.

## Real-time Functionality

- **Socket Events:**
  - `new-ride`: Emitted when a new ride request is created.
  - `ride-confirmed`: Notifies the user when a ride is confirmed by a captain.
  - `ride-started`: Indicates that the ride has started.
  - `ride-ended`: Signals the end of the ride.
- The backend uses these events to keep the frontend updated, ensuring an interactive and responsive experience.

## Setup Instructions

1. **Clone the repository.**
2. **Backend Setup:**
   - Navigate to the `backend` folder.
   - Install dependencies using `npm install`.
   - Configure environment variables (e.g., MongoDB URI, port).
   - Start the server using `node server.js` (or use a process manager like PM2).
3. **Frontend Setup:**
   - Navigate to the `frontend` folder.
   - Install dependencies using `npm install`.
   - Configure environment variables (e.g., Google Maps API key, backend URL).
   - Start the development server (e.g., using Vite or Create React App).
4. **Ensure Socket.IO Connection:**  
   - Verify that both frontend and backend servers are properly connected via Socket.IO to support real-time communication between users and captains.

## Folder Structure

```
/backend
  ├── controllers
  │     └── ride.controller.js
  ├── models
  ├── services
  ├── socket.js
  └── ...other files

/frontend
  └── src
       ├── components
       │     └── LiveTracking.jsx
       ├── context
       │     └── SocketContext.js, usercontext.js
       ├── pages
       │     ├── Home.jsx
       │     └── Riding.jsx
       └── ...other files
```

## Conclusion

This application serves as a comprehensive demonstration of an Uber-like ride-hailing system. It incorporates both backend and frontend technologies to manage real-time ride requests, driver tracking, and user notifications using modern web development practices.
