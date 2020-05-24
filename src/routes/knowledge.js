const express = require('express');
const knowledgeController = require('../controllers/knowledge');
const knowledge = require('../utils/knowledge/knowledge-validations');
const isAuth = require('../middlewares/is-auth');

const router = express.Router();
// POST /knowledge
router.post('/knowledge/new/:categoryId', isAuth, knowledge, knowledgeController.createKnowledge);
// GET /knowledges
router.get('/knowledges', knowledgeController.getAllknowledges);
// GET /knowledge/:knowledgeId
router.get('/knowledge/:knowledgeId', knowledgeController.getknowledge);
// PATCH /knowledge/:knowledgeId
router.patch('/knowledge/edit/:knowledgeId', isAuth, knowledge, knowledgeController.updateKnowledge);
// DELETE /knowledge/:knowledgeId
router.delete('/knowledge/delete/:knowledgeId', isAuth, knowledgeController.deleteknowledge);
// GET /knowledge/active
router.get('/knowledges-active-category/:categoryId', knowledgeController.getCategoryActiveKnowledges)

module.exports = router;