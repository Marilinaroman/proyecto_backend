import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const options = {
    fileSystem:{
        pathProductos: path.join(__dirname , "../data/productos.txt"),
        pathPedidos:path.join(__dirname,'../data/pedidos.txt')
    },
    mariaDb:{
        client:'mysql',
        connection:{
            host: '127.0.0.1',
            user: 'root',
            password:'',
            database:'ecommerce'
        }
    },
    firebase:{
        
    }
}