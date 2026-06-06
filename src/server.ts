import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import RegisterRouter from './routes/RegisterRouter'
import MemberRouter from './routes/MemberRouter'
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

const allowedOrigins = [
    "https://ebenezerprincipedepaz-chalco-mx.vercel.app", 
    "https://ebenezer-soyde-cristo-mexico2026.vercel.app",
    "http://localhost:5173"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('No permitido por CORS'));
        }
    },
    credentials: true,
}));

app.use('/api/v1/register', RegisterRouter)
app.use('/api/v1/ebenezer', MemberRouter)

export default app