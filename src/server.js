const express = require('express')
const handlebars = require('express-handlebars')
const { Server: HttpServer } = require("http");
const { Server: Socket } = require("socket.io");

//exporto rutas
const rutaCarrito = require('./router/rutaCarrito.js')
const rutaProductos = require('./router/rutaProductos.js')

const app = express()
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

//configuro json
app.use(express.json())
app.use(express.urlencoded({extended:true}))

//configuro el puerto
const PORT = process.env.PORT || 8080

const server = httpServer.listen(PORT, ()=>console.log(`servidor ${PORT}`))

app.use(express.static('views'))

//motor plantilla
app.engine('handlebars', handlebars.engine())

//defino directorio
app.set('views','./views')

//defino motor express
app.set('view engine','handlebars')


//defino rutas
app.use('/api/productos', rutaProductos)
app.use('/api/carrito', rutaCarrito)

io.on('connection',(socket)=>{
    console.log(socket.id);
})

