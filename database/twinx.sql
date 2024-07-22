-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 21 juil. 2024 à 23:41
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `twinx`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `street` varchar(100) DEFAULT NULL,
  `city` varchar(50) DEFAULT NULL,
  `postal_code` varchar(10) DEFAULT NULL,
  `country` varchar(50) DEFAULT NULL,
  `security_question` varchar(255) DEFAULT NULL,
  `security_answer` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Cin` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`first_name`, `last_name`, `email`, `password`, `phone_number`, `street`, `city`, `postal_code`, `country`, `security_question`, `security_answer`, `created_at`, `updated_at`, `Cin`) VALUES
('azkdaz', 'adzajd', 'medchah60006@gmail.com', 'medchah12', '23456789', 'azdazk', 'adaz', '1001', NULL, '2', 'ldld', '2024-07-18 09:38:02', '2024-07-18 09:38:02', ''),
('mohamed', 'chahbani', 'medchah606@gmail.com', '$2y$10$ExGLjmS9OF357InmG/wdzOgAjRrzz193ZRb2V7ccFg/zP4VCQA.Sy', '92308572', 'bach hamba', 'hammam lif', '2050', 'Tunisie', '1', 'hama', '2024-07-17 22:56:05', '2024-07-17 22:56:05', '09653135'),
('mohamed', 'chahhbani', 'medchah6006@gmail.com', '$2y$10$nf09qbkaz7AOsBst12YQrelAj8auLYgHDTOFeDaLpYUdjoyQ9V1ga', '98765432', 'ezad', 'zadd', '1234', 'Tunisie', '1', 'hahah', '2024-07-17 23:44:17', '2024-07-17 23:44:17', '12321234'),
('mohamed', 'chahbani', 'medchah6060@gmail.com', '$2y$10$rGv/P7cXHwJoEk8m3BylI.1cnXSqwzDR3sMUQ9Y53D/0EiQUDHCpK', '32145678', 'azdhaz', 'éezfezf', '8282', 'Tunisie', '2', 'RED', '2024-07-17 23:34:43', '2024-07-17 23:34:43', '21345678');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Cin`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
