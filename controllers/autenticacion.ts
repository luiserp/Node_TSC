import { Request, Response } from "express";
import Usuario  from "../models/usuario";
import bcryptjs from 'bcryptjs';
import { generearJWT } from '../helpers/generarJWT';


export const login = async( req:Request, res:Response )=>{
    let { correo, contrasenna } = req.body;

    // Verificar que usuario existe
    const usuario = await Usuario.findOne({
        where: {
            correo,
        }
    });
    if(!usuario){ return res.status(400).json({msg: `No existe el correo ${correo} en la base de datos`}) }

    // Verificar que el usuario este habilitado    
    if(!usuario.getDataValue('estado')){
        return res.status(400).json({msg: "El usuario esta desabilitado"})
    }
    
    // Verificar contraseña
    const contValida = bcryptjs.compareSync(contrasenna, usuario.get()['contrasenna'] );
    if(!contValida){ return res.status(400).json({msg: `Contraseña incorecta`}) }

    const token = await generearJWT(usuario.get()['id']);

    res.json({
        usuario,
        token
    })
}