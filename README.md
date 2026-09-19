# Shipment Status Tracker

A small full-stack shipment tracking application built as part of the Nagarkot Forwarders technical assessment.

The application allows users to create shipments, view their current status, update shipment status, search and filter shipments, and view the complete history of status changes.

## Live Demo

**Frontend:**  
[Link](https://shipment-tracker-three-kappa.vercel.app/)

**Backend:**  
[Link](https://shipment-tracker-013g.onrender.com)

---

## Features

- Create a new shipment
- View all shipments with their current status
- Search shipments by reference number
- Filter shipments by status
- View details of a single shipment
- Update shipment status
- View the complete status history of a shipment
- Persistent data storage using MongoDB
- Responsive and clean user interface

---

## Tech Stack

### Frontend
- React
- React Router
- Tailwind CSS
- Axios
- Vite

### Backend
- Node.js
- Express.js
- Mongoose

### Database
- MongoDB
- MongoDB Atlas

### Deployment
- Vercel — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## Why These Technologies?

I chose the MERN stack because I am comfortable working with JavaScript across both the frontend and backend. It allowed me to build the application within the given time limit while keeping the implementation simple and easy to maintain.

MongoDB was used as the database because it provides persistent storage and works well with the JavaScript-based backend.

React was used to build the frontend because it allows the application to be divided into reusable components.

Express.js was used to create the REST API for shipment and shipment history operations.

Tailwind CSS was used for styling and to build a clean responsive interface efficiently.

---

## Application Flow

The application follows this general flow:

1. A shipment is created with its reference number, origin, destination, current status, and expected delivery date.
2. The shipment is stored in MongoDB.
3. The initial status is also stored in the shipment history.
4. The shipment can be viewed from the dashboard.
5. The shipment status can be updated.
6. Every status update creates a new history record with a timestamp.
7. The shipment details page displays the complete sequence of status changes.

---

## Status Flow

The shipment uses the following status stages:

```text
Booked
   ↓
Picked Up
   ↓
In Transit
   ↓
Customs Hold
   ↓
Out for Delivery
   ↓
Delivered
```
A shipment starts with the Booked status.

Each status change is stored as a separate record in the shipment history collection along with the time of the change.

The status stages were defined to represent a simple shipment lifecycle from booking through delivery.

---
Data Model
Shipment

Each shipment contains:

referenceNumber — unique shipment reference number
origin — shipment origin
destination — shipment destination
currentStatus — current shipment status
expectedDeliveryDate — expected delivery date
createdAt — creation timestamp
updatedAt — last update timestamp
Shipment History

Each status change is stored separately with:

shipmentId — reference to the shipment
status — status at that point in time
timestamp — time when the status was recorded

Keeping shipment history separately allows the application to display the sequence of status changes rather than only the current status.

API Endpoints

The backend exposes the following REST API endpoints:
| Method | Endpoint                | Description                 |
| ------ | ----------------------- | --------------------------- |
| POST   | `/api/ship`             | Create a shipment           |
| GET    | `/api/ship`             | Get all shipments           |
| GET    | `/api/ship/:id`         | Get a single shipment       |
| PATCH  | `/api/ship/:id/status`  | Update shipment status      |
| GET    | `/api/ship/:id/history` | Get shipment status history |

The shipment list endpoint also supports:

search — search by reference number
status — filter by current status

Example:

GET /api/ship?search=001
GET /api/ship?status=In%20Transit
---
Running Locally
Prerequisites

Make sure the following are installed:

Node.js
npm
MongoDB Atlas account or a local MongoDB instance
---
1. Clone the Repository
```
git clone https://github.com/sanskarkanade/Shipment-tracker.git
cd Shipment-tracker
```
2. Backend Setup

Navigate to the backend folder:
```
cd server
```
Install dependencies:
```
npm install
```
Create a .env file inside the server folder:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
Start the backend:
```
node server.js
```
The backend will run on:
```
http://localhost:5000
```

---

3. Frontend Setup

Open another terminal and navigate to the frontend folder:
```
cd client
```
Install dependencies:
```
npm install
```
Create a .env file inside the client folder:
```
VITE_API_URL=http://localhost:5000
```
Start the frontend:
```
npm run dev
```
The frontend will be available at the local URL provided by Vite.
---
Environment Variables
Backend
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
---
Frontend
```
VITE_API_URL=http://localhost:5000
```
For the deployed frontend, VITE_API_URL points to the deployed backend URL.
---
Assumptions
Each shipment has a unique reference number.
A shipment starts with the Booked status.
Shipment status changes are recorded as separate history records.
The shipment history is ordered chronologically.
Authentication is not required for this assessment.
Multi-user functionality is not required.
Roles and permissions are not required.
MongoDB Atlas is used for persistent data storage.
---
Project Structure
```
shipment-tracker/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```
---
### Scaling to 10,000 Shipments and Multiple Concurrent Users

If the application had to handle 10,000 shipments and multiple users at the same time, I would first add pagination so that all shipments are not loaded at once. I would also add indexes for fields like reference number and status to make searching and filtering faster. As the number of users increases, I would look at improving the database queries and, if needed, scale the backend to handle more requests. For frequently requested data, caching could also be considered to reduce unnecessary database requests.

---
Deployment

The frontend and backend are deployed separately as required.

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

Live links are provided at the top of this README.
