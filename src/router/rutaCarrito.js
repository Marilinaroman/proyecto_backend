import express from 'express'
import { ContenedorDaoCarrito } from '../daos/index.js'
import { twilioClient } from './rutaContacto.js'
import { config } from '../config/config.js'


const rutaCarrito = express.Router()

const data = ContenedorDaoCarrito

//Lista todos los productos del carrito
rutaCarrito.get('/:id/productos',async (req,res)=>{
    const {id} = req.params
    const carrito = await data.getById(id)
    if(carrito){
            return res.send(carrito)
    } else{
        res.status(404).send({ message: 'Error el carrito no existe' })
    }
    
})

//Crea nuevo carrito
rutaCarrito.post('/', async(req,res)=>{
    const newId = await data.newId()
    res.send(newId)
})

//Elimina un carrito
rutaCarrito.delete('/:id', async(req,res)=>{
    const {id}= req.params
    const existe = await data.getById(id)

    if(!existe){
        return res.status(404).send({ message: 'Error el carrito no existe' })
    }else{
        const carrito = await data.deleteById(id)
        return res.send(carrito)
        
    }
    
})

//Agrega un producto al carrito
rutaCarrito.post('/:id/productos', async(req,res)=>{
    const {id} = req.params
    const modificacion = req.body
    const existe = await data.getById(id)

    if(!existe){
        return res.status(404).send({ message: 'Error el carrito no existe' })
    }else{
        const carrito = await data.moreProd(id, modificacion)
        console.log(carrito);
        if(carrito){
            twilioClient.messages.create(
                {
                    body:`Se registro un nuevo pedido! nombre: ${carrito.name}, pedido:${id}, email:${carrito.username}`,
                    from:config.WSP_TWILIO,
                    to:config.WSP_ADMIN
                },
                (error)=>{
                    if(error){
                        console.error(`Hubo un error al enviar el mensaje de whatsapp al administrador ${error}`)
                    } else {
                        console.info(`Mensaje de whatsapp de registro enviado correctamente`)
                    }
                }
            )
        }else{
            console.log('error');
        }
        res.send('pedido generado')
    }
})


//Elimina un producto del carrito
rutaCarrito.delete('/:id/productos/:id_prod', async(req,res)=>{
    const {id, id_prod} = req.params
    const existe = await data.getById(id)

    if(!existe){
        return res.status(404).send({ message: 'Error el carrito no existe' })
    }else{
        const carrito = await data.deleteOneProd(id, id_prod)
        res.send(carrito)
    }
})



export default rutaCarrito