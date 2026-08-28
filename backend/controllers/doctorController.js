import doctorModel from '../models/doctorModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js'

// function to change the availability
const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: "Availability updated successfully" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function to get all the doctors
const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function for login doctor
const loginDoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: "Invalid credentials" })
        }
        const isMatched = await bcrypt.compare(password, doctor.password)
        if (isMatched) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_DOC_SECRET)
            res.json({ success: true, token })
        } else {
            return res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req
        const appointments = await appointmentModel.find({ docId })
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const { docId } = req
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isComplete: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        } else {
            return res.json({ success: false, message: 'Invalid Request' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function to cancel appointment  for doctor panel
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const { docId } = req
        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        } else {
            return res.json({ success: false, message: 'Cancellation failed' })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {
        const { docId } = req
        const appointments = await appointmentModel.find({ docId })
        let earnings = 0
        let patients = []
        appointments.map((item) => {
            if (item.isComplete || item.payment) {
                earnings += item.amount
            }

            appointments.map((item) => {
                if (!patients.includes(item.userId)) {
                    patients.push(item.userId)
                }
            })
        })
        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }
        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function to get doctor profile for doctor panel
const doctorProfile = async (req, res) => {
    try {
        const { docId } = req
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({ success: true, profileData })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function to update doctor profile data from doctor panel
const updateDoctorProfile = async (req, res) => {
    try {
        const { docId } = req

        const { fees, address, available } = req.body
        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })
        res.json({success:true,message:'Profile updated'})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export { changeAvailability,updateDoctorProfile, doctorList, doctorProfile, loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard }