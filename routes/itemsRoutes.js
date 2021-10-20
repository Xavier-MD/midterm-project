module.exports = function(router, database) {

  router.get('/', (req, res) => {
    //console.log("query = " + JSON.stringify(req.query));
    database.getAllItems(req.query, 20)
      .then(items => { res.send({ items }); })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  router.post('/', (req, res) => {
    //const userId = req.session.userId;
    database.addItem({ ...req.body })
      .then(items => {
        res.send(items);
      })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  router.delete('/:id', (req, res) => {
    database.removeItem(req.params.id, 20)
      .then(items => { res.send({ items }); })
      .catch(e => {
        console.error(e);
        res.send(e)
      });
  });

  return router;
}
