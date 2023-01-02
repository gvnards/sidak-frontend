<template>
  <div id="usulan-header">
    <div v-if="getIsUsulanMobile" style="position: absolute; cursor: pointer; top: 50%; transform: translateY(-80%);" @click="back()">
      <i class="fa-solid fa-chevron-left text-primary" style="font-size: 24px;"></i>
    </div>
    <h4 class="text-center text-primary">{{ mainText }}</h4>
  </div>
</template>

<script>
export default {
  props: {
    mainText: {
      default: "",
      required: true,
      type: String
    }
  },
  computed: {
    getIsUsulanMobile() {
      return this.$store.getters.getIsUsulanMobile
    }
  },
  methods: {
    back() {
      this.$store.commit("onUsulanData", {})
    },
  }
}
</script>

<style lang="less" scoped>
#usulan-header {
  border-bottom: 1px solid #869E9E;
  padding-bottom: 10px;
  position: relative;
  h4 {
    font-weight: 600;
  }
}
</style>