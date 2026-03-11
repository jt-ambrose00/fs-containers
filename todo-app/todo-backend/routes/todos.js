const express = require('express');
const { Todo } = require('../mongo')
const redis = require('../redis');
const router = express.Router();

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({})
  res.send(todos);
});

/* Keep track of the number of todos added. */
const todos_count = async () => {
  const added_todos = Number(await redis.get('added_todos'));
  return added_todos;
};

/* GET added_todos listing. */
router.get('/statistics', async (_, res) => {
  const added_todos = await todos_count();
  res.send({ added_todos });
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false
  })

  const added_todos = await todos_count();
  await redis.set('added_todos', added_todos +1);
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params
  req.todo = await Todo.findById(id)
  if (!req.todo) return res.sendStatus(404)

  next()
}

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.deleteOne()  
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo)
});

/* PUT todo. */
singleRouter.put('/', async (req, res) => {
  await req.todo.updateOne({
    text: req.body.text,
    done: req.body.done
  })

  req.todo.text = req.body.text
  req.todo.done = req.body.done
  res.send(req.todo)
});

router.use('/:id', findByIdMiddleware, singleRouter)


module.exports = router;
