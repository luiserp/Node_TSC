import { DataTypes } from "sequelize";
import db from "../db/conexion";

const Usuario = db.define('Usuario', {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    correo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contrasenna: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue: 'USER_ROL'
    }
});

// Crear la tabla y en caso de q exista la altera para que coincida con el modelo
Usuario.sync({ alter: true })

Usuario.prototype.toJSON = function() {
    var {contrasenna, estado, createdAt, updatedAt, ...resto} = Object.assign({}, this.get());
    return resto;
}

export default Usuario;