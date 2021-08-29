const models = require("../models/index");
const UserModel = models.User;
const bcrypt = require('bcryptjs');
const tokenService = require('./token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
  async sign_up(name, email, password) {
    const candidate = await UserModel.findOne({ where: { email } });

    if (candidate) {
      throw ApiError.BadRequest(`User with mailing address ${email} already exists`);
    }

    const hashPassword = await bcrypt.hash(password, 3);
    const user = (await UserModel.create({ name, email, password: hashPassword })).get();

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...user });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async sign_in(email, password) {
    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest('User was not found');
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest('Incorrect password');
    }

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthorizedError();
    }

    const user = await UserModel.findOne({ where: { id: userData.id } });

    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(user, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }


}

module.exports = new UserService();
