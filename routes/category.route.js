const express = require('express');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.route('/').post(categoryController.createCategory).get(categoryController.getCategories);
router
  .route('/:id')
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
