import ATypes from '../types';

const initialState={
    isAuth:false,
    user: {},
}

export const authReducers =(state = initialState, action)=>{
    
    switch (action.type){
        case ATypes.AUTH_SET:
            return {
                ...state, isAuth: action.payload.isAuth,
            }
        case ATypes.USER_SET:            
            return{
                ...state, user: action.payload.user, isAuth:true,
            }
        case ATypes.AUTH_REFRESH:
            return{
                ...state, user: action.payload.user, isAuth:true,
            }
        
        case ATypes.AUTH_LOGOUT:
            return{
                ...state, user: {},isAuth:false,
            }

        default:
            return state;
    }
}

