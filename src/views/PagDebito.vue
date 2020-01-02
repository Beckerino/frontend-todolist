<template>
  <div class="pagdebito row justify-center items-center">
    <notifications group="foo" position="top center" />
    <loading :active.sync="loading" :can-cancel="false"></loading>
    <div class="mask">
      <div class="header row justify-between">
        <div class="row items-center">
          <q-btn
            class=""
            icon="keyboard_arrow_left"
            v-on:click="showModal = true"
            flat
          />
          Cartão de Débito
        </div>
        <div class="row text-grey items-center">
          Ambiente Seguro <q-icon name="locker" style="color:grey;" />
        </div>
      </div>
      <q-separator />
      <div class="row justify-center">
        <div
          id="formulario"
          class="container kr-embedded row justify-center"
          :kr-form-token="form_payment.formToken ? form_payment.formToken : ''"
        >
          <!-- payment form fields -->
          <div class="row col-12 field">
            Numero do Cartão
            <div class="kr-pan kr-item col-12"></div>
          </div>
          <div class="row col-6 field">
            Validade
            <div class="kr-expiry kr-item col-12"></div>
          </div>
          <div class="row col-6 field">
            CVV
            <div class="kr-security-code col-12 kr-item"></div>
          </div>

          <!-- payment form submit button -->
          <div class="footer row justify-center">
            <q-separator class="col-12" />
            <div class="text-center" style="padding:15px;">
              Total a pagar:
              <span style="color:green"> R$ {{ payment.amount }}</span>
            </div>
            <div
              class="text-caption text-grey text-center"
              style="padding:15px;"
            >
              <q-separator />
              Ao clicar em pagar, você concorda com os
              <span class="text-bold" @click="onSubmit()">
                termos de uso
              </span>
              e a
              <span class="text-bold" @click="onSubmit()">
                Política de Privacidade
              </span>
            </div>
            <div class="col-8 row justify-center" style="cursor: pointer;">
              <button id="krButton" class="kr-payment-button">
                Pagar
              </button>
            </div>
          </div>

          <!-- error zone -->
          <div class="kr-form-error"></div>
        </div>
      </div>
    </div>
    <transition name="modal">
      <div v-if="showModal" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <slot name="header">
                <div class="row justify-left items-center">
                  Tem certeza ?
                </div>
              </slot>
              <slot name="body">
                A saida desta forma de pagamento implicará no cancelamento da
                compra.
                <div class="row justify-between" style="margin-top:15px;">
                  <q-btn
                    color="green"
                    class="col-5"
                    label="Ficar"
                    @click="showModal = false"
                  />
                  <q-btn color="red" class="col-5" label="Voltar" tp="/home" />
                </div>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import Payzen from "../Payzen";
import { mapGetters, mapActions } from "vuex";

export default {
  created() {
    this.CriaMetodo();
    this.act_post_payment(this.request);
    this.LimpaScript();
    this.checagem = setInterval(this.VerificaPagamento, 2000);
  },
  computed: {
    ...mapGetters(["payment", "form_payment"])
  },
  mounted() {},
  name: "pagdebito",
  data() {
    return {
      request: {},
      showModal: false,
      checagem: null,
      loading: true
    };
  },
  async beforeDestroy() {
    clearInterval(this.checagem);
  },
  methods: {
    ...mapActions(["act_post_payment", "act_get_pagamento_status"]),
    CriaMetodo() {
      this.request = this.payment;
      this.request.method = "DEBIT";
    },
    VerificaPagamento() {
      let self = this;
      this.act_get_pagamento_status(this.payment.reference_payment).then(
        function(response) {
          let data = response.data.returns;
          if (data.status == "Aprovado") {
            self.loading = false;
            clearInterval(self.checagem);
            self.$router.push("/concluido");
            return;
          }
          if (data.status == "Recusado") {
            self.loading = false;
            self.msg("error", data.message.text, "");
            clearInterval(self.checagem);
          }
        }
      );
    },
    async LimpaScript() {
      let self = this;
      const array = document.querySelectorAll("script");
      await array.forEach(element => {
        if (element.getAttribute("kr-public-key")) {
          element.remove();
        }
        if (element.src === this.form_payment.url_client_js) {
          element.remove();
        }
      });
      setTimeout(self.InserirScript, 2000);
    },
    InserirScript() {
      let self = this;
      Payzen.loadScript(
        this.form_payment.url_client_js,
        this.form_payment.public_key_js
      ).then(function() {
        self.VerificaScript();
      });
    },
    msg(tipo, titulo, mensagem) {
      this.$notify({
        group: "foo",
        type: tipo,
        title: titulo,
        text: mensagem
      });
    },
    onSubmit() {},
    async VerificaScript() {
      let pub, src;
      const array = document.querySelectorAll("script");
      await array.forEach(element => {
        if (element.getAttribute("kr-public-key")) {
          pub = true;
        }
        if (element.src === this.form_payment.url_client_js) {
          src = true;
        }
      });
      if (pub && src) {
        this.loading = false;
        return;
      } else {
        this.LimpaScript();
      }
    }
  }
};
</script>
<style lang="css" scoped>
.mask {
  max-width: 700px;
}
.kr-payment-button {
  display: true;
  background-color: green;
  color: white;
  border-radius: 3px;
  padding: 10px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: 0;
  width: 50vw;
  max-width: 500px;
  margin-bottom: 20px;
}
.kr-item {
  display: true;
  padding: 10px;
  border-radius: 4px;
  color: black;
  background: #ffffff 0% 0% no-repeat padding-box;
  border: 1px solid #e3e3e3;
  margin-bottom: 5px;
}

@media screen and (min-width: 700px) {
  .mask {
    top: 100px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 25px #efefef;
    border: 1px solid #ecedf3;
    border-radius: 20px;
    padding: 0 0 22px 0;
  }
  .container {
    padding: 0 15px 0 15px;
  }
}

@media screen and (max-width: 700px) {
  .header {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 25px #efefef;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    height: 80px;
    width: 100%;
  }
  .container {
    padding: 90px 15px 140px 15px;
  }
  .footer {
    position: fixed;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 25px #efefef;
    left: 0;
    bottom: 50px;
    height: 140px;
  }
}
.header {
  padding: 15px 22px;
}
.container {
  max-width: 500px;
}
.field {
  padding: 10px 5px;
  background: #ffffff 0% 0% no-repeat padding-box;
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
  max-width: 350px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  border-radius: 15px;
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
