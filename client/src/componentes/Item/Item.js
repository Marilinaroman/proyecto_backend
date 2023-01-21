import {Link} from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import './Item.css'

const Item = ({id,nombre, price, stock, url}) =>{

    const handleClick = (e)=>{
        e.stopPropagation()
    }

    return(
        <Card
        key={id}
        onClick={handleClick}>
            <Card.Img className='image' variant="top" src={url} />
            <Card.Title className='title'>{nombre}</Card.Title>
            <Card.Text className='price'>${price}</Card.Text>
            <Link to={`/api/id/${id}`} className='boton'>Ver mas</Link>
                    
        </Card>
    )
}

export default Item