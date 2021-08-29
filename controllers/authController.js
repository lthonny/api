const models = require("../../models/index");
const User = models.User;

const { hashPassword, jwtToken, comparePassword } = require('../../utils/index');

const auth = {
  async signUp(req, res, next) {
    try {
      const { name, email, password } = req.body;
      const hash = hashPassword(password);
      const user = await User.create({ name, email, password: hash });
      const token = jwtToken.createToken(user);
      const { id } = user;
      return res.status(201).send({ token, user: { id, name, email } });
    } catch (e) {
      return next(new Error(e));
    }
  },

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (user && comparePassword(password, user.password)) {
        const { name, id } = user;
        const token = jwtToken.createToken(user);

        const expiresIn = jwtToken.veriFyToken(token).iat;
        return res.status(200).send({ token, expiresIn });
      }
      return res.status(400).send({ error: 'invalid email/password combination ' });
    } catch (e) {
      return next(new Error(e));
    }
  },

}

module.exports = auth;
