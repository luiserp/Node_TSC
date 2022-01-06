import Producto from "../models/producto";

export const existeProductoConNombre = async ( nombre = '' )=>{
    const producto = await Producto.findOne({
        where: {
            nombre
        }
    });
    if(producto) { throw new Error(`El producto con nombre ${nombre} ya existe`) };
}