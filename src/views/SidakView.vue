<template>
  <div style="display: flex; max-height: 100vh; overflow: hidden;">
    <ModalWrapper>
      <component v-if="showModalContent !== ''" :is="`${showModalContent}Content`" />
    </ModalWrapper>
    <main-menu></main-menu>
    <router-view :style="getWindowWidth <= 780 ? 'max-height: calc(100vh - 60px);' : ''" />
  </div>
</template>

<script>
import MainMenu from "../components/MainMenu/MainMenu.vue"
export default {
  components: {
    MainMenu,
  },
  computed: {
    showModalContent() {
      return this.$store.getters.getModalContent
    },
    getWindowWidth() {
      return this.$store.getters.getWindowWidth
    }
  },
  methods: {
    onResize() {
      this.$store.commit("onWindowWidth", window.innerWidth)
    }
  },
  created() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.onResize)
    })
  }
}
</script>

<style lang="less" scoped>
div {
  margin: 0 !important;
  // padding: 0 !important;
}
</style>
