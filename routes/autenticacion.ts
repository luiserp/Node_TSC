import { Router } from "express";
import { login } from '../controllers/autenticacion';
import { check } from 'express-validator';
import { validarCampos } from "../middlewares/resultado_de_validaciones";
import { existeCorreoEnTablaUsuario } from '../middlewares/validaciones_db';

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('contrasenna', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos,
],login);



export default router;