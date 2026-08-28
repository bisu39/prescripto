import express from 'express'
import { doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentComplete, doctorDashboard, updateDoctorProfile, doctorProfile } from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const doctorRouter = express.Router();
// endpoint: /api/doctor/list
// access : public
doctorRouter.get('/list', doctorList)

// endpoint: /api/doctor/login
// access : public
doctorRouter.post('/login', loginDoctor)

// endpoint: /api/doctor/appointments
// access : private
doctorRouter.get('/appointments', authDoctor, appointmentsDoctor)

// endpoint: /api/doctor/complete-appointment
// access : private
doctorRouter.post('/complete-appointment', authDoctor, appointmentComplete)

// endpoint: /api/doctor/cancel-appointment
// access : private
doctorRouter.post('/cancel-appointment', authDoctor, appointmentCancel)
// endpoint: /api/doctor/dashboard
// access : private
doctorRouter.get('/dashboard', authDoctor, doctorDashboard)
// endpoint: /api/doctor/profile
// access : private
doctorRouter.get('/profile', authDoctor, doctorProfile)
// endpoint: /api/doctor/update-profile
// access : private
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile)
export default doctorRouter
