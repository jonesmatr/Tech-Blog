CREATE DATABASE IF NOT EXISTS cms_blog;

USE cms_blog;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Similarly, you'd have CREATE TABLE statements for posts and comments.
