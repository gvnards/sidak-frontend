<template>
  <div class="modal-content" style="max-width: 500px; left: 50%; transform: translateX(-50%);">
    <div class="modal-body text-center">
      <IllustrationInformationSinkron style="max-height: 200px;" />
      <h5 class="text-primary">Perhatian Sebelum Melanjutkan !</h5>
      <p class="text-black"><b>Apakah Anda yakin ingin menghapus data ini ?</b></p>
      <div class="modal-footer">
        <button class="btn my-btn-secondary" @click="closeModal()">Batal</button>
        <button class="btn my-btn-danger" @click="onDelete()">Hapus Data</button>
      </div>
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
    onDelete() {
      this.$store.commit("onModalDeleteDataStatus", "delete")
      this.closeModal()
      setTimeout(() => {
        this.$store.commit("onModalDeleteDataStatus", "")
      }, 500)
    },
    closeModal() {
      this.$store.commit("resetModal")
      $("#modal").modal("hide")
    }
  }
}
</script>