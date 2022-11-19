import {ContendorMariaDb} from '../../clases/ContenedorMariaDb.js'

class ProductosDaosMariaDb extends ContendorMariaDb{
    constructor(options,tableName){
        super(options,tableName)
    }
}
export{ProductosDaosMariaDb}