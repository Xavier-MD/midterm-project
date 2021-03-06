// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");

const database = require('./routes/database');

//cookie Parser
const cookieSession = require('cookie-session');

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));
app.use(express.json());

// API endpoint - /api/user
const userRoutes = require("./routes/userRoutes");
const userRouter = express.Router();
userRoutes(userRouter, database);
app.use('/api/users', userRouter);

// API endpoint - /api/items
const itemsRoutes = require("./routes/itemsRoutes");
const itemsRouter = express.Router();
itemsRoutes(itemsRouter, database);
app.use('/api/items', itemsRouter);

// API endpoint - /api/favourites
const favouritesRoutes = require("./routes/favouritesRoutes");
const favouritesRouter = express.Router();
favouritesRoutes(favouritesRouter, database);
app.use('/api/favourites', favouritesRouter);

// API endpoint - /api
const apiRoutes = require("./routes/apiRoutes");

//contact Route
const contactRoutes = require("./routes/contactRoutes");
app.use(contactRoutes);

//login Route
const loginRoute = require("./routes/loginRoute");
app.use(loginRoute);

//delete Route

const deleteRoute = require('./routes/deleteRoutes');
app.use(deleteRoute);

const apiRouter = express.Router();
apiRoutes(apiRouter, database);
app.use('/api', apiRouter);

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// app.use("/api/users", usersRoutes(db));
// app.use("/api/api", apiRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  const templateVars = { user: req.session.user_id };
  res.render("index", templateVars);
});
app.get("/login", (req, res) => {
  const templateVars = { user: req.session.user_id };
  res.render("login", templateVars);
});

app.get("/search", (req, res) => {
  const templateVars = { user: req.session.user_id };
  res.render("search", templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
