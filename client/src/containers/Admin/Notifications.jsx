import React, { useState, useEffect } from 'react';
import { Button, TextareaAutosize, Modal, Tabs, Tab, Select, MenuItem } from '@mui/material';

function Notifications() {
  const [sentMessages, setSentMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [selectedReceiver, setSelectedReceiver] = useState('');
  const [editedMessage, setEditedMessage] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [notifications, setNotifications] = useState([]);

  const getAdminToken = () => {
    const storedUserData = localStorage.getItem('AdminUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.token;
    }
    return null;
  };

  const adminToken = getAdminToken();

  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://dacs.onrender.com/api/v1/admin/notifications/all', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
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

  const handleDelete = async (id) => {
    // API call to delete a notification
    try {
      const response = await fetch(`https://dacs.onrender.com/api/v1/admin/notifications/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (response.ok) {
        console.log('Notification deleted successfully');
        // Fetch updated notifications after deleting one
        fetchNotifications();
      } else {
        console.error('Failed to delete notification');
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  const handleSend = async () => {
    if (newMessage.trim() !== '' && selectedReceiver.trim() !== '') {
      const message = { id: Date.now(), text: newMessage, receiver: selectedReceiver };
      setSentMessages([...sentMessages, message]);
      setNewMessage('');
      setSelectedReceiver('');
      setShowPopup(false);

      // API call to create a new notification
      try {
        const response = await fetch('https://dacs.onrender.com/api/v1/admin/notifications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            message: newMessage,
            receivers: selectedReceiver,
          }),
        });

        if (response.ok) {
          console.log('Notification created successfully');
          // Fetch updated notifications after creating a new one
          fetchNotifications();
        } else {
          console.error('Failed to create notification');
        }
      } catch (error) {
        console.error('Error creating notification:', error);
      }
    }
  };

  const handleEdit = (id) => {
    const notificationToEdit = notifications.find((notification) => notification._id === id);
    setEditedMessage(notificationToEdit.message);
    setEditingMessageId(id);
    setShowEditPopup(true);
  };

  const handleResend = async () => {
    if (editedMessage.trim() !== '') {
      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification._id === editingMessageId ? { ...notification, message: editedMessage } : notification
        )
      );

      setEditedMessage('');
      setEditingMessageId(null);
      setShowEditPopup(false);

      // API call to update a notification
      try {
        const response = await fetch(`https://dacs.onrender.com/api/v1/admin/notifications/${editingMessageId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${adminToken}`,
          },
          body: JSON.stringify({
            message: editedMessage,
          }),
        });

        if (response.ok) {
          console.log('Notification updated successfully');
        } else {
          console.error('Failed to update notification');
        }
      } catch (error) {
        console.error('Error updating notification:', error);
      }
    }
  };

  const uniqueReceivers = [...new Set(notifications.map((notification) => notification.receivers))];

  const filterMessages = () => {
    if (selectedCategory === 'all') {
      return notifications;
    } else {
      return notifications.filter((notification) =>
        notification.receivers === selectedCategory
      );
    }
  };



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Notifications and Messages</h1>

      <Tabs value={0} onChange={() => {}}>
        <Tab label="Sent" />
      </Tabs>

      <Select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="border border-gray-300 rounded mt-5 mb-5"
      >
        <MenuItem value="all">All</MenuItem>
        {uniqueReceivers.map((receiver) => (
          <MenuItem key={receiver} value={receiver }>
            {receiver}
          </MenuItem>
        ))}
      </Select>

      <div className="space-y-2">
        {filterMessages().map((notification) => (
          <MessageItem
            key={notification._id}
            message={notification}
            onDelete={() => handleDelete(notification._id)}
            onEdit={() => handleEdit(notification._id)}
          />
        ))}
      </div>

      <Modal open={showPopup} onClose={() => setShowPopup(false)}>
        <div className="bg-white p-4 w-96 mx-auto mt-10">
          <Select
            value={selectedReceiver}
            onChange={(e) => setSelectedReceiver(e.target.value)}
            className="w-full border border-gray-300 rounded"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="alumni">Alumni</MenuItem>
            <MenuItem value="institution">Institution</MenuItem>
          </Select>
          <TextareaAutosize
            rowsMin={4}
            placeholder="Type your message here"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <Button variant="contained" color="primary" onClick={handleSend} className="bg-gray-500">
            Send
          </Button>
        </div>
      </Modal>

      <Modal open={showEditPopup} onClose={() => setShowEditPopup(false)}>
      <div className="bg-white p-4 w-96 mx-auto mt-10" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <TextareaAutosize
            rowsMin={4}
            placeholder="Edit your message here"
            value={editedMessage}
            onChange={(e) => setEditedMessage(e.target.value)}
            className="w-full mb-4 p-2 border border-gray-300 rounded"
          />
          <Button variant="contained" color="primary" onClick={handleResend} className="bg-gray-500">
            Resend
          </Button>
        </div>
      </Modal>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowPopup(true)}
        className="fixed bottom-4 right-4 bg-green-500"
      >
        New Message
      </Button>
    </div>
  );
}

const MessageItem = ({ message, onDelete, onEdit }) => {
  const [showFullMessage, setShowFullMessage] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <span
        onClick={() => setShowFullMessage(true)}
        className="cursor-pointer border-b border-dashed border-blue-500"
      >
        {message.message.slice(0, 20)}
        {message.message.length > 20 && '...'}
      </span>
      {onEdit && (
        <button
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700"
          onClick={onEdit}
        >
          Edit
        </button>
      )}
      <button
        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700"
        onClick={onDelete}
      >
        Delete
      </button>

      <Modal open={showFullMessage} onClose={() => setShowFullMessage(false)}>
      <div className="bg-white p-4 w-96 mx-auto mt-10" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          <span>{message.message}</span>
          <br />
          <span>Receiver: {message.receivers}</span>
        </div>
      </Modal>
    </div>
  );
};

export default Notifications;
