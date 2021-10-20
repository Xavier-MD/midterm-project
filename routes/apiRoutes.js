module.exports = function (router, database) {

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

  return router;
}
