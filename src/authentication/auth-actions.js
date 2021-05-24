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
import {tokenAxios,userAxios,configRequestToken,refreshTokenAxios,configRefreshToken}from './auth-api';
import {URL_LOGOUT} from './constants'



export  function getTokenAction(code){
    return async(dispatch)=>{
        
            dispatch(getToken());
              configRequestToken.params['code']=code;
        try{
            localStorage.clear();
           const response = await tokenAxios.post('',null,configRequestToken);
            dispatch(getTokenSuccess(response.data.id_token));
            localStorage.setItem('tokenId',response.data.id_token);
            localStorage.setItem('tokenAccess',response.data.access_token);
            localStorage.setItem('tokenRefresh',response.data.refresh_token);

        }catch(error){
            console.log(error);
            dispatch(getTokenError(true));
     }
   

    }
}

const getToken = () =>({
    type:GET_TOKEN,
    payload:true
})

const getTokenSuccess = (token) =>({
    type:GET_TOKEN_SUCCESS,
    payload:token

})

const getTokenError = (state)=>({
    type:GET_TOKEN_ERROR,
    payload:state
})


export   function loadUserAction(){
    return async(dispatch)=>{
        dispatch(loarUser());
        try{
            const tokenAccess = localStorage.getItem('tokenAccess');
            userAxios.defaults.headers.common['Authorization'] = `Bearer ${tokenAccess}`;
            const response = await userAxios.get('',null);
            dispatch(loarUserSuccess(response.data));
        }catch(error){
            console.log(error);
            dispatch(loarUserError(true));

     }
    }
}

const loarUser = ()=>({
    type:USER_LOAD,
    payload:true
})

const loarUserSuccess = (user)=>({
    type:USER_LOAD_SUCCESS,
    payload:user
})
const loarUserError = (state)=>({
    type:USER_LOAD_ERROR,
    payload:state
})

export function logoutAction(){
    return async(dispatch)=>{
        dispatch(logout())
        try{     
        localStorage.removeItem('tokenId');
        localStorage.removeItem('tokenAccess');
        localStorage.removeItem('tokenRefresh')
        dispatch(logoutSuccess());

        window.location.assign(`${URL_LOGOUT}`)
        }catch(error){
            console.log(error);
            dispatch(logoutError(true));
        }
    }
}

const logout = () =>({
    type:LOGOUT,
    payload:true

})

const logoutSuccess = () =>({
    type:LOGOUT_SUCCESS

})
const logoutError = () =>({
    type:LOGOUT_ERROR

})

export  function refreshTokenAction(){ 
    return async(dispatch)=>{
     
        dispatch(refreshToken());
        try{
            configRefreshToken.params['refresh_token']=localStorage.getItem('tokenRefresh');
            const response = await refreshTokenAxios.post('',null,configRefreshToken);
            dispatch(refreshTokenSuccess(response.data.id_token));
            localStorage.setItem('tokenId',response.data.id_token);
            localStorage.setItem('tokenAccess',response.data.access_token);

        }catch(error){
            console.log(error);
            dispatch(refreshTokenError(true));

        }

    }
}

const refreshToken =() =>({
    type:REFRESH_TOKEN,
    payload:true
})
 
const refreshTokenSuccess =(token)=>({
    type:REFRESH_TOKEN_SUCCESS,
    payload:token
})

const refreshTokenError = (state)=>({
    type:REFRESH_TOKEN_ERROR,
    payload:state
})

