import express from 'express'
const userRouter = express.Router()
import { loginUser, registerUser, getProfile, updateProfile, bookAppointment, listAppointment, calcelAppointment, paymentRazorpay, verifyRazorpay } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'

// endpoint: /api/user/register
// access : public
userRouter.post('/register', registerUser)
// endpoint: /api/user/login
// access : public
userRouter.post('/login', loginUser)
// endpoint: /api/user/get-profile
// access : private
userRouter.get('/get-profile', authUser, getProfile)
// endpoint: /api/user/update-profile
// access : private
userRouter.post('/update-profile', upload.single('image'), authUser, updateProfile)
// endpoint: /api/user/book-appointment
// access : private
userRouter.post('/book-appointment', authUser, bookAppointment)
// endpoint: /api/user/appointments
// access : private
userRouter.get('/appointments', authUser, listAppointment)
// endpoint: /api/user/cancel-appointment
// access : private
userRouter.post('/cancel-appointment', authUser, calcelAppointment)
// endpoint: /api/user/payment-razorpay
// access : private
userRouter.post('/payment-razorpay', authUser, paymentRazorpay)
// endpoint: /api/user/verifyRazorpay
// access : private
userRouter.post('/verifyRazorpay', authUser, verifyRazorpay)
export default userRouter