<template>
  <div class="modal-content" style="max-width: 500px; left: 50%; transform: translateX(-50%);">
    <div class="modal-body text-center">
      <IllustrationSuccess style="max-height: 200px;" v-if="$store.getters.getModalStatusCallback.status === 'Success'" />
      <IllustrationFailed style="max-height: 200px;" v-else />
      <h5 :class="$store.getters.getModalStatusCallback.status === 'Success' ? 'text-primary' : 'text-red'">{{ $store.getters.getModalStatusCallback.status === 'Success' ? 'Selamat !' : 'Gagal !'}}</h5>
      <p style="white-space: pre-line;">{{ $store.getters.getModalStatusCallback.message }}</p>
    </div>
    <div class="modal-footer">
      <button id="btnTutupModal" type="button" class="btn btn-lg btn-block my-btn-primary" data-dismiss="modal">Mengerti dan Tutup</button>
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
      if (modalMethod.toLowerCase() === "create") return "ditambahkan"
      else if (modalMethod.toLowerCase() === "update") return "diperbaharui"
      else if (modalMethod.toLowerCase() === "sync") return "disinkronisasi"
      else if (modalMethod.toLowerCase() === "delete") return "dihapus"
      return "dihapus"
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