CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username  VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
 );

 INSERT INTO users(username,email) VALUES
 ('Shravani','shravani@gmail.com'),
 ('Shravani1','shravani1@gmail.com'),
 ('Shravani2','shravani2@gmail.com');

 SELECT * FROM users;