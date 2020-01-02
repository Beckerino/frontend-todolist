import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
Vue.use(Vuex);

const URL = "https://pag-link-back.herokuapp.com:9000";
const config = {
  auth: {
    username: "testeapipagamento",
    password: "testeapipagamentohom@@"
  }
};
export default new Vuex.Store({
  state: {
    payment: {},
    form_payment: {},
    logado: false
  },
  mutations: {
    mut_get_payment(state, payload) {
      state.payment = payload;
    },
    mut_get_form_payment(state, payload) {
      state.form_payment = payload;
    },
    mut_logado(state, payload) {
      state.logado = payload;
    }
  },
  actions: {
    act_post_formtoken({ commit }, payload) {
      void commit;
      return Axios.post(URL + "/pay", payload, config);
    },
    act_get_payment(context, payload) {
      Axios.get(URL + "/pay/bylink/" + payload)
        .then(function(response) {
          context.commit("mut_get_payment", response.data.payment);
          if (response.data.payment == null) {
            Vue.notify({
              group: "foo",
              type: "error",
              title: "Este token já foi utilizado ou não está mais disponível!"
            });
          } else {
            context.commit("mut_logado", true);
          }
        })
        .catch(function(error) {
          var err = error.response.data.return_payment.returns;
          Vue.notify({
            group: "foo",
            duration: 9000,
            type: err.status,
            title: err.message.text
          });
        });
    },
    act_post_payment(context, request) {
      if (request.method == "DEBIT") {
        Axios.post(URL + "/pay", request, config).then(function(response) {
          let data = response.data.form_request_payment;
          let form_payment = {};
          form_payment.formToken = data.form_token;
          form_payment.public_key_js = data.public_key_js;
          form_payment.url_client_js = data.url_client_js;
          context.commit("mut_get_form_payment", form_payment);
        });
      } else {
        return Axios.post(URL + "/pay", request, config);
      }
    },
    act_get_pagamento_status(context, request) {
      void context;
      return Axios.get(URL + "/pay/" + request, config);
    }
  },
  modules: {},
  getters: {
    payment: state => {
      return state.payment;
    },
    form_payment: state => {
      return state.form_payment;
    },
    logado: state => {
      return state.logado;
    }
  }
});
