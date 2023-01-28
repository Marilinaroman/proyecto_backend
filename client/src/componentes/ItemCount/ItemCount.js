import {useState} from 'react';
import './ItemCount.css'


const Count = ({stock, onAdd, initial = 1}) =>{
    const [quantity, setQuantity] =  useState( stock>0 ? initial : stock);
    
    const handleChange = (e) =>{
        if(e.target.value <= stock){
            setQuantity(e.target.value)
        }
    }

    const add = () => {
        if (quantity<stock){
            setQuantity(Number(quantity) + 1)
        }
    } 

    const subtract = () => {
        if (quantity>0){
            setQuantity(quantity - 1)
        }
    }
    
    return(
        <>
            <div className='count'>
                <div className='botonesCount'>
                    <button onClick={subtract} className='btnCount'>-</button>
                        <input onChange={handleChange} value={quantity}/>
                    <button onClick={add} className='btnCount'>+</button>
                </div>
                <button className='botones' onClick={()=> onAdd(quantity)}>Agregar al carrito</button>
            </div>
        </>
    )
}

export default Count