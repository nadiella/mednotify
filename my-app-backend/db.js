const mysql = require('mysql2');

// Konfigurasi koneksi database
const connection = mysql.createConnection({
  host: 'localhost',     // host server database (
  user: 'root',          //  username MySQL 
  password: '',          //  password MySQL 
  database: 'med',        //  nama database 
  port: 3307
});

// Cek koneksi ke database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});

// Menangani koneksi hilang atau error
connection.on('error', (err) => {
  console.error('MySQL error: ', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection lost. Reconnecting...');
    // Koneksi ulang jika terputus
    setTimeout(() => {
      connection.connect();
    }, 2000);
  } else {
    throw err;
  }
});

module.exports = connection;
