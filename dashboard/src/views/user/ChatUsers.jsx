import React  from 'react';
import { useState } from 'react';

import UserHeader from '../../layout/UserHeader';

const ChatUsers = () => {

    const users = [
        { id: 1, name: "Carlos Gómez", image: "https://placehold.co/50x50" },
        { id: 2, name: "Laura Ruiz", image: "https://placehold.co/50x50" },
        { id: 3, name: "David Sánchez", image: "https://placehold.co/50x50" },
      ];
    
      const messagesByUser = {
        1: [
          { fromMe: false, text: "Hola, ¿sigue disponible la bicicleta?" },
          { fromMe: true, text: "¡Hola! Sí, aún está disponible." },
        ],
        2: [
          { fromMe: false, text: "¿Podrías enviarme más fotos?" },
          { fromMe: true, text: "Claro, te las paso enseguida." },
        ],
        3: [{ fromMe: false, text: "Estoy interesado en el iPhone." }],
      };

    const [selectedUserId, setSelectedUserId] = useState(users[0].id);
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState(messagesByUser);
  
    const selectedUser = users.find((user) => user.id === selectedUserId);
  
    const handleSendMessage = () => {
      if (!newMessage.trim()) return;
      const updatedMessages = {
        ...messages,
        [selectedUserId]: [
          ...(messages[selectedUserId] || []),
          { fromMe: true, text: newMessage.trim() },
        ],
      };
      setMessages(updatedMessages);
      setNewMessage("");
    };
  
    return (
        <div>
            
            <div className="h-screen flex">
      {/* Left Sidebar - List of users */}
      <div className="w-1/4 border-r border-gray-300 bg-white overflow-y-auto">
        <h2 className="text-lg font-bold p-4">Chats</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
                selectedUserId === user.id ? "bg-gray-100 font-semibold" : ""
              }`}
              onClick={() => setSelectedUserId(user.id)}
            >
              <img
                src={user.image}
                alt={user.name}
                className="w-10 h-10 rounded-full mr-3"
              />
              <span>{user.name}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat area */}
      <div className="w-3/4 flex flex-col h-full">
        {/* Header - Selected user */}
        <div className="flex items-center border-b border-gray-300 p-4 bg-white shadow-sm sticky top-0 z-10">
          <img
            src={selectedUser.image}
            alt={selectedUser.name}
            className="w-12 h-12 rounded-full mr-4"
          />
          <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
        </div>

        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
          {(messages[selectedUserId] || []).map((msg, index) => (
            <div
              key={index}
              className={`max-w-sm px-4 py-2 rounded-xl text-sm flex flex-col ${
                msg.fromMe
                  ? "bg-indigo-500 text-white self-end ml-auto"
                  : "bg-gray-200 text-gray-800 self-start mr-auto"
              }`}
            >
              {!msg.fromMe && (
                <span className="text-xs text-gray-500 mb-1">{selectedUser.name}</span>
              )}
              <span>{msg.text}</span>
            </div>
          ))}
        </div>

        {/* Input area */}
        <div className="p-4 border-t border-gray-300 bg-white flex items-center gap-2 sticky bottom-0 z-10">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 outline-none"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            onClick={handleSendMessage}
            className="bg-indigo-500 text-white px-4 py-2 rounded-full hover:bg-indigo-600"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
        </div>
    );
};

export default ChatUsers;