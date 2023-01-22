import express from 'express'
import {createTransport} from 'nodemailer'
import twilio from 'twilio'
import {config} from '../config/config.js';

const rutaContacto = express.Router()

const clientTwilio = twilio(config.ACCOUNT_ID_TWILIO, config.AUTH_TWILIO)

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.TEST_EMAIL,
        pass: config.TEST_PASSWORD
    },
    secure: false,
    tls:{
        rejectUnauthorized: false
    }
});

const emailTemplate = `<div>
    <h1>Bienvenido!!</h1>
    <img src="https://fs-prod-cdn.nintendo-europe.com/media/images/10_share_images/portals_3/2x1_SuperMarioHub.jpg" style="width:250px"/>
    <p>Ya puedes empezar a usar nuestros servicios</p>
    <a href="https://www.google.com/">Explorar</a>
</div>`

const mailOptions={
    from:"Servidor de NodeJs",
    to:config.TEST_EMAIL,
    subject:"Correo de prueba desde un servidor de node",
    html:emailTemplate
}

rutaContacto.post('/twilio-sms', async(req,res)=>{
    try{
        clientTwilio.messages.create({
            body:'Hola!',
            from: config.SMS_TWILIO,
            to: '+541136457467'
        })
        res.send(`mensaje enviado ${res}`)

    }catch(err){
        res.send(err)
    }
})

rutaContacto.post('/twilio-wsp', async(req,res)=>{
    try{
        clientTwilio.messages.create({
            body:'Hola!',
            from: config.WSP_TWILIO,
            to: 'whatsapp:+5491136457467'
        })
        res.send(`mensaje enviado ${res}`)

    }catch(err){
        res.send(err)
    }
})

rutaContacto.post('/envio-email-ethereal', async(req,res)=>{
    try{
        const response = await transporter.sendMail(mailOptions)
        res.send(`mensaje enviado ${res}`)
    }catch(err){
        res.send(err)
    }
})

export default rutaContacto