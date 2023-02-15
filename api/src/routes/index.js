const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerDog = require("../routes/routerDog.js");
const routerTemper = require("../routes/routerTemper.js");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', routerDog); //
router.use('/temper', routerTemper);

module.exports = router;
