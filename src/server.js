import express from "express";
//import rutaCarrito from "./router/rutaCarrito.js"
import rutaProductos from "./router/rutaProductos.js";

const app = express()

const PORT = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/productos', rutaProductos)
//app.use('/api/carrito',rutaCarrito)

app.listen(PORT, ()=>console.log(`server ${PORT}`))