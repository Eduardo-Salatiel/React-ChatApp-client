import { types } from "../../types/types";

export const chatReducer = (state, action) => {
    switch (action.type) {
        case types.USUARIOS_CARGADOS:
            return {
                ...state,
                usuarios: [...action.payload]
            }
        case types.ACTIVAR_CHAT:
            if(state.chatActivo === action.payload) return state;
            return {
                ...state,
                chatActivo: action.payload,
                mensajes: []
            }
        case types.NUEVO_MENSAJE:
            if(state.chatActivo === action.payload.de ||
                state.chatActivo === action.payload.para){
                return {
                    ...state,
                    mensajes: [...state.mensajes, action.payload]
                }
            }else{
                return state;
            }
        case types.CARGAR_MENSAJES:
            return {
                ...state,
                mensajes: [...action.payload]
            }
        case types.PURGAR_CHATINFO:
            return {
                uid: '',
                chatActivo: null,
                usuarios: [],
                mensajes: []
            }

        default:
            return state;
    }
}