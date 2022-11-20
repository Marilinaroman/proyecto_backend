import { options } from "../config/configSql.js";
import knex from "knex";

//instancia de las db

const dbmariaDb = knex(options.mariaDb)

// se ejecuta con "npm run create"
const createTable = async()=>{
    try{

        //tabla de productos
        const productosExiste = await dbmariaDb.schema.hasTable('productos')

        if(productosExiste){
            await dbmariaDb.schema.dropTable('productos')
        }

        await dbmariaDb.schema.createTable('productos', table=>{
            table.increments("id");
            table.integer('timestamp',20).nullable(false);
            table.integer('stock',20).nullable(false);
            table.string("nombre",20).nullable(false);
            table.float('price',20).nullable(false);
            table.string('url',100).nullable(false)
        })
        console.log('tabla creada exitosamente');

        //tabla carrito
        const carritoExiste = await dbmariaDb.schema.hasTable('carrito')

        if(carritoExiste){
            await dbmariaDb.schema.dropTable('carrito')
        }

        await dbmariaDb.schema.createTable('carrito', table=>{
            table.increments("id");
            table.integer('timestamp',20).nullable(false)
            table.integer('cantidad',20).nullable(false);
            table.string("nombre",20).nullable(false);
            table.float('price',20).nullable(false);
            table.string('url',100).nullable(false)
        })
        dbmariaDb.destroy()


    } catch(err){
        console.log(err);
    }
}
createTable()