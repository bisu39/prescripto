# Prescripto Admin Panel

This portal powers the admin and doctor workflows of Prescripto. It allows administrators to manage doctors and appointments, and doctors to handle patient visit scheduling, completion, and updates.

## Features

### Admin features
- Admin login
- Add doctor profiles with image upload
- View all doctors
- Toggle doctor availability
- View all appointments
- Cancel appointments
- Dashboard summary with recent activity

### Doctor features
- Doctor login
- View doctor dashboard
- View assigned appointments
- Mark appointments as complete
- Cancel appointments
- Update profile and fees
- Toggle availability status

## Tech stack

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- Context API for state management

## Setup

From this directory:

```bash
npm install
```

Create a `.env` file in `admin/`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

## Available commands

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

The app usually runs on:

```text
http://localhost:5173
```

If the patient frontend already uses that port, Vite will choose the next available one.

## Routes

### Admin routes
- `/admin-dashboard` — Overview dashboard
- `/all-appointments` — All appointment records
- `/add-doctor` — Add a new doctor
- `/doctor-list` — Manage available doctors

### Doctor routes
- `/doctor-dashboard` — Doctor overview
- `/doctor-appointments` — Appointment management
- `/doctor-profile` — Update profile and fees

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

- Admin credentials are configured in the backend `.env` file using `ADMIN_EMAIL` and `ADMIN_PASSWORD`.
- The backend must be running before the app can load data or authenticate users.
- Authentication tokens are saved in browser local storage.
