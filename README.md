````markdown
# Uber Clone

A full-stack ride-hailing application inspired by Uber, built with the **MERN stack**, **Socket.IO**, **MongoDB**, and **Google Maps APIs**.

The application provides separate experiences for **Users** and **Captains (Drivers)**, including ride booking, fare estimation, real-time captain discovery, ride confirmation, OTP-based ride starting, and live location tracking.

---

## 📌 Overview

This project recreates the core workflow of a ride-hailing platform:

```text
User
 │
 ├── Enter Pickup & Destination
 │
 ├── Get Route & Fare
 │
 ├── Select Vehicle
 │
 ├── Confirm Ride
 │
 ▼
Backend
 │
 ├── Create Ride
 ├── Calculate Fare
 ├── Find Nearby Captains
 └── Send Ride Request via Socket.IO
 │
 ▼
Captain
 │
 ├── Receive Ride Request
 ├── Accept Ride
 ├── Start Ride using OTP
 └── End Ride
 │
 ▼
User
 │
 ├── Receive Captain Details
 ├── View OTP
 ├── Track Ride
 └── Receive Ride Status Updates
````

---

# ✨ Features

## 👤 User

* User registration and login
* JWT-based authentication
* Pickup and destination search
* Google Maps location suggestions
* Route distance and duration calculation
* Dynamic fare calculation
* Vehicle selection
* Ride creation
* Real-time captain discovery
* Real-time ride confirmation
* Captain information display
* Vehicle information display
* OTP-based ride verification
* Live location tracking
* Ride status updates

## 🚗 Captain

* Captain registration and login
* Vehicle registration
* Vehicle type selection
* Automatic location tracking
* Nearby ride discovery
* Real-time ride request popup
* Accept ride requests
* View passenger details
* OTP-based ride start
* Live ride tracking
* Complete ride
* Captain earnings/details dashboard

## ⚡ Real-Time Features

Socket.IO is used for real-time communication between users, captains, and the backend.

Examples:

```text
new-ride
ride-confirmed
ride-started
ride-ended
```

---

# 🏗️ Tech Stack

## Frontend

* React
* React Router
* Axios
* Tailwind CSS
* GSAP
* `@react-google-maps/api`
* Socket.IO Client

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Zod
* Socket.IO
* Axios

## APIs & Services

* Google Maps Geocoding API
* Google Maps Routes API
* Google Places Autocomplete API

---

# 📁 Project Structure

```text
Uber_clone/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ConfirmRide.jsx
│   │   │   ├── ConfirmRidePopUp.jsx
│   │   │   ├── CaptainDetails.jsx
│   │   │   ├── FinishRide.jsx
│   │   │   ├── LiveTracking.jsx
│   │   │   ├── LocationSearchPanel.jsx
│   │   │   ├── LookingForDriver.jsx
│   │   │   ├── RidePopUp.jsx
│   │   │   ├── VehiclePanel.jsx
│   │   │   └── WaitingForDriver.jsx
│   │   │
│   │   ├── context/
│   │   │   ├── UserContext.jsx
│   │   │   ├── CapatainContext.jsx
│   │   │   └── SocketContext.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Riding.jsx
│   │   │   ├── CaptainHome.jsx
│   │   │   ├── CaptainRiding.jsx
│   │   │   ├── UserLogin.jsx
│   │   │   ├── CaptainLogin.jsx
│   │   │   └── CaptainSignup.jsx
│   │   │
│   │   └── App.jsx
│   │
│   └── package.json
│
├── backend/
│   │
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── socket.js
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# 🔄 Application Flow

## 1. User requests a ride

The user enters:

```text
Pickup
Destination
```

The frontend requests route information from the backend.

The backend communicates with Google Maps to retrieve:

* Distance
* Duration

---

## 2. Fare calculation

Fare is calculated using:

```text
Base Fare
+
Distance × Per KM Rate
+
Duration × Per Minute Rate
```

Different pricing is used for:

* Car
* Motorcycle
* Auto

---

## 3. Ride creation

When the user confirms a ride:

```http
POST /rides/create
```

A ride is created with:

```text
user
pickup
destination
vehicleType
fare
duration
OTP
status
```

Initial ride status:

```text
pending
```

---

## 4. Finding nearby captains

The captain's location is stored using GeoJSON:

```json
{
  "type": "Point",
  "coordinates": [longitude, latitude]
}
```

MongoDB's geospatial query is then used to find captains within a configured radius around the pickup location.

Example:

```text
Pickup
   ●
  / \
 /   \
●     ●
Captain Captain

Radius → 2 km
```

---

## 5. Real-time ride request

After nearby captains are found, Socket.IO sends:

