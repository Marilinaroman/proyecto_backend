

const ItemDetail = ({nombre,price,stock,url})=>{
    

    return(
        <div className="ItemDetail">
            <h1>{nombre}</h1>
            <div className="Detail">
                <img src={url} alt={nombre}></img>
                <span>{price}</span>

            </div>
        </div>
    )
}

export default ItemDetail