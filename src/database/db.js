import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

const connectionDB = new Pool({
    host: process.env.host,
    port: process.env.portp,
    user: process.env.userp,
    password: process.env.password,
    database: process.env.database
});

export default connectionDB;