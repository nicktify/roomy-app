import { useEffect } from "react";
import { io } from "socket.io-client";

const Test = () => {
  useEffect(() => {
    // const socket = io();
    // socket.on('connect', function() {
    //   console.log('Connected');
    //   socket.emit('message', 'Hola');
    // });
  }, [])

  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

export default Test;