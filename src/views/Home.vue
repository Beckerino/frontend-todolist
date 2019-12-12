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
        :data="Atividades"
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
  }
};
</script>
