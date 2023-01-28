import express from "express"
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import  {logger} from '../logger/logger.js'
import { UserModel } from "../models/users.js";
import bcrypt from 'bcrypt'

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
            logger.info(newUser);
            UserModel.create(newUser, (error,userCreated)=>{
                if(error) return done(error,null, {message:'error al registrar'})
                return done(null, userCreated,{message:'usuario creado'})
            })
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
    failureRedirect:'/api/registrarse',
    failureMessage:true
}),(req,res)=>{
    res.send('registrado')
})

//iniciar sesion
rutaLogin.post('/login',passport.authenticate('loginStrategy',{
    failureMessage:true
}),
(req,res)=>{
    res.send('inicio')
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