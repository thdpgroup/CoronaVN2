const { Router } = require('express')

const router = Router()


const cityApi = require('../server/node/api/city');

const users = [
    { name: 'Alexandre' },
    { name: 'Pooya' },
    { name: 'Sébastien' }
  ]
  
  /* GET users listing. */
router.get('/city/getprovinces', function (req, res, next) {
res.json(users);
})
  
router.get('/city/get', cityApi.getProvinces); // R
module.exports = router;
