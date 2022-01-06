import { Router } from "express";
import { check } from "express-validator";
import { deleteProducto, getProductos, postProducto, putProducto } from '../controllers/productos';
import { validarCampos } from '../middlewares/resultado_de_validaciones';
import { existeProductoConNombre } from '../helpers/validaciones_db';

const router  = Router();

router.get('/', getProductos);
router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('nombre').custom( existeProductoConNombre) ,
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
    validarCampos,
], postProducto);

router.put('/:id', putProducto);
router.delete('/:id', deleteProducto);

export default router;