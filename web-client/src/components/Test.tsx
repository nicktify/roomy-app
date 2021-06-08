import { useEffect } from "react";
import { io } from "socket.io-client";

const Test = () => {
  useEffect(() => {
    const socket = io('http://127.0.0.1:8000/test', {
      transports: ['websocket']
    });
    socket.on('connection', () => {
      console.log('connected')
    })
    socket.emit('events', 'hola');
  }, [])

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

export default Test;