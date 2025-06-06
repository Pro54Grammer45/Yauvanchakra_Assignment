import express from 'express';
import {
  addCoupon,
  addAllCoupon,
  getAllCoupons,
  getShowingCoupons,
  getCouponById,
  updateCoupon,
  updateStatus,
  deleteCoupon,
  updateManyCoupons,
  deleteManyCoupons,
} from '../controller/couponController.js';

const router = express.Router();

//add a coupon
router.post('/add', addCoupon);

//add all coupons
router.post('/add/all', addAllCoupon);

//get all coupons
router.get('/', getAllCoupons);

//get showing coupons
router.get('/show', getShowingCoupons);

//get coupon by id
router.get('/:id', getCouponById);

//update coupon
router.put('/:id', updateCoupon);

//show/hide a coupon
router.put('/status/:id', updateStatus);

//delete coupon
router.delete('/:id', deleteCoupon);

//update many coupons
router.patch('/update/many', updateManyCoupons);

//delete many coupons
router.patch('/delete/many', deleteManyCoupons);

export default router;
