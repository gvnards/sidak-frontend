<template>
  <ModalHeaderFooter :header-title="'Jabatan/Unit Kerja'" :header-subtitle="'jabatan/unit kerja'" :illustration="'IllustrationDataJabatanUnitKerja'" @onUsulkan="onUsulkan()">
    <div class="form-group text-left" style="margin: 0;">
      <label for="fieldUnitOrganisasi">Unit Organisasi</label>
    </div>
    <div v-for="(unor, idx) in unitOrganisasi" :key="idx">
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group text-left" style="margin-bottom: 8px;">
            <select class="custom-select" @change="onSelectedUnitOrganisasi(idx, $event)">
              <option value="0" :selected="(selectedUnitOrganisasi[idx] === undefined)" disabled>Pilih {{ idx !== 0 ? 'Sub' : '' }} Unit Organisasi</option>
              <option :selected="(selectedUnitOrganisasi[idx] !== undefined && (selectedUnitOrganisasi[idx].id === item.id))" v-for="item in unor" :key="item.id" :value="JSON.stringify(item)">
                {{ item.nama }}
              </option>
            </select>
          </div>
          <div class="btn btn-sm my-btn-primary btn-block" v-if="(isSubOrganisasi[idx] === true)" @click="addSubOrganisasi(idx)">Tambah Sub Organisasi</div>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group" style="padding-bottom: 0; margin-bottom: 0;">
          <label for="fieldDaftarJabatan">Jabatan</label>
          <select class="custom-select" :class="inputError.jabatan.status ? 'form-error' : ''" :disabled="(daftarJabatan.length === 0)" id="fieldDaftarJabatan" v-model="dataJabatanUnitKerja.idJabatan">
            <option value="0" :selected="(dataJabatanUnitKerja.idJabatan === 0)" disabled>{{ daftarJabatan.length === 0 ? 'Tidak Ada Jabatan' : 'Pilih Jabatan' }}</option>
            <option :selected="(dataJabatanUnitKerja.idJabatan === item.id)" v-for="item in daftarJabatan" :key="item.id" :value="item.id">
              {{ item.jabatan }}
            </option>
          </select>
          <small class="text-red"><b>*Jika jabatan tidak ada, silahkan ubah unit organisasi sesuai hirarki</b></small>
          <br>
          <small class="text-red" v-if="inputError.jabatan.status"><b>*{{ inputError.jabatan.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <div class="custom-control custom-checkbox">
            <input type="checkbox" v-model="dataJabatanUnitKerja.isPltPlh" class="custom-control-input" id="fieldIsPltPlh">
            <label class="custom-control-label" for="fieldIsPltPlh">Centang jika jabatan yang akan diusulkan adalah jabatan Plt./Plh.</label>
          </div>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldTmt">TMT</label>
          <input :class="inputError.tmt.status ? 'form-error' : ''" type="date" v-model="dataJabatanUnitKerja.tmt" id="fieldTmt" class="form-control">
          <small class="text-red" v-if="inputError.tmt.status"><b>*{{ inputError.tmt.description }}</b></small>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldSpmt">SPMT</label>
          <input :class="inputError.spmt.status ? 'form-error' : ''" type="date" v-model="dataJabatanUnitKerja.spmt" id="fieldSpmt" class="form-control">
          <small class="text-red" v-if="inputError.spmt.status"><b>*{{ inputError.spmt.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldNomorDokumen">Nomor SK</label>
          <input :class="inputError.nomorDokumen.status ? 'form-error' : ''" type="text" placeholder="Nomor SK Jabatan Anda" v-model="dataJabatanUnitKerja.nomorDokumen" id="fieldNomorDokumen" class="form-control">
          <small class="text-red" v-if="inputError.nomorDokumen.status"><b>*{{ inputError.nomorDokumen.description }}</b></small>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldTglDokumen">Tanggal SK</label>
          <input :class="inputError.tanggalDokumen.status ? 'form-error' : ''" type="date" v-model="dataJabatanUnitKerja.tanggalDokumen" id="fieldTglDokumen" class="form-control">
          <small class="text-red" v-if="inputError.tanggalDokumen.status"><b>*{{ inputError.tanggalDokumen.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldDokumenSk">Dokumen SK</label>
          <div class="custom-file">
            <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenSk" @change="onChangeFile">
            <label class="custom-file-label" for="fieldDokumenSk" :class="inputError.dokumenSk.status ? 'form-error' : ''">Cari dokumen</label>
          </div>
          <small :class="inputError.dokumenSk.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumenSk.status ? inputError.dokumenSk.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <iframe v-if="dataJabatanUnitKerja.dokumen !== '' && dataJabatanUnitKerja.dokumen !== null" :src="dataJabatanUnitKerja.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
      </div>
    </div>
  </ModalHeaderFooter>
</template>

<script>
import axios from "axios"
const env = import.meta.env
import mixins from "@/mixins/index.js"
export default {
  mixins: [mixins],
  data() {
    return {
      fileCategory: {},
      inputError: {
        dokumenSk: {
          status: false,
          description: ""
        },
        jabatan: {
          status: false,
          description: ""
        },
        tmt: {
          status: false,
          description: ""
        },
        spmt: {
          status: false,
          description: ""
        },
        nomorDokumen: {
          status: false,
          description: ""
        },
        tanggalDokumen: {
          status: false,
          description: ""
        },
      },
      unitOrganisasi: [],
      selectedUnitOrganisasi: [],
      isSubOrganisasi: [],
      dataJabatanUnitKerja: {
        idJabatan: 0,
        isPltPlh: false,
        tmt: "",
        spmt: "",
        nomorDokumen: "",
        tanggalDokumen: "",
        dokumen: "",
        kodeKomponen: ""
      },
      daftarJabatan: []
    }
  },
  computed: {
    isFullfilled() {
      return this.dataJabatanUnitKerja.idJabatan !== 0 && this.dataJabatanUnitKerja.tmt !== "" && this.dataJabatanUnitKerja.spmt !== "" && this.dataJabatanUnitKerja.nomorDokumen !== "" && this.dataJabatanUnitKerja.tanggalDokumen !== "" && this.dataJabatanUnitKerja.dokumen !== ""
    }
  },
  methods: {
    whereError() {
      if (this.dataJabatanUnitKerja.idJabatan === 0) {
        this.inputError.jabatan.status = true
        this.inputError.jabatan.description = "Jabatan harus pilih"
      } else {
        this.inputError.jabatan.status = false
        this.inputError.jabatan.description = ""
      }
      if (this.dataJabatanUnitKerja.tmt === "") {
        this.inputError.tmt.status = true
        this.inputError.tmt.description = "TMT harus diisi"
      } else {
        this.inputError.tmt.status = false
        this.inputError.tmt.description = ""
      }
      if (this.dataJabatanUnitKerja.spmt === "") {
        this.inputError.spmt.status = true
        this.inputError.spmt.description = "SPMT harus diisi"
      } else {
        this.inputError.spmt.status = false
        this.inputError.spmt.description = ""
      }
      if (this.dataJabatanUnitKerja.nomorDokumen === "") {
        this.inputError.nomorDokumen.status = true
        this.inputError.nomorDokumen.description = "Nomor SK harus diisi"
      } else {
        this.inputError.nomorDokumen.status = false
        this.inputError.nomorDokumen.description = ""
      }
      if (this.dataJabatanUnitKerja.tanggalDokumen === "") {
        this.inputError.tanggalDokumen.status = true
        this.inputError.tanggalDokumen.description = "Tanggal SK harus diisi"
      } else {
        this.inputError.tanggalDokumen.status = false
        this.inputError.tanggalDokumen.description = ""
      }
      if (this.dataJabatanUnitKerja.dokumen === "") {
        this.inputError.dokumenSk.status = true
        this.inputError.dokumenSk.description = "Dokumen harus diisi"
      } else {
        this.inputError.dokumenSk.status = false
        this.inputError.dokumenSk.description = ""
      }
    },
    onUsulkan() {
      if (!this.isFullfilled) return this.whereError()
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      this.dataJabatanUnitKerja.idPegawai = this.$store.getters.getIdPegawai
      let url = this.$store.getters.getModalMethod === "CREATE" ? "/data-jabatan" : `/data-jabatan/${this.dataJabatanUnitKerja.id}`
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataJabatanUnitKerja), u)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: data.status === 1 || data.status === true ? "Success" : "Failed",
          message: data.message
        })
      }).catch(() => {
        this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: "Failed",
          message: "Terjadi kesalahan server. Silahkan menghubungi penyedia layanan Sidak."
        })
      })
    },
    onSelectedUnitOrganisasi(idx, event) {
      let tempSelectedUnitOrganisasi = [...this.selectedUnitOrganisasi]
      this.selectedUnitOrganisasi[idx] = JSON.parse(event.target.value)
      let isDifferent = false
      for (let i = 0; i < tempSelectedUnitOrganisasi.length; i++) {
        if(tempSelectedUnitOrganisasi[i].id !== this.selectedUnitOrganisasi[i].id) {
          this.unitOrganisasi = this.unitOrganisasi.slice(0, i+1)
          this.selectedUnitOrganisasi = this.selectedUnitOrganisasi.slice(0, i+1)
          this.isSubOrganisasi = this.isSubOrganisasi.slice(0, i+1)
          this.isSubOrganisasi.pop()
          this.getJabatan(this.selectedUnitOrganisasi[i].kodeKomponen)
          isDifferent = true
          break
        }
      }
      this.dataJabatanUnitKerja.idJabatan = 0
      this.hasSubOrganisasi(idx, JSON.parse(event.target.value))
      if (!isDifferent) {
        this.getJabatan(JSON.parse(event.target.value).kodeKomponen)
      }
    },
    getUnitOrganisasi(kodeKomponen) {
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      axios({
        url: `${env.VITE_BACKEND_URL}/unit-organisasi/${kodeKomponen}.`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.isLoading = false
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        if (data.message.length > 0) {
          this.unitOrganisasi.push(data.message)
        }
      })
    },
    addSubOrganisasi(idx) {
      this.isSubOrganisasi[idx] = false
      let kodeKomponen = this.selectedUnitOrganisasi[idx].kodeKomponen
      this.getUnitOrganisasi(kodeKomponen)
    },
    hasSubOrganisasi(idx, item) {
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      axios({
        url: `${env.VITE_BACKEND_URL}/has-sub-organisasi/${item.kodeKomponen}.`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.isSubOrganisasi.push(data.message)
      })
    },
    getJabatan(kodeKomponen) {
      this.daftarJabatan = []
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      axios({
        url: `${env.VITE_BACKEND_URL}/jabatan/${kodeKomponen}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.isLoading = false
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        if (data.message.length > 0) {
          this.daftarJabatan = data.message
        }
      })
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError.dokumenSk.status = true
          this.inputError.dokumenSk.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataJabatanUnitKerja.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumenSk.status = true
          this.inputError.dokumenSk.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataPasangan.dokumen = ""
        } else {
          this.inputError.dokumenSk.status = false
          this.dataJabatanUnitKerja.dokumen = await this.getBase64(item.target.files[0])
        }
      }
    },
    getMaxFileSize() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/dokumen-kategori/jabatan`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.fileCategory = data.message[0]
      })
    },
    getDataJabatanUnitKerja() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-jabatan/${idPegawai}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataJabatanUnitKerja = data.message[0]
        let kodeKomponen = this.dataJabatanUnitKerja.kodeKomponen.split(".")
        let selectedUnitOrganisasi = []
        for(let i=0; i<kodeKomponen.length-1; i++) {
          if (kodeKomponen[i] !== "431") {
            selectedUnitOrganisasi.push(kodeKomponen.slice(0,i+1).join("."))
            this.isSubOrganisasi[i-1] = false
            if (i===kodeKomponen.length-2) {
              selectedUnitOrganisasi.push(kodeKomponen.slice(0,i+2).join("."))
              this.hasSubOrganisasi(i, {kodeKomponen: kodeKomponen.slice(0,i+2).join(".")})
            }
          }
          this.getUnitOrganisasi(kodeKomponen.slice(0,i+1).join("."))
        }
        let isFullfilleds = setInterval(() => {
          if(this.unitOrganisasi.length === kodeKomponen.length-1) {
            selectedUnitOrganisasi.forEach(el => {
              for(let i=0; i<this.unitOrganisasi.length; i++) {
                let findUnitOrganisasi = this.unitOrganisasi[i].find(el_ => el_.kodeKomponen === el)
                if(findUnitOrganisasi !== undefined) {
                  this.selectedUnitOrganisasi.push(findUnitOrganisasi)
                }
              }
            })
            this.getJabatan(this.dataJabatanUnitKerja.kodeKomponen)
            clearInterval(isFullfilleds)
          }
        }, 500)
      })
    }
  },
  async created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataJabatanUnitKerja()
    } else {
      this.getUnitOrganisasi("431")
    }
    this.getMaxFileSize()
  }
}
</script>