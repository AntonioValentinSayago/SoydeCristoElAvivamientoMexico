import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import EventRegistration from "../models/shirtModel";
import { Member } from "../models/MemberModel";

dotenv.config();

export const db = new Sequelize(process.env.DATABASE_URL as string, {
  dialect: "postgres",
  protocol: "postgres",
  logging: false,
  models: [EventRegistration, Member],
  dialectOptions: {
    ssl: {
      require: true,              // <-- Cambiado a true para que Render acepte la conexión segura
      rejectUnauthorized: false,  // Mantiene la aceptación de certificados de Render
    },
  },
});