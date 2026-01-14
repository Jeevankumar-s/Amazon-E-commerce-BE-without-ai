const express = require("express");
const jwt = require("jsonwebtoken");
const connectDB = require("./db");
const User = require("./models/User");
const bcrypt = require("bcrypt");
const PORT = 5000;

const app = express();
app.use(express.json());

app.get("/home", (req, res) => {
  res.send("you are in home");
});

connectDB();

app.post("/login", async(req, res) => {
  const { userName, password } = req.body;
  const userExists = await User.findOne({userName})
  const passwordCompare = await bcrypt.compare(password, userExists.password);
  if (userExists){
    res.status(400).send("User not exits");
  }
  else if (!passwordCompare){
    res.status(300).send("Password Incorrect");
  }else{
    res.status(200).send("User Logged In Successfully");
  }

});

app.post("/register", async (req, res) => {
  const { userName, email, password, confirmPassword } = req.body;
  if (!userName && !email && !password && !confirmPassword) {
    res.send("All the fields are required");
  } else if (password !== confirmPassword) {
    res.send("Password are not matched");
  } else if (password.length < 6) {
    res.send("Password should be more than 6 letters");
  }
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    res.send("user already exits");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send("User registered successfully");
  }
});

app.listen(PORT, () => {
  console.log(`server running in port ${PORT}`);
});
