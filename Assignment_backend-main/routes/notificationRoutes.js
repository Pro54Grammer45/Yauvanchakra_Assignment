import express from 'express';
import {
  getAllNotification,
  addNotification,
  updateStatusNotification,
  deleteNotificationById,
  deleteNotificationByProductId,
  deleteManyNotification,
  updateManyStatusNotification,
} from '../controller/notificationController.js';

const router = express.Router();

// add a notification on database
router.post('/add', addNotification);

// get all notification
router.get('/', getAllNotification);

// update notification status
router.put('/status/:id', updateStatusNotification);

// update many
router.patch('/update/many', updateManyStatusNotification);

// delete notification by id
router.delete('/:id', deleteNotificationById);

// delete notification by product id
router.delete('/product-id/:id', deleteNotificationByProductId);

// delete many
router.patch('/delete/many', deleteManyNotification);

export default router;
