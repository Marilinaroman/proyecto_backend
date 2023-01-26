import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import './CrearCuenta.css'

const CrearCuenta = () =>{
    const [newUser, setnewUser] = useState({
        name:'',
        username:'',
        password:'',
        address:'',
        age:'',
        phone:'',
        photo:''
    })
    
    const navigate = useNavigate()

    const createUser = async(e) => {
        e.preventDefault()
        try{

            await axios.post('http://localhost:3001/api/crear-usuario', {
                name:newUser.name,
                username: newUser.username,
                password: newUser.password,
                address:newUser.address,
                age:newUser.age,
                phone:newUser.phone,
                photo:newUser.photo
            }).then((response)=>{
                console.log(response);
            })
            navigate("/api")
        } catch(error){
            console.log(error);
        }
        
    };
    const handleChangeUser = (e) =>{
        setnewUser({
            ...newUser,
            [e.target.name]:e.target.value
        })
    }
    console.log(newUser);

    return(
        <div>
            <h1>Registrarse</h1>
            <form className="CrearCuenta" onSubmit={createUser}>
                <label>Nombre</label>
                <input type="text" name='name' value={newUser.name} onChange={handleChangeUser} required/>
                <label>Domicilio</label>
                <input type="text"name='address' value={newUser.address} onChange={handleChangeUser} required/>
                <label>Edad</label>
                <input type="number"name='age' value={newUser.age} onChange={handleChangeUser} required/>
                <label>Telefono</label>
                <input type="text"name='phone' value={newUser.phone} onChange={handleChangeUser} required/>
                <label>Avatar</label>
                <input type="text"name='photo' value={newUser.photo} onChange={handleChangeUser} required/>
                <label>Email</label>
                <input type="email"  name='username' value={newUser.username} onChange={handleChangeUser} required/>
                <label>Contraseña</label>
                <input type="password" name='password' value={newUser.password} onChange={handleChangeUser} required/>
                <button type="submit" className="botones">Registrarme</button>
            </form>
            <Link to='/api/iniciar-sesion'>Iniciar sesion</Link>
        </div>
    )
}

export default CrearCuenta