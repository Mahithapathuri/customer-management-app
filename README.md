

# Customer Management Application

## Project Overview

This is a simple **Customer Management Application** built to manage customers and their multiple addresses.
The application supports full CRUD operations and demonstrates frontend–backend integration using React, Express, and SQLite.

The frontend is deployed separately from the backend and communicates via REST APIs.

---

## Tech Stack

### Frontend

* React JS
* React Router
* Vite
* HTML, CSS
* Fetch API

### Backend

* Node.js
* Express.js
* SQLite (database)
* sqlite3 package
* CORS

### Deployment

* Frontend: Netlify
* Backend: Render

---

## Features Implemented

### Customer Management

* Create a new customer
* View list of all customers
* View customer details
* Update customer information
* Delete customer with confirmation

### Multiple Address Management

* Add multiple addresses for a customer
* View all addresses of a customer
* Update address details
* Automatic deletion of addresses when a customer is deleted

### Search & Filter

* Search customers by:

  * City
  * State
  * Pin Code
* Clear filters and reload full list

### Navigation & UI

* Client-side routing using React Router
* Clean and simple UI
* Form validation for required fields
* Success alerts on create/update actions

---

## Steps to Run Locally

### Prerequisites

* Node.js (v18 or above recommended)
* npm

---

### 1. Clone or Download the Repository

```bash
git clone <repository-url>
cd customer-management-app
```

---

### 2. Run Backend (Express + SQLite)

```bash
cd backend
npm install
npm start
```

Backend will start on:

```
http://localhost:3001
```

Test:

```
http://localhost:3001/customers
```

---

### 3. Run Frontend (React)

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---


## Live Links

* **Frontend (Netlify):[** https://mahita-customer-management-5f8a3d.netlify.app/
* **Backend (Render):** [ https://your-backend.onrender.com)](https://customer-management-app-qqyx.onrender.com 

---

## Notes

* SQLite is used as a lightweight database for simplicity.
* Backend access is restricted using CORS.
* Environment variables are used for API configuration.
* This project focuses on core functionality and clean code rather than production-scale features.

---

## Conclusion

This application demonstrates:

* React component structure and routing
* REST API integration
* Relational data handling using SQLite
* Deployment-ready architecture with separate frontend and backend

---

