import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import pg from "pg"; // Importamos el driver nativo directamente
import EventRegistration from "../models/shirtModel";
import { Member } from "../models/MemberModel";

dotenv.config();

export const db = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  dialectModule: pg, // Crucial en entornos serverless/PaaS como Render
  logging: false,
  models: [EventRegistration, Member],
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true, // Evita que Render mate los sockets inactivos abruptamente
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000, // Si una conexión pasa 10s sin usarse, se destruye y se crea una nueva limpia
  },
});