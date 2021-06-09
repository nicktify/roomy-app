import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";

const Test = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    name: '',
    text: '',
  });
  useEffect((): any => {
    const socket = socketIOClient('http://localhost:4000');
    socket.on('msgToClient', (message) => {
      console.log(message)
     socket.emit('msgToServer', 'hola')
    })
    return () => socket.disconnect();
  }, [])

  const sendMessage = () => {
    
  }

  return (
    <div>
      <ul>
        {
          messages.map(message => (
            <li>message.text - message.name</li>
          ))
        }
      </ul>
      <input type="text" onChange={(e) => setInput(e.target.value)}/>
      {/* <button onClick={}>
        send
      </button> */}
    </div>
  );
};

export default Test;