import validator from 'validator'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointmentModel from '../models/appointmentModel.js'
import razorpay from 'razorpay'

dotenv.config()
// function to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Details missing' })
        }
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: 'Email is not valid' })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Choose a strong password' })
        }
        // password hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const userData = {
            name,
            email,
            password: hashedPassword
        }
        const newUser = new userModel(userData)
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function to login user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user does not exists" })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_USER_SECRET)
            res.json({ success: true, token })

        } else {
            res.json({ success: false, message: "Invalid credentials" })

        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function to reset password
const resetPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user does not exists" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: 'Choose a strong password' })
        } else {
            // password hashing
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            // comparing password
            const isMatch = await bcrypt.compare(password, user.password)
            if (isMatch) {
                return res.json({ success: false, message: "this password is used before try new one" })
            }
            user.password = hashedPassword;
            user.save()
            return res.json({ success: true, message: 'Password reseted successfully. Login with new password now' })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function to get user profile data
const getProfile = async (req, res) => {
    try {
        const userId = req.userId
        const userData = await userModel.findOne({ _id: userId }).select('-password')
        res.json({ success: true, userData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function to update user profile data
const updateProfile = async (req, res) => {
    try {
        const { name, phone, address, dob, gender } = req.body
        const userId = req.userId
        const imagefile = req.file
        if (!name || !phone || !address || !dob || !gender) {
            return res.json({ success: false, message: "Data missing" })
        }
        await userModel.findByIdAndUpdate(userId, { name, phone, address: JSON.parse(address), dob, gender })
        if (imagefile) {
            // image upload to cloudinary
            const imageUpload = await cloudinary.uploader.upload(imagefile.path, { resource_type: 'image' })
            const imageURL = imageUpload.secure_url
            await userModel.findByIdAndUpdate(userId, { image: imageURL })
        }
        res.json({ success: true, message: 'Profile updated' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function to book an appointment
const bookAppointment = async (req, res) => {
    try {
        const { docId, slotDate, slotTime } = req.body
        const docData = await doctorModel.findOne({ _id: docId }).select('-password')
        const userId = req.userId
        if (!docData.available) {
            return res.json({ success: false, message: 'Doctor not available' })
        }
        let slots_booked = docData.slots_booked
        // checking for slots avilablity
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                return res.json({ success: false, message: 'Slot not available' })
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }
        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked
        const appointmentData = {
            userId,
            docId,
            userData,
            docData,
            amount: docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData)
        await newAppointment.save()

        //  save new slots booked data in docData
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: 'Appointment Booked' })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function to get user appointments for frontend my appointment page
const listAppointment = async (req, res) => {
    try {
        const userId = req.userId
        const appointments = await appointmentModel.find({ userId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
//function to cancel appointment
const calcelAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const userId = req.userId
        const appointmentData = await appointmentModel.findById(appointmentId)
        // verifing appointment user
        if (appointmentData.userId !== userId) {
            return res.json({ success: false, message: "Unauthorized action" })
        } else {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            // releasing canceled slot
            const { docId, slotDate, slotTime } = appointmentData
            const doctorData = await doctorModel.findById(docId)
            let slots_booked = doctorData.slots_booked
            slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
            await doctorModel.findByIdAndUpdate(docId, { slots_booked })
            res.json({ success: true, message: "Appointment canceled" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const razorpayInstance = process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
    ? new razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    })
    : null

// fucntion to make payment for appointment using razorpay
const paymentRazorpay = async (req, res) => {
    const { appointmentId } = req.body
    try {
        if (!razorpayInstance) {
            return res.json({ success: false, message: 'Razorpay is not configured. Check your env values.' })
        }

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (!appointmentData || appointmentData.cancelled) {
            return res.json({ success: false, message: "appointment cancelled or not found" })
        }
        // creating options for razorpay payment
        const options = {
            amount: appointmentData.amount * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentId,
        }
        // creation of an order
        const order = await razorpayInstance.orders.create(options)
        res.json({ success: true, order })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}
// function to verify payment of razorpay
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body
        const oderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if (oderInfo.status === 'paid') {
            await appointmentModel.findByIdAndUpdate(oderInfo.receipt, { payment: true })
            res.json({ success: true, message: 'Payment successful' })
        }
        else {
            res.json({ success: false, message: 'Payment failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, calcelAppointment, paymentRazorpay, verifyRazorpay, resetPassword }