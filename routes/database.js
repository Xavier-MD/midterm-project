
const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/**
 * Get a user by their email address
 * @param {*} email
 * @returns found user or undefined
 */
const getUserWithEmail = function(email) {
  return pool.query(`
    SELECT *
    FROM users
    WHERE email = $1
  `, [email])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Add a new user
 * @param {*} user
 * @returns newly created user
 */
const addUser = function(user) {

  return pool.query(`
    INSERT INTO users (name, email, password,admin)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `, [user.name, user.email, user.password, user.admin])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((err) => {
      console.log("addUser error = " + err.message);
    });
};

/**
 * Return all items (with filter if given)
 * @param {*} options
 * @param {*} limit
 * @returns all items, possibly filtered
 */
const getAllItems = function(options, limit = 10) {
  const queryParams = [];

  // Start query
  let queryString = `SELECT * FROM items `;

  // Filter for minimum price
  if (options.minPrice) {
    queryParams.push(`${options.minPrice}`);
    queryString += `WHERE price > $${queryParams.length} `;
  }

  // Filter for maximum price
  if (options.maxPrice) {
    queryParams.push(`${options.maxPrice}`);
    queryString += `WHERE price < $${queryParams.length} `;
  }

  // Finish query
  queryParams.push(limit);
  queryString += `
  LIMIT $${queryParams.length};
  `;

  // Debugging only
  //console.log(queryString, queryParams);

  // Execute query and return result as a promise
  return pool
    .query(queryString, queryParams)
    .then((result) => {
      return result.rows;
    });
};

/**
 * Add a new item
 * @param {} item
 * @returns newly created item
 */
const addItem = function(item) {

  return pool.query(`
    INSERT INTO items (
    name ,
    description ,
    price ,
    sold ,
    seller_id ,
    buyer_id ,
    product_photo_url ,
    collection_name)
    VALUES ($1, $2, $3, $4, $5 ,$6 , $7, $8)
    RETURNING *;
  `, [item.name, item.description, item.price, item.sold, item.seller_id, item.buyer_id, item.product_photo_url, item.collection_name])
    .then((result) => {
      return (result.rows[0]);
    });
};

/**
 * Remove an item by id
 * @param {*} item
 * @returns
 */
const removeItem = function(itemId) {
  return pool.query(`DELETE FROM items
  WHERE id =$1;
  `, [itemId])
    .then((result) => {
      return (result.rows);
    })
    .catch((err) => {
      console.log("removeItem error = " + err.message);
    });
};


/**
 * Add a new message
 * @param {*} message
 * @returns newly created message
 */
const addMessage = function(message) {
  let date = new Date().toLocaleDateString();
  return pool.query(`
    INSERT INTO messages (sender_id ,
    recipient_id ,
    text ,
    date)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `, [message.sender_id, message.recipient_id, message.text, date])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((err) => {
      console.log("addMessage error = " + err.message);
    });
};

/**
 * Return all favourites for the user logged in
 * @returns
 */
const getAllFavourites = function() {
  return pool.query(`SELECT * FROM favourites;
  `)
    .then((result) => {
      return (result.rows);
    })
    .catch((err) => {
      console.log("getAllFavourites error = " + err.message);
    });
};

/**
 * Add a favourite item for the user
 * @param {*} favourite
 * @returns
 */
const addFavourite = function(favourite) {
  return pool.query(`
    INSERT INTO favourites (
    item_id,
    user_id)
    VALUES ($1, $2)
    RETURNING *;
  `, [favourite.item_id, favourite.user_id])
    .then((result) => {
      return (result.rows[0]);
    })
    .catch((err) => {
      console.log("addFavourite error = " + err.message);
    });
};

/**
 * Remove a favourite item for the user
 * @param {} favourite
 * @returns
 */
const removeFavourite = function(favouriteId) {
  return pool.query(`DELETE FROM favourites
  WHERE id=$1;
  `, [favouriteId])
    .then((result) => {
      return (result.rows);
    })
    .catch((err) => {
      console.log("removeFavourite error = " + err.message);
    });
};

exports.addItem = addItem;
exports.getAllItems = getAllItems;
exports.removeItem = removeItem;
exports.addUser = addUser;
exports.getUserWithEmail = getUserWithEmail;
exports.addMessage = addMessage;
exports.addFavourite = addFavourite;
exports.removeFavourite = removeFavourite;
exports.getAllFavourites = getAllFavourites;

/*
getUserWithEmail('betty@gmail.com')
.then(user => console.log(user));

addUser({name:'Ted', email:'ted@ted.com', password:'', admin:true})
.then(user => console.log(user));

getAllItems({})
  .then(results => {
    for (r of results) {
      console.log(r);
    }
  });

getAllItems({minPrice: 11.00})
  .then(results => {
    for (r of results) {
      console.log(r);
    }
  });

getAllItems({maxPrice: 40.00})
  .then(results => {
    for (r of results) {
      console.log(r);
    }
  });

let addObj = {
  name : 'shoes',
  description : 'some nice shoes',
  price : 10.45,
  sold : false,
  seller_id : 1,
  buyer_id : null ,
  product_photo_url : 'https://images.app.goo.gl/zpzDMsfo8NiRdB6D7'
};

addItem(addObj)
.then(result => console.log(result));

addMessage({sender_id: 1, recipient_id: 2, text: 'hello there!'})
.then(result => console.log(result));

addFavourite({ item_id: 2, user_id: 2 })
  .then(result => console.log(result));

removeFavourite({ item_id: 2, user_id: 2})
  .then(result => console.log(result));

removeItem({
  id: 7
})
.then(result => console.log(result));

pool.end();
*/
