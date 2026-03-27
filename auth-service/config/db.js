const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

let db;

const connectWithRetry = () => {
  db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root1234',
    database: process.env.DB_NAME || 'eventzen_auth'
  });

  db.connect((err) => {
    if (err) {
      console.log('MySQL connection failed, retrying in 5 seconds...', err.message);
      db.destroy();
      setTimeout(connectWithRetry, 5000);
      return;
    }
    console.log('MySQL connected successfully!');
    db.query(`CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100),
      email VARCHAR(100) UNIQUE,
      password VARCHAR(255),
      role VARCHAR(20) DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.log('Table error:', err.message);
      else console.log('Users table ready!');
    });
  });
};

connectWithRetry();
module.exports = { getDb: () => db };