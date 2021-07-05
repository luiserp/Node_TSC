import { Router } from "express";
import { check } from "express-validator";
import { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } from '../controllers/usuarios';
import { validarCampos } from '../middlewares/resultado_de_validaciones';
import { existeCorreoEnTablaUsuario, esADminRol, esMismoUsuarioOAdmin } from '../middlewares/validaciones_db';
import { validarJWT } from '../middlewares/validarJWT';

const router  = Router();


router.get('/',       getUsuarios);
router.get('/:id',    getUsuario);

router.post('/',   [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('contrasenna', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
    existeCorreoEnTablaUsuario,
],
  postUsuario);

router.put('/:id',  [
  validarJWT,
  esMismoUsuarioOAdmin

],  putUsuario);

router.delete('/:id', [
  validarJWT,
  check('id', 'El id es obligatorio').not().isEmpty(),
  validarCampos,
  esMismoUsuarioOAdmin
], deleteUsuario);

export default router;