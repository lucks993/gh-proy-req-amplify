export const getCode = () =>{
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let code = params.get('code');
    if(code){
        localStorage.setItem('code',code);
    }
   
    return code;
   
}