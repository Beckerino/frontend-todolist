<template>
  <div class="item">
    <div class="row q-gutter-y-md" style="padding: 5px 15px 5px 15px;">
      <p class="text-body3 col-12">Cartão de Débito</p>
      <q-img class="col-12" :src="master" style="width:26px;height:20px;" />
      <q-img class="col-12" :src="visa" style="width:45px;height:15px;" />
      <q-btn class="col-12" label="pagar" flat color="green" to="/debito" />
    </div>
  </div>
</template>
<script>
export default {
  name: "debito",
  data() {
    return {
      visa: require("../assets/visa@2x.png"),
      master: require("../assets/master@2x.png")
    };
  }
};
</script>
<style lang="css">
.item {
  width: 191px;
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 25px #ebebeb;
  border: 1px solid #ecedf3;
  border-radius: 8px;
}
</style>
