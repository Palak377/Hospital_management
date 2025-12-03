import express from "express";
import { updateDoctor, deleteDoctor, getAllDoctors, getSingleDoctor, getDoctorProfile,  getAll, updateDoctorStatus} from "../controllers/doctorController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
const router = express.Router();

import reviewRouter from "../routes/review.js"

//doctor routes
router.get("/", getAllDoctors);
router.get("/all", getAll);
router.get("/:id",getSingleDoctor);
router.put("/:id", authenticate,restrict(['doctor','admin','patient']),updateDoctor);
router.delete("/:id", authenticate,restrict(['doctor']),deleteDoctor);
router.get("/profile/me", authenticate ,restrict(['doctor']), getDoctorProfile);
router.put("/updateStatus/:doctorId", updateDoctorStatus);
//router.delete("/deleteAccount", authenticate,deleteDoctorAccount);

//review routes
router.use("/:doctorId/reviews", reviewRouter);

export default router;