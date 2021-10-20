module.exports = function (router, database) {

  router.get('/', (req, res) => {
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

  router.post('/', (req, res) => {
    //const userId = req.session.userId;
    database.addFavourite({ ...req.body })
      .then(favourite => {
        res.send(favourite);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  router.delete('/:id', (req, res) => {
    database.removeFavourite(req.params.id, 20)
      .then(items => { res.send({ items }); })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
}
