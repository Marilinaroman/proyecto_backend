import {ContainerCarritoMongo} from '../../clases/ContenedorCarritoMongo.js'

class CarritoDaosMongo extends ContainerCarritoMongo{
    constructor(carritoCollection, carritoSchema){
        super(carritoCollection, carritoSchema)
    }
}
export{CarritoDaosMongo}