import React, { useState } from "react";
import { useUser } from "../../utils/useContext";
import signInImage from "/Images/signInImage.jpg";
import "./SignUp.css";

const SignUp = () => {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [enteredCaptcha, setEnteredCaptcha] = useState("");
  const { updateUser } = useUser(); // Access updateUser from context

  function generateCaptcha() {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (enteredCaptcha !== captcha) {
      alert("Captcha does not match. Please try again.");
      setCaptcha(generateCaptcha());
      setEnteredCaptcha("");
      return;
    }

    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    };

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorText = await response.text();
        alert(`Sign-up failed: ${errorText}`);
        return;
      }

      const result = await response.json();
      console.log("Sign-up result:", result.userId); // Debug log

      // Ensure `userId` is present in the result
      if (result.userId) {
        alert("Sign-up successful!");
        fetchUserDetails(result.userId);
      } else {
        alert("Sign-up failed: No user ID returned.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const fetchUserDetails = async (userId) => {
    console.log("Fetching details for user ID:", userId); // Debug log
    try {
      const userResponse = await fetch(`http://localhost:5000/user/${userId}`);
      if (!userResponse.ok) {
        const errorText = await userResponse.text();
        console.error("Failed to fetch user details:", errorText);
        alert("Failed to fetch user details.");
        return;
      }

      const userData = await userResponse.json();
      console.log("Fetched user details:", userData); // Debug log
      updateUser(userData); // Update user context with received user data
      window.location.href = "/userdashboard"; // Redirect after successful sign-up
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("An error occurred while fetching user details. Please try again.");
    }
  };

  return (
    <div className="signInContainer">
      <div className="signInImage">
        <img src={signInImage} alt="Sign In" />
      </div>
      <div className="signInForm">
        <h1 className="formHeading">Sign Up to Legends Library</h1>
        <form
          onSubmit={handleSubmit}
          method="POST"
          action="http://localhost:5000/signup"
        >
          <label htmlFor="name">Name*</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name"
            required
          />

          <label htmlFor="email">Email*</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
          />

          <label htmlFor="phone">Phone no (WhatsApp only)*</label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Phone No"
            required
          />

          <label htmlFor="password">Password*</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
          />

          <label htmlFor="confirmPassword">Confirm Password*</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            required
          />

          <label htmlFor="captcha">Captcha*</label>
          <div className="captchaContainer">
            <span className="captchaText">{captcha}</span>
            <button type="button" onClick={() => setCaptcha(generateCaptcha())}>
              Refresh
            </button>
          </div>
          <input
            type="text"
            name="captcha"
            id="captcha"
            value={enteredCaptcha}
            placeholder="Enter Captcha"
            onChange={(e) => setEnteredCaptcha(e.target.value)}
            required
          />

          <input type="submit" value="Sign Up" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
