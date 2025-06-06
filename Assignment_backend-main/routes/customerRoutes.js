import express from 'express';
import {
  loginCustomer,
  registerCustomer,
  verifyPhoneNumber,
  signUpWithProvider,
  signUpWithOauthProvider,
  verifyEmailAddress,
  forgetPassword,
  changePassword,
  resetPassword,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  addAllCustomers,
  addShippingAddress,
  getShippingAddress,
  updateShippingAddress,
  deleteShippingAddress,
} from '../controller/customerController.js';
import {
  passwordVerificationLimit,
  emailVerificationLimit,
  phoneVerificationLimit,
} from '../lib/email-sender/sender.js';

const router = express.Router();

//verify email
router.post("/verify-email", emailVerificationLimit, verifyEmailAddress);

//verify phone number
router.post("/verify-phone", phoneVerificationLimit, verifyPhoneNumber);

// shipping address send to array
router.post("/shipping/address/:id", addShippingAddress);

// get all shipping address
router.get("/shipping/address/:id", getShippingAddress);

// shipping address update
router.put("/shipping/address/:userId/:shippingId", updateShippingAddress);

// shipping address delete
router.delete("/shipping/address/:userId/:shippingId", deleteShippingAddress);

//register a user
router.post("/register/:token", registerCustomer);

//login a user
router.post("/login", loginCustomer);

//register or login with google and fb
router.post("/signup/oauth", signUpWithOauthProvider);

//register or login with google and fb
router.post("/signup/:token", signUpWithProvider);

//forget-password
router.put("/forget-password", passwordVerificationLimit, forgetPassword);

//reset-password
router.put("/reset-password", resetPassword);

//change password
router.post("/change-password", changePassword);

//add all customers
router.post('/add/all', addAllCustomers);

//get all customers
router.get('/', getAllCustomers);

//get customer by id
router.get('/:id', getCustomerById);

//update customer
router.put('/:id', updateCustomer);

//delete customer
router.delete('/:id', deleteCustomer);

export default router;
