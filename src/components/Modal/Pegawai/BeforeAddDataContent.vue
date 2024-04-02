<template>
  <div class="modal-content" style="max-width: 500px; left: 50%; transform: translateX(-50%);">
    <div class="modal-body text-center">
      <IllustrationInformationSinkron style="max-height: 200px;" />
      <h5 class="text-primary">Perhatian Sebelum Melanjutkan !</h5>
      <p class="text-black">Yuk coba <b>SINKRON DATA</b> Anda dulu !<br>Mungkin data Anda sudah dalam kondisi terbaru.</p>
      <div style="height: 6px;"></div>
      <button class="btn btn-block my-btn-primary btn-sm" @click="onSync()">Sinkron Data dari MySAPK</button>
      <p style="margin-top: 6px; margin-bottom: 6px;">atau</p>
      <button class="btn btn-block my-btn-outline-primary btn-sm" @click="onNext()">Lanjutkan Proses</button>
    </div>
  </div>
</template>

<script>
import IllustrationInformationSinkron from "../../icons/IllustrationInformationSinkron.vue"
export default {
  components: {
    IllustrationInformationSinkron
  },
  methods: {
    onNext() {
      this.$store.commit("onModalBeforeAddUpdateDataStatus", "next")
      setTimeout(() => {
        this.$store.commit("onModalBeforeAddUpdateDataStatus", "wait")
      }, 500)
    },
    onSync() {
      this.$store.commit("onModalBeforeAddUpdateDataStatus", "sync")
      this.$store.commit("resetModal")
      $("#modal").modal("hide")
      setTimeout(() => {
        this.$store.commit("onModalBeforeAddUpdateDataStatus", "wait")
      }, 500)
    }
  }
}
</script>