```text
new-ride
```

to the appropriate captain socket.

The captain receives the ride request without refreshing the page.

---

## 6. Captain accepts the ride

Captain sends:

```http
POST /rides/confirm
```

The ride changes from:

```text
pending
```

to:

```text
accepted
```

The backend then sends:

```text
ride-confirmed
```

to the user through Socket.IO.

The user receives:

* Captain name
* Vehicle plate
* Vehicle type
* Fare
* OTP
* Pickup
* Destination

---

## 7. Ride starts

The captain verifies the OTP provided to the user.

The ride transitions:

```text
accepted → ongoing
```

and a:

```text
ride-started
```

event is sent to the user.

---

## 8. Ride completion

After reaching the destination:

```http
POST /rides/end-ride
```

The ride transitions:

```text
ongoing → completed
```

The user receives:

```text
ride-ended
```

---

# 🗄️ Database Models

## User

Stores:

* Name
* Email
* Password
* Socket ID

## Captain

Stores:

* Name
* Email
* Password
* Vehicle information
* Vehicle type
* Status
* Socket ID
* Current GeoJSON location

Example:

```json
{
  "location": {
    "type": "Point",
    "coordinates": [
      77.1621,
      24.4362
    ]
  }
}
```

## Ride

Stores:

* User
* Captain
* Pickup
* Destination
* Fare
* Duration
* Vehicle type
* OTP
* Ride status

Ride status lifecycle:

```text
pending
   ↓
accepted
   ↓
ongoing
   ↓
completed
```

---

# 🔌 API Endpoints

## User

### Register

```http
POST /users/register
```

### Login

```http
POST /users/login
```

### Profile

```http
GET /users/profile
```

### Logout

```http
GET /users/logout
```

---

## Captain

### Register

```http
POST /captain/register
```

### Login

```http
POST /captain/login
```

### Profile

```http
GET /captain/profile
```

### Logout

```http
GET /captain/logout
```

---

## Maps

### Get suggestions

```http
GET /maps/get-suggestions
```

Example:

```text
/maps/get-suggestions?input=guna
```

---

## Rides

### Calculate fare

```http
GET /rides/get-fare
```

Example:

```text
/rides/get-fare?pickup=Guna&destination=Delhi
```

### Create ride

```http
POST /rides/create
```

Example:

```json
{
  "pickup": "Jaypee University of Engineering and Technology, Guna",
  "destination": "Guna Railway Station",
  "vehicleType": "car"
}
```

### Confirm ride

```http
POST /rides/confirm
```

### Start ride

```http
GET /rides/start-ride
```

Example:

```text
/rides/start-ride?rideId=<RID>&otp=<OTP>
```

### End ride

```http
POST /rides/end-ride
```

---

# 🔐 Authentication

JWT is used for authentication.

After login, the token is stored on the client and sent using:

```http
Authorization: Bearer <TOKEN>
```

Authentication middleware protects private routes.

Passwords are hashed using:

```text
bcrypt
```

---

# ✅ Validation

Request data is validated using **Zod**.

Example:

```js
const rideSchema = z.object({
    pickup: z.string().min(3),
    destination: z.string().min(3),
    vehicleType: z.enum(['car', 'moto', 'auto'])
})
```

Validation is handled through a reusable middleware before requests reach controllers.

---

# 📍 Google Maps Integration

The backend communicates with Google Maps services for:

### Geocoding

```text
Address → Latitude / Longitude
```

### Routes

```text
Origin + Destination
        ↓
Distance + Duration
```

### Places Autocomplete

```text
User Input
     ↓
Location Suggestions
```

The frontend uses Google Maps to display live user location.

---

# 📡 Socket.IO Architecture

Socket.IO connects users and captains to the same backend.

### User connection

```text
User
 ↓
join
 ↓
Backend
 ↓
User.socketId
```

### Captain connection

```text
Captain
 ↓
join
 ↓
Backend
 ↓
Captain.socketId
```

### Ride request

```text
User
 ↓
Create Ride
 ↓
Nearby Captains
 ↓
Socket.IO
 ↓
new-ride
 ↓
Captain
```

### Ride confirmation

```text
Captain
 ↓
Confirm Ride
 ↓
Socket.IO
 ↓
ride-confirmed
 ↓
User
```

---

# 🌍 Environment Variables

## Frontend

Create:

```text
frontend/.env
```

Example:

```env
VITE_BASE_URL=http://localhost:4000
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

---

## Backend

Create:

```text
backend/.env
```

Example:

```env
PORT=4000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_JWT_SECRET

