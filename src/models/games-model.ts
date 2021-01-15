const pool = require('../utils/db');
const queries = require('../utils/queries');
// import { Game } from '../utils/interfaces';
import logger = require('../utils/logger');

const getGames = async () => {
  const client = await pool.connect();
  try {
    const games = await client.query(queries.getGames, []);
    return games.rows.map((g: any) => ({
      gameId: g.game_id,
      steamAppID: g.steam_app_id,
      cheapest: g.cheapest,
      cheapestDealID: g.cheapest_deal_id,
      external: g.external_name,
      internal: g.internal_name,
      thumb: g.thumb
    }));
  } catch(e) {
    throw Error(e);
  } finally {
    client.release();
  }
};

const getDeals = async () => {
  const client = await pool.connect();
  try {
    const deals = await client.query(queries.getDeals, []);
    return deals.rows.map((d: any) => ({
      internalName: d.internal_name,
      title: d.title,
      metacriticLink: d.metacritic_link,
      dealId: d.deal_id,
      storeId: d.store_id,
      gameId: d.game_id,
      salePrice: d.sale_price,
      normalPrice: d.normal_price,
      isOnSale: d.is_on_sale,
      savings: d.savings,
      metacriticScore: d.metacritic_score,
      steamRatingText: d.steam_rating_text,
      steamRatingPercent: d.steam_rating_percent,
      steamRatingCount: d.steam_rating_count,
      steamAppID: d.steam_app_id,
      releaseDate: d.release_date,
      lastChange: d.last_change,
      dealRating: d.deal_rating,
      thumb: d.thumb,
    }));
  } catch(e) {
    throw Error(e);
  } finally {
    client.release();
  }
};

const clearDB = async () => {
  const client = await pool.connect();
  try {
    await client.query(queries.deleteGames, []);
    await client.query(queries.deleteDeals, []);
    logger.info('Base de datos limpiada con éxito');
  } catch(e) {
    logger.info('Ocurrió un error mientras se limpiaba la base de datos: ' + e);
  }
}

const createGames = async (games: Array<any>) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    games.forEach(async (g) => {
      await client.query(queries.createGame, [g.gameID, g.steamAppID, g.cheapest, g.cheapestDealID, g.external, g.internalName, g.thumb]);
    });

    await client.query('COMMIT');
    logger.info('Juegos creados con éxito');
  } catch(e) {
    logger.info('Ocurrió un error mientras se creaban los juegos en la base de datos: ' + e);
    client.query('ROLLBACK');
  } finally {
    client.release();
  }
}

const createDeals = async (deals: Array<any>) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    deals.forEach(async (d) => {
      await client.query(queries.createDeal,
        [d.internalName, d.title, d.metacriticLink, d.dealID, d.storeID, d.gameID,
          d.salePrice, d.normalPrice, d.isOnSale, d.savings, d.metacriticScore,
          d.steamRatingText, d.steamRatingPercent, d.steamRatingCount, d.steamAppID,
          d.releaseDate, d.lastChange, d.dealRating, d.thumb
        ])
    });

    await client.query('COMMIT');
    logger.info('Ofertas creadas con éxito');
  } catch(e) {
    logger.info('Ocurrió un error mientras se creaban los juegos en la base de datos: ' + e);
    client.query('ROLLBACK');
  } finally {
    client.release();
  }
}

module.exports = { getGames, getDeals, clearDB, createGames, createDeals };