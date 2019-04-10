DROP DATABASE IF EXISTS devour_db;

CREATE DATABASE devour_db;

USE devour_db;

CREATE TABLE devour (
	id int NOT NULL AUTO_INCREMENT,
	food VARCHAR(255) NOT NULL,
    devoured BOOLEAN NOT NULL,
	PRIMARY KEY (id)
);