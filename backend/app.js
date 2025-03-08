import express from "express";
import testRoute from "./routes/testRoutes.js";
import cors from "cors";
import examRoute from "./routes/examRoutes.js";
import pool from "./config/db.js";
import teacherRoute from "./routes/teacherRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";
import passport from "passport";

const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:5174",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Credentials",
  ],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(
  session({
    secret: "my-secret-key",
    credentials: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      secure: false, // Set to `true` in production (requires HTTPS)
      httpOnly: true, // Prevents client-side JavaScript access
      sameSite: "lax",
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("", testRoute); // endpoint is /testserver
app.use("", examRoute); // endpoin is /exam
app.use("", authRoutes); // auth end point
app.use("", teacherRoute);
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("select now()");
    res.json({Sucess: true, msg: result.rows[0]});
  } catch (error) {
    console.log("Data base error: ", error);
    res.status(500).json({error_message: error.message});
  }
});

export default app;
