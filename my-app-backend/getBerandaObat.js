const db = require('./db'); // Mengimpor koneksi database

// Kelas BerandaObatService untuk mengelola data obat pada halaman beranda
class BerandaObatService {
  constructor(dbConnection) {
    this.db = dbConnection; // Inisialisasi koneksi database
  }

  // Fungsi untuk mengambil data obat untuk beranda berdasarkan user_id
  async getBerandaObat(req, res) {
    console.log('Request diterima di /getBerandaObat:', req.query); // Log request query

    const { user_id } = req.query; // Mengambil user_id dari query parameter

    // Validasi input, memastikan user_id disertakan
    if (!user_id) {
      console.error('User ID tidak disertakan dalam request.'); // Log error jika user_id tidak ada
      return res.status(400).json({ message: 'User ID harus disertakan!' }); // Mengembalikan error jika user_id tidak ditemukan
    }

    // SQL query untuk mengambil nama_obat dan informasi dikonsumsi dari tabel obat berdasarkan user_id
    const sql = `
      SELECT nama_obat, dikonsumsi
      FROM obat
      WHERE user_id = ?
    `;

    // Eksekusi query ke database
    this.db.query(sql, [user_id], (err, results) => {
      if (err) {
        console.error('Error saat mengambil data obat untuk beranda:', err); // Log error jika ada masalah saat query
        return res.status(500).json({ message: 'Terjadi kesalahan pada server.' }); // Mengembalikan respon error server
      }

      console.log('Data obat untuk beranda:', results); // Log hasil query jika berhasil
      res.status(200).json(results); // Mengembalikan hasil query sebagai respon JSON
    });
  }
}

// Inisialisasi instance BerandaObatService
const berandaObatService = new BerandaObatService(db);
module.exports = {
  // Ekspor fungsi getBerandaObat untuk digunakan di modul lain
  getBerandaObat: (req, res) => berandaObatService.getBerandaObat(req, res),
};
