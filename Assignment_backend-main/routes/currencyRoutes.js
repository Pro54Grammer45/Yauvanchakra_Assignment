import express from 'express';
import {
  addCurrency,
  addAllCurrency,
  getAllCurrency,
  getShowingCurrency,
  getCurrencyById,
  updateCurrency,
  updateEnabledStatus,
  deleteCurrency,
  updateManyCurrency,
  deleteManyCurrency,
} from '../controller/currencyController.js';

const router = express.Router();

//add a currency
router.post('/add', addCurrency);

//add all currencies
router.post('/add/all', addAllCurrency);

//get all currencies
router.get('/', getAllCurrency);

//get showing currencies
router.get('/show', getShowingCurrency);

//get currency by id
router.get('/:id', getCurrencyById);

//update currency
router.put('/:id', updateCurrency);

//show/hide a currency
router.put('/status/:id', updateEnabledStatus);

//delete currency
router.delete('/:id', deleteCurrency);

//update many currencies
router.patch('/update/many', updateManyCurrency);

//delete many currencies
router.patch('/delete/many', deleteManyCurrency);

export default router;
