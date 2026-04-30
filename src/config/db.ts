// import { Sequelize } from "sequelize-typescript";
// import dotenv from 'dotenv';

// dotenv.config();
// export const db = new Sequelize( process.env.DATABASE_URL,{
//     models: [__dirname + '/../models/**/*'],
//     logging: false,
//     dialectOptions: {
//         ssl: {
//             require: false
//         }
//     }
// })
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
      require: false,
      rejectUnauthorized: false,
    },
  },
});