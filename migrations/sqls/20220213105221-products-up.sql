CREATE TABLE products (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    price VARCHAR(255) NOT NULL,
    category VARCHAR(255)
);