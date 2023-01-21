import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import './Login.css'

const Login = () =>{
    const [user, setUser] = useState({
        username:'',
        password:''
    })

    const send = async (username, password) => {
        const response = await axios.post('/api/iniciar-sesion', {
            username,
            password
            },
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        console.log(response);   
        
    };

    const handleChangeLogin = (e) =>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit =(e)=>{
        e.preventDefault()
        send({username:user.username, password:user.password})
    }

    return(
        <div>
            <h1>Iniciar sesion</h1>
            <form className="IniciarSesion" onClick={handleSubmit} >
                <label>Email</label>
                <input name='username' value={user.username} onChange={handleChangeLogin} type="email" required/>
                <label>Contraseña</label>
                <input type="password" name='password' value={user.password} onChange={handleChangeLogin} required/>
                <button type="submit" className="botones">Ingresar</button>
            </form>
            <Link to='/api/registrarse' >Registrarse</Link>
        </div>
    )
}

export default Login