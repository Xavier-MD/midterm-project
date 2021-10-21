
DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items(
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255)NOT NULL,
  description VARCHAR(255),
  price NUMERIC(10,2),
  sold BOOLEAN DEFAULT FALSE,
  seller_id INT REFERENCES users(id) ON DELETE CASCADE,
  buyer_id INT REFERENCES users(id) ON DELETE CASCADE,
  product_photo_url VARCHAR(255),
  collection_name VARCHAR(255)
);
