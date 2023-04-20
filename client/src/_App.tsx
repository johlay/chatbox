// import { isEmpty } from "lodash";
// import { useEffect, useState } from "react";
// import Button from "react-bootstrap/Button";
// import Container from "react-bootstrap/Container";
// import { io } from "socket.io-client";

// const App = () => {
//   const [chat, setChat] = useState<any>([]);
//   const [clientMsg, setClientMsg] = useState("");
//   const [username, setUsername] = useState<string | undefined>("");
//   const socket = io("http://localhost:8000");

//   useEffect(() => {
//     socket.on("connect", () => {});

//     socket.on("chat_message", (data) => {
//       setChat([...chat, data]);
//     });

//     socket.on("disconnect", () => {});
//   }, [socket, chat]);

//   const onSend = () => {
//     socket.emit("chat_message", `${username}: ${clientMsg}`);
//     setClientMsg("");
//   };

//   return (
//     <Container className="App">
//       <h1 className="my-3">Helpchat</h1>

//       <div>
//         <div>
//           <p className="fw-bold">Chat history:</p>
//           {!isEmpty(chat) && chat.map((msg: string) => <p>{msg}</p>)}
//         </div>
//         <hr />

//         <div>
//           <input
//             type="text"
//             placeholder="Enter your message"
//             value={clientMsg}
//             onChange={(e) => setClientMsg(e["target"]["value"])}
//           />
//           <input
//             type="text"
//             placeholder="Enter your name"
//             value={username}
//             onChange={(e) => setUsername(e["target"]["value"])}
//           />
//           <div className="mt-2">
//             <Button size={"sm"} onClick={() => onSend()}>
//               Send message
//             </Button>
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// export default App;

const _App = () => {
  return <></>;
};

export default _App;
