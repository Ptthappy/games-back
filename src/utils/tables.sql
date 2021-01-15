CREATE TABLE deal (
  internal_name VARCHAR(100),
  title VARCHAR(100),
  metacritic_link VARCHAR(100),
  deal_id VARCHAR(100),
  store_id INTEGER,
  game_id INTEGER,
  sale_price NUMERIC(20, 2),
  normal_price NUMERIC(20, 2),
  is_on_sale BOOLEAN,
  savings NUMERIC(10, 2),
  metacritic_score INTEGER,
  steam_rating_text VARCHAR(30),
  steam_rating_percent INTEGER,
  steam_rating_count INTEGER,
  steam_app_id INTEGER,
  release_date INTEGER,
  last_change INTEGER,
  deal_rating NUMERIC(5, 1),
  thumb VARCHAR(300),
  PRIMARY KEY(deal_id)
);

CREATE TABLE game (
  game_id INTEGER,
  steam_app_id INTEGER,
  cheapest NUMERIC (10, 2),
  cheapest_deal_id VARCHAR(100),
  external_name VARCHAR(100),
  internal_name VARCHAR(100),
  thumb VARCHAR(300),
  PRIMARY KEY(game_id)
);

CREATE TABLE auth_user (
  google_id VARCHAR(50),
  email VARCHAR(100),
  firstname VARCHAR(40),
  lastname VARCHAR(40),
  name VARCHAR(80),
  image_url VARCHAR(300),
  PRIMARY KEY (google_id)
);