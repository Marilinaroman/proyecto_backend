import { useContext, useState } from "react"
import CartContext from "../../context/CartContext"
import { useNavigate } from "react-router-dom"
import { useAsync } from "../../hook/useAsync"
import { createCart, newOrder } from "../../service/service"
import './Checkout.css'

const Checkout =() =>{
    const [isLoading, setIsLoading] = useState(false)
    const [order, setOrder] = useState()
    const {cart, total, clearCart,buyer, addBuyer}= useContext(CartContext)

    const {data, error, loading} = useAsync(()=> createCart())
    
    console.log(data);
    

    //const navigate = useNavigate()

    const createOrder = async () =>{

        setIsLoading(true)

        try{
            const order = {
                buyer,
                items: cart,
                total,
                date: new Date(),
            }
        
        await newOrder({order, cart, buyer, id:data}).then((res)=>{
            console.log(res);
            setOrder(res)
            setIsLoading(false)
        }).catch(error =>{
            console.log(error)
        })} 
        catch (error) {
            console.log(error)
        }
    }

    if(isLoading) {
        return (<div className="containerCheckout">
                    <h1>We're creating your order</h1>
                </div>)
    }
    if(order) {
        setTimeout(() => {
           // navigate('/')
        }, 5000)
        return (
        <div className="containerCheckout">
            <h1>{`The id of your order is: ${order.id}`}</h1>
        </div>)
    }

    return (
        <div className="containerCheckout"> 
            <h1>{`Bienvenido/a ${buyer.name}`}</h1>
            <h2>Tus datos</h2>
            <h2>Tu pedido</h2>
        <button className="botones" onClick={createOrder}>Confirmar</button>
        </div>
    )
}

export default Checkout