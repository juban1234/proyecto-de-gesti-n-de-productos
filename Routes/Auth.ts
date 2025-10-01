import express from "express";
import metodosProductos from "../controllers/controlerUser";

const router = express.Router();

router.post('/agregarProducto',metodosProductos.createProduct); // Funcional
// router.post('/Register' ,validatorParams, validator, register); // Funcional

export default router;

