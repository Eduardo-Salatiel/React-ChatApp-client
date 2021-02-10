import { createContext, useCallback, useContext, useState } from 'react'
import { types } from '../types/types';
import { fetchConToken, fetchSinToken } from '../utils/fetch';
import { ChatContext } from './chat/ChatContext';

export const AuthContext = createContext();

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    name: null,
    email: null
}

const AuthProvider = (props) => {
    const [auth, setAuth] = useState(initialState);
    const { dispatch } = useContext(ChatContext)

    const login = async (email, password) => {
        const resp = await fetchSinToken('/login', {email,password}, 'POST');
        if (resp.ok) {
            await localStorage.setItem('token', resp.token);
            const {usuario}= resp;
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            })
        }
        return resp.ok
    }

    const register = async(nombre, email, password) => {
        const resp = await fetchSinToken('/login/new',{nombre,email,password}, 'POST');
        console.log(resp);
        if (resp.ok) {
            localStorage.setItem('token', resp.token);
            const {usuario}= resp;
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            })
        }
        return resp.ok
    }

    const verificaToken = useCallback(async () => {
        const token = localStorage.getItem('token');
        if(!token){
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            })

            return false
        }
        const resp = await fetchConToken('/login/renew');
        if (resp.ok) {
            localStorage.setItem('token', resp.token);
            const {usuario}= resp;
            setAuth({
                uid: usuario.uid,
                checking: false,
                logged: true,
                name: usuario.nombre,
                email: usuario.email
            })
        } else {
            setAuth({
                uid: null,
                checking: false,
                logged: false,
                name: null,
                email: null
            })
            return false
        }
        return resp.ok

    },[]);
    const logout = () => {
        localStorage.removeItem('token');
        setAuth({
            checking: false,
            logged: false,
        })
        dispatch({
            type: types.PURGAR_CHATINFO,
        })
    }

    return ( 
        <AuthContext.Provider value={{
            auth,
            login,
            register,
            verificaToken,
            logout,
        }}>
            {props.children}
        </AuthContext.Provider>
     );
}
 
export default AuthProvider;