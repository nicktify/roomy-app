import React, { useEffect, useRef } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

const useWebSocket = () => {

  const ws = useRef<WebSocket | null>(null)

  const setupWebSocket = () => {

    const socket = new WebSocket('ws://localhost:4000')

    socket.onopen = () => {
      console.log('Open')
    }

    socket.onmessage = (message) => {
      console.log('Message: ', message)
    }

    socket.onerror = err => {
      console.log(err)
    }
    ws.current = socket;
  }

  useEffect(() => {
    if (!Boolean(ws.current)) setupWebSocket()

    return () => {
      if (Boolean(ws.current)) {
        ws.current!.close()
      }
    }
  })

  return {
    sendMessage: (message: string) => Boolean(ws.current) && ws.current!.send(message),
  }

}

const MessageScreen = () => {

  const socket = useWebSocket()




  return (
    <View style={{flex: 1}}>
      <Text>Message Screen</Text>
      <TextInput 
        style={{
          borderRadius: 10,
          borderWidth: 0.1,
          marginTop: 200,
          width: 500,
          
        }}
      />
      <Button
        onPress={() => socket.sendMessage('hello')}
        title='press please'
      >
      </Button>
    </View>
  );
};

export default MessageScreen;