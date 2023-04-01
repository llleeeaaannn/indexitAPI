import express from 'express';

const router = express.Router();

const testMiddlewear = async function(req, res, next) {
  try {
    console.log('TESTING')
  } catch(error) {
    console.log('ERRORRRRRR');
    next(error);
  }
}
