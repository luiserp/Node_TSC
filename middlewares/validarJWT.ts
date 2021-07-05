import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import Usuario from "../models/usuario";


export const validarJWT = async(req: Request, res: Response, next:Function)=>{
     
    const token = req.header('x-token');
    if(!token){
        return res.status(401).json({msg: 'Debe logiarse primero'})
    }
    
    try{
        const { uid } = jwt.verify(token,process.env.SECRETKEY || 'SECRETKEY159!');
        const usuario = await Usuario.findByPk(uid);
        
        if(!usuario?.getDataValue('estado')){ 
            return res.status(401).json({
                msg: `EL usuario con correo ${usuario?.get()['correo']} esta desabilitado`
        })};
        
        req.usuario = usuario;
        
        next();
    }catch(err){
        // console.log(err)
        return res.status(401).json({msg: 'Token no valido -Debe loguiarse denuevo'})
    }
}

