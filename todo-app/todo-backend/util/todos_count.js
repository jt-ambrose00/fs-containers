const redis = require('../redis');

/* Keep track of the number of todos added. */
const todos_count = async () => {
  const added_todos = Number(await redis.get('added_todos'));
  return added_todos;
};

module.exports = todos_count;
