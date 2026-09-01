# Prescripto

Prescripto is a full-stack healthcare appointment platform built for patients, doctors, and administrators. It includes a patient-facing booking portal, a doctor/admin dashboard, secure authentication, appointment booking, payment processing, and Cloudinary-based image uploads.

## Live app

- Patient app: https://myprescriptoapp.netlify.app
- Admin app: https://adminprescriptoapp.netlify.app

## Project structure

```text
Project-Prescripto/
├── frontend/   Patient web app
├── admin/      Admin + doctor portal
├── backend/    Express REST API
└── README.md   Project overview

```

## Core features

### Patient app
- Doctor discovery with specialty-based filtering
- Doctor profile view and consultation booking
- User registration and login
- Profile management with photo upload
- Appointment history and cancellation or online payment
- Razorpay payment flow
- Responsive UI for desktop and mobile

### Admin app
- Admin login
- Add new doctors
- Toggle doctor availability
- View all appointments
- Dashboard statistics
- Manage doctor and appointment records

### Doctor app
- Doctor login
- View doctor profile and update fees/availability
- Manage appointment queue
- Mark appointments as complete
- Cancel appointments
- Doctor dashboard overview

### Backend
- MongoDB + Mongoose models
- JWT authentication for users, doctors, and admin
- Cloudinary image upload support
- Appointment booking logic and validation
- Razorpay payment creation and verification
- Express API routes separated by role

## Tech stack

- React + Vite
- React Router
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Cloudinary
- Razorpay
- Axios
- Tailwind CSS

## Setup

Install dependencies in each app:

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

Create frontend and admin env files:

```env
# frontend/.env and admin/.env
VITE_BACKEND_URL=http://localhost:4000
```

## Run locally

Start the backend:

```bash
cd backend
npm start
```

Then start the frontend:

```bash
cd frontend
npm run dev
```

Then start the admin panel:

```bash
cd admin
npm run dev
```

## Documentation

- [Frontend README](frontend/README.md)
- [Admin README](admin/README.md)
- [Backend README](backend/README.md)

## Notes

- The backend appends `/prescripto` to the MongoDB database name automatically, so keep `MONGO_URI` without the database suffix.
- Keep `.env` files private and do not commit credentials.
- If a port is already in use, update `PORT` and the matching `VITE_BACKEND_URL` values.

## Credits

This project is made form  the GreatStack's tutotrial and new features added by myself.

## Future additions
I am planning to add those new features in near future:
- Phone and email verification
- Make the UX more interactive