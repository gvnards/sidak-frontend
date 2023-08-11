<template>
  <ModalHeaderFooter :header-title="'Jabatan'" :header-subtitle="'jabatan'" :illustration="'IllustrationDataUnitOrganisasi'" @onUsulkan="actionButtonJabatan()" :primaryText="'Tambahkan'">
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldJenisJabatan">Jenis Jabatan</label>
          <select class="custom-select" id="fieldJenisJabatan" v-model="dataJabatan.idJenisJabatan">
            <option value="0" selected disabled>Pilih Jenis Jabatan</option>
            <option :selected="item.id === dataJabatan.idJenisJabatan" v-for="item in daftarJenisJabatan" :key="item.id" :value="item.id">
              {{ item.nama }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldUnitOrganisasi">Kode Komponen Unit Organisasi</label>
          <input type="text" id="fieldUnitOrganisasi" class="form-control" placeholder="431.xx" v-model="dataJabatan.kodeKomponen">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldNamaJabatan">Nama Jabatan</label>
          <input type="text" id="fieldNamaJabatan" class="form-control" placeholder="Nama Jabatan Unit Organisasi" v-model="dataJabatan.nama">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group text-left">
          <label for="fieldKelasJabatan">Kelas Jabatan</label>
          <select class="custom-select" id="fieldKelasJabatan" v-model="dataJabatan.idKelasJabatan">
            <option value="0" selected disabled>Pilih Kelas Jabatan</option>
            <option :selected="item.id === dataJabatan.idKelasJabatan" v-for="item in daftarKelasJabatan" :key="item.id" :value="item.id">
              {{ item.kelasJabatan }}
            </option>
          </select>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldNominal">Nominal</label>
          <input type="text" disabled id="fieldNominal" class="form-control" :value="textNominal">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldKebutuhan">Kebutuhan Jabatan</label>
          <input type="number" id="fieldKebutuhan" class="form-control" placeholder="0" v-model="dataJabatan.kebutuhan">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldTarget">Target</label>
          <input type="number" id="fieldTarget" class="form-control" placeholder="0" v-model="dataJabatan.target">
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
  watch: {
    "dataJabatan.idKelasJabatan"() {
      this.textNominal
    }
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
      dataJabatan: {
        // unitOrganisasi: {
        //   nama: "",
        //   kodeKomponen: "",
        // },
        kodeKomponen: "",
        nama: "",
        kebutuhan: 0,
        idKelasJabatan: 0,
        idJenisJabatan: 0,
        target: 0,
      },
      daftarKelasJabatan: [],
      daftarJenisJabatan: []
    }
  },
  computed: {
    textNominal() {
      if(this.daftarKelasJabatan.length > 1 && this.dataJabatan.idKelasJabatan !== 0) {
        return this.daftarKelasJabatan.find(el => el.id === this.dataJabatan.idKelasJabatan).uangKinerja
      }
      return ""
    }
  },
  methods: {
    actionButtonJabatan() {
      let url = this.$store.getters.getModalMethod === "UPDATE" ? `/jabatan-detail/${this.$store.getters.getModalData.id}` : "/jabatan"
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: this.$store.getters.getModalMethod === "UPDATE" ? "PUT" : "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataJabatan), u)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        console.log(data)
      })
    },
    getDataJabatan() {
      axios({
        url: `${env.VITE_BACKEND_URL}/jabatan-detail/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataJabatan = data.message
      })
    },
    getDaftarJenisJabatan() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/jenis-jabatan`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarJenisJabatan = data.message
      })
    },
    getDaftarKelasJabatan() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/kelas-jabatan`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarKelasJabatan = data.message
      })
    },
  },
  created() {
    if (this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataJabatan()
    }
    this.getDaftarJenisJabatan()
    this.getDaftarKelasJabatan()
  },
  destroyed() {
    this.$destroy()
  }
}
</script>

<style lang="less" scoped>
</style>