const express = require('express');
const redis = require('../redis');
const router = express.Router();

const configs = require('../util/config')
const todos_count = require('../util/todos_count');

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

/* GET added_todos listing. */
router.get('/statistics', async (_, res) => {
  const added_todos = await todos_count();
  res.send({ added_todos });
});

module.exports = router;
