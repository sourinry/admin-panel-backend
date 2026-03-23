import "dotenv/config";

import { connectDB } from "./config/db.js";
import express from "express";
const app = express();

import router from './routes/indexRoute.js';

//middleware
app.use(express.json());

app.use('/api/v1/', router);

// ERROR HANDLER
import { errorHandler } from "./middlewares/errorMiddleware.js";
app.use(errorHandler);

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;

//start the server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server failed to start:", error);
  }
};

startServer();