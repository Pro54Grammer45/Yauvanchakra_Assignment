import express from 'express';
import {
  registerAdmin,
  loginAdmin,
  forgetPassword,
  resetPassword,
  addStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
  updatedStatus,
} from '../controller/adminController.js';
import { passwordVerificationLimit } from '../lib/email-sender/sender.js';

const router = express.Router();

//register a staff
router.post("/register", registerAdmin);

//login a admin
router.post("/login", loginAdmin);

//forget-password
router.put("/forget-password", passwordVerificationLimit, forgetPassword);

//reset-password
router.put("/reset-password", resetPassword);

//add a staff
router.post("/add", addStaff);

//get all staff
router.get("/", getAllStaff);

//get a staff
router.post("/:id", getStaffById);

//update a staff
router.put("/:id", updateStaff);

//update staf status
router.put("/update-status/:id", updatedStatus);

//delete a staff
router.delete("/:id", deleteStaff);

export default router;
