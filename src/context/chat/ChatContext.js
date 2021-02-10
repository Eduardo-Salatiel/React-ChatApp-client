import {createContext, useReducer} from 'react';
import { chatReducer } from './chatReducer';

export const ChatContext = createContext();
const initialState = {
    uid: '',
    chatActivo: null,
    usuarios: [],
    mensajes: []
}

const ChatProvider = (props) => {
    const [chatState, dispatch] = useReducer(chatReducer, initialState);
    return ( 
        <ChatContext.Provider value={{
            chatState,
            dispatch
        }}>
            {props.children}
        </ChatContext.Provider>
     );
}
 
export default ChatProvider;