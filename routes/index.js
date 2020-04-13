const { Router } = require('express')

const router = Router()

const cityApi = require('../server/node/api/city');
const patientApi = require('../server/node/api/patient')
  /* GET users listing. */
router.get('/city/getprovinces', cityApi.getProvinces)
router.post('/city/writeFile', cityApi.writeFile)
router.get('/patient/getpatients', patientApi.getPatients)
router.post('/patient/writeFile', patientApi.writeFile)
module.exports = router;
