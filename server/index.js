import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import doctorRoute from "./routes/doctor.js";
import reviewRoute from "./routes/review.js";
import bookingRoute from "./routes/booking.js";
import messageRoute from "./routes/message.js";

dotenv.config();
const app  = express();
const corsOption = {
  origin: true,
  methods: ["POST", "GET", "PUT", "DELETE"],
  credentials: true
};

const connectDB = async ()=>{
    try{
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected successfully");
    }catch(err){
        console.log(err);
        console.log("Connection failed ")
    }
}

// import bcrypt from "bcryptjs";
// import User from "./models/UserSchema.js";

// app.get("/create-admin", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash("Admin@123", 10);

//     const admin = await User.create({
//       name: "Super Admin",
//       email: "admin@gmail.com",
//       password: hashedPassword,
//       role: "admin",
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Admin created",
//       admin,
//     });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// });

app.get("/",(req,res)=>{
    res.send("Home route is working");
});

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOption));
app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/doctors", doctorRoute);
app.use("/reviews", reviewRoute);
app.use("/bookings", bookingRoute);
app.use("/messages", messageRoute);


app.listen(5000,()=>{
    connectDB();
    console.log("app is listening to port 5000");
})