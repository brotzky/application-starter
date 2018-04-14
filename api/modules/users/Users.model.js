import gstore from 'gstore-node';
const store = gstore();
const { Schema } = store;

/**
 * Create the schema for the User Model
 */
const userSchema = new Schema({
  firstname: { type: 'string', required: true },
  lastname: { type: 'string', optional: true },
  email: { type: 'string', validate: 'isEmail', required: true },
  createdOn: {
    type: 'string',
    default: store.defaultValues.NOW,
    write: false,
    read: false,
  },
  dateOfBirth: { type: 'datetime' },
  bio: { type: 'string', excludeFromIndexes: true },
  website: { validate: 'isURL', optional: true },
});

/**
 * Export the User Model
 * It will generate "User" entity kind in the Datastore
 */
const User = store.model('User', userSchema);

export default User;
