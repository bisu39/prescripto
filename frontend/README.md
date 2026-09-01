# Prescripto Frontend

The patient-facing application for Prescripto allows users to explore doctors, sign up or log in, update their profile, book appointments, and pay using Razorpay.

## Features

- Responsive landing page and doctor catalog
- Specialty-based doctor filtering
- Detailed doctor profile section
- User signup and login flows
- Patient profile update with avatar support
- Appointment booking and booking status tracking
- Appointment cancellation
- Razorpay payment integration
- My appointments dashboard
- Mobile-friendly navigation
- Form validation 
- Password reset

## Tech stack

- React
- Vite
- React Router
- Axios
- React Toastify
- Tailwind CSS

## Setup

From this directory:

```bash
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Use only the backend origin, not the full `/api` path.

## Available commands

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

The app usually runs at:

```text
http://localhost:5173
```

## Main routes

- `/` — Home page
- `/doctors` — Doctors directory
- `/doctors/:speciality` — Filtered specialist list
- `/login` — User login/signup
- `/about` — About page
- `/contact` — Contact page
- `/my-profile` — User profile screen
- `/my-appointments` — User appointment history
- `/appointment/:docId` — Booking page

## Project structure

```text
src/
├── assets/
├── components/
├── context/
├── pages/
├── App.jsx
├── main.jsx
├── index.css
└── ...
```

## Notes

- Start the backend before using login, booking, or payment features.
- If the default Vite port is busy, Vite will automatically select another port.
- For image upload support, ensure the backend has valid Cloudinary credentials.
