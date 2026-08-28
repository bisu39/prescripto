# Prescripto Backend

The REST API for Prescripto. This service provides authentication, doctor management, appointments, profile updates, image uploads, and Razorpay payment verification for the patient frontend and admin panel.

## Prerequisites

- Node.js 18 or newer
- MongoDB or a MongoDB Atlas cluster
- A Cloudinary account for doctor and user profile images
- Razorpay credentials if payment features are enabled

## Installation

From this directory:

```bash
npm install
```

Create a `.env` file in `backend/` with the following values:

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

`MONGO_URI` should contain the MongoDB server address without the `/prescripto` database suffix because the application appends that database name. Keep `.env` private and never commit real credentials.

Razorpay variables are only needed for payment endpoints. The application creates the Razorpay client when both `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are present.

## Run the API

```bash
npm start
```

The start script runs `nodemon server.js`. If `nodemon` is not installed globally, run the server with `npx nodemon server.js` or install it as a development dependency.

The API listens on `http://localhost:4000` by default. Set `PORT` to use another port.

## API routes

All routes are prefixed with `/api`.

### User routes

- `POST /api/user/register` - Register a patient
- `POST /api/user/login` - Patient login
- `GET /api/user/get-profile` - Get the authenticated patient's profile
- `POST /api/user/update-profile` - Update profile data and image
- `POST /api/user/book-appointment` - Book an appointment
- `GET /api/user/appointments` - List the patient's appointments
- `POST /api/user/cancel-appointment` - Cancel an appointment
- `POST /api/user/payment-razorpay` - Create a Razorpay payment
- `POST /api/user/verifyRazorpay` - Verify a Razorpay payment

### Doctor routes

- `GET /api/doctor/list` - List available doctors
- `POST /api/doctor/login` - Doctor login
- `GET /api/doctor/appointments` - List the doctor's appointments
- `POST /api/doctor/complete-appointment` - Complete an appointment
- `POST /api/doctor/cancel-appointment` - Cancel an appointment
- `GET /api/doctor/dashboard` - Get doctor dashboard data
- `GET /api/doctor/profile` - Get the doctor's profile
- `POST /api/doctor/update-profile` - Update the doctor's profile

### Admin routes

- `POST /api/admin/login` - Admin login
- `POST /api/admin/add-doctor` - Add a doctor with an image
- `POST /api/admin/all-doctors` - List all doctors
- `POST /api/admin/change-availability` - Change doctor availability
- `GET /api/admin/appointments` - List all appointments
- `POST /api/admin/appointmentCanel` - Cancel an appointment
- `GET /api/admin/dashboard` - Get admin dashboard data

Protected routes require the token header used by the corresponding client: `token` for patients, `dtoken` for doctors, and `aToken` for administrators. Image update and doctor creation requests use `multipart/form-data`.

## Project structure

```text
config/       MongoDB and Cloudinary connections
controllers/  Request handlers and business logic
middlewares/  Authentication and file-upload middleware
models/       Mongoose data models
routes/       API route definitions
server.js     Express application entry point
```

## Connected applications

Set the following variable in both Vite applications:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Start the backend before starting `frontend/` or `admin/`. The backend enables CORS for the connected browser applications.

## Troubleshooting

- MongoDB connection errors: verify `MONGO_URI`, network access, and database credentials.
- Authentication errors: verify all JWT secrets and the matching client token header.
- Image upload errors: verify the three Cloudinary variables.
- Payment errors: verify both Razorpay credentials and the `CURRENCY` value.
- Port errors: change `PORT` and update `VITE_BACKEND_URL` in both frontend applications.
