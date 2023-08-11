<template>
  <div>
    <div class="unor-wrapper" :style="`padding-left: ${(unor.kodeKomponen.split('.').length) === 1 ? 10 : 10+(2*unor.kodeKomponen.split('.').length)}px;`">
      <h6 class="text-primary">{{ unor.nama }}</h6>
    </div>
    <div @click="updateDataJabatan(jabatan)"
    data-toggle="modal"
    data-target="#modal"
    data-backdrop="static"
    data-keyboard="false" class="jabatan-wrapper" v-for="jabatan in unor.jabatan" :key="jabatan.id">
      <div class="jabatan-text"><small>Jabatan</small></div>
      <div class="jabatan-item"><small>{{ jabatan.jabatan }}</small><br><small style="padding-left: 10px; padding-right: 6px;">Terisi: {{ jabatan.jabatanTerisi }} | Kebutuhan: {{ jabatan.kebutuhan }}</small></div>
    </div>
    <UnorJabatanItem v-for="unorChild in unor.unor" :key="unorChild.id" :unor="unorChild" />
  </div>
</template>

<script>
export default {
  name: "UnorJabatanItem",
  props: {
    unor: {
      default: () => {},
      type: Object,
      required: true
    }
  },
  methods: {
    updateDataJabatan(item) {
      this.$store.commit("onModalMethod", "UPDATE")
      this.$store.commit("onModalFolder", "Jabatan")
      this.$store.commit("onModalContent", "DataJabatan")
      this.$store.commit("onModalData", item)
    },
  }
}
</script>

<style lang="less" scoped>
h6 {
  font-weight: 600;
  padding: 0;
  margin: 0;
}
.unor-wrapper {
  border: 1px solid #dee2e6;
  padding: 6px 6px 6px 10px;
  box-sizing: border-box;
  margin: 0px;
}
.jabatan-wrapper {
  height: 100%;
  position: relative;
  padding: 0px 6px 0px 10px;
  border: 1px solid #dee2e6;
  overflow: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  &:hover {
    cursor: pointer;
    background-color: #efefef;
  }
}
.jabatan-text {
  padding-right: 10px;
  border-right: 1px solid #dee2e6;
  position: absolute;
  width: max-content;
  display: inline-block;
  height: 100%;
}
.jabatan-item {
  position: relative;
  width: 100%;
  max-width: calc(100% - 185px);
  left: 59px;
  padding: 0;
  margin: 0;
  padding-left: 10px;
  padding-right: 6px;
  box-sizing: border-box;
  display: inline;
  height: 100%;
  min-height: 50px;
}
</style>