import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Menu from './componentes/Navbar/Menu';
import ItemListContainer from './componentes/ItemListContainer/ItemListContainer';
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Menu/>
        <Routes>
          <Route path='/api' element={<ItemListContainer/>} />
          <Route path='/api/productos/:genero' element={<ItemListContainer/>}/>
          <Route path='/api/productos/:id' element={<ItemDetailContainer/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
