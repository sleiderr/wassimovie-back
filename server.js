import dotenv from "dotenv";

import express from 'express'
import cors from 'cors'
import movieRouter from "./src/routes/movie.route.js";
import userRouter from "./src/routes/user.route.js";
import mainRouter from "./src/routes/index.route.js";
import { appDataSource } from "./src/models/datasource.js";
import mongoose from "mongoose";

dotenv.config()

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB', err);
  });

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register routes
app.use('/',mainRouter);
app.use('/movie',movieRouter);
app.use('/user',userRouter);

const port = parseInt(process.env.PORT || '8080');
  
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});