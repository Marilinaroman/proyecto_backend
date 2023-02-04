import {createTransport} from 'nodemailer'
import twilio from 'twilio'
import {config} from '../config/config.js';


const twilioClient = twilio(config.ACCOUNT_ID_TWILIO, config.AUTH_TWILIO)

const transporterContacto = createTransport({
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


export {transporterContacto, twilioClient}