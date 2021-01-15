const pool = require('../utils/db');
const queries = require('../utils/queries');
// import { Game } from '../utils/interfaces';
import logger = require('../utils/logger');

const getUser = async (googleId: string) => {
  const client = await pool.connect();
  try {
    const user = await client.query(queries.getUser, [googleId]);
    return user.rows.map((g: any) => ({
      googleId: g.google_id,
      email: g.email,
      name: g.name,
      imageUrl: g.image_url,
    }));
  } catch(e) {
    throw Error(e);
  } finally {
    client.release();
  }
};

const registerUser = async (user: any) => {
  const client = await pool.connect();
  console.log(user)
  try {
    await client.query(queries.registerUser, [user.googleId, user.email, user.familyName, user.givenName, user.name, user.imageUrl]);
    logger.info('Usuario registrado con éxito');
  } catch(e) {
    logger.info('Ocurrió un error mientras se creaba el usuario en la base de datos: ' + e);
  } finally {
    client.release();
  }
}
module.exports = { getUser, registerUser };