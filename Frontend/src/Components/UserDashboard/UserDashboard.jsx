import React, { useEffect } from "react";
import { useUser } from "../../utils/useContext";
import "./UserDashboard.css";
import UserNavbar from "./Navbar/UserNavbar";

const UserDashboard = () => {
  const { user, updateUser } = useUser(); // Get user data and update function from context

  // Function to fetch user data from the backend
  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/user/${userId}`);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Failed to fetch user data:", errorText);
        alert("Failed to fetch user data.");
        return null;
      }

      const userData = await response.json();
      console.log("Fetched user data:", userData); // Debug log
      return userData;
    } catch (error) {
      console.error("Error fetching user data:", error);
      alert("An error occurred while fetching user data. Please try again.");
      return null;
    }
  };

  useEffect(() => {
    const fetchAndSetUserData = async () => {
      if (user?.id) {
        const userData = await fetchUserData(user.id);
        if (userData) {
          updateUser(userData); // Update user context with received user data
        }
      }
    };

    fetchAndSetUserData();
  }, [user?.id, updateUser]);

  // Check if user data is loaded
  const isLoading = !user; // Loading state if user is undefined
  console.log(user);

  return (
    <div>
      <UserNavbar />
      <div className="user-details">
        {isLoading ? (
          <p>Loading Details...........</p>
        ) : (
          <div>
            <h1>Welcome, {user.name}</h1>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
