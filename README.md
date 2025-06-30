# 🚖 RydeOn – Full-Stack Ride Booking Application

RydeOn is a complete ride booking platform where users can book rides based on their preferences (Auto, Bike, Car), track real-time locations using Google Maps, and securely confirm bookings via OTP. The app supports both **User** and **Admin** roles with separate dashboards and full authentication.



## 📌 Features

- 🔐 **Secure Authentication (JWT)**  
  Login/Signup with encrypted passwords using JWT-based authentication for both users and admins.

- 📍 **Live Location Tracking (Google Maps API)**  
  Fetch and track the user's live location for accurate pickup/drop and distance estimation.

- 🧾 **OTP-Based Ride Booking**  
  Ensures security with a one-time password before confirming a ride.

- 🚘 **Multiple Ride Options**  
  Users can choose between **Auto**, **Bike**, or **Car** while booking.

- 🧑‍💼 **Role-Based Dashboards**  
  - **User Dashboard**: View bookings, track ride status, update profile  
  - **Admin Dashboard**: Manage users, vehicles, booking history, and more.

---

## 💻 Tech Stack

| Layer       | Technologies                            |
|-------------|------------------------------------------|
| Frontend    | React.js, Tailwind CSS / Bootstrap       |
| Backend     | Node.js, Express.js                      |
| Database    | MongoDB (Mongoose)                       |
| Auth        | JWT, bcrypt.js                           |
| API         | Google Maps JavaScript API               |
| Tools       | Postman, GitHub, VS Code                 |

---

## 🚀 Installation & Run Locally

```bash
git clone https://github.com/your-username/rydeon.git
cd rydeon
npm install
npm start
