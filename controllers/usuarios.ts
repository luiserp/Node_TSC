
import { Request, Response } from "express";
import bcryptjs from "bcryptjs";

import Usuario from '../models/usuario';


export const getUsuarios = async(req:Request, res:Response) =>{

    // const [total, usuarios] = await Promise.all([
    //     await Usuario.count( {where: { estado: true }} ), 
    //     await Usuario.findAll({where: { estado: true }})
    // ]);
    const {count: total, rows: usuarios } = await Usuario.findAndCountAll({
        where: { estado: true }
    });

    res.json({
        total,
        usuarios
    });
}

export const getUsuario =  async(req:Request, res:Response) =>{
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if(!usuario) return res.status(400).json({msg: `No existe usuario con id ${id}`});
    res.json(usuario);
}

export const postUsuario = async (req:Request, res:Response) =>{
    let { nombre, correo, contrasenna } = req.body;

    // Enciptar contrasenna
    const salt = bcryptjs.genSaltSync();
    contrasenna = bcryptjs.hashSync(contrasenna, salt);
    try{
        const usuario = await Usuario.create({nombre, correo, contrasenna});
        res.json(usuario);
    }catch(err){ console.log(err) }
}

export const putUsuario = async(req:Request, res:Response) =>{
    const { id } = req.params;
    let { estado, createdAt, UpdatedAt, ...resto } = req.body;
    try{
        const usuario = await Usuario.findByPk(id);
        if(!usuario){ 
            return res.status(400).json({msg: `No existe usuario con id ${id}`}) 
        }
        // Enciptar contrasenna
        if(resto.contrasenna){
            const salt = bcryptjs.genSaltSync();
            resto.contrasenna = bcryptjs.hashSync(resto.contrasenna, salt);
        }

        await usuario.update( resto );
        res.json({
            usuario
        });
    }catch(err){ console.log(err) };
}


export const deleteUsuario = async (req:Request, res:Response) =>{
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if(!usuario){ 
        return res.status(400).json({msg: `No existe usuario con id ${id}`}) 
    }
    usuario.update({estado: false});    
    res.json(usuario);
}
