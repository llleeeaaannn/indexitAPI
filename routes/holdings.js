import express from 'express';

const router = express.Router();

const testMiddleware = async function(req, res, next) {
  try {
    console.log('TESTING');
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
    res.send('RESPONSE SENT')
  })

export default router;
