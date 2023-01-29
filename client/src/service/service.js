import axios from "axios"

export const getAll = async(genero) =>{
    let url = ''
    genero ? url= `http://localhost:3001/api/genero/${genero}` : url= `http://localhost:3001/api`

    console.log(genero);
    let data = await axios({
        url,
        method:'get'
    }).then( res =>{
        console.log(res);
        return res.data.listado || res.data
    })
    console.log(data);
    return data
}

export const getById = async(id) =>{
    
    let data = await axios({
        url:`http://localhost:3001/api/id/${id}`,
        method:'get'
    }).then( res =>{
        return {id,...res.data}
    })
    console.log(data);
    return data
}

export const getUser = async(buyer) =>{
    
    let data = await axios.get(`http://localhost:3001/api/perfil`,{ 
        params: {
            username: `${buyer}`
        }
    }).then((res) =>{
        console.log(res);
        return {...res}
    })

    console.log(data);
    return data
}

export const createCart = async()=>{
    let idCart = await axios.post(`http://localhost:3001/api/carrito/`,{}).then(function (response) {
    console.log(response);
    return response.data
    }).catch(function (error) {
        console.log(error);
    });
    return idCart
}

export const newOrder = async(newOrder, id, cart, buyer)=>{
    console.log(id);
    let nuevaOrden = await axios.post(`http://localhost:3001/api/carrito/${id}/productos`,{
        newOrder
    }).then((response)=>{
        console.log(response);
    }).catch(function (error) {
        console.log(error);
    });
    return nuevaOrden
}




