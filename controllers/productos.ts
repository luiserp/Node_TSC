import { Request, Response } from "express";
import Producto from "../models/producto";
import Carrito from "../models/carrito";

export const getProductos = async( req: Request, res: Response) => {
    const { count: total, rows: productos } = await Producto.findAndCountAll();
    res.json({
        total,
        productos
    });
}