import express from 'express';
import fs from 'fs/promises';

const router = express.Router();

const importHoldings = async function(req, res, next) {
  try {
    const data = await fs.readFile('prices.json', 'utf8');
    const holdingsData = JSON.parse(data);
    console.log(holdingsData);

    req.holdingsData = holdingsData;


    next();
  } catch(error) {
    next(error);
  }
}

router
  .route('/')
  .get([importHoldings], function(req, res) {
    res.send(req.holdingsData)
  })

export default router;
