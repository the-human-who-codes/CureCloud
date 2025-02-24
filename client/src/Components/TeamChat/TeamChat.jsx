import { useState } from "react";
import MockData from "../../data/MockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHashtag,
  faPhone,
  faVideo,
  faInfoCircle,
  faFilePdf,
  faPlus,
  faSmile,
  faPaperclip,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

function TeamChat() {
  const [selectedChat, setSelectedChat] = useState("general");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const mockUser = MockData.mockUser;
  const mockChannels = MockData.mockChannels;
  const mockDirectMessages = MockData.mockDirectMessages;
  const mockMessages = MockData.mockMessages;

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <></>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 border-r border-[#e1e8ff] bg-white flex flex-col">
          <div className="p-4 border-b border-[#e1e8ff]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={mockUser.avatar}
                  alt={mockUser.name}
                  className="w-10 h-10 rounded-full"
                />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-poppins font-medium text-[#2c4ecf]">
                  {mockUser.name}
                </h3>
                <p className="font-poppins text-sm text-[#4a5568]">
                  {mockUser.role}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-[#f8faff] rounded-lg border border-[#e1e8ff] focus:ring-2 focus:ring-[#2c4ecf] focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4a5568]"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h4 className="font-poppins font-medium text-[#4a5568] mb-2">
                Channels
              </h4>
              {mockChannels.map((channel) => (
                <button
                  key={channel.id}
                  className={`w-full flex items-center justify-between p-3 rounded-lg mb-1 ${
                    selectedChat === channel.id
                      ? "bg-[#2c4ecf] text-white"
                      : "hover:bg-[#f8faff] text-[#4a5568]"
                  }`}
                  onClick={() => setSelectedChat(channel.id)}
                >
                  <div className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faHashtag} />
                    <span className="font-poppins">{channel.name}</span>
                  </div>
                  {channel.unread > 0 && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedChat === channel.id
                          ? "bg-white text-[#2c4ecf]"
                          : "bg-[#2c4ecf] text-white"
                      }`}
                    >
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-4">
              <h4 className="font-poppins font-medium text-[#4a5568] mb-2">
                Direct Messages
              </h4>
              {mockDirectMessages.map((dm) => (
                <button
                  key={dm.id}
                  className={`w-full flex items-center justify-between p-3 rounded-lg mb-1 ${
                    selectedChat === dm.id
                      ? "bg-[#2c4ecf] text-white"
                      : "hover:bg-[#f8faff] text-[#4a5568]"
                  }`}
                  onClick={() => setSelectedChat(dm.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src="/default-avatar.png"
                        alt={dm.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div
                        className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white ${
                          dm.status === "online"
                            ? "bg-green-400"
                            : dm.status === "away"
                            ? "bg-yellow-400"
                            : "bg-gray-400"
                        }`}
                      ></div>
                    </div>
                    <div className="text-left">
                      <p className="font-poppins text-sm">{dm.name}</p>
                      <p
                        className={`text-xs ${
                          selectedChat === dm.id
                            ? "text-white/70"
                            : "text-[#4a5568]"
                        }`}
                      >
                        {dm.role}
                      </p>
                    </div>
                  </div>
                  {dm.unread > 0 && (
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        selectedChat === dm.id
                          ? "bg-white text-[#2c4ecf]"
                          : "bg-[#2c4ecf] text-white"
                      }`}
                    >
                      {dm.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white">
          <div className="h-16 border-b border-[#e1e8ff] px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faHashtag} className="text-[#2c4ecf]" />
              <div>
                <h2 className="font-poppins font-medium text-[#2c4ecf]">
                  {mockChannels.find((c) => c.id === selectedChat)?.name ||
                    mockDirectMessages.find((d) => d.id === selectedChat)
                      ?.name ||
                    "General"}
                </h2>
                <p className="font-poppins text-sm text-[#4a5568]">
                  {mockMessages[selectedChat]?.length || 5} messages
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f8faff]">
                <FontAwesomeIcon icon={faPhone} className="text-[#4a5568]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f8faff]">
                <FontAwesomeIcon icon={faVideo} className="text-[#4a5568]" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f8faff]">
                <FontAwesomeIcon
                  icon={faInfoCircle}
                  className="text-[#4a5568]"
                />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {mockMessages[selectedChat]?.map((message) => (
              <div key={message.id} className="mb-6">
                <div className="flex items-start gap-4">
                  <img
                    src={message.avatar}
                    alt={message.user}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-poppins font-medium text-[#2c4ecf]">
                        {message.user}
                      </h4>
                      <span className="font-poppins text-sm text-[#4a5568]">
                        {message.role}
                      </span>
                      <span className="font-poppins text-sm text-[#4a5568]">
                        {message.time}
                      </span>
                      {message.isPriority && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                          Priority
                        </span>
                      )}
                    </div>
                    <p className="font-poppins text-[#4a5568] mb-2">
                      {message.content}
                    </p>
                    {message.attachments && (
                      <div className="flex gap-2 mb-2">
                        {message.attachments.map((attachment, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-2 px-4 py-2 bg-[#f8faff] rounded-lg hover:bg-[#e1e8ff]"
                          >
                            <FontAwesomeIcon
                              icon={faFilePdf}
                              className="text-[#2c4ecf]"
                            />
                            <span className="font-poppins text-sm text-[#4a5568]">
                              {attachment.name}
                            </span>
                            <span className="font-poppins text-xs text-[#4a5568]">
                              {attachment.size}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                    {message.reactions && (
                      <div className="flex gap-2">
                        {message.reactions.map((reaction, index) => (
                          <button
                            key={index}
                            className="px-2 py-1 bg-[#f8faff] rounded-lg text-sm hover:bg-[#e1e8ff]"
                          >
                            {reaction}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="h-24 border-t border-[#e1e8ff] px-6 py-4">
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#f8faff]">
                <FontAwesomeIcon icon={faPlus} className="text-[#4a5568]" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 bg-[#f8faff] rounded-lg border border-[#e1e8ff] focus:ring-2 focus:ring-[#2c4ecf] focus:border-transparent"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#e1e8ff]">
                    <FontAwesomeIcon
                      icon={faSmile}
                      className="text-[#4a5568]"
                    />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#e1e8ff]">
                    <FontAwesomeIcon
                      icon={faPaperclip}
                      className="text-[#4a5568]"
                    />
                  </button>
                </div>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2c4ecf] text-white hover:bg-[#2341b0]">
                <FontAwesomeIcon icon={faPaperPlane} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamChat;
