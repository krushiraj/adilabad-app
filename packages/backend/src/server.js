import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import winston from "winston";
import os from "os";

import db from "./models/index.js";

import adminRoutes from "./routes/admin.js";
import advertisementRoutes from "./routes/advertisement.js";
import categoryRoutes from "./routes/category.js";
import listingRoutes from "./routes/listing.js";
import userRoutes from "./routes/user.js";

import config from "./config/index.js";

const app = express();

// Winston logger middleware
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs.log" }),
  ],
});

// set logger to be available in all routes
app.use((req, res, next) => {
  req.logger = logger;
  next();
});

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  logger.info(`Request body: ${JSON.stringify(req.body)}`);
  next();
  logger.info(`Response status: ${res.statusCode}`);
});

// enable CORS
const corsOptions = {
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "https://adb-app-dashboard.up.railway.app",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/isalive", (req, res) => {
  // check mongodb connection
  const { readyState } = db.mongoose.connection;
  if (readyState) {
    res.status(200).send();
  } else {
    res.status(500).send();
  }
});

app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/advertisement", advertisementRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/listing", listingRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  const dbConnection = await db.mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (dbConnection) {
    logger.info("Connected to MongoDB.");

    // check if any admin exists
    const admin = await db.Admin.findOne();
    if (!admin) {
      // create a default admin
      await db.Admin.create({
        name: "Admin",
        username: "admin",
        password: await bcrypt.hash("admin", 8),
      });

      logger.info("Created a default admin.");
    }
  }

  const networkInterfaces = os.networkInterfaces();
  for (const name of Object.keys(networkInterfaces)) {
    for (const net of networkInterfaces[name]) {
      // Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
      if (net.family === "IPv4" && !net.internal) {
        logger.info(
          `Backend server is running on http://${net.address}:${PORT}`
        );
        
      }
    }
  }
  logger.info(
    `Production Environment: ${process.env.NODE_ENV === "production"}`
  );
});
