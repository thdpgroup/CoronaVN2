import axios from '@/plugins/axios'

export default {
    cityWriteFile(params) {
        return axios.post('api/city/writeFile', params )
          },
    getProvinces() {
      return axios.get('api/city/getprovinces')
    }

    }

