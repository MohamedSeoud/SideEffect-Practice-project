import React, { useEffect, useState } from 'react'

const AuthContext =React.createContext({
    isLoggedIn:false,
    onLogout:()=>{},
    onLogin :(email,password)=>{}
});

export const AuthContextProvider = (props) =>{

    const [isLoggingIn,setIsLoggingIn] = useState(false);

    useEffect(()=>{
        const loggingItem = localStorage.getItem('isLoggingIn');
      if(loggingItem==='1'){
        setIsLoggingIn(true);
      }
      },[]);
    
    const LoginHandler = (email,password) =>{
        setIsLoggingIn(true);
        localStorage.setItem('isLoggingIn','1')

    }

    const LogoutHandler = () =>{
        setIsLoggingIn(false);
        localStorage.removeItem('isLoggingIn');
    }



    return <AuthContext.Provider
    value={{isLoggedIn:isLoggingIn,
        onLogout:LogoutHandler,
        onLogin:LoginHandler}}
    
    >{props.children}</AuthContext.Provider>
} 
export default AuthContext;

