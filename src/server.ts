import express from 'express'
import colors from 'colors'
import morgan from 'morgan'
import { db } from './config/db'
import ShirtRouter from './routes/ShirtRouter'
import cors from 'cors';

async function connectionDB() {
    try {
        await db.authenticate();
        db.sync(); // Sincroniza todos los cambios del Model y los genera en automatico.
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
    credentials: true,
}));

app.use('/api/v1/shirts', ShirtRouter)

export default app