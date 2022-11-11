import "./App.css";
import { useEffect, useRef, useState } from "react";

export default function Channel(props) {
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);

  console.log("another round in Channel ...");

  useEffect(() => {
    props.socket.on("connect", () => {
      console.log("Socket connected!", props.socket.id, props.roomID);
      props.socket.emit("room_id", { room_id: props.roomID });
    });

    props.socket.on("broadcast_message", (data) => {
      console.log("just received broadcast message");
      console.log(data);
      messages.push(parse(data.message));
      setMessages([...messages]);
    });

    return () => {
      props.socket.disconnect();
    }
  }, []);

  const parse = (mess) => {
    return JSON.parse(JSON.stringify(mess));
  };

  const sendMessage = () => {
    console.log("sending message ..." + inputRef.current.value);
    props.socket.emit("new_message", {
      room_id: props.roomID,
      message: inputRef.current.value,
    });
    inputRef.current.value = "";
  };

  return (
    <div className="App">
      <input placeholder="Your message ..." ref={inputRef} />
      <button onClick={sendMessage}>Send message from {props.roomID}</button>
      <ul>
        {messages.map((mess, idx) => {
          return (
            <li key={idx}>
              {idx} -- {mess}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
