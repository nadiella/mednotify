const bcrypt = require('bcrypt'); // Mengimpor bcrypt untuk hashing dan membandingkan password
const db = require('./db'); // Mengimpor koneksi database

// Kelas AuthService untuk mengelola autentikasi pengguna
class AuthService {
  constructor(dbConnection) {
    this.db = dbConnection; // Inisialisasi koneksi database
  }

  // Fungsi untuk mencari user berdasarkan email
  async findUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?'; // SQL query untuk mencari user berdasarkan email
    return new Promise((resolve, reject) => {
      this.db.query(query, [email], (err, results) => {
        if (err) {
          // Jika terjadi error, reject promise dengan pesan error
          reject(new Error('Error saat mengambil data user: ' + err.message));
        } else {
          // Jika berhasil, resolve promise dengan hasil query
          resolve(results);
        }
      });
    });
  }

  // Fungsi untuk membandingkan password dengan hash di database
  async comparePassword(password, hashedPassword) {
    try {
      const isMatch = await bcrypt.compare(password, hashedPassword); // Membandingkan password dengan hash
      return isMatch; // Mengembalikan hasil perbandingan
    } catch (err) {
      // Jika terjadi error, lemparkan pesan error
      throw new Error('Error saat membandingkan password: ' + err.message);
    }
  }

  // Fungsi untuk menangani login
  async handleLogin(req, res) {
    const { email, password } = req.body; // Mengambil email dan password dari body request

    // Validasi input, memastikan email dan password disertakan
    if (!email || !password) {
      return res.status(400).json({ message: 'Email dan password harus diisi.' }); // Mengembalikan error jika input tidak lengkap
    }

    try {
      const results = await this.findUserByEmail(email); // Mencari user berdasarkan email

      // Jika user tidak ditemukan
      if (results.length === 0) {
        return res.status(401).json({ message: 'Email atau password salah.' }); // Mengembalikan error jika user tidak ditemukan
      }

      const user = results[0]; // Mengambil data user pertama
      const isMatch = await this.comparePassword(password, user.password); // Membandingkan password dengan hash di database

      // Jika password tidak cocok
      if (!isMatch) {
        return res.status(401).json({ message: 'Email atau password salah.' }); // Mengembalikan error jika password salah
      }

      // Respon jika login berhasil
      res.status(200).json({
        message: 'Login berhasil.', // Pesan sukses
        user: {
          id: user.id, // ID user
          email: user.email, // Email user
        },
      });
    } catch (err) {
      // Jika terjadi error pada proses login
      console.error(err.message); // Log error
      res.status(500).json({ message: 'Terjadi kesalahan pada server.' }); // Mengembalikan respon error server
    }
  }

  // Fungsi untuk mengambil data profil pengguna berdasarkan email
  async getProfile(req, res) {
    const { email } = req.query; // Mengambil email dari query parameter

    // Validasi input, memastikan email disertakan
    if (!email) {
      return res.status(400).json({ message: 'Email harus disertakan.' }); // Mengembalikan error jika email tidak disertakan
    }

    const query = 'SELECT email, phone_number FROM users WHERE email = ?'; // SQL query untuk mengambil data profil
    this.db.query(query, [email], (err, results) => {
      if (err) {
        console.error('Error saat mengambil data profil:', err); // Log error jika ada masalah
        return res.status(500).json({ message: 'Terjadi kesalahan pada server.' }); // Mengembalikan respon error server
      }

      // Jika user tidak ditemukan
      if (results.length === 0) {
        return res.status(404).json({ message: 'User tidak ditemukan.' }); // Mengembalikan error jika user tidak ditemukan
      }

      const user = results[0]; // Mengambil data user pertama
      res.status(200).json({
        email: user.email, // Email user
        phone_number: user.phone_number, // Nomor telepon user
      }); // Mengembalikan data profil user
    });
  }
}

// Inisialisasi instance AuthService
const authService = new AuthService(db);
module.exports = {
  handleLogin: (req, res) => authService.handleLogin(req, res), // Menyediakan fungsi handleLogin untuk dipakai
  getProfile: (req, res) => authService.getProfile(req, res), // Menyediakan fungsi getProfile untuk dipakai
  addObat: require('./addObat').addObat, // Menambahkan fungsi addObat dari modul lain
};



//------------------TIDAK OOP-------------------------------------------------------

// const bcrypt = require('bcrypt');
// const db = require('./db'); // Koneksi database

// // Fungsi untuk login
// exports.handleLogin = (req, res) => {
//   const { email, password } = req.body;

//   // Validasi input
//   if (!email || !password) {
//     return res.status(400).json({ message: 'Email dan password harus diisi.' });
//   }

//   // Query untuk mencari user berdasarkan email
//   const query = 'SELECT * FROM users WHERE email = ?';
//   db.query(query, [email], (err, results) => {
//     if (err) {
//       console.error('Error saat mengambil data user:', err);
//       return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
//     }

//     // Jika user tidak ditemukan
//     if (results.length === 0) {
//       return res.status(401).json({ message: 'Email atau password salah.' });
//     }

//     const user = results[0];

//     // Bandingkan password dengan hash di database
//     bcrypt.compare(password, user.password, (err, isMatch) => {
//       if (err) {
//         console.error('Error saat membandingkan password:', err);
//         return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
//       }

//       if (!isMatch) {
//         return res.status(401).json({ message: 'Email atau password salah.' });
//       }

//       // Jika login berhasil
//       res.status(200).json({
//         message: 'Login berhasil.',
//         user: {
//           id: user.id,
//           email: user.email,
//         },
//       });
//     });
//   });
// };

// // Fungsi untuk mengambil data profil berdasarkan email
// exports.getProfile = (req, res) => {
//   const { email } = req.query; // Mengambil email dari query parameter

//   // Validasi input
//   if (!email) {
//     return res.status(400).json({ message: 'Email harus disertakan.' });
//   }

//   // Query untuk mengambil data user berdasarkan email
//   const query = 'SELECT email, phone_number FROM users WHERE email = ?';
//   db.query(query, [email], (err, results) => {
//     if (err) {
//       console.error('Error saat mengambil data profil:', err);
//       return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
//     }

//     // Jika user tidak ditemukan
//     if (results.length === 0) {
//       return res.status(404).json({ message: 'User tidak ditemukan.' });
//     }

//     const user = results[0];
//     res.status(200).json({
//       email: user.email,
//       phone_number: user.phone_number,
//     });
//   });
// };

// // Fungsi untuk menambahkan obat (dihubungkan ke `addObat.js`)
// exports.addObat = require('./addObat').addObat;