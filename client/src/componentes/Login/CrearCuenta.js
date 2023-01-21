import { Link } from "react-router-dom"
import './CrearCuenta.css'

const CrearCuenta = () =>{


    return(
        <div>
            <h1>Registrarse</h1>
            <form className="CrearCuenta">
                <label>Nombre</label>
                <input type="text" required/>
                <label>Apellido</label>
                <input type="text" required/>
                <label>Domicilio</label>
                <input type="text" required/>
                <label>Email</label>
                <input type="email" required/>
                <label>Contraseña</label>
                <input type="password" />
                <button type="submit" className="botones">Registrarme</button>
            </form>
            <Link to='/api/iniciar-sesion'>Iniciar sesion</Link>
        </div>
    )
}

export default CrearCuenta