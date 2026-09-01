# Prescripto Backend

This backend powers the Prescripto ecosystem. It provides authentication, doctor and appointment management, profile handling, file uploads, and Razorpay payment flows for the patient app and admin/doctor portal.

## Features

- User registration and login
- Doctor listing and filtering
- Appointment booking and cancellation
- Admin login and dashboard APIs
- Doctor dashboard and appointment management
- Cloudinary image upload for user/doctor images
- JWT-based authentication for all roles
- Razorpay payment integration and verification
- Mongoose models for users, doctors, appointments, and admin data

## Tech stack

- Node.js
- Express
- MongoDB + Mongoose
- JWT
- Cloudinary
- Razorpay
- Validator
- Bcrypt

## Setup

From this directory:

```bash
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=4000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>

CLOUDINARY_CLOUD_NAME=<cloudinary-cloud-name>
CLOUDINARY_API_KEY=<cloudinary-api-key>
CLOUDINARY_API_SECRET=<cloudinary-api-secret>

ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=<strong-admin-password>
JWT_SECRET=<admin-jwt-secret>
JWT_USER_SECRET=<user-jwt-secret>
JWT_DOC_SECRET=<doctor-jwt-secret>

RAZORPAY_KEY_ID=<razorpay-key-id>
RAZORPAY_KEY_SECRET=<razorpay-key-secret>
CURRENCY=USD
```

## Run the API

```bash
npm start
```

The server runs on:

```text
http://localhost:4000
```

## Main route groups

### User routes
- `POST /api/user/register`
- `POST /api/user/login`
- `GET /api/user/get-profile`
- `POST /api/user/update-profile`
- `POST /api/user/book-appointment`
- `GET /api/user/appointments`
- `POST /api/user/cancel-appointment`
- `POST /api/user/payment-razorpay`
- `POST /api/user/verifyRazorpay`

### Doctor routes
- `GET /api/doctor/list`
- `POST /api/doctor/login`
- `GET /api/doctor/appointments`
- `POST /api/doctor/complete-appointment`
- `POST /api/doctor/cancel-appointment`
- `GET /api/doctor/dashboard`
- `GET /api/doctor/profile`
- `POST /api/doctor/update-profile`

### Admin routes
- `POST /api/admin/login`
- `POST /api/admin/add-doctor`
- `POST /api/admin/all-doctors`
- `POST /api/admin/change-availability`
- `GET /api/admin/appointments`
- `POST /api/admin/appointmentCanel`
- `GET /api/admin/dashboard`

## Authentication

Protected APIs use different token headers depending on the role:

- User: `token`
- Doctor: `dtoken`
- Admin: `aToken`

## Project structure

```text
backend/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── server.js
├── package.json
├── .env
└── README.md
```

## Notes

- `MONGO_URI` should not include the database name suffix because the app adds `/prescripto` during connection.
- Cloudinary and Razorpay credentials are required for upload and payment features.
- The frontend and admin apps should point to the same backend origin via `VITE_BACKEND_URL`.
