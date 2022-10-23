const express = require('express')
const rutaCarrito = express.Router()

const carrito = []

rutaCarrito.get('/',(req,res)=>{
    res.render('carrito')
})

module.exports= rutaCarrito