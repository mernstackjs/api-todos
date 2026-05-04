const { Router } = require('express');

const router = Router();

const todosRoutes = require('./api/todo');
const authRoutes = require('./api/auth');

router.use('/todos', todosRoutes);
router.use('/auth', authRoutes);

module.exports = router;
