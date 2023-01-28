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

export const getByGenero = async(genero) =>{
    
    let data = await axios({
        url:`http://localhost:3001/api/genero/${genero}`,
        method:'get'
    }).then( res =>{
        return res.data
    })
    console.log(data);
    return data
}





