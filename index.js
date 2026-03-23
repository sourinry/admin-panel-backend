import "dotenv/config";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import express from "express";
const app = express();

//import index-route
import router from './routes/indexRoute.js';

// Configure CORS with specific options
const corsOptions = {
  // Allow only these origins
  origin: [
    'https://localhost:3000',
    'https://localhost:4200',
    'https://localhost:8080',
  ],
  // Allow these HTTP methods
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
};

//middleware
app.use(express.json());
app.use(cors(corsOptions));

app.use('/api/v1/', router);

// error handaler
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

//call the startServer function
startServer();