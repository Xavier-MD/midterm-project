module.exports = function(router, database) {

  router.get('/items', (req, res) => {
    //console.log("query = " + JSON.stringify(req.query));
    database.getAllItems(req.query, 20)
    .then(items => { res.send({items});})
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.post('/items', (req, res) => {
    //const userId = req.session.userId;
    database.addItem({...req.body})
      .then(items => {
        res.send(items);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  router.delete('/items/:id', (req, res) => {
    database.removeItem(req.params.id, 20)
    .then(items => { res.send({items});})
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.post('/messages', (req, res) => {
    //const userId = req.session.userId;
    console.log(req.body);
    database.addMessage(req.body)
      .then(messages => {
        res.send(messages);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  router.get('/favourites', (req, res) => {
    //const userId = req.session.userId;
    database.getAllFavourites()
      .then(favourites => {
        res.send(favourites);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  router.post('/favourites', (req, res) => {
    //const userId = req.session.userId;
    database.addFavourite({...req.body})
      .then(favourite => {
        res.send(favourite);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  router.delete('/favourites/:id', (req, res) => {
    database.removeFavourite(req.params.id, 20)
    .then(items => { res.send({items});})
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  return router;
}
