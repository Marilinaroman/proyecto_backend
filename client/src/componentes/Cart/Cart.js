import CartContext from '../../context/CartContext';
import {useContext} from 'react';
import {Link} from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import './Cart.css'

const CartDetail = () =>{
    const {cart, clearCart, removeItem, total} = useContext(CartContext)

    console.log(cart);
    return(
        <div className='containerCart'>
            {cart.length === 0 ? 
                (<>
                    <h1>Tu carrito está vacio</h1>
                    <Link className='col-auto button' to='/api'>Seguir comprando</Link>
                </>) :  
                (<>
                    <h1>Tu carrito</h1>
                    <div className='cart'>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th/>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((u) => {
                                    return (
                                    <tr key={u.id}>
                                    <td>
                                        <img src='../img/icono/delete.png' width={22} alt='delete' onClick={() => removeItem(u.id) } id={u.id}/>
                                    </td>
                                    <td>
                                        <Link className='linkProduct' to={`../api/id/${u.id}`}>
                                            {u.nombre}
                                        </Link>
                                    </td>
                                    <td>${u.price}</td>
                                    <td>{u.quantity}</td>
                                    <td>${u.total}</td>
                                    </tr>)
                                })}
                                <tr>
                                <td colSpan={4}>Total</td>
                                <td>${total}</td>
                                </tr>
                            </tbody>
                        </Table>
                        {cart.length !== 0 && (
                        <div className='containerButton'>
                            <button className='col-auto botones' onClick={clearCart}>Limpiar mi carrito</button>
                            <Link className='col-auto botones' to='/api'>Seguir comprando</Link>
                            <Link to='/api/login' className='col-auto botones'>Terminar compra</Link>
                        </div>)}
                    </div>
                </>)
            }
        </div>
    )
}

export default CartDetail