module.exports = function(router, database) {

  router.get('/item', (req, res) => {
    //console.log("query = " + JSON.stringify(req.query));
    database.getAllItems(req.query, 20)
    .then(items => { res.send({items});})
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });


  router.post('/item', (req, res) => {
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

  router.post('/message', (req, res) => {
    //const userId = req.session.userId;
    console.log(req.body);
    database.addMessage({...req.body})
      .then(messages => {
        res.send(messages);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  router.post('/favourite', (req, res) => {
    const userId = req.session.userId;
    database.favourite({...req.body, user_id: userId})
      .then(favourite => {
        res.send(favourite);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
}
