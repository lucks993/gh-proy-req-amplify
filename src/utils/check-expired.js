import jwtDecode  from 'jwt-decode'


export const checkTokenExpired = ()=> {


    let tokenAccess;
    let tokenExp;
    const current_time = new Date().getTime() / 1000;
    if(localStorage.getItem('tokenAccess')){
     tokenAccess = jwtDecode(localStorage.getItem('tokenAccess'));
     tokenExp =tokenAccess.exp;
    }
    if(current_time>tokenExp){
      
        return true
    }
    return false
}