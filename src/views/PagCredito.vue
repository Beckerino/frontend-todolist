<template>
  <div class="pagcredito row justify-center items-center">
    <notifications group="foo" position="top center" />
    <loading :active.sync="loading" :can-cancel="false"></loading>
    <div class="mask">
      <div class="header row justify-between">
        <div class="row items-center">
          <q-btn
            class=""
            icon="keyboard_arrow_left"
            v-on:click="voltar()"
            flat
          />
          Cartão de Crédito
        </div>
        <div class="row text-grey items-center">
          Ambiente Seguro <q-icon name="locker" style="color:grey;" />
        </div>
      </div>
      <q-separator />
      <q-form
        ref="formCC"
        @submit="onSubmit()"
        @reset="onReset()"
        class="row justify-center"
      >
        <div class="container row  justify-center" style="margin:0 50px;">
          <div class="field col-6">
            Bandeira
            <q-select
              outlined
              v-model="credit_card.brand"
              :options="bandeiras"
              :rules="[val => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="field col-6">
            Qtd de Parcelas
            <q-select
              v-model="credit_card.installments"
              :options="parcelas"
              outlined
            />
          </div>
          <div class="field col-12">
            Numero do Cartão
            <q-input
              v-model="credit_card.numero"
              outlined
              placeholder="0000 0000 0000 0000"
              mask="#### #### #### ####"
              :rules="[val => val.length >= 18 || 'Campo obrigatório']"
            />
          </div>
          <div class="field col-6">
            Validade do Cartão
            <q-input
              v-model="credit_card.expiry"
              outlined
              placeholder="00/0000"
              mask="##/####"
              :rules="[val => val.length >= 7 || 'Campo obrigatório']"
            />
          </div>
          <div class="field col-6">
            Código de Segurança
            <q-input
              v-model="credit_card.cvv"
              outlined
              placeholder="CVV"
              mask="###"
              :rules="[val => val.length >= 3 || 'Campo obrigatório']"
            />
          </div>
          <div class="field col-12">
            Nome impresso no cartão
            <q-input
              v-model="credit_card.holder_name"
              outlined
              :rules="[val => !!val || 'Campo obrigatório']"
            />
          </div>
          <div class="text-bold text-body1 col-12">
            Endereço de cobrança
          </div>
          <div class="col-12">
            Selecione um endereço ou cadastre um novo
            <q-select
              outlined
              class="col-12"
              v-model="endereco"
              :options="ListaEndereco"
            >
              <template v-slot:after-options="scope">
                <q-item>
                  <q-item-section>
                    <q-btn
                      class="col-12"
                      color="green"
                      label="Novo endereço"
                      no-caps=""
                      @click="showModal = !showModal"
                    />
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
        </div>
      </q-form>
      <q-separator style="margin-top:22px;" />
      <div class="footer row justify-center">
        <div class="text-center col-12" style="padding:15px;">
          Total a pagar:
          <span style="color:green"> R$ {{ payment.amount }}</span>
        </div>
        <q-separator />
        <div class="col-12 text-center text-caption text-grey">
          <q-checkbox v-model="termos" color="green" />
          Li os
          <span class="text-bold" @click="onSubmit()">
            termos de uso
          </span>
          e a
          <span class="text-bold" @click="onSubmit()">
            Política de Privacidade
          </span>
        </div>
        <div class="row justify-center">
          <q-btn
            no-caps
            class="col-12 btn"
            color="green"
            label="Pagar"
            @click="this.$refs.formCC.submit"
          />
        </div>
      </div>
    </div>
    <transition name="modal">
      <div v-if="showModal" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-container">
            <div class="modal-body">
              <slot name="header">
                <div
                  style="color:#005328;"
                  class="text-subtitle text-bold row justify-between"
                >
                  Cadastrar novo endereço
                  <q-btn label="X" @click="showModal = false" />
                  <q-separator class="col-12" style="margin-top:5px;" />
                </div>
              </slot>
              <slot name="body">
                <q-form
                  class="row justify-left q-gutter-x-xs"
                  style="margin-top:5px"
                >
                  <div class="col-7">
                    CEP
                    <q-input
                      v-model="novoEnd.zip_code"
                      mask="#####-###"
                      outlined
                      :rules="[val => val.length >= 8 || 'Campo obrigatório']"
                      @change="BuscaEndereco()"
                    />
                  </div>
                  <div class="col-5">
                    Rua / Avenida
                    <q-input
                      v-model="novoEnd.street"
                      outlined
                      :rules="[val => !!val || 'Campo obrigatório']"
                    />
                  </div>
                  <div class="col-5">
                    Bairro
                    <q-input
                      v-model="novoEnd.neighborhood"
                      outlined
                      :rules="[val => !!val || 'Campo obrigatório']"
                    />
                  </div>
                  <div class="col-3">
                    Numero
                    <q-input
                      v-model="novoEnd.number"
                      outlined
                      :rules="[val => !!val || 'Campo obrigatório']"
                    />
                  </div>
                  <div class="col-7">
                    Complemento
                    <q-input v-model="novoEnd.information" outlined />
                  </div>
                  <div class="col-5">
                    País
                    <q-input
                      v-model="novoEnd.country"
                      outlined
                      :rules="[val => !!val || 'Campo obrigatório']"
                    />
                  </div>
                  <div class="col-5">
                    Estado
                    <q-input
                      v-model="novoEnd.state"
                      outlined
                      :rules="[val => !!val || 'Campo obrigatório']"
                    />
                  </div>
                  <div class="col-5">
                    Cidade
                    <q-input
                      v-model="novoEnd.city"
                      outlined
                      :rules="[val => !!val || 'Campo obrigatório']"
                    />
                  </div>
                  <div
                    class="col-12 row justify-center"
                    style="margin-top:35px;"
                  >
                    <q-btn
                      class="col-6"
                      type="submit"
                      label="Salvar Endereço"
                      no-caps
                      color="green"
                      @click="AdicionarNovoEndereco()"
                    />
                  </div>
                </q-form>
              </slot>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import Axios from "axios";
