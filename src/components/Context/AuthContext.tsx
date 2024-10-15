'use client'
import { createContext, useState, useContext } from 'react';
interface AuthDataType {
    isAdmin : boolean,
    data : {
        ID : number 
        uuid : string
        email : string
        name : string
    }
}
interface AuthContextType {
    authData : AuthDataType;
    login : (data : any) => void;
    logout : () => void;
    setPart : () => void;
}
const AuthContext = createContext<AuthContextType | any>(null);

export default function AuthProvider ({children} : any) {
    const [authData, setAuthData] = useState<any>(null);
    const [part , setPartInfo] = useState<string>('')
    function login(data : any){ 
        setAuthData(data);
    }
    function logout () {
        setAuthData(null)
    }
    function setPart (name : any) {
        setPartInfo(name)
    }
    return(
        <AuthContext.Provider value={{authData, part, login, logout, setPart}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)