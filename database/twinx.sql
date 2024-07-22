-- Create database
CREATE DATABASE IF NOT EXISTS `twinx`;
USE `twinx`;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host : 127.0.0.1
-- Generated on : Sun Jul 21 2024 23:41
-- Server version : 10.4.32-MariaDB
-- PHP version : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

-- --------------------------------------------------------

-- Structure of table `users`
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

-- Indexes for table `users`
ALTER TABLE `users`
  ADD PRIMARY KEY (`Cin`),
  ADD UNIQUE KEY `email` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
