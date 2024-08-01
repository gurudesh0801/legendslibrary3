// UserDashboard.js

import React, { useEffect, useState } from 'react';
import './UserDashboard.css';
import UserNavbar from './Navbar/UserNavbar';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const userId = '66ab16e99eec205ea78276a9';

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`https://legendslibrary-api.vercel.app/user/${userId}`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          console.error('Error fetching user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  return (
    <div>
      <UserNavbar />
      <div className="user-details">
        {user ? (
          <div>
            <h1>Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Age: {user.age}</p> {/* Add more user details as needed */}
          </div>
        ) : (
          <p>Loading user details...</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;

