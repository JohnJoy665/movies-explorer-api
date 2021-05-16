const router = require('express').Router();
const auth = require('../middlewares/auth.js');
const usersRouter = require('./users.js');
const moviesRouter = require('./movies.js');
const authorizationRouter = require('./authorization.js');
const NotFound = require('../errors/NotFound.js');

router.use(authorizationRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.use(() => {
  throw new NotFound('ресур не найден');
});

module.exports = router;
