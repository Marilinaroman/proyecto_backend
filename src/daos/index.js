import mongoose from 'mongoose';
import {options} from '../config/configSql.js';

let ContenedorDaoProductos

let databaseType = 'archivo'

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
        break;

    case "mariaDb":
        const {ProductosDaosMariaDb} =await import('./productos/productosMariaDb.js')
        ContenedorDaoProductos = new ProductosDaosMariaDb(options.mariaDb,'productos')
        break;

    case "archivo":
        const {ProductosDaosArchivo} = await import('./productos/productosArchivo.js')
        ContenedorDaoProductos = new ProductosDaosArchivo(options.fileSystem.pathProductos)
        break;
}

export {ContenedorDaoProductos}