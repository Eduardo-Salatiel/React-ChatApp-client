import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import IncomingMessage from "./IncomingMessage";
import OutgoingMessage from "./OutgoingMessage";
import SendMessages from "./SendMessage";

const Messages = () => {
  const {chatState} = useContext(ChatContext);
  const {auth} = useContext(AuthContext);

  return (
    <div className="mesgs">
      {/* <!-- Historia inicio --> */}
      <div className="msg_history" id="messages">
        {chatState.mensajes.map(msg => (
          msg.para === auth.uid
            ?<IncomingMessage key={msg._id} msg={msg} />
            :<OutgoingMessage key={msg._id} msg={msg} />
        ))}
      </div>
      {/* <!-- Historia Fin --> */}
      <SendMessages />
    </div>
  );
};

export default Messages;
