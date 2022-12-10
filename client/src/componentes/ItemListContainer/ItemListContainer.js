import {  useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import './ItemListContainer.css'
import { useAsync } from "../../hook/useAsync";
import { getAll } from "../../service/service";


const ItemListContainer = ({titulo})=>{
    const {genero} = useParams()

    const {data, error,loading} = useAsync(() => getAll())


    if(loading){
        return (<h1>cargando</h1>)
    }

    if(error) {
        console.log(error)
    }

    return(
        <>
            <h1>Productos</h1>
            <div className="ItemListContainerCards">
                <ItemList productos={data}/>
                
            </div>
        </>
    )
}

export default ItemListContainer