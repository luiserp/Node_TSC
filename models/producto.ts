import { DataTypes, Model } from "sequelize";
import db from "../db/conexion";

class Producto extends Model {}

Producto.init({
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize: db,
    modelName: 'Productos'
});

// Crear la tabla y en caso de q exista la altera para que coincida con el modelo
Producto.sync({ alter: true })

Producto.prototype.toJSON = function() {
    const { createdAt, updatedAt, cantidad, ...resto } = Object.assign( {}, this.get());
    return resto;
}

export default Producto;