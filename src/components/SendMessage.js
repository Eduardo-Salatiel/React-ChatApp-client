import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chat/ChatContext";
import { SocketContext } from "../context/SocketContext";

const SendMessages = () => {
  const [mensaje, setMensaje] = useState('');
  const { socket } = useContext(SocketContext);
  const { auth } = useContext(AuthContext);
  const { chatState } = useContext(ChatContext);

  const handleChange = (e) => {
    setMensaje( e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (mensaje.length === 0) { return }
    setMensaje('')
    socket.emit('mensaje-personal', {
      de: auth.uid,
      para: chatState.chatActivo,
      mensaje 
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="type_msg row">
        <div className="input_msg_write col-sm-9">
          <input
            type="text"
            autoComplete="off"
            className="write_msg"
            placeholder="Mensaje..."
            name="mensaje"
            value={mensaje}
            onChange={handleChange}
          />
        </div>
        <div className="col-sm-3 text-center">
          <button className="msg_send_btn mt-3" type="submit">
            enviar
          </button>
        </div>
      </div>
    </form>
  );
};

export default SendMessages;
