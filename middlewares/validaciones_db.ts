import { Request, Response } from "express";
import Usuario from "../models/usuario";


export const existeCorreoEnTablaUsuario = async (req: Request, res: Response, next:Function) =>{
    const { correo } = req.body;
    const usuario = await Usuario.findOne({
        where: {
            correo
        }
    });
    if(usuario){
        return res.status(400).json({msg: "EL correo usado ya esta registrado en la base de datos"})
    }
    next();
}

export const esADminRol = (req: Request, res: Response, next:Function)=>{
    const usuario = req.usuario;
    // console.log(usuario);
    if(usuario?.rol !== 'ADMIN_ROL'){
        return res.status(401).json({msg: `No tiene permisos suficuentes`});
    }
    next();
}

export const esMismoUsuarioOAdmin = (req: Request, res: Response, next:Function)=>{
    const { id:idUsuario } = req.usuario;
    const { id:idPeticion } = req.params;
    if(idUsuario==idPeticion){
        return next();        
    }
    esADminRol(req, res, next);
}