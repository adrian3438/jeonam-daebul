'use client'
import { createContext, useState, useContext } from 'react';
interface AuthContextType {
    authData : any;
    login : (data : any) => void;
    logout : () => void;
}
const AuthContext = createContext<AuthContextType | any>(null);

export default function AuthProvider ({children} : any) {
    const [authData, setAuthData] = useState<any>(null);
    const [part , setPartInfo] = useState<any>({
        id : '', name : ''
    })
    function login(data : any){ 
        setAuthData(data);
    }
    function logout () {
        setAuthData(null)
    }
    function setPart (id : any, name : any) {
        setPartInfo({
            id : id , name : name
        })
    }
    return(
        <AuthContext.Provider value={{authData, login, logout, setPart}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)