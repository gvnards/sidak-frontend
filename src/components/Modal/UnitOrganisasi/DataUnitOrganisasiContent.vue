<template>
  <ModalHeaderFooter :header-title="'Unit Organisasi'" :header-subtitle="'unit organisasi'" :illustration="'IllustrationDataUnitOrganisasi'" @onUsulkan="actionButtonUnitOrganisasi()" :primaryText="'Tambahkan'">
  <div class="row row-form">
    <div class="col-12">
      <div class="form-group">
        <div class="custom-control custom-checkbox">
          <input type="checkbox" v-model="dataUnitOrganisasi.digunakanSotkSekarang" class="custom-control-input" id="fieldDigunakanSotkSekarang">
          <label class="custom-control-label" for="fieldDigunakanSotkSekarang">Centang jika unit organisasi digunakan di SOTK saat ini</label>
        </div>
      </div>
    </div>
  </div>
  <div class="row row form">
    <div class="col-12">
      <div class="form-group">
        <label for="fieldKodeKomponen">Kode Komponen</label>
        <input type="text" id="fieldKodeKomponen" class="form-control" :class="inputError.kodeKomponen.status ? 'form-error' : ''" placeholder="431.xxx.xxx" v-model="dataUnitOrganisasi.kodeKomponen">
      </div>
    </div>
  </div>
  <div class="row row form">
    <div class="col-12">
      <div class="form-group">
        <label for="fieldUnitKerja">Unit Kerja</label>
        <input type="text" id="fieldUnitKerja" class="form-control" :class="inputError.unitKerja.status ? 'form-error' : ''" placeholder="Nama Unit Kerja" v-model="dataUnitOrganisasi.nama">
      </div>
    </div>
  </div>
  </ModalHeaderFooter>
</template>

<script>
import axios from "axios"
import ModalHeaderFooter from "../ModalHeaderFooter.vue"
const env = import.meta.env
export default {
  components: {
    ModalHeaderFooter
  },
  data() {
    return {
      inputError: {
        kodeKomponen: {
          status: false,
          description: ""
        },
        unitKerja: {
          status: false,
          description: ""
        }
      },
      dataUnitOrganisasi: {
        kodeKomponen: "",
        nama: "",
        digunakanSotkSekarang: 1
      }
    }
  },
  methods: {
    actionButtonUnitOrganisasi() {
      let url = this.$store.getters.getModalMethod === "UPDATE" ? `/unit-organisasi/${this.$store.getters.getModalData.id}` : "/unit-organisasi"
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: this.$store.getters.getModalMethod === "UPDATE" ? "PUT" : "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataUnitOrganisasi), u)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
      })
    },
    getDataUnitOrganisasi() {
      this.dataUnitOrganisasi = this.$store.getters.getModalData
    }
  },
  created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataUnitOrganisasi()
    }
  }
}
</script>