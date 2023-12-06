import express from "express";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import db from "./models/index.js";

import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import categoryRoutes from "./routes/category.js";

import config from "./config/index.js";

const app = express();

// enable CORS
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: config.JWT_SECRET, // Set a secret for signing the session ID cookie
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: config.MONGO_URI,
      collectionName: "sessions",
    }),
    cookie: {
      secure: false, // Set to true if using https
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days validity
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/api/isalive", (req, res) => {
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
app.use("/api/category", categoryRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, async () => {
  const dbConnection = await db.mongoose.connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  if (dbConnection) {
    console.log("Connected to MongoDB.");
  }

  console.log(`Server running on port: ${PORT}`);
});
