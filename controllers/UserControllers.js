import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import config from '../config/default.json';
import Services from '../services/UserServices';

const createUser2 = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: 'Invalid user register data.' });
    }

    const {
      firstName, lastName, userName, email, phone, password,
    } = req.body;

    try {
      await Services.createUser2(firstName, lastName, userName, email, phone, password);
    } catch (e) {
      console.log(e);
      return res.status(400).json({ message: 'User with the same name or email already exist.' });
    }

    res.status(201).json({ message: 'User created' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const loginUser2 = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), message: 'Invalid log in data.' });
    }
    const { email, password } = req.body;

    const [user] = await Services.loginUser2(email);

    if (!user) {
      return res.status(400).json({ message: 'User dose not exist.' });
    }

    const isPasswordsMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordsMatch) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    const token = jwt.sign(
      { userId: user.id },
      config.jwtSecret,
      { expiresIn: '1h' },
    );

    res.json({ token, userId: user.id });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getAllUsers2 = async (req, res) => {
  try {
    const users = await Services.getAllUsers2();
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getUserById2 = async (req, res) => {
  const { id } = req.params;
  console.log('id', id);
  try {
    const user = await Services.getUserById2(id);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const getUserByUserName2 = async (req, res) => {
  const { userName } = req.params;
  console.log('userName', userName);
  try {
    const user = await Services.getUserByUserName2(userName);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const user = await Services.editUser(id, updates);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await Services.deleteUser(id);
    res.json(user);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

export default {
  createUser2,
  loginUser2,
  getAllUsers2,
  getUserById2,
  getUserByUserName2,
  editUser,
  deleteUser,
};
