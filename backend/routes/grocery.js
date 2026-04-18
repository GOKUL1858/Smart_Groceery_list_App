const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const { addItem, getItems, updateItem, deleteItem } = require('../controllers/groceryController');
router.use(protect);

router.post('/', addItem);
router.get('/', getItems);
router.put('/:id', updateItem);
router.delete('/:id', deleteItem);

module.exports = router;
