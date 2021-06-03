import { check } from 'express-validator';

export const advertValidationParams = [
  check('title', 'Invalid title').isLength({ min: 4, max: 50 }),
  check('description', 'Invalid description.').isAlpha(),
  check('category', 'Invalid last name length.').isAlpha(),
  check('price', 'Invalid last name length.').isNumeric(),
];

export const userValidationParams = [
  check('email', 'Invalid email').isEmail(),
  check('firstName', 'Invalid first name length.').isLength({ min: 2, max: 20 }),
  check('firstName', 'First name field should contain only letters.').isAlpha(),
  check('lastName', 'Invalid last name length.').isLength({ min: 2, max: 20 }),
  check('lastName', 'Last name field should contain only letters.').isAlpha(),
  check('userName', 'Invalid user name length.').isLength({ min: 4, max: 20 }),
  check('phone', 'Invalid phone input').isMobilePhone('any'),
  check('password', 'Invalid password length').isLength({ min: 8 }),
];

export const loginValidationParams = [
  check('email', 'Invalid email').normalizeEmail().isEmail(),
  check('password', 'Invalid password').exists(),
];
