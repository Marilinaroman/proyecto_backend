import express from "express"
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import {config} from '../config/config.js';
import  {logger} from '../logger/logger.js'
import { UserModel } from "../models/users.js";
import bcrypt from 'bcrypt'
import { transporterContacto} from "./rutaContacto.js";

const rutaLogin = express.Router()

//serializar
passport.serializeUser((user,done)=>{
    done(null, user.id)
})

passport.deserializeUser((id, done)=>{
    UserModel.findById(id,(error, userFound)=>{
        if(error) return done(error)
        return done(null,userFound)
    })
})

//crear una funcion para encriptar la contraseñas;
const createHash = (password)=>{
    const hash = bcrypt.hashSync(password,bcrypt.genSaltSync(10));
    return hash;
}
//Validar contraseña
const isValidPassword = (user, password)=>{
    return bcrypt.compareSync(password, user.password);
}
passport.use('signupStrategy', new LocalStrategy({
    passReqToCallback:true,
    usernameField: "username",
    },
    async(req,username,password,done)=>{
        logger.info(username);
        try{
            UserModel.findOne({username:username}, (error,userFound)=>{
            if (error) return done(error,null,{message:'hubo un error'})
            if(userFound) return done(null,null,{message:'el usuario existe'}) 
            const newUser = {
                name: req.body.name,
                address: req.body.address,
                age: req.body.age,
                phone: req.body.phone,
                photo: req.body.photo,
                username:username,
                password:createHash(password)
            }

            let detalleEmail=`<div>
                <h1>Se registro un nuevo usuario/a</h1>
                <div> 
                    <p>name: ${newUser.name}</p>
                    <p>address: ${newUser.address}</p>
                    <p>phone: ${newUser.phone}</p>
                    <p>email: ${newUser.username}</p>
                </div>
                </div>`


            logger.info(newUser);
            
            UserModel.create(newUser, (error,userCreated)=>{
                if(error) return done(error,null, {message:'error al registrar'})
                return done(null, userCreated,{message:'usuario creado'})
            })

            const response = transporterContacto.sendMail({from:"Servidor de NodeJs",
            to:config.TEST_EMAIL,
            subject:'Nuevo registro',
            html: detalleEmail})

            logger.info(`Aviso enviado`)
        })}catch(error){
            logger.info(error);
        }
    }
))

// passport strategy iniciar sesion
passport.use('loginStrategy', new LocalStrategy(
    async(username, password, done) => {
        logger.info(username);
        try{
            UserModel.findOne({ username: username }, (err, user)=> {
            console.log(user);
            if (err) return done(err);
            if (!user) return done(null, false);
            if (!user.password) return done(null, false);
            if (!isValidPassword(user,password)){
                logger.info('existen datos')
                return done(null,false,{message:'password invalida'})
            }
            return done(null, user);
        })}catch(error){
            console.log(error);
        }
    }
));

rutaLogin.get('/registrarse', async(req,res)=>{
    const errorMessage = req.session.messages ? req.session.messages[0] : '';
    console.log(req.session);
    res.send({error:errorMessage})
    req.session.messages =[]
})

//Crear session

rutaLogin.post('/crear-usuario',passport.authenticate('signupStrategy',{
    failureRedirect:'/api/crear-usuario',
    failureMessage:true
}), async(req,res)=>{
    res.send('registrado')
});

//iniciar sesion
rutaLogin.post('/login',passport.authenticate('loginStrategy',{
    failureMessage:true,
    failureRedirect: "/api/login",
}),(req,res)=>{
    let {id, name, address, phone, avatar} = req.user
    res.send({id, name, address,phone, avatar})
})


rutaLogin.get('/logout',(req,res)=>{
    req.session.destroy()
    setTimeout(()=>{
            res.redirect('./inicio-sesion')
    },3000)
})

export default rutaLogin