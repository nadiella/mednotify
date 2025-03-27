const bcrypt = require('bcrypt'); // Mengimpor bcrypt untuk hashing password
const db = require('./db'); // Mengimpor koneksi database

// Kelas UserRegistration untuk menangani proses registrasi pengguna
class UserRegistration {
  constructor(dbConnection) {
    this.db = dbConnection; // Inisialisasi koneksi database
  }

  // Fungsi untuk melakukan hashing password
  async hashPassword(password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10); // Menggunakan bcrypt untuk hashing password dengan saltRounds = 10
      return hashedPassword; // Mengembalikan password yang sudah di-hash
    } catch (err) {
      // Jika terjadi error selama hashing, lemparkan pesan error
      throw new Error('Error hashing password: ' + err.message);
    }
  }

  // Fungsi untuk menyimpan pengguna baru ke database
  async saveUser(email, phoneNumber, hashedPassword) {
    // Query SQL untuk menyisipkan data pengguna baru
    const query = 'INSERT INTO users (email, phone_number, password) VALUES (?, ?, ?)';
    // Membungkus eksekusi query dalam Promise untuk mendukung async/await
    return new Promise((resolve, reject) => {
      this.db.query(query, [email, phoneNumber, hashedPassword], (error, results) => {
        if (error) {
          // Reject promise jika terjadi error saat menyimpan data
          reject(new Error('Error registering the user: ' + error.message));
        } else {
          // Resolve promise jika data berhasil disimpan
          resolve(results);
        }
      });
    });
  }

  // Fungsi untuk menangani proses registrasi
  async handleRegistration(req, res) {
    const { email, phone_number, password } = req.body; // Mengambil data dari body request
    console.log(req.body); // Log data request untuk debugging

    try {
      const hashedPassword = await this.hashPassword(password); // Hashing password
      await this.saveUser(email, phone_number, hashedPassword); // Menyimpan data pengguna ke database
      res.status(200).send('User registered successfully.'); // Mengirim respon sukses jika registrasi berhasil
    } catch (err) {
      // Mengirim respon error jika terjadi masalah selama proses registrasi
      res.status(500).send(err.message);
    }
  }
}

// Inisialisasi instance UserRegistration
const userRegistration = new UserRegistration(db);

// Ekspor fungsi handleRegistration untuk digunakan di modul lain
module.exports = {
  handleRegistration: (req, res) => userRegistration.handleRegistration(req, res)
};




//------------------TIDAK OOP-------------------------------------------------------

// const bcrypt = require('bcrypt');
// const db = require('./db');

// exports.handleRegistration = (req, res) => {
//   const { email, phone_number, password } = req.body;
//   console.log(req.body);
//   bcrypt.hash(password, 10, (err, hashedPassword) => {
//     if (err) {
//       return res.status(500).send(err.message);
//     }
//     const query = 'INSERT INTO users (email, phone_number, password) VALUES (?, ?, ?)';
//     db.query(query, [email, phone_number, hashedPassword], (error, results) => {
//       if (error) {
//         return res.status(500).send('Error registering the user.');
//       }
//       res.status(200).send('User registered successfully.');
//     });
//   });
// };