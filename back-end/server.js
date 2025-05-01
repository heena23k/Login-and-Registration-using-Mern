const express = require("express");
const app = express();
const port = 8000;
const connectDB = require("./db/dbConnection");
const User = require("./db/user");
const cors = require("cors");
// call the function to connect to the database
connectDB();
// middleware to parse JSON data
app.use(express.json());
// middleware to parse urlencoded data
//  for registering the user
// enable cors 
app.use(cors());
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    const user = new User({
      username,
      password,
    });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error){
    res.status(500).json({ message: "Error registering user" });
  }
});
app.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      console.log("Received login request:", req.body);
  
      const user = await User.findOne({ username });
      if (!user) {
        console.log("❌ User not found for:", username);
        return res.status(404).json({ message: "User not found" });
      }
  
      console.log("✅ User found:", user);
      if (user.password !== password) {
        console.log("❌ Invalid password");
        return res.status(401).json({ message: "Invalid password" });
      }
  
      res.status(200).json({ message: "User logged in successfully" });
    } catch (error) {
      console.error("❌ Error logging in:", error);
      res.status(500).json({ message: "Error logging in" });
    }
  });
  


app.listen(port, () => {
  console.log("Server is running on port 8000");
});
