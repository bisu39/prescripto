# Prescripto Frontend

The patient-facing web application for Prescripto. Patients can browse doctors, create an account, manage their profile, book appointments, and make payments through Razorpay.

## Prerequisites

- Node.js 18 or newer
- The Prescripto backend running locally or a deployed backend URL

## Installation

From this directory:

```bash
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

The value must point to the backend origin only. Do not add `/api` because the application adds the API paths itself.

## Available commands

```bash
npm run dev       # Start the Vite development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

The development server is normally available at `http://localhost:5173`.

## Main features

- Doctor directory and specialty filtering
- Doctor profile and appointment booking
- User registration and login
- Profile and profile-image updates
- Appointment history and cancellation
- Razorpay payment flow

## Project structure

```text
src/
	assets/       Images and icons
	components/   Shared UI components
	context/      Application state and backend access
	pages/        Route-level screens
	App.jsx       Application routes
```

## Backend dependency

The frontend expects the backend API at `VITE_BACKEND_URL`. Start the backend from `backend/` before using login, doctor data, appointments, or payments. See the backend README for database and service configuration.
