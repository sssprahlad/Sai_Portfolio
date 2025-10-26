const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/database");

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  console.log(req.body);

  if (!username || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" });
  }

  db.get("SELECT * FROM users WHERE email = ?", [email], async (err, existingUser) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Failed to check existing user" });
    }

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      db.run(
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
        [username, email, hashedPassword],
        function (err) {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: "Failed to register user" });
          }

          res.json({ message: "Register successful" });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to register user" });
    }
  });
});


router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, existingUser) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (!existingUser) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const validPassword = await bcrypt.compare(password, existingUser.password);
      if (!validPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.json({ token, message: "Login successful" ,status:200});
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to login user",status:500 });
  }
});


module.exports = router;