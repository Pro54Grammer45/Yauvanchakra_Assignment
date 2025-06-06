import express from 'express';
import {
  getAllOrders,
  getOrderById,
  getOrderCustomer,
  updateOrder,
  deleteOrder,
  getDashboardOrders,
  getDashboardRecentOrder,
  getBestSellerProductChart,
  getDashboardCount,
  getDashboardAmount,
} from '../controller/orderController.js';

const router = express.Router();

//get all orders
router.get('/', getAllOrders);

//get order by id
router.get('/:id', getOrderById);

//get order by customer id
router.get('/customer/:id', getOrderCustomer);

//update order
router.put('/:id', updateOrder);

//delete order
router.delete('/:id', deleteOrder);

//get dashboard orders
router.get('/dashboard/orders', getDashboardOrders);

//get dashboard recent orders
router.get('/dashboard/recent-orders', getDashboardRecentOrder);

//get dashboard best seller products
router.get('/dashboard/best-seller', getBestSellerProductChart);

//get dashboard count
router.get('/dashboard/count', getDashboardCount);

//get dashboard amount
router.get('/dashboard/amount', getDashboardAmount);

export default router;
