/** Requires */
const express = require('express');
const router = express.Router();
const controller = require('./controller');

/** Routes */
router.post('/', controller.create);
router.get('/:id', controller.retrieve);

/** Exports */
module.exports = router;
