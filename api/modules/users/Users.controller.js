import User from './Users.model';

const getUsers = (req, res) => {
  const pageCursor = req.query.cursor;

  User.list({ start: pageCursor })
    .then(entities => {
      res.json(entities);
    })
    .catch(err => res.status(400).json(err));
};

const getUser = (req, res) => {
  const userId = +req.params.id;
  User.get(userId)
    .then(entity => {
      res.json(entity.plain());
    })
    .catch(err => res.status(400).json(err));
};

const createUser = (req, res) => {
  const entityData = User.sanitize(req.body);
  const user = new User(entityData, 123);

  user
    .save()
    .then(entity => {
      res.json(entity.plain());
    })
    .catch(err => {
      // If there are any validation error on the schema
      // they will be in this error object
      res.status(400).json(err);
    });
};

const updateUser = (req, res) => {
  const userId = +req.params.id;
  const entityData = User.sanitize(req.body); // { email: 'john@snow.com' }

  /**
   * This will fetch the entity, merge the data and save it back to the Datastore
   */
  User.update(userId, entityData)
    .then(entity => {
      res.json(entity.plain());
    })
    .catch(err => {
      // If there are any validation error on the schema
      // they will be in this error object
      res.status(400).json(err);
    });
};

const deleteUser = (req, res) => {
  const userId = +req.params.id;
  User.delete(userId)
    .then(response => {
      res.json(response);
    })
    .catch(err => res.status(400).json(err));
};

export default {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
