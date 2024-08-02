const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const dbconnect = require("./db");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
dbconnect();

const app = express();
const port = 5000;

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
    credentials: true,
  })
);

// User schema
let memberId = 0;
const userSchema = new mongoose.Schema({
  memberId: Number,
  name: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
});

// User model
const User = mongoose.model("User", userSchema);

// Routes
// Home Route API
app.get("/", (res, req) => {
  res.send("Hello");
});

// Signup API
// Signup API
app.post("/signup", async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Check for existing user
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ msg: "User with this email already exists" });
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    memberId: memberId++,
    name,
    email,
    phone,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json({ userId: savedUser._id }); // Include userId in the response
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
});

// get User Deatils API
app.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const user = await User.findById(userId); // Use `findById` for _id
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
