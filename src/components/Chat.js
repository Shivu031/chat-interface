import React, { useEffect, useRef, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receiveMessage, sendMessage, updateMessageStatus } from '../features/chatSlice';
import { Box, TextField, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Nav from './Nav';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

const Chat = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const currentUser = useSelector((state) => state.chat.currentUser);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const chatRef = useRef(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      const messageId = uuidv4(); // Generate unique ID
      dispatch(sendMessage({ text: input, id: messageId })); // Pass the ID with the action
  
      setInput('');
  
      // Simulate receiving a reply after 2 seconds
      setTimeout(() => {
        const replyId = uuidv4(); // Generate unique ID for reply
        dispatch(receiveMessage({
          id: replyId,
          user: 'JaneDoe',
          text: 'This is a mock reply!',
          timestamp: new Date().toLocaleTimeString(),
          status: 'received',
        }));
      }, 5000);
  
      // Update message status to delivered after 2 seconds
      setTimeout(() => {
        dispatch(updateMessageStatus({ id: messageId, status: 'delivered' }));
      }, 1500);
  
      // Update message status to seen after another 2 seconds
      setTimeout(() => {
        dispatch(updateMessageStatus({ id: messageId, status: 'seen' }));
      }, 3000);
    }
  };

  // Automatically scroll to the bottom when a new message is added
  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '89vh',
        maxWidth: '800px',
        margin: '0 auto',
        border: '1px solid #ccc',
        borderRadius: '10px',
        marginTop: '5px',
      }}
    >
      <Nav user="JohnDoe"/>
      {/* Message List */}
      <List
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '20px',
        }}
        ref={chatRef}
      >
        {messages.map((msg) => (
          <ListItem key={msg.id} sx={{ display: 'flex', justifyContent: msg.user === currentUser ? 'flex-end' : 'flex-start' }}>
            <Box sx={{ maxWidth: '70%', bgcolor: msg.user === currentUser ? 'primary.light' : 'grey.300', borderRadius: '10px', padding: '10px' }}>
              <ListItemText primary={msg.text} secondary={`${msg.user}, ${msg.timestamp}`} />
              {/* Show message status ticks only for current user's messages */}
              {msg.user === currentUser && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                  {msg.status === 'sent' && <span>✔</span>}
                  {msg.status === 'delivered' && <span>✔✔</span>}
                  {msg.status === 'seen' && <span style={{ color: 'blue' }}>✔✔</span>}
                </Box>
              )}
            </Box>
          </ListItem>
        ))}
      </List>

      {/* Input Field and Send Button */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '8px',
        }}
      >
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          placeholder="Type a message"
          sx={{ marginRight: '10px' }}
          disabled={isPending}
        />
        <IconButton color="success" disabled={isPending} onClick={() => startTransition(handleSendMessage)}>
          <SendIcon sx={{ fontSize: '30px' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Chat;
