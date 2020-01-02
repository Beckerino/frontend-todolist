<template>
  <div class="concluido row justify-center">
    <div class="header col-12">
      <div class="row justify-center">
        <q-img :src="mainIcon" style="width:90px" />
      </div>
      <div style="padding: 25px 0px">
        <q-separator />
      </div>
      <div class="row justify-center">
        <span class="text-bold">
          Pagamento realizado com sucesso
        </span>
      </div>
    </div>
    <div class="body row justify-center">
      <div class="subtitulo row justify-between">
        <div class="col-10">
          <div class="text-body1 text-bold">
            Comprovante de Pagamento
          </div>
          <div class="text-subtitle">
            Número do pedido de pagamento:
            <span class="text-green text-bold">{{ numeropagamento }}</span>
          </div>
        </div>
        <div class="col-2 imprimir">
          <q-btn label="Imprimir" />
        </div>
      </div>
      <div class="detalhes col-12 row justify-left">
        <div
          v-for="(item, index) in payment.travel"
          v-bind:key="index"
          class="row justify-left item col-12"
        >
          <span class="text-caption col-12">Detalhes da viagem</span>
          <div class="col-9">
            <div class="row text-bold items-center">
              {{ item.origin }}
              <q-icon name="arrow_forward" style="margin:0 10px;" />
              {{ item.destiny }}
            </div>
            <div v-if="item.departure" class="text-grey text-caption">
              Data de partida:
              {{ FormataHora(item.departure.date) }}
            </div>
            <div v-if="item.arrival" class="text-grey text-caption">
              Data da chegada:
              {{ FormataHora(item.arrival.date) }}
            </div>
          </div>
          <div class="text-bold col-3 poltrona">
            Poltrona: {{ item.poltrona ? item.poltrona : "POLTRONA" }}
          </div>
        </div>
        <div class="clientes text-caption" style="padding: 15px 0 0 15px;">
          <div>
            <div class="text-bold">
              Passageiros
            </div>
            <div
              v-for="(item, index) in payment.travel"
              v-bind:key="index"
              style="padding: 7px 0;color:#707070;"
            >
              <div class="text-capitalize">{{ item.passenger.name }}</div>
              <div>
                {{ item.passenger.document_type }}:
                {{ item.passenger.document }}
              </div>
              <div>
                Nº do bilhete: {{ item.ticket ? item.ticker : "BILHETE" }}
              </div>
            </div>
          </div>
          <div>
            <div class="text-bold">Informações do Cliente</div>
            <div style="color:#707070;padding-bottom:15px;">
              <div>{{ payment.customer.name }}</div>
              <div>CPF:{{ payment.customer.cpf }}</div>
              <div>Documento: {{ payment.customer.document }}</div>
              <div>Telefone: {{ payment.customer.phone }}</div>
              <div>{{ FormataEndereco(payment.customer.address) }}</div>
            </div>
          </div>
          <div style="padding-bottom:15px;">
            <div>Valor do pagamento</div>
            <div>R$ {{ payment.amount }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters(["payment"])
  },
  name: "concluido",
  created() {
    this.VerificaPago();
  },
  data() {
    return {
      numeropagamento: "",
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
      mainIcon: require("../assets/eucatur@2x.png")
    };
  },
  methods: {
    ...mapActions(["act_get_pagamento_status"]),
    VerificaPago() {
      let self = this;
      this.act_get_pagamento_status(this.payment.reference_payment).then(
        function(response) {
          self.numeropagamento = response.data.payment_id;
        }
      );
    },
    FormataEndereco(address) {
      let res = "";
      res =
        address.street +
        ", " +
        address.number +
        " - " +
        address.neighborhood +
        ", " +
        address.city +
        "-" +
        address.state +
        " - " +
        address.zip_code;
      return res;
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
    }
  }
};
</script>
<style scoped>
.concluido {
  color: #005328;
}
.header {
  padding: 15px 0 30px 0;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 25px #efefef;
  border: 1px solid #ecedf3;
  opacity: 1;
}
@media screen and (max-width: 700px) {
  .imprimir {
    display: none;
  }
  .body {
    text-align: left;
    max-width: 400px;
    padding: 0 60px;
  }
  .poltrona {
    width: 250px;
  }
}
@media screen and (min-width: 699px) {
  .body {
    max-width: 700px;
  }
}
.body {
  margin-bottom: 50px;
}
.item {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 25px #ebebeb;
  border: 1px solid #ecedf3;
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 15px;
  width: 700px;
}

.conteudo-main {
  background-color: #fafafa;
}
</style>
