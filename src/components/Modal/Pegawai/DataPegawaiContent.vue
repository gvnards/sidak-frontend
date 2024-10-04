<template>
  <ModalHeaderFooter :header-title="'Pegawai'" :header-subtitle="'pegawai'" :illustration="'IllustrationDataPangkatGolongan'" :primaryText="'Tambah'" @onUsulkan="onUsulkan()">
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label>Jenis Penambahan Data</label>
          <br>
          <div class="form-check" v-for="(item, idx) in jenisPenambahanData.list" :key="idx" style="display: inline-block; margin-right: 8px;">
            <input v-model="jenisPenambahanData.checked" class="form-check-input" type="radio" :id="item" :name="item" :value="idx" :checked="jenisPenambahanData.checked === idx">
            <label class="form-check-label" :for="item">
              {{ item }}
            </label>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="form-group text-left" v-if="jenisPenambahanData.checked === 0">
          <label>Dokumen Kolektif (.txt)</label>
          <div class="custom-file">
            <input type="file" class="custom-file-input" accept=".txt" id="fileKolektif" @change="onChangeFile">
            <label class="custom-file-label" for="fileKolektif" :class="dokumen.error.isError ? 'form-error text-danger' : ''">{{ dokumen.nama === '' ? 'Cari dokumen' : dokumen.nama }}</label>
          </div>
          <small class="text-red"><b v-if="dokumen.error.isError">*{{ dokumen.error.message }}</b></small>
        </div>
        <div class="form-group text-left" v-if="jenisPenambahanData.checked === 1">
          <div class="form-group">
            <label for="fieldNip">NIP</label>
            <input
              :class="nip.error.isError ? 'form-error' : ''"
              type="text"
              placeholder="Masukkan NIP Pegawai"
              v-model="nip.value"
              id="fieldNip"
              class="form-control"
            />
            <small class="text-red"><b v-if="nip.error.isError">* {{ nip.error.message }}</b></small>
          </div>
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
      jenisPenambahanData: {
        list: [
          "Kolektif",
          "Satuan"
        ],
        checked: 0
      },
      dokumen: {
        error: {
          message: "",
          isError: false
        },
        nama: "",
        value: null
      },
      nip: {
        error: {
          message: "",
          isError: false
        },
        value: ""
      }
    }
  },
  computed: {
    isFulfilled() {
      return this.dataPegawai.statusKepegawaian !== 0 && this.dataPegawai.nip !== "" && this.dataPegawai.nama !== "" && this.dataPegawai.tempatLahir !== "" && this.dataPegawai.tanggalLahir !== "" && this.dataPegawai.nik !== ""
    },
  },
  methods: {
    resetDokumen() {
      this.dokumen = {
        error: {
          message: "",
          isError: false
        },
        nama: "",
        value: null
      }
    },
    onChangeFile(item) {
      this.dokumen.nama = ""
      this.dokumen.error.isError = false
      let file = item.target.files && item.target.files[0]
      if(!file || item.target.files[0].type !== "text/plain") {
        this.resetDokumen()
        this.dokumen.error.message = "Dokumen tidak valid!"
        this.dokumen.error.isError = true
        item.target.value = null
        return
      }
      this.dokumen.nama = file.name
      this.dokumen.value = file
    },
    addPegawai(data) {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      return axios({
        url: `${env.VITE_BACKEND_URL}/add-pegawai`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(data), u)
        }
      }).then(res => {
        console.log(res)
      })
    },
    async onUsulkan() {
      if (this.jenisPenambahanData.checked === 0) {
        let reader = new FileReader()
        reader.readAsText(this.dokumen.value)
        reader.addEventListener(
          "load",
          async () => {
            let nips = reader.result
            let arrayNip = nips.split("\r\n")
            await this.addPegawai(arrayNip)
          }
        )
      } else if (this.jenisPenambahanData.checked === 1) {
        await this.addPegawai([this.nip.value])
      }
    }
  }
}
</script>