<template>
  <div class="modal-content" style="max-width: 500px; left: 50%; transform: translateX(-50%);">
    <div class="modal-body text-center">
      <IllustrationSuccess style="max-height: 200px;" v-if="$store.getters.getModalStatusCallback === 'Success'" />
      <IllustrationFailed style="max-height: 200px;" v-else />
      <h5 :class="$store.getters.getModalStatusCallback === 'Success' ? 'text-primary' : 'text-red'">{{ $store.getters.getModalStatusCallback === 'Success' ? 'Selamat !' : 'Gagal !' }}</h5>
      <p style="line-break: auto;">{{ $store.getters.getModalData }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-lg btn-block my-btn-primary" data-dismiss="modal">Mengerti dan Tutup</button>
    </div>
  </div>
</template>

<script>
import IllustrationSuccess from "@/components/icons/IllustrationSuccess.vue"
import IllustrationFailed from "@/components/icons/IllustrationFailed.vue"
export default {
  components: {
    IllustrationSuccess,
    IllustrationFailed
  },
  computed: {
    modalMethod() {
      let modalMethod = this.$store.getters.getModalMethod
      if (modalMethod === "APPROVE") return "disetujui"
      else if (modalMethod === "DECLINE") return "ditolak"
      return ""
    }
  }
}
</script>

<style lang="less" scoped>
.modal-body {
  box-sizing: border-box;
  padding-top: 20px;
  h5 {
    margin: 0;
    margin-top: 10px;
    font-weight: 700;
  }
  p {
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 14px;
  }
}
.btn {
  font-size: 14px;
}
</style>