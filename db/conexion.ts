import { Sequelize } from "sequelize";

const db = new Sequelize('node_ts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false, //Muestra las consultas en la consola.(valor por defecto)
});

export default db;