const express = require('express')
const rutaCarrito = express.Router()

const Contenedor = require('../clases/Contenedor.js')
const data = new Contenedor('./data/pedidos.txt')

//Lista todos los productos del carrito
rutaCarrito.get('/:id/productos',async (req,res)=>{
    const {id} = req.params
    const carrito = await data.getById(id)
    res.send(carrito)
})

//Crea nuevo carrito
rutaCarrito.post('/', async(req,res)=>{
    const newId = await data.newId()
    res.send(newId)
})

//Elimina un carrito
rutaCarrito.delete('/:id', async(req,res)=>{
    const {id}= req.params
    const carrito = await data.deleteById(id)
    res.send(carrito)
})

//Agrega un producto al carrito
rutaCarrito.post('/:id/productos', async(req,res)=>{
    const {id} = req.params
    const modificacion = req.body
    const carrito = await data.moreProd(id, modificacion)
    res.send(carrito)
})

//Elimina un producto del carrito
rutaCarrito.delete('/:id/productos/:id_prod', async(req,res)=>{
    const {id, id_prod} = req.params
    const carrito = await data.deleteOneProd(id, id_prod)
    res.send(carrito)
})
module.exports= rutaCarrito