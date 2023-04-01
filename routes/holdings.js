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

    console.log(tickerData);

    req.excel = tickerData;

    next();
  } catch(error) {
    console.log('ERRORRRRRR');
    next(error);
  }
}

router
  .route('/')
  .get([testMiddleware], function(req, res) {
    console.log('End of router');
    res.send(req.excel)
  })

export default router;
