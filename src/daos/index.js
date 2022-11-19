import mongoose from 'mongoose';
import admin from "firebase-admin";
import {options} from '../config/configSql.js';

let ContenedorDaoProductos
let ContenedorDaoCarrito

let databaseType = 'mongo'

switch(databaseType){
    case "mongo":

        const URL = "mongodb+srv://marilinaroman:marilinaroman@backend.rvxfdqn.mongodb.net/ecommerce?retryWrites=true&w=majority"
        
        mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, error =>{
            if(error) throw new Error(`conexion fallida ${error}`)
            console.log('conexion exitosa');
        })

        const {ProductosDaosMongo} = await import('./productos/productosMongo.js')
        const {productosSchema} = await import('../models/mongoAtlas.js')
        const {productosCollection} = await import('../models/mongoAtlas.js')
        ContenedorDaoProductos = new ProductosDaosMongo(productosCollection,productosSchema)

        const {CarritoDaosMongo} = await import('./carritos/carritoMongo.js')
        const {carritosSchema} = await import('../models/mongoAtlas.js')
        const {carritosCollection} = await import('../models/mongoAtlas.js')
        ContenedorDaoCarrito = new CarritoDaosMongo(carritosCollection,carritosSchema)
        break;

    case "mariaDb":
        const {CarritoDaosMariaDb} = await import('./carritos/carritoMariaDb.js')
        const {ProductosDaosMariaDb} =await import('./productos/productosMariaDb.js')
        ContenedorDaoProductos = new ProductosDaosMariaDb(options.mariaDb,'productos')
        ContenedorDaoCarrito = new CarritoDaosMariaDb(options.mariaDb,'carritos')
        break;

    case "archivo":
        const {ProductosDaosArchivo} = await import('./productos/productosArchivo.js')
        ContenedorDaoProductos = new ProductosDaosArchivo(options.fileSystem.pathProductos)
        const {CarritoDaosArchivo} = await import('./carritos/carritoArchivo.js')
        ContenedorDaoCarrito = new CarritoDaosArchivo(options.fileSystem.pathPedidos)
        break;
    case "firebase":
        const {ProductosDaosFirebase} = await import('./productos/productosFirebase.js')
        ContenedorDaoProductos = new ProductosDaosFirebase()
}

export {ContenedorDaoProductos, ContenedorDaoCarrito}