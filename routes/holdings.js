import express from 'express';
import XLSX from 'xlsx';

const router = express.Router();

const getHoldings = async function(req, res, next) {
  try {

    const workbook = XLSX.readFile('spyholdings.xlsx');

    const sheetName = workbook.SheetNames[0];

    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);

    const tickerData = data.slice(3, data.length - 6);

    req.tickerData = tickerData;

    next();
  } catch(error) {
    next(error);
  }
}

const formatHoldings = async function(req, res, next) {
  try {

    const tickerData = req.tickerData;

    const formattedData = tickerData.map(item => {
      const ticker = item['SPDR® S&P 500® ETF Trust'];
      return {
        [ticker]: {
          ticker: ticker,
          name: item['Fund Name:'],
          weight: item['__EMPTY_2'],
          sedol: item['__EMPTY_1'],
          identifier: item['__EMPTY'],
          shares: item['__EMPTY_4'],
          sector: item['__EMPTY_3'],
          price: Math.floor(Math.random() * (250 - 50 + 1) + min)
        }
      };
    });

    req.formattedData = formattedData;

    next();
  } catch(error) {
    next(error);
  }
}

router
  .route('/')
  .get([getHoldings, formatHoldings], function(req, res) {
    res.send(req.formattedData)
  })

export default router;