GOOGLE_MAPS_API=YOUR_GOOGLE_MAPS_API_KEY
```

> Never commit `.env` files or API keys to GitHub.

Add them to `.gitignore`.

---

# 🚀 Installation

## 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd Uber_clone
```

---

## 2. Install backend dependencies

```bash
cd backend
npm install
```

---

## 3. Configure backend environment variables

Create:

```text
backend/.env
```

and add your configuration.

---

## 4. Start backend

```bash
npx nodemon
```

Backend runs on:

```text
http://localhost:4000
```

---

## 5. Install frontend dependencies

Open a new terminal:

```bash
cd frontend
npm install
```

---

## 6. Configure frontend environment variables

Create:

```text
frontend/.env
```

---

## 7. Start frontend

```bash
npm run dev
```

Frontend will normally run on:

```text
http://localhost:5173
```

---

# 🧪 Testing the Ride Flow

Run the application with two sessions.

### Session 1 — User

```text
Login
 ↓
Enter pickup
 ↓
Enter destination
 ↓
Find Trip
 ↓
Select Vehicle
 ↓
Confirm Ride
```

### Session 2 — Captain

```text
Login
 ↓
Captain Home
 ↓
Wait for ride request
 ↓
Accept Ride
 ↓
Confirm Ride
 ↓
Enter OTP
 ↓
Start Ride
 ↓
Complete Ride
```

This allows the Socket.IO flow to be tested in real time.

---

# 🛡️ Error Handling

The backend handles errors using:

* Express middleware
* Try/catch blocks
* Zod validation
* Mongoose validation
* Authentication middleware
* API error handling

Example response:

```json
{
  "message": "Validation failed",
  "errors": []
}
```

---

# 📱 Responsive UI

The frontend uses Tailwind CSS utilities to support different screen sizes.

Bottom-sheet interfaces are used for:

* Vehicle selection
* Ride confirmation
* Driver search
* Waiting for driver
* Captain ride requests
* Ride completion

GSAP is used for panel animations and transitions.

---

# 🔮 Future Improvements

Potential improvements for future versions:

* Dynamic captain matching radius
* Captain availability management
* Driver rejection/timeout logic
* Ride cancellation
* Payment gateway integration
* Ride history
* User ratings and reviews
* Captain earnings tracking
* Route polyline rendering
* Improved live navigation
* ETA calculation
* Push notifications
* Redis for scalable real-time location management
* Production-ready rate limiting and monitoring
* Advanced Maps markers
* Deployment with CI/CD

---

# 📸 Screenshots

## Screenshots

| User Home | Location / Trip Search |
|---|---|
| <img src="https://github.com/user-attachments/assets/0ea445ed-493e-4561-9401-7c80234cebd6" width="250"/> | <img src="https://github.com/user-attachments/assets/72f8078f-7b55-458b-a4c7-4652b4a4b994" width="250"/> |

| Vehicle Selection | Confirm Ride |
|---|---|
| <img src="https://github.com/user-attachments/assets/a5fbab89-82e7-4c11-babf-866506c5b182" width="250"/> | <img src="https://github.com/user-attachments/assets/14fc977a-884d-4e70-bc1f-e5a71b7108db" width="250"/> |

| Captain Home | Incoming Ride |
|---|---|
| <img src="https://github.com/user-attachments/assets/74976fde-b6ba-4ade-85bc-36d80ee479e8" width="250"/> | <img src="https://github.com/user-attachments/assets/b52e7839-7c2f-4bbc-9ef2-27a3cacd6c71" width="250"/> |

| Waiting for Driver / Ride Status |
|---|
| <img src="https://github.com/user-attachments/assets/02b5a6c6-8ff4-464a-bc9b-38e93a1da277" width="250"/> |
---

# 🧠 Key Concepts Demonstrated

This project demonstrates practical implementation of:

* MERN stack architecture
* REST APIs
* JWT authentication
* Password hashing
* MongoDB/Mongoose
* GeoJSON
* MongoDB geospatial queries
* Google Maps APIs
* Socket.IO
* Real-time communication
* React Context API
* React Hooks
* GSAP animations
* API validation with Zod
* Middleware architecture
* Controller-Service-Model pattern
* Real-time location tracking
* Ride state management

---

# 👨‍💻 Author

**Garv Gang**

Built as a full-stack learning project to understand real-world ride-hailing application architecture, real-time communication, geospatial queries, authentication, and location tracking.

---

# ⭐ Acknowledgements

* Google Maps Platform
* Socket.IO
* MongoDB
* Express.js
* React
* Node.js
* Tailwind CSS
* GSAP

---

## 📄 License

This project is intended for educational and portfolio purposes.

```
That sounds much more like an engineering project than a tutorial clone.
```
