import Event from './Events.model';

const getEvents = async (req, res) => {
  const pageCursor = req.query.cursor;

  try {
    const entities = await Event.list({ start: pageCursor });
    res.json(entities);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getEvent = async (req, res) => {
  const eventId = req.params.id;

  try {
    const entity = await Event.get(eventId);
    res.json(entity.plain());
  } catch (err) {
    res.status(400).json(err);
  }
};

const createEvent = async (req, res) => {
  const entityData = Event.sanitize(req.body);
  const event = new Event(entityData);

  try {
    const entity = await event.save();
    res.json({ success: true });
  } catch (err) {
    res.status(400).json(err);
  }
};

export default {
  getEvents,
  getEvent,
  createEvent,
};
