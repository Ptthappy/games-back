module.exports = {
  getGames: 'SELECT * FROM game',
  getDeals: 'SELECT * FROM deal',
  deleteGames: 'DELETE FROM game',
  deleteDeals: 'DELETE FROM deal',
  createGame: 'INSERT INTO game (game_id, steam_app_id, cheapest, cheapest_deal_id, external_name, internal_name, thumb) VALUES ($1, $2, $3, $4, $5, $6, $7)',
  createDeal: 'INSERT INTO deal (internal_name, title, metacritic_link, deal_id, store_id, game_id, sale_price, normal_price, is_on_sale, savings, metacritic_score, steam_rating_text, steam_rating_percent, steam_rating_count, steam_app_id, release_date, last_change, deal_rating, thumb) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)',
  getUser: 'SELECT * FROM auth_user WHERE google_id = $1',
  registerUser: 'INSERT INTO auth_user (google_id, email, lastname, firstname, name, image_url) VALUES ($1, $2, $3, $4, $5, $6)'
};