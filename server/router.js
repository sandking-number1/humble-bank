const router = require('express').Router();
const {
  getTransaction,
  postTransaction,
  deleteTransaction,
  putRequest,
} = require('./controllers/index');

router.get('/transaction', getTransaction);
router.post('/transaction', postTransaction);
router.delete('/transaction/:id', deleteTransaction);
router.put('/transaction/:id', putRequest);

module.exports = router;
