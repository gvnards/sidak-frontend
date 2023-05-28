<template>
  <ModalHeaderFooter :header-title="'Akun Pengguna Admin'" :header-subtitle="'akun pengguna admin'" :illustration="'IllustrationDataUnitOrganisasi'" @onUsulkan="actionButtonAkunPengguna()" :primaryText="'Tambahkan'">
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldRoleUser">Role User</label>
          <select id="fieldRoleUser" class="custom-select" v-model="akunAdmin.idAppRoleUser">
            <option value="0" :selected="akunAdmin.idAppRoleUser == 0">-- Pilih role --</option>
            <option v-for="item in daftarRole" :key="item.id" :value="item.id">{{ item.nama }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldUsername">Username</label>
          <input type="text" id="fieldUsername" class="form-control" placeholder="Masukkan username untuk admin" v-model="akunAdmin.username">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldKodeUnor">Kode Komponen Unit Organisasi</label>
          <input type="text" id="fieldKodeUnor" class="form-control" placeholder="Masukkan kode komponen unit organisasi" v-model="akunAdmin.unitOrganisasi">
        </div>
      </div>
    </div>
  </ModalHeaderFooter>
</template>
<script>
import axios from "axios"
const env = import.meta.env
export default {
  data() {
    return {
      akunAdmin: {
        username: "",
        idAppRoleUser: 0,
        unitOrganisasi: ""
      },
      daftarRole: []
    }
  },
  methods: {
    actionButtonAkunPengguna() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let data = this.$store.getters.getEncrypt(JSON.stringify(this.akunAdmin), u)
      axios({
        url: `${env.VITE_BACKEND_URL}/user-admin`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: data
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        // $("#modal-reset-password").click()
        // this.$store.commit("onModalFolder", "StatusCallback")
        // this.$store.commit("onModalContent", "StatusChangePassword")
        // this.$store.commit("onModalData", data)
        this.$store.commit("onModalMethod", "CREATE")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: data.status === 2 || data.status === true ? "Success" : "Failed",
          message: data.message
        })
      })
    },
    getDaftarRole() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/user-role`,
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        method: "GET"
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarRole = data.message
      })
    },
  },
  created() {
    this.getDaftarRole()
  }
}
</script>