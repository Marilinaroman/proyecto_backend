import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Menu from './componentes/Navbar/Menu';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer'
import Login from './componentes/Login/Login';
import CrearCuenta from './componentes/Login/CrearCuenta';
import { CartContextProvider } from './context/CartContext';
import { AlertProvider } from './context/Alert';
import 'bootstrap/dist/css/bootstrap.min.css';
import CartDetail from './componentes/Cart/Cart';
import Checkout from './componentes/Checkout/Checkout';

function App() {
  return (
    <div className="App">
      <AlertProvider>
        <CartContextProvider>
          <BrowserRouter>
            <Menu/>
            <Routes>
              <Route path='/api' element={<ItemListContainer/>} />
              <Route path='/api/id/:id' element={<ItemDetailContainer/>}/>
              <Route path='/api/genero/:genero' element={<ItemListContainer/>}/>
              <Route path='/api/login' element={<Login/>}/>
              <Route path='/api/crear-usuario' element={<CrearCuenta/>}/>
              <Route path='/api/cart' element={<CartDetail/>}/>
              <Route path='/api/checkout' element={<Checkout/>}/>
            </Routes>
          </BrowserRouter>
        </CartContextProvider>
      </AlertProvider>
    </div>
  );
}

export default App;
