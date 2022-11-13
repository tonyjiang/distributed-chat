import "./App.css";
import Channel from "./Channel.js";
import SocketIOClient from "socket.io-client";

function App(props) {
  return (
    <div>
      <div className="App">
        <Channel
          roomID="elves"
          socket={SocketIOClient.connect("http://localhost:3001")}
        />
        <Channel
          roomID="hobbits"
          socket={SocketIOClient.connect("http://localhost:3001")}
        />
        <Channel
          roomID="humans"
          socket={SocketIOClient.connect("http://localhost:3001")}
        />
      </div>
      <br />
      <br />
      <br />
      <div className="App">
        <Channel
          roomID="elves"
          socket={SocketIOClient.connect("http://localhost:3002")}
        />
        <Channel
          roomID="hobbits"
          socket={SocketIOClient.connect("http://localhost:3002")}
        />
        <Channel
          roomID="humans"
          socket={SocketIOClient.connect("http://localhost:3002")}
        />
      </div>
    </div>
  );
}

export default App;
