import React, { useState, useEffect } from 'react';
import { Button, Modal, Tabs, Tab } from '@mui/material';

function Notifications() {
  const [receivedMessages, setReceivedMessages] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);

  const getAdminToken = () => {
    const storedUserData = localStorage.getItem('AdminUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.token;
    }
    return null;
  };

  const adminToken = getAdminToken();

  const getInstitutionToken = () => {
    const storedUserData = localStorage.getItem('institutionUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.token;
    }
    return null;
  };

  const institutionToken = getInstitutionToken();

  console.log("Ins Token:", institutionToken);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://dacs.onrender.com/api/v1/institution/notifications/institution', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${institutionToken}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        const institutionMessages = data.filter(message => message.receivers === 'institution');
        setReceivedMessages(institutionMessages);
      } else {
        console.error('Failed to fetch notifications');
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };
  

  useEffect(() => {
    fetchNotifications();
  }, []); // Fetch notifications on component mount

  const handleEdit = (id) => {
    // Implement edit logic if needed
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Notifications and Messages</h1>
  
      <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
        <Tab label="Received" />
      </Tabs>
  
      <div className="space-y-2">
        {selectedTab === 0
          ? receivedMessages.slice().reverse().map((message) => (
              <MessageItem
                key={message.id}
                message={message}
                onEdit={() => handleEdit(message.id)}
              />
            ))
          : receivedMessages.slice().reverse().map((message) => (
              <MessageItem
                key={message.id}
                message={message}
              />
            ))}
      </div>
    </div>
  );
}

const MessageItem = ({ message, onEdit }) => {
  const [showFullMessage, setShowFullMessage] = useState(false);

  const truncatedText = message && message.message ? message.message.slice(0, 20) : '';

  return (
    <div className="flex items-center space-x-2">
      <span
        onClick={() => setShowFullMessage(true)}
        className="cursor-pointer border-b border-dashed border-blue-500"
      >
        {truncatedText}
        {truncatedText.length > 20 && '...'}
      </span>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowFullMessage(true)}
        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
      >
        View
      </Button>

      <Modal open={showFullMessage} onClose={() => setShowFullMessage(false)}>
  <div className="bg-white p-4 w-96 mx-auto mt-10" style={{ maxHeight: '400px', overflowY: 'auto' }}>
    <span>{message && message.message}</span>
  </div>
</Modal>
    </div>
  );
};

export default Notifications;
