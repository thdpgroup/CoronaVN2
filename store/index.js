import axios from '@/plugins/axios'

export const state = () => ({
  templates: null
})

export const mutations = {
  saveTemplates(state, data) {
    state.templates = data
  }
}

export const getters = {
  
}

export const actions = {
  async fetchTemplates({commit, state}) {
    if(Array.isArray(state.templates) && state.templates.length) return state.templates
    try {
      console.log('1');
      const url = "api/templates";
      const res = await axios.get(url);

      
      res.data.data.forEach(function(item) {
        if(item.case > 0) {
          item.color = item.case > 20 ? 2 : 1;
        }
      });

      commit('saveTemplates', res.data.data);
      return res
    } catch(e) {
      throw e
    }
  }
}
