import express from "express"
import passport from 'passport'
import {ContainerMongo} from '../clases/ContenedorProductosMongo.js'
import { ContenedorDaoProductos } from "../daos/index.js"

const rutaLogin = express.Router()



rutaLogin.get('/registrarse', async(req,res)=>{
    const errorMessage = req.session.messages ? req.session.messages[0] : '';
    console.log(req.session);
    res.send({error:errorMessage})
    req.session.messages =[]
})

//Crear session

rutaLogin.post('/crear-usuario',passport.authenticate('signupStrategy',{
    failureRedirect:'/api/registrarse',
    failureMessage:true
}),(req,res)=>{
    res.send('registrado')
})

//iniciar sesion
rutaLogin.post('/login',passport.authenticate('loginStrategy',{
    failureRedirect: '/inicio-sesion',
    failureMessage:true
}),
(req,res)=>{
    res.send('incio')
})


rutaLogin.get('/perfil',async(req,res)=>{
    if(req.isAuthenticated()){
        let {name} = req.user
        res.render('form',{user:name})
    }else{
        res.send("<div>Debes <a href='/api/inicio-sesion'>inciar sesion</a> o <a href='/api/registro'>registrarte</a></div>")
    }
})

rutaLogin.get('/logout',(req,res)=>{
    req.session.destroy()
    setTimeout(()=>{
            res.redirect('./inicio-sesion')
    },3000)
})

export default rutaLogin