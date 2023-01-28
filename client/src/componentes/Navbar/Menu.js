import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import './Menu.css'

const Menu = ()=>{
    return (
        <>
        <Navbar variant="dark">
            <Container className='contenedorNavbar'>
            <Navbar.Brand href="/api"> <img src='../img/logo.png' alt='logo' width={155} height={69}/></Navbar.Brand>
            <Nav className="navbar">
                <Link to='/api'>Inicio</Link>
                <Link to="/api/genero/mujer">Mujer</Link>
                <Link to="/api/genero/hombre">Hombre</Link>
                <Link to="/api/login">Ingresar</Link>
            </Nav>
            </Container>
        </Navbar>
        </>
    );
}

export default Menu;