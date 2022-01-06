import { Request, Response } from "express";
import Producto from "../models/producto";
import Carrito from "../models/carrito";
import { UniqueConstraintError } from "sequelize/types";

export const getProductos = async( req: Request, res: Response) => {
    const { count: total, rows: productos } = await Producto.findAndCountAll();
    res.json({
        total,
        productos
    });
}

export const postProducto = async( req: Request, res: Response) => {
    const { nombre, precio, cantidad } = req.body;
    try{
        const producto = await Producto.create({nombre, precio, cantidad});
        res.send({
            producto
        })
    }catch(err){
        console.log(err);
            
    }
}

export const putProducto = async( req: Request, res: Response) => {
    const { id } = req.params;
    const { createdAt, updatedAt, ...resto } = req.body;

    const producto = await Producto.findByPk(id);
    if(!producto) {return res.status(400).json({msg: `No existe producto con id ${id}`})};

    producto.update(resto);
    res.json(producto);
}

export const deleteProducto = async( req: Request, res: Response) => {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);
    if(!producto) { return res.status(400).json({msg: `No existe producto con id ${id}`})}
    
    producto.destroy();

    res.json({msg: `Producto ${producto.nombre} eliminado`});
}