const paymentReducer = (state= {data : null}, action) => {
    switch(action.type){
        case "PAY_FOR_PLAN" :
            console.log("State:",state)
              return { ...state }

        case "FETCH_ALL_SUBSCRIBED_USERS" :
           //console.log("Fetch:",action.payload)
              return { ...state, data: action.payload }

        default :
          return state 

    }
}

export default paymentReducer