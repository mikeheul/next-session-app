-- --------------------------------------------------------
-- Hôte:                         127.0.0.1
-- Version du serveur:           5.7.33 - MySQL Community Server (GPL)
-- SE du serveur:                Win64
-- HeidiSQL Version:             11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Listage de la structure de la base pour next-session
CREATE DATABASE IF NOT EXISTS `next-session` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;
USE `next-session`;

-- Listage de la structure de la table next-session. category
CREATE TABLE IF NOT EXISTS `category` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Category_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-session.category : ~4 rows (environ)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	('0f5d9665-6e5d-43bb-895b-e311a8abb771', 'Computer Science', '2024-05-03 12:44:07.595', '2024-05-03 12:44:07.595'),
	('205fd838-8e3c-4059-b0cd-6a96047d2aff', 'Web development', '2024-05-03 12:44:07.602', '2024-05-03 12:44:07.602'),
	('471aa4fa-098d-4aec-83ca-7fa16d8b45fe', 'Comptability', '2024-05-03 12:44:07.613', '2024-05-03 12:44:07.613'),
	('fa2dce15-45f8-4820-9366-65d2470fa0ed', 'Graphic Design', '2024-05-03 12:44:07.607', '2024-05-03 12:44:07.607');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Listage de la structure de la table next-session. course
