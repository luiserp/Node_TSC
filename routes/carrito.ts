import { Router } from "express";
import { annadirProductoAlcarrito, getCarrito, eliminarProductoDelCarrito } from '../controllers/carrito';
import { validarJWT } from '../middlewares/validarJWT';

const router = Router();

router.get('/', [
    validarJWT
] , getCarrito );

// Añadir producto por id al carrito
router.post('/agregar/:id', [
    validarJWT
], annadirProductoAlcarrito);


router.delete('/eliminar/:id', [
    validarJWT
],eliminarProductoDelCarrito);
export default router;