import { useState } from "react";

function TeamChat() {
  const [selectedChat, setSelectedChat] = useState("general");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const mockUser = {
    id: "U001",
    name: "Dr. Sarah Connor",
    role: "Cardiologist",
    avatar: "/default-avatar.png",
    status: "online",
  };

  const mockChannels = [
    { id: "general", name: "General", type: "channel", unread: 2 },
    { id: "emergency", name: "Emergency Room", type: "channel", unread: 5 },
    { id: "cardiology", name: "Cardiology", type: "channel", unread: 0 },
    { id: "radiology", name: "Radiology", type: "channel", unread: 1 },
    { id: "nursing", name: "Nursing Staff", type: "channel", unread: 0 },
    { id: "lab", name: "Laboratory", type: "channel", unread: 3 },
  ];

  const mockDirectMessages = [
    {
      id: "dm1",
      name: "Dr. John Smith",
      role: "Surgeon",
      status: "online",
      unread: 2,
    },
    {
      id: "dm2",
      name: "Nurse Emma Wilson",
      role: "Head Nurse",
      status: "offline",
      unread: 0,
    },
    {
      id: "dm3",
      name: "Dr. Michael Chen",
      role: "Pediatrician",
      status: "away",
      unread: 1,
    },
    {
      id: "dm4",
      name: "Dr. Lisa Johnson",
      role: "Radiologist",
      status: "online",
      unread: 0,
    },
    {
      id: "dm5",
      name: "James Wilson",
      role: "Lab Technician",
      status: "online",
      unread: 0,
    },
  ];

  const mockMessages = {
    general: [
      {
        id: 1,
        user: "Dr. John Smith",
        avatar: "/default-avatar.png",
        time: "09:00 AM",
        content:
          "Good morning team! Just a reminder about the staff meeting at 2 PM today.",
        role: "Surgeon",
        reactions: ["👍", "✅"],
      },
      {
        id: 2,
        user: "Nurse Emma Wilson",
        avatar: "/default-avatar.png",
        time: "09:05 AM",
        content:
          "Thanks for the reminder. Could we also discuss the new patient admission protocol?",
        role: "Head Nurse",
        reactions: ["👍"],
      },
      {
        id: 3,
        user: "Dr. Michael Chen",
        avatar: "/default-avatar.png",
        time: "09:15 AM",
        content:
          "I will prepare a brief presentation about the updated protocols.",
        role: "Pediatrician",
        reactions: ["🎉", "👏"],
      },
      {
        id: 4,
        user: "Dr. Sarah Connor",
        avatar: "/default-avatar.png",
        time: "09:30 AM",
        content:
          "Great initiative, Michael! I will share some insights from the cardiology department as well.",
        role: "Cardiologist",
        attachments: [
          { type: "pdf", name: "Protocol_Updates.pdf", size: "2.4 MB" },
        ],
      },
      {
        id: 5,
        user: "James Wilson",
        avatar: "/default-avatar.png",
        time: "09:45 AM",
        content:
          "Lab results for patient #12345 are ready. Critical values detected.",
        role: "Lab Technician",
        isPriority: true,
      },
    ],
  };

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
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-[#4a5568]"></i>
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
                    <i className="fas fa-hashtag"></i>
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
              <i className="fas fa-hashtag text-[#2c4ecf]"></i>
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
                <i className="fas fa-phone text-[#4a5568]"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f8faff]">
                <i className="fas fa-video text-[#4a5568]"></i>
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#f8faff]">
                <i className="fas fa-info-circle text-[#4a5568]"></i>
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
                            <i className="fas fa-file-pdf text-[#2c4ecf]"></i>
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
                <i className="fas fa-plus text-[#4a5568]"></i>
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
                    <i className="fas fa-smile text-[#4a5568]"></i>
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#e1e8ff]">
                    <i className="fas fa-paperclip text-[#4a5568]"></i>
                  </button>
                </div>
              </div>
              <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#2c4ecf] text-white hover:bg-[#2341b0]">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamChat;
