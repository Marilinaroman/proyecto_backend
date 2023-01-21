import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Menu from './componentes/Navbar/Menu';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer'
import Login from './componentes/Login/Login';
import CrearCuenta from './componentes/Login/CrearCuenta';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu/>
        <Routes>
          <Route path='/api' element={<ItemListContainer/>} />
          <Route path='/api/genero/:genero' element={<ItemListContainer/>}/>
          <Route path='/api/id/:id' element={<ItemDetailContainer/>}/>
          <Route path='/api/iniciar-sesion' element={<Login/>}/>
          <Route path='/api/registrarse' element={<CrearCuenta/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
