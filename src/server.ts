import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
// import QuestionsRouter from './routes/QuestionsRouter'
// import ShirtRouter from './routes/ShirtRouter'
import RegisterRouter from './routes/RegisterRouter'
import cors from 'cors';

async function connectionDB() {
  try {
    await db.authenticate();
    await db.sync();
    console.log(colors.blue.bold("Conexion Exitosa a la BD"));
  } catch (error) {
    console.log(error);
  }
}

connectionDB()
const app = express()
app.use(morgan('dev'))

app.use(express.json())
app.use(cors({
    origin: "https://ebenezer-soyde-cristo-mexico2026.vercel.app",
    //origin: "http://localhost:5173",
    credentials: true,
}));


app.use('/api/v1/register', RegisterRouter)

export default app