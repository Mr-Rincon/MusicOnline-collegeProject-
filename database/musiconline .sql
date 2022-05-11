-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: May 17, 2020 at 11:04 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `musiconline`
--
CREATE DATABASE IF NOT EXISTS `musiconline` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `musiconline`;

-- --------------------------------------------------------

--
-- Table structure for table `admint`
--

DROP TABLE IF EXISTS `admint`;
CREATE TABLE IF NOT EXISTS `admint` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `join_date` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `admint`
--

INSERT INTO `admint` (`id`, `type`, `name`, `surname`, `email`, `password`, `join_date`) VALUES
(1, 'admin', 'Diego', 'Rincon', 'dr@gmail.com', '123456789', '2020-05-03 02:19:12'),
(2, 'admin', 'Alex', 'Smith', 'as@gmail.com', '123456789', '2020-05-03 02:20:12');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `buyer_id` int(11) NOT NULL,
  `transaction_date` date NOT NULL,
  `item_id` int(11) NOT NULL,
  `item_cover` varchar(400) COLLATE utf8_unicode_ci NOT NULL,
  `item_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `item_qty` int(11) NOT NULL,
  `item_price` double NOT NULL,
  `total` double NOT NULL,
  PRIMARY KEY (`id`),
  KEY `buyer_id` (`buyer_id`),
  KEY `item_id` (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `buyer_id`, `transaction_date`, `item_id`, `item_cover`, `item_name`, `item_qty`, `item_price`, `total`) VALUES
(35, 1, '2020-05-11', 1, 'https://img.discogs.com/8ineHjlG3ycKfHEFAwwK4Kgl_3g=/700x700/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-14991944-1585595584-6323.jpeg.jpg', 'Future Nostalgia', 1, 28, 28),
(36, 1, '2020-05-11', 32, 'https://img.discogs.com/AuvHRcqXN9-qQW0aDANp5VyH_mc=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15285792-1589194873-8887.jpeg.jpg', 'Samba De Gira', 1, 11.5, 11.5),
(37, 1, '2020-05-11', 2, 'https://img.discogs.com/67MQENbHd7JzchB3paKyj6NSx9w=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15049564-1586012533-4360.jpeg.jpg', 'The New Abnormal', 1, 15, 15),
(38, 1, '2020-05-11', 4, 'https://img.discogs.com/MHH_ypXq5O6DhBb5uukOmMCCJXI=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15163360-1588416207-4376.jpeg.jpg', 'Jesus Is King', 3, 29.99, 89.97);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `nickname` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `birth` date NOT NULL,
  `phone` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `street` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `city` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `postcode` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `country` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `reg_date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `type`, `nickname`, `name`, `surname`, `birth`, `phone`, `email`, `password`, `street`, `city`, `postcode`, `country`, `reg_date`) VALUES
(1, 'user', 'Musik Republik', 'Alfred', 'Dudamelazo', '1994-07-06', '012345678901', 'ad@gmail.com', '123456789', 'Blumor', 'Deskanski', 'DA48YY', 'Denmark', '2020-05-16 18:19:17'),
(2, 'user', 'Legend', 'Dylan', 'Climbola', '1985-05-03', '01234567777', 'dc@gmail.com', '123456789', 'Dumbol street', 'Glasgow', 'GL355S', 'United Kingdom', '2020-05-12 09:41:08');

-- --------------------------------------------------------

--
-- Table structure for table `vinyls`
--

DROP TABLE IF EXISTS `vinyls`;
CREATE TABLE IF NOT EXISTS `vinyls` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `artist` varchar(25) COLLATE utf8_unicode_ci NOT NULL,
  `album` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `cover` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `release_date` date NOT NULL,
  `genre` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(400) COLLATE utf8_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `stock` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `vinyls`
--

