
DROP TABLE IF EXISTS favourites CASCADE;
CREATE table favourites (
  item_id INT REFERENCES items(id) ON DELETE CASCADE,
  user_id INT REFERENCES users(id) ON DELETE CASCADE
);