CREATE TABLE IF NOT EXISTS `course` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `categoryId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Course_name_key` (`name`),
  KEY `Course_categoryId_fkey` (`categoryId`),
  CONSTRAINT `Course_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-session.course : ~8 rows (environ)
/*!40000 ALTER TABLE `course` DISABLE KEYS */;
INSERT INTO `course` (`id`, `name`, `categoryId`, `createdAt`, `updatedAt`) VALUES
	('17b0a97f-6758-4e89-b8d4-802351a7b5cf', 'Illustrator for Beginners', 'fa2dce15-45f8-4820-9366-65d2470fa0ed', '2024-05-03 12:44:07.723', '2024-05-03 12:44:07.723'),
	('6ab6a9be-5caf-4f10-9c98-8353ef31dc97', 'Machine Learning Basics', '0f5d9665-6e5d-43bb-895b-e311a8abb771', '2024-05-03 12:44:07.736', '2024-05-03 12:44:07.736'),
	('71d7b8cd-e232-458d-bd36-8a7d9b01b720', 'Adobe Photoshop Mastery', 'fa2dce15-45f8-4820-9366-65d2470fa0ed', '2024-05-03 12:44:07.718', '2024-05-03 12:44:07.718'),
	('79e62a70-ed22-4e51-960c-77bd9ef15384', 'Tax Preparation', '471aa4fa-098d-4aec-83ca-7fa16d8b45fe', '2024-05-03 12:44:07.694', '2024-05-03 12:44:07.694'),
	('801a4c11-a0bc-4df0-b987-64191439ed3a', 'Algorithms and Data Structures', '0f5d9665-6e5d-43bb-895b-e311a8abb771', '2024-05-03 12:44:07.731', '2024-05-03 12:44:07.731'),
	('9bdad9d1-b6ab-4c73-a979-c235eb908ced', 'React Development', '205fd838-8e3c-4059-b0cd-6a96047d2aff', '2024-05-03 12:44:07.710', '2024-05-03 12:44:07.710'),
	('9de5693e-8dce-4d76-9b27-0d226c649967', 'JavaScript Fundamentals', '205fd838-8e3c-4059-b0cd-6a96047d2aff', '2024-05-03 12:44:07.703', '2024-05-03 12:44:07.703'),
	('f8a0b3a5-226f-4881-aefb-8a5cec1c0a00', 'QuickBooks', '471aa4fa-098d-4aec-83ca-7fa16d8b45fe', '2024-05-03 12:44:07.686', '2024-05-03 12:44:07.686');
/*!40000 ALTER TABLE `course` ENABLE KEYS */;

-- Listage de la structure de la table next-session. programme
CREATE TABLE IF NOT EXISTS `programme` (
  `id` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `duration` int(11) NOT NULL DEFAULT '1',
  `sessionId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Programme_sessionId_fkey` (`sessionId`),
  KEY `Programme_courseId_fkey` (`courseId`),
  CONSTRAINT `Programme_courseId_fkey` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Programme_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-session.programme : ~2 rows (environ)
/*!40000 ALTER TABLE `programme` DISABLE KEYS */;
INSERT INTO `programme` (`id`, `duration`, `sessionId`, `courseId`, `createdAt`, `updatedAt`) VALUES
	('111', 10, '156c6bf7-54b9-425e-bf45-a79feb95bf9c', '71d7b8cd-e232-458d-bd36-8a7d9b01b720', '2024-05-03 14:45:08.000', '2024-05-03 14:45:09.000'),
	('222', 15, '156c6bf7-54b9-425e-bf45-a79feb95bf9c', '17b0a97f-6758-4e89-b8d4-802351a7b5cf', '2024-05-03 14:45:35.000', '2024-05-03 14:45:35.000');
/*!40000 ALTER TABLE `programme` ENABLE KEYS */;

-- Listage de la structure de la table next-session. session
CREATE TABLE IF NOT EXISTS `session` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `endDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `trainingId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `trainerId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Session_trainingId_fkey` (`trainingId`),
  KEY `Session_trainerId_fkey` (`trainerId`),
  CONSTRAINT `Session_trainerId_fkey` FOREIGN KEY (`trainerId`) REFERENCES `trainer` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Session_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `training` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-session.session : ~4 rows (environ)
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` (`id`, `name`, `startDate`, `endDate`, `trainingId`, `trainerId`, `createdAt`, `updatedAt`) VALUES
	('0deead78-da0b-42ad-ae88-0fcd7ee8c3bd', 'Comptability Group 2', '2024-05-03 12:44:07.658', '2024-05-03 12:44:07.658', '457c3159-7699-4c1f-82a9-5abcc805ef85', '6b39cd71-89eb-43b0-b641-f29e76c891ec', '2024-05-03 12:44:07.660', '2024-05-03 12:44:07.660'),
	('156c6bf7-54b9-425e-bf45-a79feb95bf9c', 'Graphic Design Group 1', '2024-05-03 12:44:07.646', '2024-05-03 12:44:07.646', '14f3482b-b429-489b-9818-9d5414bd46aa', '6b39cd71-89eb-43b0-b641-f29e76c891ec', '2024-05-03 12:44:07.649', '2024-05-03 12:44:07.649'),
	('aeaa63cb-6029-4b67-b88d-4c37068031e9', 'Comptability Group 3', '2024-05-03 12:44:07.666', '2024-05-03 12:44:07.666', '457c3159-7699-4c1f-82a9-5abcc805ef85', 'da1901d8-c089-4eb8-8e8a-bd84258051c4', '2024-05-03 12:44:07.668', '2024-05-03 12:44:07.668'),
	('b5c23768-a356-46ef-bd3a-5dee2730fe14', 'Computer Science Group 4', '2024-05-03 12:44:07.673', '2024-05-03 12:44:07.674', 'a27b432f-1899-481f-814f-c87a55e9c7a4', 'da1901d8-c089-4eb8-8e8a-bd84258051c4', '2024-05-03 12:44:07.675', '2024-05-03 12:44:07.675');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;

-- Listage de la structure de la table next-session. sessionstrainees
CREATE TABLE IF NOT EXISTS `sessionstrainees` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sessionId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `traineeId` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `SessionsTrainees_sessionId_fkey` (`sessionId`),
  KEY `SessionsTrainees_traineeId_fkey` (`traineeId`),
  CONSTRAINT `SessionsTrainees_sessionId_fkey` FOREIGN KEY (`sessionId`) REFERENCES `session` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `SessionsTrainees_traineeId_fkey` FOREIGN KEY (`traineeId`) REFERENCES `trainee` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-session.sessionstrainees : ~0 rows (environ)
