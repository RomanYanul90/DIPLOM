import bcrypt from 'bcryptjs';
import mysql from 'mysql';
import config from '../config/default.json';

const db = mysql.createConnection({
  ...config.dataBaseConfig,
});

const createUser2 = async (firstName, lastName, userName, email, phone, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO users (firstName, lastName, userName, email, phone, password) VALUES (?,?,?,?,?,?)',
    [firstName, lastName, userName, email, phone, hashedPassword],
  );
};

const loginUser2 = async (email) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
});

const getAllUsers2 = async () => new Promise((resolve, reject) => {
  db.query('SELECT * FROM users', (err, result) => {
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
});

const getUserById2 = async (id) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM users WHERE id = ?', [id], (err, result) => {
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
});

const getUserByUserName2 = async (userName) => new Promise((resolve, reject) => {
  db.query('SELECT * FROM users WHERE userName = ?', [userName], (err, result) => {
    if (err) {
      return reject(err);
    }
    resolve(result);
  });
});

const editUser2 = async (id, updates) => new Promise((resolve, reject) => {
  db.query('UPDATE users SET firstName = ?, lastName = ?, userName = ?, email = ?, phone = ? WHERE id = ?',
    [updates.firstName, updates.lastName, updates.userName, updates.email, updates.phone, id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
});

const deleteUser2 = async (id) => new Promise((resolve, reject) => {
  db.query('DELETE FROM users WHERE id = ?',
    [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
});

export default {
  createUser2,
  loginUser2,
  getAllUsers2,
  getUserById2,
  getUserByUserName2,
  editUser2,
  deleteUser2,
};
