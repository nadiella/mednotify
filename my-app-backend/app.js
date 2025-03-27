const express = require('express');
const bodyParser = require('body-parser');
const register = require('./register'); // Modul registrasi
const auth = require('./auth'); // Modul login dan profil
const addObat = require('./addObat'); // Modul tambah obat
const getBerandaObat = require('./getBerandaObat'); // Modul untuk mendapatkan data beranda obat

const app = express();

// Middleware untuk parsing JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint Registrasi
app.post('/register', register.handleRegistration);

// Endpoint Login
app.post('/login', auth.handleLogin);

// Endpoint Profil
app.get('/profile', auth.getProfile);

// Endpoint Tambah Obat
app.post('/addObat', addObat.addObat);

// Endpoint Get Obat
app.get('/getObat', addObat.getObat); // Pastikan endpoint ini ada

// Endpoint untuk mendapatkan jadwal konsumsi obat
app.get('/getObatSchedule', addObat.getObatSchedule);

// Endpoint untuk mendapatkan obat untuk beranda
app.get('/getBerandaObat', getBerandaObat.getBerandaObat);

// Menjalankan server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
