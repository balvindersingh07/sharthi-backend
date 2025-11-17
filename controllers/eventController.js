import Event from '../models/Event.js';
import Stall from '../models/Stall.js';

export const getAllEvents = async (req, res) => {
  const { city, tags } = req.query;
  let q = {};
  if (city) q.cityId = city;
  if (tags) q.tags = { '': tags.split(',') };

  const events = await Event.find(q);

  res.json(events.map(e => ({
    id: e._id,
    title: e.title,
    cityId: e.cityId,
    startAt: e.startAt,
    endAt: e.endAt,
    categoryTagsCsv: e.tags.join(',')
  })));
};

export const getEventById = async (req, res) => {
  const e = await Event.findById(req.params.id);
  if (!e) return res.status(404).json({ message: 'Not found' });

  res.json({
    id: e._id,
    title: e.title,
    cityId: e.cityId,
    startAt: e.startAt,
    endAt: e.endAt,
    description: e.description,
    categoryTagsCsv: e.tags.join(','),
    ratingAvg: null,
    ratingCount: null
  });
};

export const getEventStalls = async (req, res) => {
  const stalls = await Stall.find({ eventId: req.params.id });
  res.json(stalls.map(s => ({
    id: s._id,
    name: s.name,
    tier: s.tier,
    price: s.price,
    qtyTotal: s.qtyTotal,
    qtyLeft: s.qtyLeft,
    specs: s.specs
  })));
};

export const createEvent = async (req, res) => {
  const e = await Event.create({
    ...req.body,
    organizerId: req.user._id
  });
  res.json(e);
};
