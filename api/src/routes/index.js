const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const dogsRouter = require('./dogsRouter');
const temperamentsRouter = require('./temperamentsRouter');

router.use('/dogs', dogsRouter);
router.use('/temperaments', temperamentsRouter);






module.exports = router;