export default {
  created() {
    this.AdicionaEnderecos(this.payment.customer.address);
  },
  computed: {
    ...mapGetters(["payment"])
  },
  name: "pagcredito",
  data() {
    return {
      loading: false,
      showModal: false,
      novoEnd: {
        zip_code: "",
        street: "",
        neighborhood: "",
        number: "",
        information: "",
        country: "",
        state: "",
        city: ""
      },
      Enderecos: [],
      ListaEndereco: [],
      endereco: "",
      termos: false,
      bandeiras: [
        "VISA",
        "MASTERCARD",
        "AMEX",
        "CB",
        "HIPERCARD",
        "AURA",
        "DINERS",
        "ELO"
      ],
      parcelas: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      credit_card: {
        installments: "1",
        numero: "4970 1000 0000 0055",
        brand: "VISA",
        expiry: "22/2020",
        cvv: "123",
        holder_name: "diego",
        billing: {
          type: "PRIVATE"
        }
      }
    };
  },
  methods: {
    ...mapActions(["act_post_payment"]),
    AdicionarNovoEndereco() {
      this.AdicionaEnderecos(this.novoEnd);
      this.novoEnd = {};
      this.showModal = false;
    },
    AdicionaEnderecos(address) {
      let existe = false;
      for (let index = 0; index < this.Enderecos.length; index++) {
        if (this.Enderecos[index].zip_code == address.zip_code) {
          existe = true;
        }
      }
      if (!existe) {
        this.Enderecos.push(address);
      }
      this.ListaEndereco = this.FormataEndereco();
    },
    BuscaEndereco() {
      let self = this;
      Axios.get(
        "https://viacep.com.br/ws/" + this.novoEnd.zip_code + "/json"
      ).then(function(response) {
        let data = response.data;
        self.novoEnd.street = data.logradouro;
        self.novoEnd.neighborhood = data.bairro;
        self.novoEnd.information = data.complemento;
        self.novoEnd.state = data.uf;
        self.novoEnd.city = data.localidade;
        self.novoEnd.country = "Brasil";
      });
    },
    FormataEndereco() {
      let enderecos = this.Enderecos;
      for (let index = 0; index < enderecos.length; index++) {
        let existe = false;
        let res =
          enderecos[index].street +
          ", " +
          enderecos[index].number +
          " - " +
          enderecos[index].neighborhood +
          " - " +
          enderecos[index].city +
          "-" +
          enderecos[index].state +
          " - " +
          enderecos[index].zip_code;
        for (let endA = 0; endA < this.ListaEndereco.length; endA++) {
          if (
            this.ListaEndereco[endA].includes(this.Enderecos[index].zip_code)
          ) {
            existe = true;
          }
        }
        if (!existe) {
          this.ListaEndereco.push(res);
        }
      }
      return this.ListaEndereco;
    },
    voltar() {
      this.$router.back();
    },
    msg(tipo, titulo, mensagem) {
      this.$notify({
        group: "foo",
        type: tipo,
        title: titulo,
        text: mensagem
      });
    },
    async onSubmit() {
      if (!this.termos) {
        this.msg("error", "Para continuar, aceite os termos de uso!", "");
      } else {
        this.loading = true;
        let request = this.payment;
        let billing = {};
        let address = {};
        let expiry = this.credit_card.expiry.split("/");
        this.credit_card.expiry_month = parseInt(expiry[0]);
        this.credit_card.expiry_year = parseInt(expiry[1].substring(2, 4));
        this.credit_card.installments = parseInt(this.credit_card.installments);
        this.credit_card.number = this.credit_card.numero.split(" ").join("");
        address = this.Enderecos[this.ListaEndereco.indexOf(this.endereco)];

        billing.address = address;

        request.amount = this.payment.amount;
        request.currency = "BRL";
        request.method = "CREDIT_CARD";
        request.customer = this.payment.customer;
        request.travel = this.payment.travel;
        request.shopping_cart = this.payment.shopping_cart;

        this.credit_card.billing = billing;

        request.credit_card = this.credit_card;

        let self = this;

        this.act_post_payment(request)
          .then(function(response) {
            void response;
            setTimeout(self.load, 2000);
            self.$router.push("/concluido");
          })
          .catch(function(error) {
            let res = error.response.data.returns;
            let message = "";
            let title = res.message.text;
            let tipo = "error";

            if (typeof res.message.details === typeof []) {
              message = res.message.details[0].message;
            } else {
              message = res.message.text;
            }
            self.msg(tipo, title, message);
            setTimeout(self.load, 2000);
          });
      }
    },
    load() {
      this.loading = !this.loading;
    }
  }
};
</script>
<style lang="css" scoped>
.mask {
  max-width: 700px;
}
.btn {
  width: 50vw;
  max-width: 500px;
  margin-bottom: 20px;
}
.header {
  padding: 15px 22px;
}
.field {
  padding: 10px 5px;
  background: #ffffff 0% 0% no-repeat padding-box;
}
.container {
  max-width: 500px;
  padding: 0 15px 0 15px;
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
@media screen and (min-width: 700px) {
  .mask {
    top: 100px;
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 25px #efefef;
    border: 1px solid #ecedf3;
    border-radius: 20px;
  }
  .modal-container {
    margin: 0px auto;
    border-radius: 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  }
  .modal-body {
    margin: 20px 0;
  }
}

@media screen and (max-width: 700px) {
  .header {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 25px #efefef;
    position: fixed;
    z-index: 10;
    left: 0;
    top: 0;
    height: 80px;
    width: 100%;
  }
  .container {
    padding: 90px 15px 140px 15px;
  }
  .footer {
    background: #ffffff 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 25px #efefef;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 140px;
  }
  .modal-container {
    width: 100%;
    height: 100%;
    padding: 10px;
    border-radius: 0;
  }
  .modal-body {
    margin: 0;
  }
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 700px;
  padding: 20px 30px;
  background-color: #fff;
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
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
