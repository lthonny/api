const validator = require('validator');
const models = require("./.././models");
const User = models.User;

const validateAuth = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!validator.isEmail) {
    return res.status(400).send({ error: 'invalid email address' });
  }
  if (!email) {
    return res.status(400).send({ error: 'email is required' });
  }
  if (!name) {
    return res.status(400).send({ error: 'name is required' });
  }
  if (!password) {
    return res.status(400).send({ error: 'password is required' });
  }
  const user = await User.findOne({ where: { email } });
  if (user) {
    return res.status(409).send({ error: 'user exist already' });
  }
  next();
}

module.exports = validateAuth;
