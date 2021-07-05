import { DataTypes } from 'sequelize';

import db from "../db/conexion";
import Producto from './producto';
import Usuario from './usuario';

const Carrito = db.define('Carrito', {
    UsuarioId: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        },
        allowNull: false
    },
    ProductoId: {
        type: DataTypes.INTEGER,
        references: {
            model: Producto,
            key: 'id'
        },
        allowNull: false
    },
    cantidad: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    }
}, {tableName: 'carrito'});

Carrito.belongsTo(Usuario, { as: 'Usuario', foreignKey: 'UsuarioId'})
Carrito.belongsTo(Producto, { as: 'Producto', foreignKey: 'ProductoId'})

Carrito.prototype.toJSON = function() {
    var { UsuarioId, ProductoId, createdAt, updatedAt, ...resto } = Object.assign({}, this.get());
    return resto;
}

// Crear la tabla y en caso de q exista la altera para que coincida con el modelo
// Carrito.sync({ force: true })

export default Carrito;