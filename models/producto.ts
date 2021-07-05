import { DataTypes } from "sequelize";
import db from "../db/conexion";

const Producto = db.define('Producto', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

// Crear la tabla y en caso de q exista la altera para que coincida con el modelo
Producto.sync({ alter: true })

Producto.prototype.toJSON = function() {
    const { createdAt, updatedAt, cantidad, ...resto } = Object.assign( {}, this.get());
    return resto;
}

export default Producto;