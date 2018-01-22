-- Create database
DROP DATABASE IF EXISTS mybatistutdb;
CREATE DATABASE mybatistutdb;
USE mybatistutdb;

-- Add user
-- Uncomment the lines below as needed
-- DROP USER 'mybatistut'@'localhost';
-- CREATE USER 'mybatistut'@'localhost' IDENTIFIED BY 'mybatistut';
-- GRANT ALL PRIVILEGES ON mybatistutdb.* TO 'mybatistut'@'localhost';

--  Build tables
DROP TABLE IF EXISTS `village`;
CREATE TABLE `village` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL DEFAULT NULL,
	`district` VARCHAR(50) NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO `village` (name, district)
    VALUES ( 'Detroit', 'Northern');

DROP TABLE IF EXISTS `car`;
CREATE TABLE `car` (
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`make` VARCHAR(50) NULL DEFAULT NULL,
	`model` VARCHAR(50) NULL DEFAULT NULL,
	PRIMARY KEY (`id`)
);

INSERT INTO `car` (make, model)
	VALUES ('Toyota', 'Tacoma');
INSERT INTO `car` (make, model)
	VALUES ('Jeep', 'Grand Cheerokee');
INSERT INTO `car` (make, model)
	VALUES ('Renault', 'Clio');

DROP TABLE IF EXISTS `driver`;
CREATE TABLE `driver`(
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`fName` VARCHAR(50) NULL DEFAULT NULL,
	`lName` VARCHAR(50) NULL DEFAULT NULL,
	`carId` INT(10) DEFAULT 0 UNIQUE,
	FOREIGN KEY (`carId`)
		REFERENCES `car` (`id`),
	PRIMARY KEY (`id`)
);

INSERT INTO `driver` (fName, lName, carId)
	VALUES ('Ricky', 'Bobby', 1);
INSERT INTO `driver` (fName, lName, carId)
	VALUES ('Cal', 'Naughton Jr', 2);
INSERT INTO `driver` (fName, lName, carId)
	VALUES ('Jean', 'Girard', 3);

DROP TABLE IF EXISTS `race`;
CREATE TABLE `race`(
	`id` INT(10) NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(50) NULL,
	PRIMARY KEY(`id`)
);

INSERT INTO `race` (name)
	VALUES ('Indy 500');
INSERT INTO `race` (name)
	VALUES ('Brickyard 400');

DROP TABLE IF EXISTS `race_driver`;
CREATE TABLE `race_driver`(
	`driver_id` INT(10) NOT NULL,
	`race_id` INT(10) NOT NULL,
	FOREIGN KEY (`driver_id`)
		REFERENCES `driver` (`id`),
	FOREIGN KEY (`race_id`)
		REFERENCES `race` (`id`)
);

INSERT INTO `race_driver`(driver_id, race_id)
	VALUES (1,1);
INSERT INTO `race_driver`(driver_id, race_id)
	VALUES (2,1);
INSERT INTO `race_driver`(driver_id, race_id)
	VALUES (3,1);
INSERT INTO `race_driver`(driver_id, race_id)
	VALUES (1,2);
INSERT INTO `race_driver`(driver_id, race_id)
	VALUES (2,2);

-- DROP TABLE IF EXISTS `mechanic`;
-- CREATE TABLE `mechanic`(
-- 	`id` INT(10) NOT NULL AUTO_INCREMENT,
-- 	`fName` VARCHAR(50) NOT NULL,
-- 	`lName` VARCHAR(50) NOT NULL,
-- 	`carId` INT(10) NULL DEFAULT NULL,
-- 	FOREIGN KEY (`carId`)
-- 		REFERENCES `car` (`id`),
-- 	PRIMARY KEY (`id`)
-- );
--
-- INSERT INTO `mechanic` (fName, lName, carId)
-- VALUES ('Bob', 'Bobbers', 1);
-- INSERT INTO `mechanic` (fName, lName, carId)
-- VALUES ('Jim', 'Jimmers', 2);
-- INSERT INTO `mechanic` (fName, lName, carId)
-- VALUES ('Dick', 'Dickers', 3);
--
-- INSERT INTO `mechanic` (fName, lName, carId)
-- VALUES ('Rob', 'Robbers', 1);
-- INSERT INTO `mechanic` (fName, lName, carId)
-- VALUES ('Slim', 'Slimmers', 2);
-- INSERT INTO `mechanic` (fName, lName, carId)
-- VALUES ('Rick', 'Rickers', 3);
