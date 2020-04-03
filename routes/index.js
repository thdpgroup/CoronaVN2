const { Router } = require('express')

const router = Router()

const cityApi = require('../server/node/api/city');
  /* GET users listing. */
router.get('/city/getprovinces', cityApi.getProvinces)
module.exports = router;
