import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const URL = "https://backend-atividades.herokuapp.com";

export default new Vuex.Store({
  state: {
    Atividades: []
  },
  mutations: {
    mut_atividades(state, payload) {
      return (state.Atividades = payload);
    }
  },
  actions: {
    act_post_atividade(payload) {
      Vue.http.post(URL + "/new" + payload).then(response => {
        this.act_atividades();
        return response;
      });
    },
    act_get_atividade({ commit }) {
      Vue.http.get(URL + "/get").then(response => {
        commit("mut_atividades", response.body);
      });
    },
    act_update_atividade(payload) {
      Vue.http.del(URL + "/update/" + payload).then(response => {
        this.act_atividades();
        return response;
      });
    },
    act_del_atividade(payload) {
      Vue.http.del(URL + "/delete/" + payload).then(response => {
        this.act_atividades();
        return response;
      });
    }
  },
  getters: {
    get_atividades: state => {
      return state.Atividades;
    }
  }
});
