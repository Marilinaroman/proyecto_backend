import express from "express";
import rutaCarrito from "./router/rutaCarrito.js"
import rutaProductos from "./router/rutaProductos.js";
import rutaContacto from "./router/rutaContacto.js";
import {config} from './config/config.js';
import mongoose from 'mongoose';
import { normalize, schema } from "normalizr";
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import bcrypt from 'bcrypt'
import MongoStore from 'connect-mongo'
import parseArgs from 'minimist';
import cluster from 'cluster'
import os from 'os'
import rutaLogin from "./router/rutaLogin.js";
import { UserModel } from "./models/users.js";


//Conecto base de datis
const mongoUrl = config.MONGO_AUTENTICATION

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}, (err)=>{
    if(err) return console.log(`hubo un error: ${err}`);
    console.log('conexion a base de datos exitosa');
})

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  
//Cookies
app.use(cookieParser())

app.use(session({
    store: MongoStore.create({
        mongoUrl:config.MONGO_SESSION
    }),
    secret:"claveSecreta",
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:600000
    }
}))

// Configuro passport

app.use(passport.initialize())
app.use(passport.session())

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
//passport strategy crear usuario
passport.use('signupStrategy', new LocalStrategy({
    passReqToCallback:true,
    usernameField: "email",
    },
    (req,username,password,done)=>{
        console.log(username);
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
            console.log(newUser);
            UserModel.create(newUser, (error,userCreated)=>{
                if(error) return done(error,null, {message:'error al registrar'})
                return done(null, userCreated,{message:'usuario creado'})
            })
        })
    }
))

// passport strategy iniciar sesion
passport.use('loginStrategy', new LocalStrategy(
    (username, password, done) => {
        console.log(username);
        UserModel.findOne({ username: username }, (err, user)=> {
            console.log(user);
            if (err) return done(err);
            if (!user) return done(null, false);
            if (!user.password) return done(null, false);
            if (!isValidPassword(user,password)){
                console.log('existen datos')
                return done(null,false,{message:'password invalida'})
            }
            return done(null, user);
        });
    }
));
// Rutas de productos
app.use('/api', rutaProductos)

// Rutas de Carrito
app.use('/api/carrito',rutaCarrito)

// Rutas del Login
app.use('/api',rutaLogin)

//Ruta Contacto
app.use('/api',rutaContacto)

app.listen(PORT, ()=>console.log(`server ${PORT}`))