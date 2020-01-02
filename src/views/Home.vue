<template>
  <div class="home">
    <notifications group="foo" position="top center" />
    <loading :active.sync="loading" :can-cancel="false"></loading>
    <div
      v-if="indisponivel"
      class="text-h5 text-center row items-center justify-center"
    >
      Este link já não está mais disponivel
    </div>
    <transition name="modal">
      <div v-if="showModal" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <slot name="header">
                <div class="row justify-start items-center">
                  <div>
                    <q-btn
                      class="text-bold"
                      icon="keyboard_arrow_left"
                      v-on:click="showModal = false"
                      flat
                    />
                  </div>
                  <div class="text-subtitle1 text-bold">
                    Detalhes da viagem
                  </div>
                </div>
              </slot>
              <slot name="body">
                <div class="row justify-center">
                  <div
                    v-for="(item, index) in payment.travel"
                    v-bind:key="index"
                    class="item"
                    style="width:350px;"
                  >
                    <div style="color:#024C20;">Detalhes de viagem</div>
                    <div class="stepper row justify-center">
                      <viagem
                        :origin="item.origin"
                        :destiny="item.destiny"
                        :Saida="item.departure"
                        :Chegada="item.arrival"
                      />
                    </div>
                    <div v-if="item.departure" class="text-grey text-caption">
                      Data de partida:
                      {{ FormataHora(item.departure.date) }}
                    </div>
                    <q-separator />
                    <div v-if="item.arrival" class="text-grey text-caption">
                      Data da chegada:
                      {{ FormataHora(item.arrival.date) }}
                    </div>

                    <div class="text-bold text-green">
                      Poltrona:
                      {{ item.poltrona ? item.poltrona : "POLTRONA" }}
                    </div>
                  </div>
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div v-if="disponivel" class="header">
      <div class="row justify-center">
        <q-img :src="mainIcon" style="width:90px" />
      </div>
      <div style="padding: 25px 0px">
        <q-separator />
      </div>
      <div class="row justify-center">
        Total a pagar
        <span class="text-green text-bold"> : R$ {{ payment.amount }} </span>
      </div>
    </div>
    <div v-if="disponivel" class="row justify-center">
      <div class="body" style="max-width:400px">
        <div class="row items-center" style="padding-top: 15px">
          <div class="col-7 text-subtitle1 ">Deseja pagar com?</div>
          <div class=" col-5 text-grey">
            Ambiente Seguro<q-icon name="locked" style="color: grey" />
          </div>
        </div>
        <div class="row q-gutter-xs justify-center">
          <credito class="col-6" />
          <debito class="col-5" />
        </div>
      </div>
      <div v-if="payment.customer" class="body" style="max-width:400px">
        <div class="col-8 text-subtitle1 padd15top">
          Detalhes e informações
        </div>
        <div class="item row" style="min-width:300px;">
          <span class="text-bold text-body1 col-12">
            {{ payment.customer.name }}
          </span>
          <span v-if="payment.customer.cpf" class="text-body1 col-12">
            CPF: {{ payment.customer.cpf }}
          </span>
          {{ FormataEndereco(payment.customer.address) }}
          <span class="text-body1 col-12"> </span>
        </div>
        <div class="row padd15top">
          <q-btn
            v-on:click="showModal = true"
            class="col-12 text-center"
            label="Ver detalhes da viagem"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import viagem from "./Canvas.vue";
import debito from "./debito.vue";
import credito from "./credito.vue";
import VueLoading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  created() {
    this.act_get_payment(this.token);
    this.intervalo = setInterval(this.Disponivel, 2000);
  },
  name: "home",
  components: {
    credito,
    debito,
    viagem,
    Loading: VueLoading
  },
  computed: {
    ...mapGetters(["payment"])
  },
  props: {
    token: {
      type: String
      // default:
      //   "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJwYXltZW50X2NyZWF0ZWRfYXQiOiIyMDIwLTAxLTAyIDE1OjQyOjAwIiwicGF5bWVudF9leHBpcmF0aW9uX3Rva2VuIjoiMWgiLCJwYXltZW50X3Nob3BfaWQiOiI5NjRlNmE5Ni04MjY5LTQwYmUtYmIwMi04Y2YzZGZkMzI1YTgiLCJyZWZlcmVuY2VfcGF5bWVudCI6IlBZYWUxYjQ5YmVhZTMzNGU5YmE5NzFlMWQ3YTNmODkyMmMifQ.TZTUdvTSFyBva9qwHI_-igoDlkbkigMZoYNBTLnDlZj837KiiT0BeZ32jUcnh332"
    }
  },
  mounted() {},
  data() {
    return {
      mes: [
        "Janeiro",
        "Fevereiro",
        "Março",
        "Abril",
        "Maio",
        "Junho",
        "Julho",
        "Agosto",
        "Setembro",
        "Outubro",
        "Novembro",
        "Dezembro"
      ],
      showModal: false,
      disponivel: false,
      indisponivel: false,
      loading: true,
      intervalo: null,
      mainIcon: require("../assets/eucatur@2x.png")
    };
  },
  methods: {
    ...mapActions(["act_get_payment"]),
    Disponivel() {
      if (this.payment.token) {
        this.disponivel = true;
        this.loading = false;
        this.FormataDados();
        clearInterval(this.intervalo);
      } else {
        setTimeout(this.cancelar, 10000);
      }
    },
    cancelar() {
      this.loading = false;
      this.indisponivel = true;
      clearInterval(this.intervalo);
    },
    pagamentoCredito() {
      this.$router.push("/pagamento");
    },
    pagamentoDebito() {
      this.$router.push("/pagamento");
    },
    FormataHora(date) {
      let res;

      let hora = date.getUTCHours();
      let min = date.getMinutes();
      if (String(hora).length == 1) {
        hora = "0" + hora;
      }
      if (String(min).length == 1) {
        min = "0" + min;
      }
      res =
        date.getDay() +
        " de " +
        this.mes[date.getUTCMonth()] +
        " de " +
        date.getFullYear() +
        " as " +
        hora +
        ":" +
        min;
      return res;
    },
    FormataDados() {
      for (let index = 0; index < this.payment.travel.length; index++) {
        this.payment.travel[index].departure = this.FormataData(
          this.payment.travel[index].date_time_departure
        );
        this.payment.travel[index].arrival = this.FormataData(
          this.payment.travel[index].date_time_arrivals
        );
      }
    },
    FormataData(data) {
      let resultado = {};
      let date = new Date(data);
      resultado.date = date;
      resultado.year = date.getFullYear();
      resultado.month = date.getUTCMonth();
      resultado.day = date.getDay();
      resultado.hour = date.getUTCHours();
      resultado.minutes = date.getMinutes();
      return resultado;
    },
    FormataEndereco(address) {
      let res =
        address.street +
        ", " +
        address.number +
        " - " +
        address.neighborhood +
        " - " +
        address.city +
        "-" +
        address.state +
        " - " +
        address.zip_code;
      return res;
    }
  }
};
</script>
<style scoped>
.header {
  padding: 15px 0 30px 0;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 25px #efefef;
  border: 1px solid #ecedf3;
  opacity: 1;
}
.body {
  padding: 0 25px;
}
.item {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 25px #ebebeb;
  border: 1px solid #ecedf3;
  border-radius: 8px;
}
.conteudo-main {
  background-color: #fafafa;
}
.padd15 {
  padding: 15px;
}
.padd15top {
  padding: 15px 0;
}
.padd15left {
  padding: 0 15px;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 100%;
  height: 100%;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
