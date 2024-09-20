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
    function login(data : any){ 
        setAuthData(data);
    }
    function logout () {
        setAuthData(null)
    }
    return(
        <AuthContext.Provider value={{authData, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)