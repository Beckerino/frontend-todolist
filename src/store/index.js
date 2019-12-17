import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const URL = "https://backend-atividades.herokuapp.com";
// const URL = "http://localhost:9000";
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
    // eslint-disable-next-line no-unused-vars
    act_post_atividade({ commit }, payload) {
      Vue.http.post(URL + "/new", payload).then(response => {
        Vue.notify({
          group: "foo",
          title: response.data.message
        });
      });
    },
    act_get_atividade({ commit }) {
      Vue.http.get(URL + "/get").then(response => {
        commit("mut_atividades", response.body);
        Vue.notify({
          group: "foo",
          title: response.data.message
        });
      });
    },
    act_update_atividade(payload) {
      Vue.http.del(URL + "/update/" + payload).then(response => {
        this.act_atividades();
        Vue.notify({
          group: "foo",
          title: response.data.message
        });
      });
    },
    act_del_atividade(payload) {
      Vue.http.del(URL + "/delete/" + payload).then(response => {
        this.act_atividades();
        Vue.notify({
          group: "foo",
          title: response.data.message
        });
      });
    }
  },
  getters: {
    get_atividades: state => {
      return state.Atividades;
    }
  }
});
