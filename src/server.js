import express from "express";
import rutaCarrito from "./router/rutaCarrito.js"
import rutaProductos from "./router/rutaProductos.js";

const app = express()

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  

app.use('/api/productos/', rutaProductos)
app.use('/api/carrito',rutaCarrito)

app.listen(PORT, ()=>console.log(`server ${PORT}`))