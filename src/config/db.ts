import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import pg from "pg";
import EventRegistration from "../models/shirtModel";
import { Member } from "../models/MemberModel";

dotenv.config();

// Validación de seguridad para saber si Render leyó la variable
const dbUrl = process.env.DATABASE_URL;
if (!dbUrl) {
  console.error("❌ ERROR: La variable DATABASE_URL no está configurada en el entorno.");
}

export const db = new Sequelize(dbUrl!, {
  dialect: "postgres",
  dialectModule: pg,
  logging: false,
  models: [EventRegistration, Member],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});