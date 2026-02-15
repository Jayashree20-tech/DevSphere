require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const app = express();

app.use(cors());



app.use(express.json());

// ===============================
// MongoDB Connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

// ===============================
// User Schema
// ===============================
const userSchema = new mongoose.Schema({
  fullName: String,
  email: { type: String, unique: true },
  mobile: String,
  username: { type: String, unique: true },
  college: String,
  dob: String,
  gender: String,
  password: String,

  bio: { type: String, default: "" },
  profileImage: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },
  github: { type: String, default: "" },
  linkedin: { type: String, default: "" },
  skills: { type: [String], default: [""] },
});

const User = mongoose.model("User", userSchema);

// ===============================
// REGISTER ROUTE
// ===============================
app.post("/register", async (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      username,
      college,
      dob,
      gender,
      password,
    } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      email,
      mobile,
      username,
      college,
      dob,
      gender,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Registration failed" });
  }
});

// ===============================
// LOGIN ROUTE
// ===============================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: email }, { username: email }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,   // ADD THIS LINE
        fullName: user.fullName,
        email: user.email,
        mobile: user.mobile,
        username: user.username,
        college: user.college,
        dob: user.dob,
        gender: user.gender,
        bio: user.bio || "",
        github: user.github || "",
        linkedin: user.linkedin || "",
        skills: user.skills || "",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
});
// ===============================
// GET PROFILE
// ===============================
app.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.json(user);
  } catch {
    res.status(500).json({ message: "Error fetching profile" });
  }
});

// ===============================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

