import express from "express";
import { getAllMessages, newMessage } from "../controllers/messageController.js";
const router = express.Router();

router.get("/getAll", getAllMessages);
router.post("/", newMessage);

export default router;