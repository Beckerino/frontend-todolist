<template>
  <div class="cadastrar row padd16">
    <div class="conteudo full-width">
      <p class="text-h6 no-margin" style="padding: 12px 16px;">
        Criar nova atividade
      </p>
      <form class="q-gutter-x-ps row padd16" style="background-color: white;">
        <q-input
          class="col-12"
          outlined
          v-model="atv.title"
          label="Titulo"
          :dense="dense"
        />
        <q-input
          class="col-12"
          outlined
          v-model="atv.content"
          label="Conteudo"
          :dense="dense"
        />
        <q-input
          class="col-6"
          outlined
          v-model="atv.author"
          label="Author"
          :dense="dense"
        />
        <q-input
          class="col-6"
          outlined
          v-model="atv.state"
          label="Estado"
          :dense="dense"
        />
        <div class="row justify-end full-width padd16">
          <q-btn
            :loading="loading"
            color="primary"
            @click="criarAtividade()"
            style="width: 150px"
          >
            {{ textbtn }}
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              Enviando...
            </template>
            <template v-slot:concluido> </template>
          </q-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  computed: {},
  created() {},
  name: "cadastrar",
  data() {
    return {
      atv: {
        title: "",
        content: "",
        author: "",
        state: ""
      },
      dense: true,
      loading: false,
      concluido: false,
      percentage: 0,
      textbtn: "Enviar"
    };
  },
  methods: {
    ...mapActions(["act_post_atividade"]),
    criarAtividade() {
      this.act_post_atividade(this.atv);
    }
  }
};
</script>
<style scoped>
.conteudo {
  border-radius: 2px;
  box-shadow: 0 0 3px gray;
}
.padd16 {
  padding: 16px;
}
.black {
  background-color: black;
}
</style>
