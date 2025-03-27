const db = require('./db'); // Koneksi database

// Kelas ObatService untuk mengelola operasi CRUD terkait data obat
class ObatService {
  constructor(dbConnection) {
    this.db = dbConnection; // Inisialisasi koneksi database
  }

  // Fungsi untuk menambahkan data obat ke database
  async addObat(req, res) {
    const { nama_obat, jumlah, dikonsumsi, dosis, durasi, user_id } = req.body;

    // Validasi input, memastikan semua field diisi
    if (!nama_obat || !jumlah || !dikonsumsi || !dosis || !durasi || !user_id) {
      return res.status(400).json({ message: 'Semua field harus diisi!' });
    }

    // SQL query untuk menambahkan data obat
    const sql = `
      INSERT INTO obat (nama_obat, jumlah_pil, dikonsumsi, dosis, durasi, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    this.db.query(
      sql,
      [nama_obat, jumlah, dikonsumsi, dosis, durasi, user_id],
      (err, results) => {
        if (err) {
          console.error('Error saat menambahkan obat:', err);
          return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
        }
        // Respon jika data berhasil ditambahkan
        res.status(201).json({ message: 'Obat berhasil ditambahkan!', data: results });
      }
    );
  }

  // Fungsi untuk mengambil daftar obat berdasarkan user_id
  async getObat(req, res) {
    const { user_id } = req.query;

    // Validasi input, memastikan user_id disertakan
    if (!user_id) {
      return res.status(400).json({ message: 'User ID harus disertakan.' });
    }

    // SQL query untuk mengambil data obat berdasarkan user_id
    const sql = `
      SELECT nama_obat 
      FROM obat 
      WHERE user_id = ?
    `;
    // Eksekusi query ke database
    this.db.query(sql, [user_id], (err, results) => {
      if (err) {
        console.error('Error saat mengambil data obat:', err);
        return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
      }

      // Respon jika tidak ada data ditemukan
      if (results.length === 0) {
        return res.status(404).json({ message: 'Tidak ada data obat ditemukan.' });
      }

      // Respon dengan daftar nama obat
      res.status(200).json(results.map(row => row.nama_obat));
    });
  }
}

// Inisialisasi dan eksport instance ObatService
const obatService = new ObatService(db);
module.exports = {
  addObat: (req, res) => obatService.addObat(req, res),
  getObat: (req, res) => obatService.getObat(req, res),
  //deleteObat: (req, res) => obatService.deleteObat(req, res),
  //getObatSchedule: (req, res) => obatService.getObatSchedule(req, res),
};





// ---------------------TIDAK DIPAKAI--------------------
  // Fungsi untuk menghapus data obat berdasarkan obat_id TIDAK DIPAKAI
  // async deleteObat(req, res) {
  //   const { obat_id } = req.body;

  //   // Validasi input, memastikan obat_id disertakan
  //   if (!obat_id) {
  //     return res.status(400).json({ message: 'ID obat harus disertakan!' });
  //   }

  //   // SQL query untuk menghapus data obat
  //   const sql = `DELETE FROM obat WHERE id = ?`;
  //   this.db.query(sql, [obat_id], (err, results) => {
  //     if (err) {
  //       console.error('Error saat menghapus obat:', err);
  //       return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
  //     }

  //     // Respon jika data yang dihapus tidak ditemukan
  //     if (results.affectedRows === 0) {
  //       return res.status(404).json({ message: 'Obat tidak ditemukan.' });
  //     }

  //     // Respon jika data berhasil dihapus
  //     res.status(200).json({ message: 'Obat berhasil dihapus.' });
  //   });
  // }

  // Fungsi untuk mendapatkan jadwal konsumsi obat berdasarkan user_id
//   async getObatSchedule(req, res) {
//     const { user_id } = req.query;

//     // Validasi input, memastikan user_id disertakan
//     if (!user_id) {
//       return res.status(400).json({ message: 'User ID harus disertakan!' });
//     }

//     // SQL query untuk mengambil data obat (jadwal) berdasarkan user_id
//     const sql = `
//       SELECT nama_obat, dosis, durasi 
//       FROM obat 
//       WHERE user_id = ?
//     `;

//     // Eksekusi query ke database
//     this.db.query(sql, [user_id], (err, results) => {
//       if (err) {
//         console.error('Error saat mengambil jadwal obat:', err);
//         return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
//       }

//       // Waktu default untuk jadwal konsumsi obat TIDAK JADI DIPAKE XIXI
//       const startHour = 8; // Waktu mulai (08:00 pagi)
//       const endHour = 20; // Waktu akhir (08:00 malam)

//       // Menghitung interval jadwal konsumsi obat TIDAK JADI DIPAKE XIXI
//       const schedules = results.map((obat) => {
//         const interval = Math.floor((endHour - startHour) / obat.dosis);
//         const times = [];
//         for (let i = 0; i < obat.dosis; i++) {
//           times.push(`${startHour + i * interval}:00`);
//         }
//         return {
//           nama_obat: obat.nama_obat,
//           jadwal: times,
//         };
//       });

//       // Respon dengan jadwal konsumsi obat
//       res.status(200).json(schedules);
//     });
//   }



//------------------TIDAK OOP-------------------------------------------------------
// const db = require('./db'); // Koneksi database

// // Fungsi untuk menambahkan obat
// exports.addObat = (req, res) => {
//   const { nama_obat, jumlah, dikonsumsi, dosis, durasi, user_id } = req.body;

//   // Validasi input
//   if (!nama_obat || !jumlah || !dikonsumsi || !dosis || !durasi || !user_id) {
//     return res.status(400).json({ message: 'Semua field harus diisi!' });
//   }

//   const sql = `
//     INSERT INTO obat (nama_obat, jumlah_pil, dikonsumsi, dosis, durasi, user_id)
//     VALUES (?, ?, ?, ?, ?, ?)
//   `;
//   db.query(
//     sql,
//     [nama_obat, jumlah, dikonsumsi, dosis, durasi, user_id],
//     (err, results) => {
//       if (err) {
//         console.error('Error saat menambahkan obat:', err);
//         return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
//       }
//       res.status(201).json({ message: 'Obat berhasil ditambahkan!', data: results });
//     }
//   );
// };

// // Fungsi untuk mendapatkan daftar obat berdasarkan user_id
// exports.getObat = (req, res) => {
//   const { user_id } = req.query; // ID user diambil dari query parameter

//   // Validasi input
//   if (!user_id) {
//     return res.status(400).json({ message: 'User ID harus disertakan.' });
//   }

//   const sql = `
//     SELECT nama_obat 
//     FROM obat 
//     WHERE user_id = ?
//   `;
//   db.query(sql, [user_id], (err, results) => {
//     if (err) {
//       console.error('Error saat mengambil data obat:', err);
//       return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
//     }

//     // Jika tidak ada data
//     if (results.length === 0) {
//       return res.status(404).json({ message: 'Tidak ada data obat ditemukan.' });
//     }

//     // Hanya kirimkan daftar nama obat
//     res.status(200).json(results.map(row => row.nama_obat));
//   });
// };

// // Fungsi untuk menghapus obat berdasarkan ID
// exports.deleteObat = (req, res) => {
//   const { obat_id } = req.body;

//   // Validasi input
//   if (!obat_id) {
//     return res.status(400).json({ message: 'ID obat harus disertakan!' });
//   }

//   const sql = `DELETE FROM obat WHERE id = 1`;
//   db.query(sql, [obat_id], (err, results) => {
//     if (err) {
//       console.error('Error saat menghapus obat:', err);
//       return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
//     }

//     if (results.affectedRows === 0) {
//       return res.status(404).json({ message: 'Obat tidak ditemukan.' });
//     }

//     res.status(200).json({ message: 'Obat berhasil dihapus.' });
//   });
// };
// // Fungsi untuk mendapatkan jadwal konsumsi obat berdasarkan user_id
// exports.getObatSchedule = (req, res) => {
//     const { user_id } = req.query;
  
//     if (!user_id) {
//       return res.status(400).json({ message: 'User ID harus disertakan!' });
//     }
  
//     const sql = `
//       SELECT nama_obat, dosis, durasi 
//       FROM obat 
//       WHERE user_id = ?
//     `;
  
//     db.query(sql, [user_id], (err, results) => {
//       if (err) {
//         console.error('Error saat mengambil jadwal obat:', err);
//         return res.status(500).json({ message: 'Terjadi kesalahan pada server.' });
//       }
  
//       // Logika untuk menghitung waktu berdasarkan dosis dan durasi
//       const startHour = 8; // Waktu mulai default (08:00 pagi)
//       const endHour = 20; // Waktu akhir default (08:00 malam)
//       const interval = Math.floor((endHour - startHour) / results[0].dosis); // Interval waktu per dosis
  
//       const schedules = results.map((obat) => {
//         const times = [];
//         for (let i = 0; i < obat.dosis; i++) {
//           times.push(`${startHour + i * interval}:00`); // Tambahkan waktu (format HH:mm)
//         }
//         return {
//           nama_obat: obat.nama_obat,
//           jadwal: times,
//         };
//       });
  
//       res.status(200).json(schedules);
//     });
//   };