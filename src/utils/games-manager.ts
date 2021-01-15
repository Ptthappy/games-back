const gamesModel = require('../models/games-model');
import logger = require('../utils/logger');
const axios = require('axios');

const getData = async () => {
  try {
    const games = await axios.get('https://www.cheapshark.com/api/1.0/games?title=batman')
    // console.log(games)
    await gamesModel.createGames(games.data);
    const deals = await axios.get('https://www.cheapshark.com/api/1.0/deals')
    // console.log(deals)
    await gamesModel.createDeals(deals.data);
  } catch(e) {
    logger.info('gamesManager.getDatabaseData error: ' + e);
  }
}

const clearDB = async () => {
  try {
    await gamesModel.clearDB();
  } catch(e) {
    logger.info('gamesManager.clearDB error: ' + e);
  }
}

module.exports = { getData, clearDB }