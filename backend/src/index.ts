import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { connect } from "./db/client";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
dotenv.config();

// Routes
import songsRoute from "./routes/songsRoute";
import statsRoute from "./routes/statsRoute";

// Initiate express application
const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(helmet());
app.use(morgan("dev"));

const MONGO_URI = process.env.MONGO_URL || "mongodb://mongo:27017/addissongs";

// connect to MONGODB
connect(MONGO_URI);

app.get("/health", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "API Check Sucess!",
  });
});

app.use("/api/songs", songsRoute);
app.use("/api/stats", statsRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

export default app;
