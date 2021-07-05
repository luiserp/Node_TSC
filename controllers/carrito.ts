import { Request, Response } from "express";
import Carrito from "../models/carrito";
import Producto from '../models/producto';

// Devuelve el carrito del usuario especificado en el loguiado
export const getCarrito = async (req: Request, res: Response) =>{
    const { usuario } = req;
    const {count:total, rows:carrito} = await Carrito.findAndCountAll( { 
        where: {
            UsuarioId: usuario.id
        },
        include: ['Producto']
    });

    res.json({
        total,
        carrito     
    })
};

export const annadirProductoAlcarrito = async(req: Request, res: Response) => {

    const { id } = req.params;
    const { usuario } = req;
    const cantidad  = parseInt(req.body.cantidad);

    try{
        // Producto a añadir
        const producto = await Producto.findByPk(id);
        // Queda en almacen?
        if(producto.cantidad == 0){
            return res.status(400).json('El producto esta agotado')       
        }
        if(producto.cantidad < cantidad){
            return res.status(400).json(`No es posible agregar ${cantidad} unidades del producto: ${producto.nombre}, quedan ${producto.cantidad}`)       
        }
        const compra = await Carrito.findOne({
            where: {
                UsuarioId: usuario.id,
                ProductoId: id
        }});
        if(compra){ return res.status(400).json({msg: 'El producto ya esta agregado'})}

        // Se crea el carrito y resta la cantidad
        await Promise.all([
            await Carrito.create({UsuarioId: usuario.id, ProductoId: producto.id, cantidad}),
            await producto?.update({cantidad: producto.cantidad - cantidad })
        ]);
        
            
        res.json({msg: 'Producto añadido', producto, cantidad})
    }catch(err){
        console.log(err);
        return res.status(400).json('El producto no existe')        
    }
}

export const eliminarProductoDelCarrito = async (req: Request, res: Response) =>{
    const { usuario } = req;
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    try{
        const compra = await Carrito.findOne({
            where: {
                UsuarioId: usuario.id,
                ProductoId: id
        }});
        if(!compra){ return res.status(400).json({msg: "Usted no tiene el producto en el carrito -NO es posible eliminarlo"})}
        
        producto?.update({cantidad: producto.cantidad + compra.cantidad});
        await compra.destroy();

        res.json({msg: 'Producto eliminado'});
    }catch(err){
        console.log(err);;
        return res.status(400).json({msg: `El producto no esta en el carrito`})
        
    }
}