import './App.css';
import { useEffect, useState } from 'react';
import SocketIOClient from 'socket.io-client';


const socket = SocketIOClient.connect('http://localhost:3001');

function App() {
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    console.log('inside useEffect ...')
    socket.on("connect", () => {
      console.log("SOCKET CONNECTED!", socket.id);
    });

    socket.on('broadcast_message', (data) => {
      console.log('just received broadcast message')
      setMessages([...messages, parse(data.message)]);
    });
  }, [messages]);

  const parse = (mess) => {
    return JSON.parse(JSON.stringify(mess));
  }

  const sendMessage = () => {
    console.log('sending message ...' + message);
    socket.emit('new_message', {message: message});
    setMessages([...messages, message]);
  }

  return (
    <div className="App">
      <input placeholder='Your message ...' onChange={e => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send message</button>
      <ul>
      {messages.map((mess, idx) => {
        return (<li key={idx}>{ idx } -- {mess}</li>);
      })}
      </ul>
    </div>
  );
}

export default App;
