import {  useParams } from "react-router-dom";
import ItemList from "../ItemList/ItemList";
import './ItemListContainer.css'
import { useAsync } from "../../hook/useAsync";
import { getAll, getByGenero } from "../../service/service";
import { useState } from "react";


const ItemListContainer = ({titulo})=>{
    const {genero} = useParams()
    console.log(genero);
    const {data, error,loading} = useAsync(() => getAll(genero), [genero])


    if(loading){
        return (<h1>cargando</h1>)
    }

    console.log(data);
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