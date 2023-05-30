import dotenv from "dotenv";

import express from 'express'
import cors from 'cors'
import movieRouter from "./src/routes/movie.route.js";
import userRouter from "./src/routes/user.route.js";
import mainRouter from "./src/routes/index.route.js";

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT;

app.use('/',mainRouter)
app.use('/movie',movieRouter)
app.use('/user',userRouter)

app.listen(port, () => {
  console.log(`WassiBack listening on port ${port}`)
})