/*!40000 ALTER TABLE `sessionstrainees` DISABLE KEYS */;
INSERT INTO `sessionstrainees` (`id`, `sessionId`, `traineeId`) VALUES
	('111', '0deead78-da0b-42ad-ae88-0fcd7ee8c3bd', 'a410c9b6-fed9-46b9-8c21-f41b09443c02'),
	('222', '0deead78-da0b-42ad-ae88-0fcd7ee8c3bd', '9ce28089-4dd3-4878-9671-303476bb0716'),
	('333', '156c6bf7-54b9-425e-bf45-a79feb95bf9c', 'a410c9b6-fed9-46b9-8c21-f41b09443c02'),
	('444', '156c6bf7-54b9-425e-bf45-a79feb95bf9c', '9ce28089-4dd3-4878-9671-303476bb0716'),
	('555', '156c6bf7-54b9-425e-bf45-a79feb95bf9c', '9420010e-e340-4d7e-a1ec-9939c8f78b0e'),
	('666', '156c6bf7-54b9-425e-bf45-a79feb95bf9c', '41a5142e-3761-446f-8dd2-c42882010c75');
/*!40000 ALTER TABLE `sessionstrainees` ENABLE KEYS */;

-- Listage de la structure de la table next-session. trainee
CREATE TABLE IF NOT EXISTS `trainee` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Trainee_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-session.trainee : ~4 rows (environ)
/*!40000 ALTER TABLE `trainee` DISABLE KEYS */;
INSERT INTO `trainee` (`id`, `firstName`, `lastName`, `email`, `phoneNumber`, `createdAt`, `updatedAt`) VALUES
	('41a5142e-3761-446f-8dd2-c42882010c75', 'Eve', 'Jackson', 'eve@example.com', '3333333333', '2024-05-03 12:44:07.582', '2024-05-03 12:44:07.582'),
	('9420010e-e340-4d7e-a1ec-9939c8f78b0e', 'Charlie', 'Brown', 'charlie@example.com', '4444444444', '2024-05-03 12:44:07.587', '2024-05-03 12:44:07.587'),
	('9ce28089-4dd3-4878-9671-303476bb0716', 'Bob', 'Johnson', 'bob@example.com', '2222222222', '2024-05-03 12:44:07.577', '2024-05-03 12:44:07.577'),
	('a410c9b6-fed9-46b9-8c21-f41b09443c02', 'Alice', 'Smith', 'alice@example.com', '1111111111', '2024-05-03 12:44:07.570', '2024-05-03 12:44:07.570');
/*!40000 ALTER TABLE `trainee` ENABLE KEYS */;

-- Listage de la structure de la table next-session. trainer
CREATE TABLE IF NOT EXISTS `trainer` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Trainer_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-session.trainer : ~2 rows (environ)
/*!40000 ALTER TABLE `trainer` DISABLE KEYS */;
INSERT INTO `trainer` (`id`, `firstName`, `lastName`, `email`, `phoneNumber`, `createdAt`, `updatedAt`) VALUES
	('6b39cd71-89eb-43b0-b641-f29e76c891ec', 'Jane', 'Doe', 'jane@example.com', '0987654321', '2024-05-03 12:44:07.564', '2024-05-03 12:44:07.564'),
	('da1901d8-c089-4eb8-8e8a-bd84258051c4', 'John', 'Doe', 'john@example.com', '1234567890', '2024-05-03 12:44:07.555', '2024-05-03 12:44:07.555');
/*!40000 ALTER TABLE `trainer` ENABLE KEYS */;

-- Listage de la structure de la table next-session. training
CREATE TABLE IF NOT EXISTS `training` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Training_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Listage des données de la table next-session.training : ~4 rows (environ)
/*!40000 ALTER TABLE `training` DISABLE KEYS */;
INSERT INTO `training` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
	('14f3482b-b429-489b-9818-9d5414bd46aa', 'Graphic Design', '2024-05-03 12:44:07.632', '2024-05-03 12:44:07.632'),
	('457c3159-7699-4c1f-82a9-5abcc805ef85', 'Comptability', '2024-05-03 12:44:07.637', '2024-05-03 12:44:07.637'),
	('47652a23-93ee-41ec-97db-413fe06a5478', 'Web development', '2024-05-03 12:44:07.626', '2024-05-03 12:44:07.626'),
	('a27b432f-1899-481f-814f-c87a55e9c7a4', 'Computer Science', '2024-05-03 12:44:07.618', '2024-05-03 12:44:07.618');
/*!40000 ALTER TABLE `training` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
