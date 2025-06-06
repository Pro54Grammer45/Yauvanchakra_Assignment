import express from 'express';
import {
  addOrder,
  getOrderById,
  getOrderCustomer,
  createPaymentIntent,
  addRazorpayOrder,
  createOrderByRazorPay,
  sendEmailInvoiceToCustomer,
} from '../controller/customerOrderController.js';
import { emailVerificationLimit } from '../lib/email-sender/sender.js';

const router = express.Router();

//add a order
router.post('/add', addOrder);

//get order by id
router.get('/:id', getOrderById);

//get order by customer id
router.get('/customer/:id', getOrderCustomer);

//create payment intent
router.post('/create-payment-intent', createPaymentIntent);

//add razorpay order
router.post('/razorpay/add', addRazorpayOrder);

//create order by razorpay
router.post('/razorpay/create', createOrderByRazorPay);

//send email invoice to customer
router.post('/customer/invoice', emailVerificationLimit, sendEmailInvoiceToCustomer);

export default router;
