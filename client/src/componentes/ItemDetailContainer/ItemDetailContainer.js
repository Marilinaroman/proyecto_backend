import {useParams} from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail'
import { getById } from '../../service/service';
import { useAsync } from '../../hook/useAsync';


const ItemDetailContainer = ({titulo})=>{
    const {id}= useParams()
    console.log(id);

    const {data, error,loading} = useAsync(() => getById(id))


    if(loading){
        return (<h1>cargando</h1>)
    }

    if(error) {
        console.log(error)
    }


    return(
        <>
            <h1>Productos</h1>
            <div className="ItemDetailContainer">
                <ItemDetail {...data}/>
            </div>
        </>
    )
}

export default ItemDetailContainer