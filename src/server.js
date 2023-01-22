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
import {Server} from 'socket.io';
import { logger, logArchivoError, logArchivoWarn } from './logger/logger.js';

//Captura argumentos
const optionsFork ={alias:{m:'mode'}, default:{mode:'FORK'}}
const objArguments = parseArgs(process.argv.slice(2), optionsFork)
const MODO = objArguments.mode
logger.info('objArgu', MODO);

//Conecto base de datis
const mongoUrl = config.MONGO_AUTENTICATION

mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}, (err)=>{
    if(err) return logArchivoError.error(`hubo un error: ${err}`);
    logger.info('conexion a base de datos exitosa');
})

const app = express()

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
        logger.info(username);
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
            logger.info(newUser);
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
        logger.info(username);
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

app.get('/*', async(req,res)=>{
    logArchivoError.error('ruta inexistente')
})

// Logica de fork o cluster
if(MODO==='CLUSTER' && cluster.isPrimary){
    const numCPUS = os.cpus().length

    for(let i=0; i<numCPUS; i++){
        cluster.fork()
    }
    cluster.on('exit',(worker)=>{
        logger.info(`el subproceso ${worker.process.pid} fallo`);
        cluster.fork()
    })

}else{
    //configuro el puerto
    const PORT = process.env.PORT|| 3001

    const server = app.listen(PORT,()=>logger.info(`server ${PORT}`))

    const io = new Server(server);
    
    io.on('connection', async(socket)=>{
        //console.log('nuevo usuario', socket.id)
    
        //io.sockets.emit('productos', productos);
        io.sockets.emit('chat', await normalizarMsj());
    
        socket.broadcast.emit('nuevoUsuario')
    
        /*socket.on('nuevoProducto', nuevoProducto=>{
            productos.push(nuevoProducto)
            fs.writeFileSync('./archivo.txt', JSON.stringify(productos))
            io.sockets.emit('lista', productos)
        })*/
    
        socket.on('nuevoMsj', async (nuevoMsj) =>{
            await mensajes.save(nuevoMsj)
            io.sockets.emit('chat', await normalizarMsj())
        })
    })
}