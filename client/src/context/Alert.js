import { createContext, useState } from 'react'
import Alert from 'react-bootstrap/Alert';

const AlertContext = createContext()

export const AlertProvider = ({children}) =>{

    const [noti, setNoti] = useState('');
    const [type, setType] = useState('');

    const alertStyle = {
        top: 150,
        position: 'absolute',
        right:10
    }
    
    const setNotification = (ty, msg) =>{
        setNoti(msg)
        setType(ty)

        setTimeout(()=>{
            setNoti('')
        },2000)
    }
    

    return (
        <AlertContext.Provider value={{setNotification}}>
            {noti !== '' && <Alert style={alertStyle} key={type} variant={type}>{noti}</Alert>}
            {children}
        </AlertContext.Provider>
    )
}

export default AlertContext