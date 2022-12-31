const express = require('express');
const factController = require('../controllers/fact.controller');

const router = express.Router();

router.route('/').post(factController.createFact).get(factController.getFacts);
router
  .route('/:id')
  .get(factController.getFact)
  .patch(factController.updateFact)
  .delete(factController.deleteFact);

module.exports = router;
