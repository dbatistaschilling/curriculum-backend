const express = require('express');
const categoryController = require('../controllers/category');
const category = require('../utils/category/category-validations');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();
// POST /category/new
router.post('/category/new', isAuth, category, categoryController.createCategory);
// GET /categories
router.get('/categories', categoryController.getAllCategories);
// GET /category/:categoryId
router.get('/category/:categoryId', categoryController.getCategory);
// GET /category/:categoryId
router.get('/category-knowledges/:categoryId', categoryController.getCategoryKnowledges);
// PATCH /category/:categoryId
router.patch('/category/edit/:categoryId', isAuth, category, categoryController.updateCategory);
// DELETE /category/:categoryId
router.delete('/category/delete/:categoryId', isAuth, categoryController.deleteCategory);

module.exports = router;