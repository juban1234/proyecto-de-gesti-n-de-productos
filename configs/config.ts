
import mysql from 'mysql2';

require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT) || 3306
}).promise();

db.on('connection', (connection) => {
  console.log(`Nueva conexión a la base de datos: ${connection.threadId}`);
});

export default db;
