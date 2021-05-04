CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    bio_detail TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    category VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author_id INTEGER REFERENCES authors (id) NOT NULL,
    category_id INTEGER REFERENCES categories (id) NOT NULL,
    title VARCHAR(255) NOT NULL,
    summary VARCHAR(255) NOT NULL,
    content text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);

-------------------------------------------------------
-- CREATE TABLE customers (
--     id SERIAL PRIMARY KEY,
--     full_name TEXT
-- );
------------------------------------------------------
-- CREATE TABLE orders (
--     order_id SERIAL,
--     dish_name TEXT,
--     customer_id INTEGER
-- );
------------------------------------------------------
-- CREATE TABLE orders (
--     order_id SERIAL,
--     dish_name TEXT,
--     customer_id INTEGER REFERENCES customers (id)
-- );
--OR
-- ALTER TABLE orders
--     ADD CONSTRAINT fk_orders_customers FOREIGN KEY (customer_id) REFERENCES customers (id);
--------------------------------------------------------