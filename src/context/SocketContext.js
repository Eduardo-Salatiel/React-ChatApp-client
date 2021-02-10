import React, { useContext, useEffect } from 'react';
import { createContext } from 'react';
import { useSocket } from '../hooks/useSocket'
import { types } from '../types/types';
import { scrollToBottomAnimated } from '../utils/scrollToBottom';
import { AuthContext } from './AuthContext';
import { ChatContext } from './chat/ChatContext';

export const SocketContext = createContext();


export const SocketProvider = ({ children }) => {
    const {auth} = useContext(AuthContext);
    const { socket, online, conectarSocket,desconectarSocket } = useSocket('http://localhost:8080');
    const {dispatch} = useContext(ChatContext);

    useEffect(() => {
        if(auth.logged){
            conectarSocket()
        }
    }, [auth,conectarSocket]);

    useEffect(() => {
        if(!auth.logged){
            desconectarSocket()
        }
    }, [auth, desconectarSocket]);

    useEffect(() => {
        socket?.on('lista-usuarios', (usuarios) => {
            dispatch({
                type: types.USUARIOS_CARGADOS,
                payload: usuarios
            });
        })
    }, [socket, dispatch]);

    useEffect(() => {
        socket?.on('mensaje-personal',(mensaje) => {
            dispatch({
                type: types.NUEVO_MENSAJE ,
                payload: mensaje
            })
            scrollToBottomAnimated('messages')
        })
    },[socket,dispatch])
    
    return (
        <SocketContext.Provider value={{ socket, online }}>
            { children }
        </SocketContext.Provider>
    )
}