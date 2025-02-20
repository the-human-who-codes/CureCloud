"use client";
import { useState } from "react";

function Messages() {
  const [searchTerm, setSearchTerm] = useState("");
  //   const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [showQuickResponses, setShowQuickResponses] = useState(false);

  const mockData = {
    messageStats: {
      unread: 8,
      urgent: 3,
      followUps: 5,
      total: 42,
    },
    conversations: [
      {
        id: "msg1",
        patient: {
          id: "P12345",
          name: "Sarah Johnson",
          photo: "https://placehold.co/100",
          room: "201A",
          status: "stable",
        },
        lastMessage: {
          content: "When should I take the new medication?",
          timestamp: "2024-01-20T10:30:00Z",
          isUnread: true,
          isUrgent: true,
        },
        messageCount: 4,
      },
      {
        id: "msg2",
        patient: {
          id: "P12346",
          name: "Michael Brown",
          photo: "https://placehold.co/100",
          room: "105B",
          status: "stable",
        },
        lastMessage: {
          content: "My symptoms have improved since yesterday",
          timestamp: "2024-01-20T09:15:00Z",
          isUnread: true,
          isUrgent: false,
        },
        messageCount: 6,
      },
    ],
    quickResponses: [
      {
        id: "qr1",
        title: "Medication Instructions",
        content:
          "Please take your medication with food, once daily in the morning.",
      },
      {
        id: "qr2",
        title: "Follow-up Reminder",
        content:
          "Don't forget your follow-up appointment scheduled for tomorrow.",
      },
      {
        id: "qr3",
        title: "Lab Results Normal",
        content: "Your lab results have come back and everything looks normal.",
      },
    ],
    recentAttachments: [
      {
        id: "att1",
        name: "Lab Results.pdf",
        type: "pdf",
        size: "1.2MB",
        uploadedAt: "2024-01-19T14:20:00Z",
      },
      {
        id: "att2",
        name: "Care Instructions.docx",
        type: "document",
        size: "850KB",
        uploadedAt: "2024-01-19T11:45:00Z",
      },
    ],
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-[#f8faff]">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="w-full md:w-[320px] lg:w-[380px] border-r border-[#e1e8ff] bg-white">
            <div className="p-6">
              <h1 className="font-poppins text-2xl font-bold text-[#2c4ecf] mb-6">
                Patient Messages
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(mockData.messageStats).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-[#f8faff] rounded-xl p-4 border border-[#e1e8ff]"
                  >
                    <p className="font-poppins text-sm text-[#4a5568]">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </p>
                    <p className="font-poppins text-xl font-bold text-[#2c4ecf]">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-[#e1e8ff] rounded-lg focus:ring-2 focus:ring-[#2c4ecf] focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-[#4a5568]"></i>
              </div>

              <div className="space-y-4">
                {mockData.conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-4 rounded-xl border ${
                      selectedConversation?.id === conv.id
                        ? "border-[#2c4ecf] bg-[#f8faff]"
                        : "border-[#e1e8ff] hover:border-[#2c4ecf]"
                    } cursor-pointer transition-colors duration-200`}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={conv.patient.photo}
                        alt={conv.patient.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-poppins font-semibold text-[#2c4ecf] truncate">
                            {conv.patient.name}
                          </h3>
                          <span className="font-poppins text-xs text-[#4a5568]">
                            {formatTimestamp(conv.lastMessage.timestamp)}
                          </span>
                        </div>
                        <p className="font-poppins text-sm text-[#4a5568] truncate">
                          {conv.lastMessage.content}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-[#e1e8ff] text-[#2c4ecf] rounded-full text-xs">
                            Room {conv.patient.room}
                          </span>
                          {conv.lastMessage.isUrgent && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-800 rounded-full text-xs">
                              Urgent
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col bg-white">
            {selectedConversation ? (
              <>
                <div className="p-6 border-b border-[#e1e8ff]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedConversation.patient.photo}
                        alt={selectedConversation.patient.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="font-poppins font-semibold text-[#2c4ecf]">
                          {selectedConversation.patient.name}
                        </h2>
                        <p className="font-poppins text-sm text-[#4a5568]">
                          Room {selectedConversation.patient.room}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
                        <i className="fas fa-phone"></i>
                      </button>
                      <button className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
                        <i className="fas fa-video"></i>
                      </button>
                      <button className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {/* Message bubbles would go here */}
                  </div>
                </div>

                <div className="p-6 border-t border-[#e1e8ff]">
                  <div className="flex items-end gap-4">
                    <div className="flex-1 relative">
                      <textarea
                        placeholder="Type your message..."
                        className="w-full p-4 border border-[#e1e8ff] rounded-lg focus:ring-2 focus:ring-[#2c4ecf] focus:border-transparent resize-none"
                        rows="3"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                      ></textarea>
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        <button className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg">
                          <i className="fas fa-paperclip"></i>
                        </button>
                        <button
                          className="p-2 text-[#4a5568] hover:bg-[#f8faff] rounded-lg"
                          onClick={() =>
                            setShowQuickResponses(!showQuickResponses)
                          }
                        >
                          <i className="fas fa-reply"></i>
                        </button>
                      </div>
                    </div>
                    <button className="px-6 py-4 bg-[#2c4ecf] text-white rounded-lg font-poppins hover:bg-[#2341b0] transition-colors duration-200">
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <i className="fas fa-comments text-6xl text-[#2c4ecf]/20 mb-4"></i>
                  <p className="font-poppins text-[#4a5568]">
                    Select a conversation to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:block w-[300px] border-l border-[#e1e8ff] bg-white p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-poppins font-semibold text-[#2c4ecf] mb-4">
                  Quick Responses
                </h3>
                <div className="space-y-2">
                  {mockData.quickResponses.map((response) => (
                    <button
                      key={response.id}
                      className="w-full p-3 text-left bg-[#f8faff] hover:bg-[#e1e8ff] rounded-lg transition-colors duration-200"
                    >
                      <p className="font-poppins text-sm font-semibold text-[#2c4ecf]">
                        {response.title}
                      </p>
                      <p className="font-poppins text-xs text-[#4a5568] mt-1">
                        {response.content}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-poppins font-semibold text-[#2c4ecf] mb-4">
                  Recent Attachments
                </h3>
                <div className="space-y-2">
                  {mockData.recentAttachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-3 p-3 bg-[#f8faff] rounded-lg"
                    >
                      <i
                        className={`fas fa-${
                          attachment.type === "pdf" ? "file-pdf" : "file-word"
                        } text-[#2c4ecf]`}
                      ></i>
                      <div className="flex-1 min-w-0">
                        <p className="font-poppins text-sm font-semibold text-[#2c4ecf] truncate">
                          {attachment.name}
                        </p>
                        <p className="font-poppins text-xs text-[#4a5568]">
                          {attachment.size}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
