import './App.css';
import Channel from './Channel.js';
import SocketIOClient from 'socket.io-client';

function App(props) {
  return (
    <div className="App">
      <Channel roomID="elves" socket={ SocketIOClient.connect('http://localhost:3001') } />
      <Channel roomID="hobbits" socket={ SocketIOClient.connect('http://localhost:3001') } />
      <Channel roomID="humans" socket={ SocketIOClient.connect('http://localhost:3001') } />
    </div>
  );
}

export default App;
