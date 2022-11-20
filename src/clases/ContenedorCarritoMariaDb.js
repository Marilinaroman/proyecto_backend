import knex from 'knex'


class ContendorCarritoMariaDb{
    constructor(options,tableName){
        this.database = knex(options)
        this.table = tableName
    }

    async getById(id){
        try{
            const result = await this.database(this.table).select("*").where('id','=',id);
            return result
        } catch(err){
            console.log(err);
        }
        
    }

    async getAll(){
        try{
            const result = await this.database(this.table).select("*");
            const products = result.map(elm=>({...elm}));
            return products
        } catch(err){
            console.log(err);
        }
        
    }

    async deleteById(id){
        try{
            this.database.from(this.table).where('id','=',id).del()
            .then(()=>console.log("producto eliminado"))
        }catch(err){
            console.log(err);
        }
        
    }

    async deleteAll(){
        try{
            this.database.from(this.table).del()
            .then(()=>console.log("productos eliminados"))
        }catch(err){
            console.log(err);
        }
        
    }

    async save(obj){
        try{
            const [id] = await this.database(this.table).insert(obj)
            return console.log(`producto agregado ${id}`)
            
        }catch(err){
            console.log(err);
        }
        
    }
    async newId(){
        try{
            const newTime = Date.now()
            const data = {timestamp:newTime}
            const [id] = await this.database(this.table).insert(data)
            return console.log(`carrito agregado ${id}`)
        }catch(err){
            console.log(err);
        }
    }

    async moreProd(id,modificacion){
        try{
            await this.putById(id,modificacion)
            return console.log(`carrito actualizado ${id}`)
        }catch(err){
            console.log(err);
        }
    }
    async putById(id, body){
        try{
            await this.database.from(this.table).where('id',id).update({
                timestamp: body.timestamp,
                cantidad: body.cantidad,
                nombre: body.nombre,
                price: body.price,
                url: body.url
            });
            return this.getById(id)

        }catch(err){
            console.log(err);
        }
        
    }
}

export {ContendorCarritoMariaDb}


