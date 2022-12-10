import Item from "../Item/Item"

const ItemList = ({productos})=>{
console.log(productos);
    return(
        <>
            {productos.map((u)=> <Item key={u.id} {...u}/>)}
        </>
    )
}

export default ItemList