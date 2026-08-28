import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRouter from './routes/adminRoute.js';
import doctorRouter from './routes/doctorRoute.js';
import userRouter from './routes/userRoute.js';

// app configuration
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();
const app = express();
// home route
app.get('/', (req, res) => {
    res.send('Server is running');
});

// middlewares

app.use(cors());
//json data parsing to object and adding to req.body
app.use(express.json());

//api endpoints mountings
app.use('/api/doctor',doctorRouter)
app.use('/api/admin',adminRouter)
app.use('/api/user',userRouter)
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});