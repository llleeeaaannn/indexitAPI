import express from 'express';

const router = express.Router();

const importHoldings = async function(req, res, next) {
  try {
    const data = await fs.readFile('prices.json', 'utf8');
    stocks = JSON.parse(data);
    console.log(stocks);

    req.stocks = stocks;


    next();
  } catch(error) {
    next(error);
  }
}

router
  .route('/')
  .get([importHoldings], function(req, res) {
    res.send(req.stocks)
  })

export default router;
