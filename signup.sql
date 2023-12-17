create database signup;

use signup;

CREATE TABLE login (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL unique,
    password VARCHAR(255) NOT NULL
);

select * from login;
    
DROP table login;


-- example
INSERT INTO login (name, email, password)
VALUES ('Kartik M', 'kartikmalaganavar19@gmail.com', 'hashed_password');
