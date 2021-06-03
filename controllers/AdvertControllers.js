import { validationResult } from 'express-validator';
import Services from '../services/AdvertServices';

const createAdvert2 = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Invalid values in create advert fields.',
      });
    }

    const {
      title, description, category, price, created, userName,
    } = req.body;
    const ownerId = req.user.userId;

    const advert = await Services.createAdvert2(title, description, category, price, created, userName, ownerId);
    res.status(201).json({ advert });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getAllAdverts2 = async (req, res) => {
  try {
    const adverts = await Services.getAllAdverts2();
    res.json(adverts);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getAdvertById2 = async (req, res) => {
  try {
    const { id } = req.params;
    const advert = await Services.getAdvertById2(id);
    res.json(advert);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getCurrentUserAdverts = async (req, res) => {
  try {
    const ownerId = req.user.userId;
    const adverts = await Services.getCurrentUserAdverts(ownerId);
    res.json(adverts);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getAdvertsByOwnerName = async (req, res) => {
  try {
    const { owner } = req.params;
    const adverts = await Services.getAdvertsByOwnerName(owner);
    res.json(adverts);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const findAdvertByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const adverts = await Services.findAdvertByTitle(title);
    res.json(adverts);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const editAdvert = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const advert = await Services.editAdvert(id, updates);
    res.json(advert);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const deleteAdvert = async (req, res) => {
  try {
    const { id } = req.params;
    const advert = await Services.deleteAdvert(id);
    res.json(advert);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export default {
  createAdvert2,
  getAllAdverts2,
  getAdvertById2,
  getCurrentUserAdverts,
  getAdvertsByOwnerName,
  findAdvertByTitle,
  editAdvert,
  deleteAdvert,
};
