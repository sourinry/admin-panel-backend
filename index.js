import "dotenv/config";
import cors from 'cors';
import { connectDB } from "./config/db.js";
import express from "express";
const app = express();

//import index-route
import router from './routes/indexRoute.js';

// CORS config
const corsOptions = {
  origin: [
    'http://localhost:3000',
    'http://localhost:4200',
    'http://localhost:8080',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/api/v1/', router);

// test route
app.get('/', (req, res) => {
  res.send('API is running');
});
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