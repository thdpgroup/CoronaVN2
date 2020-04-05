import axios from '@/plugins/axios'
import people from './peolple'

export const state = () => ({
  provinces: null
})

export const mutations = {
  saveProvinces(state, data) {
    state.provinces = data
  }
}

export const getters = {
  
}

export const actions = {
  async fetchProvinces({commit, state}) {
    if(Array.isArray(state.provinces) && state.provinces.length) return state.provinces
    try {
      const res = await axios.get('api/city/getprovinces');
      res.data.data.forEach(function(item) {
        if(item.case > 0) {
          item.color = item.case > 20 ? 2 : 1;
        }
      });

      commit('saveProvinces', res.data.data);
      return res
    } catch(e) {
      throw e
    }
  }
}

export const modules = {
  people
}