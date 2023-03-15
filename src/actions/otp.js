import * as api from '../api';

export const sendUserOtp = (otpdata,navigate) => async()=> {
    try {
        const { data } = await api.sendOtp(otpdata)
        console.log(data)
        navigate('/')
       
    }
    catch (error){
        console.log(error)


    }
}