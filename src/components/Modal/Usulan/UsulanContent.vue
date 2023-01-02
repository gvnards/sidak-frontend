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
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group">
            <label for="fieldAlasanUsulan" :style="getModalMethod === 'Disetujui' ? 'color: #477b79;' : 'color: #EC392F;'"
              >Alasan usulan {{ getModalMethod.toLowerCase() }}</label
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
      </div>
    </div>
    <div class="modal-footer">
      <div class="row" style="width: 100%">
        <div class="col-6">
          <div
            type="button"
            class="btn btn-block my-btn-outline-secondary"
            @click="closeModal()"
          >
            Batal
          </div>
        </div>
        <div class="col-6">
          <button
            type="button"
            class="btn btn-block my-btn-primary"
            @click="onProses()"
          >
            Proses
          </button>
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
  data() {
    return {
      alasan: ""
    }
  },
  components: {
    IllustrationNotes
  },
  computed: {
    getModalMethod() {
      let modalMethod = ""
      let getModalMethod = this.$store.getters.getModalMethod
      if (getModalMethod === "DECLINE") modalMethod = "Ditolak"
      else if (getModalMethod === "APPROVE") modalMethod = "Disetujui"
      return modalMethod
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("resetModal")
      $("#modal").modal("hide")
    },
    onProses() {
      let usulan_ = this.$store.getters.getModalData
      let idUpdate = null
      switch (usulan_.usulanKriteria) {
      case "Data Anak":
        idUpdate = usulan_.idDataAnakUpdate
        break
      case "Data Diklat":
        idUpdate = usulan_.idDataDiklatUpdate
        break
      case "Data Pangkat":
        idUpdate = usulan_.idDataPangkatUpdate
        break
      case "Data Pasangan":
        idUpdate = usulan_.idDataPasanganUpdate
        break
      case "Data Pendidikan":
        idUpdate = usulan_.idDataPendidikanUpdate
        break
      case "Data Skp":
        idUpdate = usulan_.idDataSkpUpdate
        break
      default:
        break
      }
      let usulan = {
        idUpdate: idUpdate,
        idUsulanStatus: 3,
        idUsulanHasil: this.$store.getters.getModalMethod === "DECLINE" ? 2 : 1,
        keteranganUsulan: this.alasan,
        usulanKriteria: usulan_.usulanKriteria
      }
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/usulan/${usulan_.id}`,
        method: "PUT",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(usulan), u)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        let getModalMethod = this.$store.getters.getModalMethod
        // callback status
        this.$store.commit("onModalMethod", getModalMethod)
        this.$store.commit("onModalFolder", "Usulan")
        this.$store.commit("onModalContent", "UsulanCallback")
        this.$store.commit("onModalStatusCallback", data.status === 1 || data.status === true ? "Success" : "Failed")
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