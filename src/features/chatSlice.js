import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: 'Shivi', // Mock user
  messages: [
    { id: 1, user: 'JohnDoe', text: 'Hello!', timestamp: new Date().toLocaleTimeString(), status: 'received' },
    { id: 2, user: 'JaneDoe', text: 'How are you?', timestamp: new Date().toLocaleTimeString(), status: 'received' }
  ],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      const { text, id } = action.payload; // Get text and id from the action
      const newMessage = {
        id: id, // Use the provided unique ID
        user: state.currentUser,
        text: text,
        timestamp: new Date().toLocaleTimeString(),
        status: 'sent', // Initial status when the message is sent
      };
      state.messages.push(newMessage);
    },
    receiveMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    updateMessageStatus: (state, action) => {
      const { id, status } = action.payload;
      const message = state.messages.find(msg => msg.id === id);
      if (message) {
        message.status = status;
      }
    },
  },
});

export const { sendMessage, receiveMessage, updateMessageStatus } = chatSlice.actions;
export default chatSlice.reducer;
