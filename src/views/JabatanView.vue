<template>
  <div id="jabatan">
    <Jabatan />
  </div>
</template>

<script>
import Jabatan from "../components/Jabatan/JabatanWrapper.vue"
export default {
  components: {
    Jabatan
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