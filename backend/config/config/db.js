import dotenv from "dotenv";
import pkg from "pg";

dotenv.config(); 

const {Pool} = pkg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});
  

pool.on("connect", () => {
    console.log("Connected to PostgreSQL");
});
  
pool.on("error", (err) => {
    console.error("PostgreSQL Pool Error", err);
});  
  
export default pool;

