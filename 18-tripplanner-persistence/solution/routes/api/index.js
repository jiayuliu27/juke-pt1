var router = require('express').Router();

router.use(require('./attractions'));
router.use('/days/', require('./days'));

module.exports = router;
