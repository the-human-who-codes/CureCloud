// Display title: the explicit title, otherwise the other participants' names.
export const conversationTitle = (conversation, userId) =>
  conversation.title ||
  Object.entries(conversation.participants ?? {})
    .filter(([id]) => id !== userId)
    .map(([, p]) => p.name)
    .join(", ") ||
  "Conversation";
