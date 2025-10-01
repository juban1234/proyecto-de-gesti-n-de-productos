import express from "express";
import metodosProductos from "../controllers/controlerUser";

const router = express.Router();

router.post('/agregarProducto',metodosProductos.createProduct); // Funcional
router.get('/verProductos', metodosProductos.GetProductos); // Nuevo endpoint para ver productos
router.post('/compraProducto',metodosProductos.compraProducto)

export default router;

