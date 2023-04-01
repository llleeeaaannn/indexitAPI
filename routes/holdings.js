import express from 'express';
import XLSX from 'xlsx';

const router = express.Router();

const testMiddleware = async function(req, res, next) {
  try {

    const workbook = XLSX.readFile('spyholdings.xlsx');

    const sheetName = workbook.SheetNames[0];

    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);

    const tickerData = data.slice(3, data.length - 6);

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
        }
      };
    });

    req.data = formattedData;

    next();
  } catch(error) {
    next(error);
  }
}

router
  .route('/')
  .get([testMiddleware], function(req, res) {
    res.send(req.data)
  })

export default router;
