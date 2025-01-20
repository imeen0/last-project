const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, 'secret'); // Replace 'secret' with your secure key
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error('Authentication failed');
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = { authenticate };
