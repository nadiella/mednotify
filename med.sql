-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3307
-- Generation Time: Apr 02, 2025 at 08:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `med`
--

-- --------------------------------------------------------

--
-- Table structure for table `obat`
--

CREATE TABLE `obat` (
  `id` int(11) NOT NULL,
  `nama_obat` varchar(255) NOT NULL,
  `jumlah_pil` int(11) NOT NULL,
  `dikonsumsi` enum('Sebelum makan','Sesudah makan') NOT NULL,
  `dosis` int(11) NOT NULL,
  `durasi` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `next_notify` datetime DEFAULT NULL,
  `interval_waktu` int(11) NOT NULL,
  `jumlah_pil_harian` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `obat`
--

INSERT INTO `obat` (`id`, `nama_obat`, `jumlah_pil`, `dikonsumsi`, `dosis`, `durasi`, `user_id`, `next_notify`, `interval_waktu`, `jumlah_pil_harian`) VALUES
(1, 'Paracetamol', 10, 'Sesudah makan', 3, 3, 1, '2024-12-25 00:03:46', 8, 3),
(2, 'Paracetamol', 10, 'Sesudah makan', 3, 3, 1, '2024-12-25 00:03:46', 8, 3),
(3, 'antasida', 3, 'Sebelum makan', 3, 1, 1, NULL, 0, 0),
(12, 'Imodium', 2, 'Sesudah makan', 1, 1, 1, NULL, 0, 0),
(13, 'paracetamol', 5, 'Sesudah makan', 2, 1, 7, NULL, 0, 0),
(14, 'p', 5, 'Sesudah makan', 1, 1, 8, NULL, 0, 0),
(15, 'Amoxcilin', 10, 'Sesudah makan', 2, 1, 1, NULL, 0, 0),
(16, 'Panadol', 10, 'Sesudah makan', 1, 1, 1, NULL, 0, 0),
(17, 'Imodium', 2, 'Sesudah makan', 1, 1, 9, NULL, 0, 0),
(18, 'Vitamin C', 1, 'Sesudah makan', 1, 1, 9, NULL, 0, 0),
(19, 'Paracetamol', 10, 'Sesudah makan', 2, 1, 10, NULL, 0, 0),
(20, 'Imodium', 5, 'Sesudah makan', 1, 1, 10, NULL, 0, 0),
(21, 'antimo', 5, 'Sesudah makan', 1, 1, 10, NULL, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone_number` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `phone_number`, `password`, `created_at`) VALUES
(1, 'nadiella@gmail.com', '082141130402', '$2b$10$EmrcxR2aA2z/K/42DTZqletvvp7bOr6H6dX11dvzIh0Ff2KvC1xHq', '2024-12-17 08:58:12'),
(7, 'abc@gmail.com', '0822222', '$2b$10$gt9rvbmyXOK2IRlxoZH1DeMkhJJpU36k9JSm5a.tkf8Lbk1VCVocy', '2024-12-30 08:52:58'),
(8, 'a@gmail.com', '099999', '$2b$10$inq6pWLpYugnLt2Zvl20BeXuugCL3Uyo8Ct3HJOubpeJge0ZAiL0C', '2024-12-30 11:13:43'),
(9, 'e@gmail.com', '082222222', '$2b$10$MmA4yTWJhePslX9p2cA/8uYLav3HC0PniwWkNAlFPbngdysBc1LDO', '2024-12-30 11:53:39'),
(10, 'impal@gmail.com', '082133335555', '$2b$10$7WRNY4pnh.TB6Zn.6nhLrOJVi8OZW336J56xYZGJOQfuWjEiomFDi', '2024-12-30 15:13:15');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `obat`
--
ALTER TABLE `obat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `obat`
--
ALTER TABLE `obat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `obat`
--
ALTER TABLE `obat`
  ADD CONSTRAINT `obat_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