INSERT INTO `vinyls` (`id`, `artist`, `album`, `cover`, `release_date`, `genre`, `description`, `price`, `stock`, `owner_id`) VALUES
(1, 'Dua Lipa', 'Future Nostalgia', 'https://img.discogs.com/8ineHjlG3ycKfHEFAwwK4Kgl_3g=/700x700/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-14991944-1585595584-6323.jpeg.jpg', '2020-03-27', 'Electronic, Pop', 'Translucent pink vinyl in a gatefold sleeve with credit insert.\n\n℗ & © 2020 Dua Lipa Limited under exclusive license to Warner Records UK, a division of Warner Music UK Limited.\nExcept tracks 1 & 2 ℗ 2019 Dua Lipa Limited under exclusive license to Warner Records UK, a division of Warner Music UK Limited.\n\nMade in the E.U. jA', 28, 41, 1),
(2, 'The Strokes', 'The New Abnormal', 'https://img.discogs.com/67MQENbHd7JzchB3paKyj6NSx9w=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15049564-1586012533-4360.jpeg.jpg', '2020-04-10', 'Rock', 'Packaged in a hard plastic sleeve.\nIncludes a custom inner sleeve, a foldout poster, and a download card.\nTrack numbering is sequential across sides.', 17, 79, 1),
(3, 'Otis Redding', 'The Immortal Otis Redding', 'https://img.discogs.com/e_Z-vsqKwlsOoa2I-LCT6B4oYxY=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15095640-1588124200-7665.jpeg.jpg', '2020-04-01', 'Funk / Soul', 'The selections contained in \"The Immortal Otis Redding\" were never released previously, with the exception of \"The Happy Song,\" originally issued as a single in April, 1968. They were recorded during the spring, summer and fall of 1967 and comprise some of the last recordings made by Otis Redding.', 35.99, 23, 2),
(4, 'Kanye West', 'Jesus Is King', 'https://img.discogs.com/MHH_ypXq5O6DhBb5uukOmMCCJXI=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15163360-1588416207-4376.jpeg.jpg', '2020-05-01', 'Hip Hop, Folk, World, & Country', 'Transparent blue vinyl. Comes in clear vinyl sleeve with full back sticker with track listing.\r\n\r\n℗ 2019 Getting Out Our Dreams II, LLC Distributed By Def Jam, A Division of UMG Recordings, Inc.\r\n\r\nMade in the EU.', 29.99, 10, 2),
(46, 'Tom Misch & Yussef Dayes', 'What Kinda Music', 'https://img.discogs.com/8UmHS9tvA6v-AwifkdN7n1i2QDc=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15179807-1587740071-2522.jpeg.jpg', '2020-04-24', 'Electronic, Jazz', 'Gatefold sleeve housed in a recycled plastic dust jacket. Includes a music book and recycled plectrum.\r\n\r\nMade in the Czech Republic.\r\n\r\nD3, D4 and D5 are bonus tracks.', 30.59, 8, 1),
(47, 'Car Seat Headrest', 'Making A Door Less Open', 'https://img.discogs.com/AK41JJmNGYubq59SHKnS_-MqAtg=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15214855-1588208517-6624.jpeg.jpg', '2020-01-01', 'Rock', 'Gianni Aiello appears courtesy of New West Records\r\n\r\nMastered[...], BMG\r\n\r\nLimited edition pink vinyl, came with digital download, two stickers, and glossy insert for liner notes', 14.58, 15, 1),
(48, 'Frank Sinatra', 'The Best Songs 1', 'https://img.discogs.com/iBDRcddYAPWIbcbw5FkgLmP6xUw=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15290446-1589254260-5937.jpeg.jpg', '2012-01-01', 'Jazz, Pop', 'Distributed By – Procom S.R.L.', 7.35, 60, 2),
(49, 'Topp Twins ', 'She\'ll Be Coming Round The Mountain', 'https://img.discogs.com/6L4uKv4qGAkBaLWijbw7LAAkU90=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15290430-1589253218-8549.jpeg.jpg', '2013-01-01', 'Children\'s', 'Mixed By, Mastered By – Dave Rhodes (7)\r\nRecorded By, Arranged By – Topp Twins', 3.5, 55, 1),
(50, 'Azean Irdawaty', 'Kesedihan Di Matamu', 'https://img.discogs.com/_0DdhjHHAWS68-xPlKvDEm0Y0Sw=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15290495-1589255515-2294.jpeg.jpg', '1980-01-01', 'Funk / Soul', 'Phonographic Copyright (p) – WEA Records SDN. BHD.\r\nCopyright (c) – WEA Records SDN. BHD.', 12, 20, 2),
(51, 'Pulsr ', 'The Three', 'https://img.discogs.com/nTn-Kl2cTgj4pvVR1cUI18VCo10=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15290486-1589255325-5710.jpeg.jpg', '2020-01-27', 'Rock', 'Credits\r\nBass – Drew*\r\nDrums – Josh*\r\nVocals, Guitar – Jake*', 11.9, 10, 1),
(52, 'Rob Jacobs (4) ', ' Magic Eye', 'https://img.discogs.com/f209iDS9IMM_Z2li5O3kLO1ELy0=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15290484-1589255206-1222.jpeg.jpg', '2020-03-16', 'Rock, Folk, World, & Country', 'Credits\r\nMastered By – Alex Colombo\r\nPerformer, Mixed By – Rob Jacobs (4)', 8.6, 10, 1),
(53, 'Michael Jackson ‎', 'Bad 25', 'https://img.discogs.com/RVhvHEgGCeikzyZakLJrCxAgUYw=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15290478-1589255108-9784.jpeg.jpg', '2012-01-01', '\r\nElectronic, Rock, Funk / Soul, Pop', 'Produced For – Quincy Jones Productions\r\nProduced For – MJJ Productions\r\nPhonographic Copyright (p) – MJJ Productions Inc.\r\nCopyright (c) – MJJ Productions Inc.\r\nRecord Company – Sony Music Entertainment\r\nManufactured By – Sony Music Entertainment México, S.A. De C.V.\r\nDistributed By – Sony Music Entertainment México, S.A. De C.V.', 14.29, 20, 1),
(54, 'Blank Hellscape', '31 Blank Hellscape Fans Can\'t Be Wrong', 'https://img.discogs.com/t8Dva4XLYBTC_m3EjGdqmu4y50Q=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15290467-1589254896-4461.jpeg.jpg', '2020-05-01', 'Electronic', 'Edition of 30, all copies on home-dubbed clear purple cassettes with printed paper labels and unique handmade covers.\r\nTrack names listed are alternative titles.\r\n\r\nA1-A2 recorded at Unit 108, Austin TX.\r\nB1 recorded at Cold Spring Hollow, Belchertown MA.\r\nB2 recorded at Hotel Vegas, Austin TX.', 2.99, 5, 2),
(55, 'Geggy Tah ', 'Sacred Cow', 'https://img.discogs.com/bmNQG2oRL8QlbV61fhFKSRXlLVQ=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15290468-1589254675-6216.jpeg.jpg', '1996-01-01', 'Electronic, Rock', 'Tracklist\r\n1	Granddad\'s Opening Address	0:28\r\n2	Whoever You Are	4:33\r\n3	Lotta Stuff	3:09\r\n4	Century Plant 2000	6:17\r\n5	Sacred Cow	5:01\r\n6	House Of Usher (Inside)	3:58\r\n7	Don\'t Close The Door	4:08\r\n8	Such A Beautiful Night	3:52\r\n9	She Withers	4:09\r\n10	Las Vegas With The Lights Out	3:27\r\n11	Mem	4:38\r\n12	Shed	3:45\r\n13	Gina	2:43', 9, 12, 1),
(56, 'F. R. David', 'Words', 'https://img.discogs.com/-wGja67Ce2uMyi8ZIZe3B7XCqjc=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-15290469-1589254668-5392.jpeg.jpg', '1982-01-01', 'Electronic, Pop', 'Tracklist\r\nA	Words	3:27\r\nB	When The Sun Goes Down	3:00\r\n\r\nCredits\r\nProducer – Frederic Liebovitz*, Jean-Michel Gallois-Montbrun\r\nWritten-By – R. Fitoussi*', 4.05, 7, 1);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`buyer_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `vinyls`
--
ALTER TABLE `vinyls`
  ADD CONSTRAINT `vinyls_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
