import express from 'express';
import {
  addAttribute,
  addAllAttributes,
  getAllAttributes,
  getShowingAttributes,
  getAttributeById,
  updateAttributes,
  updateStatus,
  deleteAttribute,
  getShowingAttributesTest,
  updateChildStatus,
  deleteChildAttribute,
  addChildAttributes,
  updateChildAttributes,
  getChildAttributeById,
  updateManyAttribute,
  deleteManyAttribute,
  updateManyChildAttribute,
  deleteManyChildAttribute,
} from '../controller/attributeController.js';

const router = express.Router();

//add attribute
router.post('/add', addAttribute);

//add all attributes
router.post('/add/all', addAllAttributes);

//add child attribute
router.put('/add/child/:id', addChildAttributes);

//get all attribute
router.get('/', getAllAttributes);

//get showing attribute
router.get('/show', getShowingAttributes);

router.put('/show/test', getShowingAttributesTest);

//update many attributes
router.patch('/update/many', updateManyAttribute);

//get attribute by id
router.get('/:id', getAttributeById);

//child get attributes by id
router.get('/child/:id/:ids', getChildAttributeById);

//update attribute
router.put('/:id', updateAttributes);

//update child attribute
router.patch('/update/child/many', updateManyChildAttribute);

//update child attribute
router.put('/update/child/:attributeId/:childId', updateChildAttributes);

//show/hide a attribute
router.put('/status/:id', updateStatus);

//show and hide a child status
router.put('/status/child/:id', updateChildStatus);

//delete attribute
router.delete('/:id', deleteAttribute);

//delete child attribute
router.put('/delete/child/:attributeId/:childId', deleteChildAttribute);

//delete many attribute
router.patch('/delete/many', deleteManyAttribute);

//delete many child attribute
router.patch('/delete/child/many', deleteManyChildAttribute);

export default router;
