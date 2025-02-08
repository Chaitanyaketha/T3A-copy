const bcrypt = require('bcryptjs');
const { generateAccessToken, generateRefreshToken } = require('../../utils/jwtConfig');
const knex = require('knex');
const knexConfig = require('../../../knexfile');
const logger = require('../../../logger');

const db = knex(knexConfig.development);

const loginUser = async (identifier, password) => {
  try {
    const user = await db('users')
      .where('email', identifier)
      .orWhere('username', identifier)
      .first();

    if (!user) {
      logger.warn(`Login failed: User with identifier ${identifier} not found.`);
      throw new Error('User not found.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      logger.warn(`Login failed: Invalid password for user ${identifier}.`);
      throw new Error('Invalid password.');
    }

    const token = generateAccessToken({
      name: user.username,
      email: user.email,
      id: user.user_id,
    });
    const rtoken = generateRefreshToken({
      name: user.username,
      email: user.email,
      id: user.user_id,
    });

    logger.info(`User ${user.username} logged in successfully.`);
     console.log(rtoken);
    return {
      token,
      rtoken,
      user: {
        name: user.username,
        email: user.email,
        id: user.user_id,
      },
    };
  } catch (error) {
    logger.error(`Error logging in user ${identifier}: ${error.message}`);
    console.log("Invalid Credentials");
    // window.alert("Invalid Credentials");
    logger.warn(`Login attempt failed for user: ${identifier}. Invalid credentials.`);
    throw new Error(error.message);
  }
};

module.exports = { loginUser };
