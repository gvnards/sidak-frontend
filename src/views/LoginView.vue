<template>
  <div>
    <ModalWrapper>
      <StatusLoginContent v-if="showModalContent === 'StatusLogin'" />
    </ModalWrapper>
    <LoginWrapper />
  </div>
</template>

<script>
import LoginWrapper from "../components/Login/LoginWrapper.vue"
export default {
  components: {
    LoginWrapper,
  },
  computed: {
    showModalContent() {
      return this.$store.getters.getModalContent
    }
  },
}
</script>