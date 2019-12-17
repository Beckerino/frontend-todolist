<template>
  <div class="home">
    <div class="q-pa-md">
      <q-table
        :filter="filter"
        row-key="id"
        no-data-label="não há nada na nuvem"
        no-results-label="o filtro não encontrou resultados"
        title="Atividades"
        :data="Atividades"
        :columns="columns"
        selection="single"
        :selected.sync="selected"
      >
        <template v-slot:top-right="props">
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Procurar"
          >
            <q-icon slot="append" name="search" />
          </q-input>
        </template>

        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span> Poxa... não foi encontrado nada {{ message }} </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
      </q-table>
      <div v-if="selecao()" class="row justify-center">
        <q-btn label="Alterar Item" v-on:click="alterar()" />
        <q-btn label="Deletar Item" v-on:click="deletar()" color="red" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapActions({
      ActAtividades: "act_get_atividade"
    }),
    ...mapGetters({
      Atividades: "get_atividades"
    })
  },
  created() {
    this.ActAtividades();
  },
  name: "home",
  data() {
    return {
      filter: "",
      selected: [],
      columns: [
        {
          name: "name",
          required: true,
          label: "#",
          align: "left",
          field: row => row.id,
          sortable: true
        },
        {
          name: "title",
          required: true,
          label: "Titulo",
          field: row => row.title,
          align: "left"
        },
        {
          name: "content",
          align: "left",
          field: row => row.content,
          label: "Conteudo"
        },
        {
          name: "created_at",
          required: true,
          align: "right",
          label: "Criado em",
          field: row => row.created,
          sortable: true
        }
      ]
    };
  },
  beforeDestroy() {
    clearInterval(this.interval1);
  },
  methods: {
    selecao() {
      if (this.selected.length >= 1) {
        return true;
      } else {
        return false;
      }
    },
    alterar() {
      this.$router.push("/Alterar");
    },
    deletar() {
      this.$router.push("/Excluir");
    }
  }
};
</script>
