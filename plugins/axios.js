import axios from 'axios'

export default axios.create({
  baseURL: process.env.BASE_URL || 'http://ec2-174-129-61-159.compute-1.amazonaws.com:3000'
})