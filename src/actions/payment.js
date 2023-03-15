import * as api from '../api/index'


export const userPayment = (userSubscriptionData, navigate) => async (dispatch) => {
    try {
        const { data } = await api.userPricingPlan(userSubscriptionData)
        //console.log("Data:",data)
        fetchAllSubscribers()
        dispatch({ type : "PAY_FOR_PLAN", payload: data})
        navigate('/')
    } catch (error) {
        console.log(error)
    }
}


export const fetchAllSubscribers = () => async (dispatch) => {
    try {
       
       const { data } = await api.getAllSubscribedUsers()
       //console.log("Fetched Subscribers Data : ", data)
       dispatch({ type : 'FETCH_ALL_SUBSCRIBED_USERS', payload: data})
    } catch (error) {
        console.log(error)
    }
}
