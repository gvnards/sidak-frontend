<template>
  <div
    class="modal-content"
    style="max-width: 600px; left: 50%; transform: translateX(-50%)"
  >
    <div class="modal-header">
      <IllustrationNotes style="width: 100%" />
      <h1 class="text-center">Konfirmasi Persetujuan</h1>
      <p class="text-center text-black">
        Pastikan data yang akan Anda proses sudah benar.
      </p>
    </div>
    <div class="modal-body">
      <div class="row">
        <div class="col-6">
          <div class="btn btn-sm btn-block" :class="method !== '' && method === 'Ditolak' ? 'my-btn-danger' : 'my-btn-outline-danger'" @click="method='Ditolak'">Tolak</div>
        </div>
        <div class="col-6">
          <div class="btn btn-sm btn-block" :class="method !== '' && method === 'Disetujui' ? 'my-btn-primary' : 'my-btn-outline-primary'" @click="method='Disetujui'">Setuju</div>
        </div>
      </div>
      <div class="form-group" v-if="method !== ''" style="margin-top: 12px;">
        <label for="fieldAlasanUsulan" :style="method === 'Disetujui' ? 'color: #477b79;' : 'color: #EC392F;'"
          >Alasan usulan {{ method.toLowerCase() }}</label
        >
        <textarea
          v-model="alasan"
          type="text"
          rows="5"
          id="fieldAlasanUsulan"
          class="form-control"
        ></textarea>
      </div>
    </div>
    <div class="modal-footer">
      <div class="row" style="width: 100%; margin: 0;">
        <div :class="method !== '' ? 'col-12 col-sm-6' : 'col-12'" style="margin-top: 4px; margin-bottom: 4px;">
          <div
            type="button"
            class="btn btn-sm btn-block my-btn-secondary"
            @click="closeModal()"
          >
            Batal
          </div>
        </div>
        <div class="col-12 order-first order-sm-12 col-sm-6" v-if="method !== ''" style="margin-top: 4px; margin-bottom: 4px;">
          <div class="btn btn-sm btn-block my-btn-primary" @click="onProcess()">Proses Verifikasi Usulan</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IllustrationNotes from "./../../icons/IllustrationNotes.vue"
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    IllustrationNotes
  },
  data() {
    return {
      alasan: "",
      method: ""
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("resetModal")
      $("#modal").modal("hide")
    },
    onProcess() {
      let data = {
        dataMultiple: this.$store.getters.getModalData,
        keteranganUsulan: this.alasan,
        idUsulanHasil: this.method.toLowerCase() === "disetujui" ? 1 : 2
      }
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/usulan-multiple`,
        method: "PUT",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(data), u)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        let getModalMethod = this.method.toLowerCase() === "disetujui" ? "APPROVE" : "DECLINE"
        // callback status
        this.$store.commit("onModalMethod", getModalMethod)
        this.$store.commit("onModalFolder", "Usulan")
        this.$store.commit("onModalContent", "UsulanCallback")
        this.$store.commit("onModalStatusCallback", data.status === 2 || data.status === true ? "Success" : "Failed")
      })
    }
  }
}
</script>

<style lang="less" scoped>
.modal-header {
  display: block;
  h1 {
    font-size: 1.1rem;
    margin: 0;
    margin-top: 8px;
    font-weight: 600;
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
  }
}
.modal-lg {
  max-width: 600px;
}
</style>