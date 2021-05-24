import axios from 'axios';

export const tokenAxios = axios.create({
    baseURL: 'https://myappdemo.auth.us-east-2.amazoncognito.com/oauth2/token'
   
});

export const  configRequestToken =  {
    headers: { 
        'Content-Type': 'application/x-www-form-urlencoded', 
        'Authorization': 'Basic NTdzNWg5ZmdkdjJlbDhnbTg3dG5sanJpcjk6dmhpOW11ZGlwcDE5ZGZmY2hsbTQ1ZTFpcjRpOGtsZ2dlamJrcWoyM2xjOGEyZTc1MTBt'
      },
    params:{
        'grant_type':'authorization_code',
        'redirect_uri':'http://localhost:8080',
        'client_id':'57s5h9fgdv2el8gm87tnljrir9',
        'scope':'phone%20email%20openid%20aws.cognito.signin.user.admin%20profile',
    }
}   

export const userAxios = axios.create({
    baseURL:'https://myappdemo.auth.us-east-2.amazoncognito.com/oauth2/userInfo'


});

export const refreshTokenAxios = axios.create({
    baseURL:'https://myappdemo.auth.us-east-2.amazoncognito.com/oauth2/token',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Authorization':'Basic NTdzNWg5ZmdkdjJlbDhnbTg3dG5sanJpcjk6dmhpOW11ZGlwcDE5ZGZmY2hsbTQ1ZTFpcjRpOGtsZ2dlamJrcWoyM2xjOGEyZTc1MTBt'
}
})

export const configRefreshToken =({
    params:{
        'grant_type':'refresh_token',
        'client_id':'57s5h9fgdv2el8gm87tnljrir9'
    }
})


export const  logoutAxios = axios.create({
    baseURL:'https://myappdemo.auth.us-east-2.amazoncognito.com/logout',
    headers: { 
        'Content-Type':'application/x-www-form-urlencoded'
      }
    
});

export const logoutConfig = ({
    params:{
        'response_type':'57s5h9fgdv2el8gm87tnljrir9',
        'client_id':'57s5h9fgdv2el8gm87tnljrir9',
        'redirect_uri':'http://localhost:8080',
        'state':'STATE',
        'scope':'openid+profile+aws.cognito.signin.user.admin'
    }

})