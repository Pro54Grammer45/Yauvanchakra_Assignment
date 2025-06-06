import express from 'express';
import {
  addCategory,
  addAllCategory,
  getAllCategory,
  getShowingCategory,
  getCategoryById,
  updateCategory,
  updateStatus,
  deleteCategory,
  updateManyCategory,
  deleteManyCategory,
} from '../controller/categoryController.js';

const router = express.Router();

//add a category
router.post('/add', addCategory);

//add all categories
router.post('/add/all', addAllCategory);

//get all categories
router.get('/', getAllCategory);

//get showing categories
router.get('/show', getShowingCategory);

//get category by id
router.get('/:id', getCategoryById);

//update category
router.put('/:id', updateCategory);

//show/hide a category
router.put('/status/:id', updateStatus);

//delete category
router.delete('/:id', deleteCategory);

//update many categories
router.patch('/update/many', updateManyCategory);

//delete many categories
router.patch('/delete/many', deleteManyCategory);

export default router;
