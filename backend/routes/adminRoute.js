import express from 'express';
import { addDoctor, allDoctors, appointmentsAdmin, loginAdmin, appointmentCanel,adminDashboard } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailability } from '../controllers/doctorController.js';

const adminRouter = express.Router();
// endpoint: /api/admin/add-doctor
// access : private
adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
// endpoint: /api/admin/login
// access : private
adminRouter.post('/login', loginAdmin);

// endpoint: /api/admin/all-doctors
// access : private
adminRouter.post('/all-doctors', authAdmin, allDoctors);

// endpoint: /api/admin/change-availability
// access : private
adminRouter.post('/change-availability', authAdmin, changeAvailability);


// endpoint: /api/admin/appointments
// access : private
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);

// endpoint: /api/admin/appointmentCancel
// access : private
adminRouter.post('/appointmentCanel', authAdmin, appointmentCanel);

// endpoint: /api/admin/dashboard
// access : private
adminRouter.get('/dashboard', authAdmin, adminDashboard);

export default adminRouter;