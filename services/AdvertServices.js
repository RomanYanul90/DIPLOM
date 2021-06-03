import mysql from 'mysql';
import config from '../config/default.json';

const db = mysql.createConnection({
  ...config.dataBaseConfig,
});

// eslint-disable-next-line max-len
const createAdvert2 = async (title, description, category, price, created, userName, ownerId) => new Promise((resolve, reject) => {
  // eslint-disable-next-line max-len
  db.query('INSERT INTO adverts (title, description, category, price, created, ownerUserName, ownerId) VALUES (?,?,?,?,?,?,?)',
    [title, description, category, price, created, userName, ownerId], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
});

const getAllAdverts2 = async () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM adverts', (err, result) => {
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
});

const getAdvertById2 = async (id) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM adverts WHERE id = ?', [id], (err, result) => {
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
});

const getCurrentUserAdverts = async (ownerId) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM adverts WHERE ownerId = ?', [ownerId], (err, result) => {
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
});

const getAdvertsByOwnerName = async (owner) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM adverts WHERE ownerUserName = ?', [owner], (err, result) => {
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
});

const findAdvertByTitle = async (title) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM adverts WHERE title = ?', [title], (err, result) => {
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
});

const editAdvert = async (id, updates) => new Promise((resolve, reject) => {
  if (updates.views) {
    db.query('UPDATE adverts SET views = ? WHERE id = ?',
      [updates.views, id], (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result);
      });
    return;
  }
  db.query('UPDATE adverts SET title = ?, description = ?, category = ?, price = ?, modified = ? WHERE id =?',
    [updates.title, updates.description, updates.category, updates.price, updates.modified, id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
});

const deleteAdvert = async (id) => new Promise((resolve, reject) => {
  db.query('DELETE FROM adverts WHERE id = ?',
    [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
});

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
