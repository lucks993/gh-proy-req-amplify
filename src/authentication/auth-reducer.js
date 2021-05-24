import {
    GET_TOKEN,
    GET_TOKEN_SUCCESS,
    GET_TOKEN_ERROR,

    USER_LOAD,
    USER_LOAD_SUCCESS,
    USER_LOAD_ERROR,
    LOGOUT,
    LOGOUT_SUCCESS,
    LOGOUT_ERROR,
    
    REFRESH_TOKEN,
    REFRESH_TOKEN_SUCCESS,
    REFRESH_TOKEN_ERROR
} from './types';


const initialState = {
    tokenId: localStorage.getItem('token'),
    isAuthenticated:false,
    loading: false,
    user:'',
    error:null

}

export default function(state=initialState,action){
    switch(action.type){
        case GET_TOKEN:
        case REFRESH_TOKEN:
        case USER_LOAD:
        case LOGOUT:
            return {
                ...state,
                loading: action.payload
            }
        case GET_TOKEN_SUCCESS:
        case REFRESH_TOKEN_SUCCESS:
            return{
                ...state,
                loading:false,
                tokenId: action.payload
            }
        case GET_TOKEN_ERROR:
        case REFRESH_TOKEN_ERROR:
        case LOGOUT_ERROR:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        case  USER_LOAD_SUCCESS:
            return{
                ...state,
                isAuthenticated: true,
                loading:false,
                user:action.payload          
            }
        case USER_LOAD_ERROR:
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                error: action.payload

            }    
        case LOGOUT_SUCCESS:
            return{
                ...state,
                isAuthenticated: false,
                tokenId:null,
                user:null,
                loading:false
            }     
            default:
            return state;
        }
    }
