import axios from '@/plugins/axios'

export default {
    writeFile(params) {
        return axios.post('api/patient/writeFile', params )
          },
    getPatients() {
      return axios.get('api/patient/getpatients')
    }

    }

