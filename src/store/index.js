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
    act_nova(payload) {
      Vue.http.post(URL + "/new" + payload).then(response => {
        this.act_atividades();
        console.log(response.body);
      });
    },
    act_atividades({ commit }) {
      Vue.http.get(URL + "/get").then(response => {
        commit("mut_atividades", response.body);
      });
    },
    act_deletar(payload) {
      Vue.http.del(URL + "/delete/" + payload).then(response => {
        //RESPONSAVEL POR ENVIAR AO USUARIO MENSAGEM OK
        console.log(response.body);
      });
    }
  },
  getters: {
    get_atividades: state => {
      return state.Atividades;
    }
  }
});
