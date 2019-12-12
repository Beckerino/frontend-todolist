<template>
  <div class="home">
    <div class="q-pa-md">
      <q-table
        class="my-sticky-virtscroll-table"
        virtual-scroll
        table-style="max-height: 400px"
        :rows-per-page-options="[0]"
        :virtual-scroll-sticky-start="48"
        row-key="id"
        title="Atividades"
        :data="ActAtividades()"
        :columns="columns"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapActions({
      ActAtividades: "act_atividades"
    }),
    ...mapGetters({
      Atividades: "get_atividades"
    })
  },
  name: "home",
  data() {
    return {
      columns: [
        {
          name: "name",
          required: true,
          label: "ID",
          align: "left",
          field: row => row.name,
          sortable: true
        },
        {
          name: "title",
          required: true,
          label: "Titulo",
          align: "left"
        },
        {
          name: "content",
          align: "left",
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
  }
};
</script>
