import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios'

export const useAsync =(asyncFn,dependencies=[])=>{
    const [data, setData] = useState();
    const [error, setError] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() =>{
        setLoading(true)
        asyncFn().then((res) =>{
            console.log(data);
            setData(res)
        }).catch(error =>{
            setError(error)
        }).finally(()=>{
            console.log(data);
            setLoading(false)
        })
    }, dependencies)
    
    return {
        data,
        error,
        loading
    }
    
}