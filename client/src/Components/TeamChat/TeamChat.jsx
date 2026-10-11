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
    <div className="flex h-screen bg-surface">
      <div className="flex-1 flex overflow-hidden">
        <div className="w-80 border-r border-line bg-white flex flex-col">
          <div className="p-4 border-b border-line">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="mr-2 w-10 h-10 rounded-full bg-line flex items-center justify-center">
                  <span className="font-poppins font-medium text-primary">
                    {mockUser.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-poppins font-medium text-primary">
                  {mockUser.name}
                </h3>
                <p className="font-poppins text-sm text-ink">{mockUser.role}</p>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full pl-10 pr-4 py-2 bg-surface rounded-lg border border-line focus:ring-2 focus:ring-primary focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="p-4">
              <h4 className="font-poppins font-medium text-ink mb-2">
                Channels
              </h4>
              {mockChannels.map((channel) => (
                <button
                  key={channel.id}
                  className={`w-full flex items-center justify-between p-3 rounded-lg mb-1 ${
                    selectedChat === channel.id
                      ? "bg-primary text-white"
                      : "hover:bg-surface text-ink"
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
                          ? "bg-white text-primary"
                          : "bg-primary text-white"
                      }`}
                    >
                      {channel.unread}
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="p-4">
              <h4 className="font-poppins font-medium text-ink mb-2">
                Direct Messages
              </h4>
              {mockDirectMessages.map((dm) => (
                <button
                  key={dm.id}
                  className={`w-full flex items-center justify-between p-3 rounded-lg mb-1 ${
                    selectedChat === dm.id
                      ? "bg-primary text-white"
                      : "hover:bg-surface text-ink"
                  }`}
                  onClick={() => setSelectedChat(dm.id)}
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="mr-2 w-10 h-10 rounded-full bg-line flex items-center justify-center">
                        <span className="font-poppins font-medium text-primary">
                          {dm.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
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
                          selectedChat === dm.id ? "text-white/70" : "text-ink"
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
                          ? "bg-white text-primary"
                          : "bg-primary text-white"
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
          <div className="h-16 border-b border-line px-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon={faHashtag} className="text-primary" />
              <div>
                <h2 className="font-poppins font-medium text-primary">
                  {mockChannels.find((c) => c.id === selectedChat)?.name ||
                    mockDirectMessages.find((d) => d.id === selectedChat)
                      ?.name ||
                    "General"}
                </h2>
                <p className="font-poppins text-sm text-ink">
                  {mockMessages[selectedChat]?.length || 5} messages
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface">
                <FontAwesomeIcon icon={faPhone} className="text-ink" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface">
                <FontAwesomeIcon icon={faVideo} className="text-ink" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-surface">
                <FontAwesomeIcon icon={faInfoCircle} className="text-ink" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4">
            {mockMessages[selectedChat]?.map((message) => (
              <div key={message.id} className="mb-6">
                <div className="flex items-start gap-4">
                  <div className="mr-2 w-10 h-10 rounded-full bg-line flex items-center justify-center">
                    <span className="font-poppins font-medium text-primary">
                      {message.user
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-poppins font-medium text-primary">
                        {message.user}
                      </h4>
                      <span className="font-poppins text-sm text-ink">
                        {message.role}
                      </span>
                      <span className="font-poppins text-sm text-ink">
                        {message.time}
                      </span>
                      {message.isPriority && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs">
                          Priority
                        </span>
                      )}
                    </div>
                    <p className="font-poppins text-ink mb-2">
                      {message.content}
                    </p>
                    {message.attachments && (
                      <div className="flex gap-2 mb-2">
                        {message.attachments.map((attachment, index) => (
                          <button
                            key={index}
                            className="flex items-center gap-2 px-4 py-2 bg-surface rounded-lg hover:bg-line"
                          >
                            <FontAwesomeIcon
                              icon={faFilePdf}
                              className="text-primary"
                            />
                            <span className="font-poppins text-sm text-ink">
                              {attachment.name}
                            </span>
                            <span className="font-poppins text-xs text-ink">
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
                            className="px-2 py-1 bg-surface rounded-lg text-sm hover:bg-line"
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

          <div className="h-24 border-t border-line px-6 py-4">
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-surface">
                <FontAwesomeIcon icon={faPlus} className="text-ink" />
              </button>
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 bg-surface rounded-lg border border-line focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-line">
                    <FontAwesomeIcon icon={faSmile} className="text-ink" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-line">
                    <FontAwesomeIcon icon={faPaperclip} className="text-ink" />
                  </button>
                </div>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-white hover:bg-primary-hover">
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
