<template>
  <div class="item row">
    <p class="text-body3 col-12">Cartão de Crédito</p>
    <q-img class="col-12" :src="master" style="width:35px;height:27px;" />
    <q-img class="col-12" :src="bandeiras" style="height:21px;" />
    <q-btn class="col-12" label="pagar" flat color="green" to="/credito" />
  </div>
</template>
<script>
export default {
  name: "credito",
  data() {
    return {
      visa: require("../assets/visa@2x.png"),
      master: require("../assets/master@2x.png"),
      bandeiras: require("../assets/bandeiras_cartoes@2x.png")
    };
  }
};
</script>
<style lang="css">
.item {
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 25px #ebebeb;
  border: 1px solid #ecedf3;
  border-radius: 2px;
  padding: 5px 15px 5px 15px;
}
</style>
