import axios from "axios"

export const getAll = async() =>{
    
    let data = await axios({
        url:`http://localhost:3001/api`,
        method:'get'
    }).then( res =>{
        return res.data.listado
    })
    console.log(data);
    return data
}

export const getById = async(id) =>{
    
    let data = await axios({
        url:`http://localhost:3001/api/id/${id}`,
        method:'get'
    }).then( res =>{
        return res.data
    })
    console.log(data);
    return data
}

export const sendUser = async(username, password) =>{
    
    let data = await axios({
        url:`/api/login`,
        method:'post'
    }).then( res =>{
        return res.data
    })
    console.log(data);
    return data
}



