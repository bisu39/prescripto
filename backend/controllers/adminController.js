import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js'


// function for adding doctor
const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;
        const imageFile = req.file;
        //  checking for all data
        if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address) {
            return res.json({ success: false, message: "Missing Details" })
        }
        // validating email
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid Email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Choose a strong password" })
        }
        // hashing docotor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // image upload to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image",
        });
        const imageUrl = imageUpload.secure_url;

        const doctorData = {
            name, email, speciality, degree, experience, about, fees,
            password: hashedPassword,
            address: JSON.parse(address),
            image: imageUrl,
            date: Date.now()
        }
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();
        res.json({ success: true, message: 'Doctor add' });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// function for admin login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (process.env.ADMIN_EMAIL === email && process.env.ADMIN_PASSWORD === password) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
//  function to get all doctors
const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password');
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// function to get all appointments
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find()
        res.json({ success: true, appointments })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
// function to appointment cancellation for admin
const appointmentCanel = async (req, res) => {
    try {
        const { appointmentId } = req.body
        const appointmentData = await appointmentModel.findById(appointmentId)

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
        // releasing canceled slot
        const { docId, slotDate, slotTime } = appointmentData
        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId, { slots_booked })
        res.json({ success: true, message: "Appointment canceled" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
// function to get admin dashboard data
const adminDashboard = async (req, res) => {
    try {
        const doctors = await doctorModel.find()
        const users = await userModel.find()
        const appointments = await appointmentModel.find()
        const dashData = {
            doctors: doctors.length,
            appointments: allDoctors.length,
            patients: users.length,
            latestAppointments :appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashData})
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export { addDoctor, loginAdmin, allDoctors, appointmentsAdmin, appointmentCanel,adminDashboard }