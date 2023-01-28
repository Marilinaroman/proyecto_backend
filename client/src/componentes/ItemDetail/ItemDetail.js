import Count from '../ItemCount/ItemCount'
import './ItemDetail.css'
import CartContext from '../../context/CartContext'
import AlertContext from '../../context/Alert'
import {Link} from 'react-router-dom'
import {useState, useContext} from 'react'

const ItemDetail = ({id, nombre,price,stock,url})=>{
    const {addItem, getProductQuantity} = useContext(CartContext)
    const [quantityAdd, setQuantityAdd] = useState(0)
    const {setNotification} = useContext(AlertContext)


    const handleOnAdd = (quantity) => {
        setQuantityAdd(quantity)

        const productToAdd = {
            id, nombre, price, quantity:Number(quantity), total: (price*quantity)
        }
        if(quantity<=0){
            setNotification('danger',`Lo sentimos! No tenemos stock`)
        } else{
            addItem(productToAdd)
            setNotification('success',`Agregaste ${quantity} ${nombre}`)
        }
    }
    
    const productQuantity= getProductQuantity(id)
    return(
        <div className="ItemDetail">
            <h1>{nombre}</h1>
            <div className="Detail">
                <img className="img" src={url} alt={nombre}></img>
                <div className='info'>
                    <span>{price}</span>
                    <p> Stock = {stock}</p>
                        {quantityAdd <=0 ? <Count stock={stock} initial={productQuantity} onAdd={handleOnAdd}/> 
                        :(<div>
                            <Link className='botonLink' to='/api/cart'>Ir al carrito</Link>
                        </div>)}

                </div>
            </div>
        </div>
    )
}

export default ItemDetail