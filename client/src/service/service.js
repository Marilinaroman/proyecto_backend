import axios from "axios"

export const getAll = async() =>{
    
    let data = await axios({
        url:`/api`,
        method:'get'
    }).then( res =>{
        return res.data.listado
    })
    console.log(data);
    return data
}

export const getById = async(id) =>{
    
    let data = await axios({
        url:`/api/${id}`,
        method:'get'
    }).then( res =>{
        return res.data
    })
    console.log(data);
    return data
}


