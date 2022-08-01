// import all API routes to prefix their endpoint names and package them up
const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes');
const commentRoutes = require('./comment-routes');

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
router.use('/pizzas', pizzaRoutes);
// prefix `/comments`
router.use('/comments', commentRoutes);

module.exports = router;