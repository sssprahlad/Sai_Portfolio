const express = require("express");
const port = process.env.PORT || 5000;
const authRouter = require("./routes/authRouters");
const projectsRouter = require("./routes/projectsRouters");
const myDetailsRouter = require("./routes/myDetailsRouters");
const authMiddleware = require("./middleware/authMiddleware");
const myExperienceRouter = require("./routes/myExperienceRouter");
const mailRouter = require("./routes/mailRouter");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
require("./config/database");

const app = express();

// app.use(cors());
// app.use(cors({
//     origin: 'http://localhost:3000',
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization']
// }));

const allowedOrigins = [
  "https://sai-portfolio-tawny.vercel.app",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ extended: true, limit: "25mb" }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api", authRouter);
app.use("/api", projectsRouter);
app.use("/api", myDetailsRouter);
app.use("/api", myExperienceRouter);
app.use("/api", mailRouter);

app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = app;
