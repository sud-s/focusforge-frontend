import axiosClient from './axiosClient';

const chatApi = {
  // Send a message to AI coach
  sendMessage: (message, conversationId = null) => {
    const data = { message };
    if (conversationId) {
      data.conversation_id = conversationId;
    }
    return axiosClient.post('chat/message/', data);
  },
  
  // Get all conversations
  getConversations: () => axiosClient.get('chat/conversations/'),
  
  // Get conversation history
  getConversationHistory: (conversationId) => 
    axiosClient.get(`chat/conversations/${conversationId}/history/`),
  
  // Delete a conversation
  deleteConversation: (conversationId) => 
    axiosClient.delete(`chat/conversations/${conversationId}/`),
};

export default chatApi;
