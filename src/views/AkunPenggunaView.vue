<template>
  <div id="jabatan">
    <AkunPengguna />
  </div>
</template>

<script>
import AkunPengguna from "../components/AkunPengguna/AkunPenggunaWrapper.vue"
export default {
  components: {
    AkunPengguna
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
#jabatan {
  width: 100%;
  box-sizing: border-box;
  padding: 40px 20px;
  max-height: 100vh;
}
</style>