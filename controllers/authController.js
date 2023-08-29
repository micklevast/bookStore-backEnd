const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function signup(req, res) {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    console.log("Signup success");
    res.json({ message: "User created" });
  } catch (error) {
    console.error("Sign-up error:", error);
    res.status(500).json({ message: "Error creating user" });
  }
}

async function signin(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      const secretKey = "your-secret-key"; // Replace with your secret key
      const token = jwt.sign(
        { id: user.id, username: user.username },
        secretKey,
        { expiresIn: "1h" }
      );

      const randomValue = Math.random().toString(); // Generate a random value for the cookie

      // Set cookies for development over HTTP
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "lax", // Use 'lax' or 'none' if using HTTPS in production
        secure: false, // Use 'true' in production when using HTTPS
      });

      res.cookie("randomCookie2", randomValue, {
        httpOnly: true,
        sameSite: "lax", // Use 'lax' or 'none' if using HTTPS in production
        secure: false, // Use 'true' in production when using HTTPS
      });

      console.log("Sign-in success... token: " + token);
      res.json({ message: "Authentication successful", token });
    } else {
      res.status(401).json({ message: "Authentication failed" });
    }
  } catch (error) {
    console.error("Sign-in error:", error);
    res.status(500).json({ message: "Error signing in" });
  }
}

module.exports = {
  signup,
  signin,
};
