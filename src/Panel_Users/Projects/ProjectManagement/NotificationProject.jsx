import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NotificationProject = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get('/notifications-accepted-bid');
      setNotifications(response.data);
      console.log(notifications)
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div>
      <h2>Notifications</h2>
      {/* <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>
            {notification.data.message} - Project ID: {notification.data.project_id}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default NotificationProject;
