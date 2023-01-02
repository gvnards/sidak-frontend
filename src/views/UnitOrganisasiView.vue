<template>
  <div class="unit-organisasi">
    <UnitOrganisasi />
  </div>
</template>

<script>
import UnitOrganisasi from "../components/UnitOrganisasi/UnitOrganisasi.vue"
export default {
  components: {
    UnitOrganisasi
  },
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.unit-organisasi {
  width: 100%;
  padding: 40px 20px;
  box-sizing: border-box;
  max-height: 100vh;
}
</style>