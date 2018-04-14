import gstore from 'gstore-node';
const store = gstore();
const { Schema } = store;

/**
 * Create the schema for the User Model
 */
const eventScheme = new Schema({
  event: { type: 'string', required: true },
  timestamp: {
    type: 'string',
    default: store.defaultValues.NOW,
    write: false,
    read: false,
  },
  page: {
    url: { type: 'string', required: true },
    path: { type: 'string', required: true },
    loadtime: { type: 'int', optional: true },
    duration: { type: 'int' },
    title: { type: 'string' },
  },
  user: {
    id: { type: 'string', unique: true },
    age: { type: 'int', optional: true },
    location: { type: 'string', optional: true },
    email: { type: 'string', optional: true },
    firstName: { type: 'string', optional: true },
    lastName: { type: 'string', optional: true },
    language: { type: 'string', optional: true },
    gender: { type: 'string', optional: true },
  },
  application: {
    id: { type: 'string', unique: true },
    state: { type: 'string', optional: true },
    step: { type: 'string', optional: true },
    productName: { type: 'string', optional: true },
    productCategory: { type: 'string', optional: true },
  },
  technology: {
    window: {
      height: { type: 'int', optional: true },
      width: { type: 'int', optional: true },
    },
    device: {
      type: { type: 'string', optional: true },
      name: { type: 'string', optional: true },
    },
    browser: { type: 'string', optional: true },
    os: { type: 'string', optional: true },
    ip: {
      type: 'string',
      optional: true,
      validate: {
        rule: 'isIP',
        args: [4],
      },
    },
    userAgent: { type: 'string', optional: true },
  },
  version: { type: 'string', default: '1.0' },
});

const Event = store.model('Event', eventScheme);

export default Event;
