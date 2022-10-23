const express = require('express')
const rutaProductos = express.Router()

const ProductosContenedor = require('../clases/ProductosContenedor.js')

const data = new ProductosContenedor('./data/productos.txt')

// verificacion de rol
let rol = 'cliente'

const verificaRol = (req,res,next) =>{
    if(rol === 'admin'){
        next()
    } else{
        res.send('no tienes acceso a esta ruta')
    }
}

rutaProductos.get('/', async(req,res)=>{
    const listado = await data.getAll()
    res.render('products',{productos:listado})
})

//muestra el producto segun su id
rutaProductos.get('/:id', async (req,res)=>{
    const {id} =req.params
    const prod = await data.getById(Number(id))

    if(prod){
        res.render('prod',{producto:prod})
    }else{
        return res.json({
            message:"el producto no existe"
        })
    }
})

rutaProductos.post('/',verificaRol,(req,res)=>{
    res.render('admin')
})

rutaProductos.put('/:id',verificaRol, async(req,res) =>{
    const {id} = req.params
    const modificacion = req.body
    
    const prod = await productos.putById(Number(id),modificacion)
    res.render('admin')
})


module.exports = rutaProductos