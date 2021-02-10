import { useContext } from "react";
import { ChatContext } from "../context/chat/ChatContext";
import { types } from "../types/types";
import { fetchConToken } from "../utils/fetch";
import { scrollToBottom } from "../utils/scrollToBottom";

const SidebarChatItem = ({ usuario }) => {
  const { chatState, dispatch } = useContext(ChatContext);

  const handleClick = async() => {
    dispatch({
      type: types.ACTIVAR_CHAT,
      payload: usuario.uid,
    });

    const resp = await fetchConToken(`/mensajes/${usuario.uid}`);
    dispatch({
      type: types.CARGAR_MENSAJES,
      payload: resp.mensajes
    });

    scrollToBottom('messages')
  };

  return (
    <div
      className={`chat_list ${
        usuario.uid === chatState.chatActivo && "active_chat"
      }`}
      onClick={handleClick}
    >
      <div className="chat_people">
        <div className="chat_img">
          <img
            src="https://ptetutorials.com/images/user-profile.png"
            alt="sunil"
          />
        </div>
        <div className="chat_ib">
          <h5>{usuario.nombre}</h5>
          {usuario.online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarChatItem;
