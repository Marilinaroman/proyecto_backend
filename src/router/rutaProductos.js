import express from "express"
import {ContainerMongo} from '../clases/ContenedorProductosMongo.js'
import { ContenedorDaoProductos } from "../daos/index.js"
import { logger, logArchivoError, logArchivoWarn } from '../logger/logger.js';

const rutaProductos = express.Router()

const data = ContenedorDaoProductos

// verificacion de rol
let rol = 'admin'

const verificaRol = (req,res,next) =>{
    if(rol === 'admin'){
        next()
    } else{
        res.send('no tienes acceso a esta ruta')
    }
}

rutaProductos.get('/', async(req,res)=>{
    const listado = await data.getAll()
    if (!listado) return res.status(404).send({ message: 'Error' });
    res.send({listado})
})

//muestra el producto segun su id
rutaProductos.get('/genero/:genero', async (req,res)=>{
    const {genero} =req.params
    logger.info(genero);
    const prod = await data.getByGenero(genero)
    logger.info(prod);
    if(prod){
        res.send(prod)
    }else{
        return res.json({
            message:"el producto no existe"
        })
    }
})

//muestra el producto segun su id
rutaProductos.get('/id/:id', async(req,res)=>{
    const {id} =req.params
    logger.info(req.params);
    const prod = await data.getById(id)
    if(prod){
        return res.send(prod)
    }else{
        return res.json({
            message:"el producto no existe"
        })
    }
})

rutaProductos.post('/',verificaRol, async (req,res)=>{
    
    const newProd = (req.body)
    await data.save(newProd)

    if(rol === 'admin'){
        res.send(data)
    }else{
        return res.json({
            message:"no tienes acceso a esta ruta"
        })
    }
})

rutaProductos.put('/:id',verificaRol, async(req,res) =>{
    const {id} = req.params
    const modificacion = req.body
    
    if(rol === 'admin'){
        const existe = await data.getById(id)
        
        if (!existe){
            return res.status(404).send({ message: 'Error el producto no existe' })
        } else{
            const prod = await data.putById(id,modificacion)
            return res.send(prod)
        }
    }else{
        return res.json({
            message:"no tienes acceso a esta ruta"
        })
    }
})

rutaProductos.delete('/:id',verificaRol, async(req,res)=>{
    const {id} = req.params

    if(rol ==='admin'){
        const existe = await data.getById(id)
        
        if (!existe){
            return res.status(404).send({ message: 'Error el producto no existe' })
        } else{
            const prod = data.deleteById(id)
            res.send(prod)
        }
    }else{
        return res.json({
            message:'no tienes acceso a esta ruta'
        })
    }
})


export default rutaProductos