import express from 'express';
import {
  addGlobalSetting,
  getGlobalSetting,
  updateGlobalSetting,
  addStoreSetting,
  getStoreSetting,
  updateStoreSetting,
  getStoreSeoSetting,
  addStoreCustomizationSetting,
  getStoreCustomizationSetting,
  updateStoreCustomizationSetting,
} from '../controller/settingController.js';

const router = express.Router();

//add a global setting
router.post('/global/add', addGlobalSetting);

//get global setting
router.get('/global', getGlobalSetting);

//update global setting
router.put('/global/:id', updateGlobalSetting);

//add a store setting
router.post('/store/add', addStoreSetting);

//get store setting
router.get('/store', getStoreSetting);

//update store setting
router.put('/store/:id', updateStoreSetting);

//get store seo setting
router.get('/store/seo', getStoreSeoSetting);

//add a online store customization setting
router.post('/store/customization/add', addStoreCustomizationSetting);

//get online store customization setting
router.get('/store/customization/all', getStoreCustomizationSetting);

//update online store customization setting
router.put('/store/customization/:id', updateStoreCustomizationSetting);

export default router;
