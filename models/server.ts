import express from 'express';
import cors from "cors";

import rutasUsuario from "../routes/usuarios";
import rutasAuthenticacion from "../routes/autenticacion";
import rutasProductos from "../routes/productos";
import rutasCarrito from "../routes/carrito";

import db from '../db/conexion';

export class Server {

    private app: express.Application; //Para el tipado
    private port: string;
    private apiPath = {
        auth: '/api/auth',
        carrito: '/api/carrito',
        productos: '/api/productos',
        usuarios: '/api/usuarios',
    }

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '8080';

        this.dbConexion();
        this.middlewares();
        this.routes();
    }

    async dbConexion() {
        try{
            await db.authenticate();
            console.log('Base de datos online');
        }catch(err){

        }
    }

    middlewares(){
        // CORS
        this.app.use( cors() );

        // BODYPARSER
        this.app.use( express.json() )
        this.app.use( express.urlencoded( {extended:false} ))

        // CARPETA PUBLICA
        this.app.use( express.static('public'))
    }

    routes(){
        this.app.use(this.apiPath.auth, rutasAuthenticacion);
        this.app.use(this.apiPath.carrito, rutasCarrito);
        this.app.use(this.apiPath.productos, rutasProductos);
        this.app.use(this.apiPath.usuarios, rutasUsuario);
    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`Server up on: http://localhost:${this.port}`);            
        })
    }
}