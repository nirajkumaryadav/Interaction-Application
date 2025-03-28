import React from 'react';
import moment from 'moment';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteMessageMutation } from '../../redux/api';
import './chat.css';
import '../../index.scss';
import { toast } from "react-toastify";

const Message = ({ message, name, userId, roomId, roomHost }) => {
  const [deleteMessage] = useDeleteMessageMutation();

  const handleDelete = async () => {
    try {
      await deleteMessage({
        userId: userId,
        roomId: roomId,
        messageId: message._id,
      }).unwrap();
    } catch (error) {
      toast.error(error.data?.message || 'Failed to delete message');
    }
  };

  let isSentByCurrentUser = message.senderId === userId;
  let canDelete = isSentByCurrentUser || roomHost === userId;

  const renderFile = (fileUrl) => {
    // Determine file type by extension
    const extension = fileUrl.split('.').pop().toLowerCase();
    const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension);
    
    if (isImage) {
      return <img src={fileUrl} alt="attachment" style={{ maxWidth: '200px', maxHeight: '200px' }} />;
    }
    
    return <a href={fileUrl} target="_blank" rel="noopener noreferrer">{message.message || 'Attachment'}</a>;
  };

  return (
    <div className={`message-container ${isSentByCurrentUser ? 'sent' : 'received'}`}>
      {canDelete && (
        <Tooltip title="Delete">
          <IconButton 
            onClick={handleDelete} 
            size="small" 
            className="delete-icon"
            sx={{ 
              color: '#f44336',
              '&:hover': {
                backgroundColor: 'rgba(244, 67, 54, 0.1)'
              }
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
      
      <div className={isSentByCurrentUser ? 'rec' : 'sen'}>
        <div className="message-metadata">
          <span className="message-sender">
            {isSentByCurrentUser ? name : message.sender}
          </span>
          <span className="message-timestamp">
            {moment(message.timestamp).format('DD/MM hh:mm')}
          </span>
        </div>
        
        {message.fileUrl ? (
          <div className="file-attachment">
            {renderFile(message.fileUrl)}
          </div>
        ) : (
          <div className="message-text">{message.message}</div>
        )}
      </div>
    </div>
  );
};

export default Message;
