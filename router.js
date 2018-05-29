/** Requires */
const express = require('express');
const router = express.Router();

// Assigns Routes
router.use('/sample', require('./resources/sample'));
router.use('/', require('./resources/root'));

/** Exports */
module.exports = router;
