const express = require('express')
const rutaCarrito = express.Router()

const Contenedor = require('../clases/Contenedor.js')
const data = new Contenedor('./data/pedidos.txt')


rutaCarrito.get('/:id/productos',async (req,res)=>{
    const {id} = req.params
    const carrito = await data.getById(id)
    res.send(carrito)
})

rutaCarrito.post('/', async(req,res)=>{
    const id = await data.newId()
    res.send(id)
})

rutaCarrito.delete('/:id', async(req,res)=>{
    const {id}= req.params
    const carrito = await data.deleteById(id)
    res.send(carrito)
})

module.exports= rutaCarrito