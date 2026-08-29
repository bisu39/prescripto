# Prescripto

Prescripto is a full-stack doctor appointment platform. Patients can discover doctors, create accounts, manage profiles, book appointments, and make payments. Administrators can manage doctors and appointments, while doctors can manage availability, appointments, and their profiles.

## Applications

| Directory | Application | Description |
| --- | --- | --- |
| `frontend/` | Patient web app | Patient registration, doctor search, bookings, profiles, and payments |
| `admin/` | Admin and doctor portal | Doctor management, appointment management, dashboards, and doctor tools |
| `backend/` | REST API | Authentication, database access, image uploads, appointments, and payments |

See the application-specific guides for details:

- [Frontend README](frontend/README.md)
- [Admin README](admin/README.md)
- [Backend README](backend/README.md)
## Live view
Go experience it...
User Frontend view link:- https://myprescriptoapp.netlify.app
Admin Panel view link:- https://adminprescriptoapp.netlify.app
## Technology stack

- React and Vite for the patient and admin applications
- React Router for client-side navigation
- Node.js and Express for the REST API
- MongoDB with Mongoose for persistence
- JWT for patient, doctor, and administrator authentication
- Cloudinary for profile and doctor image storage
- Razorpay for appointment payments
- Axios for frontend API requests

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB or a MongoDB Atlas cluster
- Cloudinary account for image uploads
- Razorpay account if payment functionality is required

## Installation

Install dependencies separately for each application:

```bash
cd backend
npm install

cd ../frontend
npm install

cd ../admin
npm install
```

Create the backend environment file at `backend/.env`:

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

The backend appends `/prescripto` to `MONGO_URI` when connecting, so do not add that database name to the variable. Keep all real credentials private and do not commit `.env` files.

Create the frontend environment file at `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

Create the admin environment file at `admin/.env`:

```env
VITE_BACKEND_URL=http://localhost:4000
```

`VITE_BACKEND_URL` should contain only the backend origin. Do not add `/api`.

## Running locally

Start the backend first:

```bash
cd backend
npm start
```

The API runs at `http://localhost:4000` by default. The backend start script uses `nodemon`; if it is not installed globally, run `npx nodemon server.js` instead.

In a second terminal, start the patient application:

```bash
cd frontend
npm run dev
```

In a third terminal, start the admin and doctor portal:

```bash
cd admin
npm run dev
```

Vite normally serves the applications at `http://localhost:5173`. If that port is occupied, Vite chooses another available port and displays it in the terminal.

## Common commands

Run these commands from the relevant application directory:

```bash
npm run dev       # Start a Vite development server
npm run build     # Build a frontend application for production
npm run preview   # Preview a frontend production build
npm run lint      # Run ESLint for a frontend application
npm start         # Start the backend with nodemon
```

## API overview

The backend mounts these route groups:

- `/api/user` - patient registration, login, profiles, appointments, and payments
- `/api/doctor` - doctor login, profile, availability, dashboard, and appointments
- `/api/admin` - administrator login, doctor management, dashboards, and appointments

Protected requests use separate token headers for each role: `token` for patients, `dtoken` for doctors, and `aToken` for administrators. The complete endpoint list is available in [backend/README.md](backend/README.md).

## Project structure

```text
Project-Prescripto/
  frontend/       Patient-facing React application
  admin/          Admin and doctor React application
  backend/        Express REST API
```

## Troubleshooting

- Backend cannot connect to MongoDB: verify `MONGO_URI`, credentials, and Atlas network access.
- Frontend cannot load data: confirm the backend is running and both Vite `.env` files use the correct `VITE_BACKEND_URL`.
- Login fails: verify the administrator credentials and JWT secret variables in `backend/.env`.
- Image uploads fail: verify the Cloudinary credentials.
- Payments fail: verify both Razorpay credentials and the configured currency.
- Port already in use: change `PORT` for the backend and update both Vite environment files to match.

## Credits

Special thanks to the **GreatStack** YouTube channel for guiding the development of this project.
