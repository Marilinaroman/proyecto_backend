import * as dotenv from "dotenv";

dotenv.config()

//creamos la configuracion de nuestra aplicacion
export const config = {
    MARIADB_HOST: process.env.MARIADB_HOST,
    SQLITE_DB: process.env.SQLITE_DB,
    FILE_DB: process.env.FILE_DB,
    MONGO_AUTENTICATION:process.env.MONGO_AUTENTICATION,
    MONGO_SESSION:process.env.MONGO_SESSION,
    TEST_EMAIL: process.env.TEST_EMAIL,
    TEST_PASSWORD : process.env.TEST_PASSWORD,
    ACCOUNT_ID_TWILIO : process.env.ACCOUNT_ID_TWILIO,
    AUTH_TWILIO : process.env.AUTH_TWILIO ,
    SMS_TWILIO : process.env.SMS_TWILIO,
    WSP_TWILIO : process.env.WSP_TWILIO
};