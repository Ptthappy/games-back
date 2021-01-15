import { Request, Response } from 'express';
const userModel = require('../models/user-model');
import logger = require('../utils/logger');

export const login = async (req: Request, res: Response) => {
  const body = req.body;
  try {
    const user = await userModel.getUser(body.googleId);
    if(Object.keys(user).length === 0) {
      console.log(body);
      await userModel.registerUser(req.body);
      res.status(200).json({
        status: 'ok',
        statusCode: 200,
        message: 'Usuario registrado satisfactoriamente'
      });
    } else {
      res.status(200).json({
        status: 'ok',
        statusCode: 200,
        message: 'Usuario logeado satisfactoriamente'
      });
    }
  } catch (error) {
      logger.error(`login controller error: ${error.message}`);
      res.status(500).json({status:'error', message: error.message, statusCode: 500});
  }
}