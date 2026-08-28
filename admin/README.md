# Prescripto Admin Panel

The administration and doctor portal for Prescripto. Administrators can manage doctors and appointments, while doctors can manage their availability, appointments, and profiles.

## Prerequisites

- Node.js 18 or newer
- The Prescripto backend running locally or a deployed backend URL

## Installation

From this directory:

```bash
npm install
```

Create a `.env` file in `admin/`:

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

The development server is normally available at `http://localhost:5173`. If the patient frontend is already using that port, Vite will select the next available port.

## Access and features

- Admin login uses `ADMIN_EMAIL` and `ADMIN_PASSWORD` configured in the backend.
- Doctor login uses doctor credentials created through the admin panel.
- Admin dashboard, doctor management, availability updates, and appointment management
- Doctor dashboard, appointment completion or cancellation, and profile updates

Authentication tokens are stored in browser local storage. Use the logout control or clear site storage when switching accounts.

## Project structure

```text
src/
	assets/       Images and icons
	components/   Navbar and sidebar components
	context/      Admin, doctor, and shared backend state
	pages/Admin/  Administrator screens
	pages/Doctor/ Doctor screens
	pages/        Login screen
```

## Backend dependency

The panel expects the backend API at `VITE_BACKEND_URL`. Start the backend from `backend/` before signing in or loading dashboard data. See the backend README for required environment variables.
