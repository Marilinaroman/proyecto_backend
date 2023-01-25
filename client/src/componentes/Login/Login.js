import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import './Login.css'
import { useNavigate } from 'react-router-dom'

const Login = () =>{
    const [user, setUser] = useState({
        username:'',
        password:''
    })
    const navigate = useNavigate()

    const send = async(e) => {
        e.preventDefault()
        try{
            await axios.post('http://localhost:3001/api/login', {
                username: user.username,
                password: user.password
                }).then((res)=>{
                    console.log(res);
                })
            navigate("/api")
        } catch(error){
            console.log(error);
        }
        
    };

    const handleChangeLogin = (e) =>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }



    return(
        <div>
            <h1>Iniciar sesion</h1>
            <form className="IniciarSesion" onSubmit={send}>
                <label>Email</label>
                <input name='username' value={user.username} onChange={handleChangeLogin} type="email" required/>
                <label>Contraseña</label>
                <input type="password" name='password' value={user.password} onChange={handleChangeLogin} required/>
                <button type="submit" className="botones">Ingresar</button>
            </form>
            <Link to='/api/crear-usuario' >Registrarse</Link>
        </div>
    )
}

export default Login