import {ContainerMongo} from '../../clases/ContenedorProductosMongo.js'

class ProductosDaosMongo extends ContainerMongo{
    constructor(collection,schema){
        super(collection,schema)
    }
}
export{ProductosDaosMongo}