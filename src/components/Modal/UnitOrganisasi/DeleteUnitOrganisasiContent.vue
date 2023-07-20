<template>
  <div class="modal-content" style="max-width: 500px; left: 50%; transform: translateX(-50%);">
    <div class="modal-body text-center" style="min-height: 200px;">
      <LoadingAnimation class="loading" v-if="isHasSubOrganisasi === null" />
      <div v-else-if="isHasSubOrganisasi">
        <IllustrationFailed style="max-height: 140px;" />
        <h5 class="text-danger">Gagal !</h5>
        <p class="text-black" style="white-space: pre-line;">Maaf, Unit Organisasi ini masih memiliki Sub Organisasi dibawahnya.</p>
      </div>
      <div v-else>
        <IllustrationCaution style="max-height: 140px;" />
        <h5 class="text-primary">Perhatian !</h5>
        <p class="text-black" style="white-space: pre-line;">Apakah Anda yakin ingin menghapus Unit Organisasi ini ?</p>
      </div>
      <div v-if="isHasSubOrganisasi !== null" style="height: 24px;"></div>
      <div class="row" v-if="isHasSubOrganisasi !== null">
        <div :class="isHasSubOrganisasi ? 'col-12' : 'col-6'">
          <div class="btn btn-block my-btn-outline-secondary" @click="closeModal()">Tutup</div>
        </div>
        <div v-if="!isHasSubOrganisasi" class="col-6">
          <div class="btn btn-block my-btn-danger" @click="deleteUnitOrganisasi()">Hapus</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IllustrationFailed from "@/components/icons/IllustrationFailed.vue"
import IllustrationCaution from "@/components/icons/IllustrationCaution.vue"
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    IllustrationCaution,
    IllustrationFailed
  },
  data() {
    return {
      isHasSubOrganisasi: null
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("resetModal")
      $("#modal").modal("hide")
    },
    deleteUnitOrganisasi() {
      let item = this.$store.getters.getModalData
      axios({
        url: `${env.VITE_BACKEND_URL}/unit-organisasi/${item.id}`,
        method: "DELETE",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      }).then(() => {
        // let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
        // let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.closeModal()
      })
    },
    hasSubOrganisasi(item) {
      return axios({
        url: `${env.VITE_BACKEND_URL}/has-sub-organisasi/${item.kodeKomponen}.`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      })
    },
  },
  created() {
    this.hasSubOrganisasi(this.$store.getters.getModalData).then(res => {
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
      this.isHasSubOrganisasi = data.message
    })
  }
}
</script>

<style lang="less" scoped>
.loading {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
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