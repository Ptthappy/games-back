import { Request, Response } from 'express';
import { QueryResult } from 'pg';
const gamesModel = require('../models/games-model');
import logger = require('../utils/logger');

export const getGames = async (req: Request, res: Response) => {
  let result: QueryResult;
  try {
    result = await gamesModel.getGames();
    res.status(200).json(result);
  } catch (error) {
      logger.error(`games controller error: ${error.message}`);
      res.status(500).json({status:'error', message: error.message, statusCode: 500});
  }
}

export const getDeals = async (req: Request, res: Response) => {
  let result: QueryResult;
  try {
    result = await gamesModel.getDeals();
    res.status(200).json(result);
  } catch (error) {
      logger.error(`games controller error: ${error.message}`);
      res.status(500).json({status:'error', message: error.message, statusCode: 500});
  }
}