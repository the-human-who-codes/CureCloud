import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPhone,
  faVideo,
  faEllipsisV,
  faPaperclip,
  faReply,
  faComments,
  faFilePdf,
  faFileWord,
} from "@fortawesome/free-solid-svg-icons";
import { IconButton } from "../common/Button";

function Messages() {
  const [searchTerm, setSearchTerm] = useState("");
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
    <div className="flex h-screen bg-surface">
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col md:flex-row">
          <div className="w-full md:w-[320px] lg:w-[380px] border-r border-line bg-white">
            <div className="p-6">
              <h1 className="font-poppins text-2xl font-bold text-primary mb-6">
                Patient Messages
              </h1>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {Object.entries(mockData.messageStats).map(([key, value]) => (
                  <div
                    key={key}
                    className="bg-surface rounded-xl p-4 border border-line"
                  >
                    <p className="font-poppins text-sm text-ink">
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </p>
                    <p className="font-poppins text-xl font-bold text-primary">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full pl-10 pr-4 py-2 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink"
                />
              </div>

              <div className="space-y-4">
                {mockData.conversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv)}
                    className={`p-4 rounded-xl border ${
                      selectedConversation?.id === conv.id
                        ? "border-primary bg-surface"
                        : "border-line hover:border-primary"
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
                          <h3 className="font-poppins font-semibold text-primary truncate">
                            {conv.patient.name}
                          </h3>
                          <span className="font-poppins text-xs text-ink">
                            {formatTimestamp(conv.lastMessage.timestamp)}
                          </span>
                        </div>
                        <p className="font-poppins text-sm text-ink truncate">
                          {conv.lastMessage.content}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 bg-line text-primary rounded-full text-xs">
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
                <div className="p-6 border-b border-line">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={selectedConversation.patient.photo}
                        alt={selectedConversation.patient.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="font-poppins font-semibold text-primary">
                          {selectedConversation.patient.name}
                        </h2>
                        <p className="font-poppins text-sm text-ink">
                          Room {selectedConversation.patient.room}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <IconButton icon={faPhone} />
                      <IconButton icon={faVideo} />
                      <IconButton icon={faEllipsisV} />
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <div className="space-y-4">
                    {/* Message bubbles would go here */}
                  </div>
                </div>

                <div className="p-6 border-t border-line">
                  <div className="flex items-end gap-4">
                    <div className="flex-1 relative">
                      <textarea
                        placeholder="Type your message..."
                        className="w-full p-4 border border-line rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        rows="3"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                      ></textarea>
                      <div className="absolute bottom-2 right-2 flex gap-2">
                        <IconButton icon={faPaperclip} />
                        <IconButton
                          icon={faReply}
                          onClick={() =>
                            setShowQuickResponses(!showQuickResponses)
                          }
                        />
                      </div>
                    </div>
                    <button className="px-6 py-4 bg-primary text-white rounded-lg font-poppins hover:bg-primary-hover transition-colors duration-200">
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <FontAwesomeIcon
                    icon={faComments}
                    className="text-6xl text-primary/20 mb-4"
                  />
                  <p className="font-poppins text-ink">
                    Select a conversation to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="hidden lg:block w-[300px] border-l border-line bg-white p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-poppins font-semibold text-primary mb-4">
                  Quick Responses
                </h3>
                <div className="space-y-2">
                  {mockData.quickResponses.map((response) => (
                    <button
                      key={response.id}
                      className="w-full p-3 text-left bg-surface hover:bg-line rounded-lg transition-colors duration-200"
                    >
                      <p className="font-poppins text-sm font-semibold text-primary">
                        {response.title}
                      </p>
                      <p className="font-poppins text-xs text-ink mt-1">
                        {response.content}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-poppins font-semibold text-primary mb-4">
                  Recent Attachments
                </h3>
                <div className="space-y-2">
                  {mockData.recentAttachments.map((attachment) => (
                    <div
                      key={attachment.id}
                      className="flex items-center gap-3 p-3 bg-surface rounded-lg"
                    >
                      <FontAwesomeIcon
                        icon={
                          attachment.type === "pdf" ? faFilePdf : faFileWord
                        }
                        className="text-primary"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-poppins text-sm font-semibold text-primary truncate">
                          {attachment.name}
                        </p>
                        <p className="font-poppins text-xs text-ink">
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
