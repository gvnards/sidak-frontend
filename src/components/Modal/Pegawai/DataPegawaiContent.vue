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
      <!-- LIST PEGAWAI -->
      <div class="col-12" v-if="dataProcessed.isDone" style="border-top: 1px dashed #477b79;">
        <div style="height: 12px;"></div>
        <small><b>Sukses: {{ dataProcessed.count.success }} | Gagal: {{ dataProcessed.count.failed }}</b></small>
        <div id="list-pegawai-wrapper">
          <div id="list-pegawai">
            <table class="table">
              <thead class="thead-dark">
                <tr style="font-size: 0.85rem;">
                  <th scope="col" class="text-primary text-center" style="background-color: #eff5f5; border-color: #eff5f5; border-right: 2px solid white; padding: 4px;">NIP</th>
                  <th scope="col" class="text-primary text-center" style="background-color: #eff5f5; border-color: #eff5f5; border-right: 2px solid white; padding: 4px;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr class="text-center" v-for="(item, idx) in dataProcessed.data" :key="idx" style="font-size: 12px; font-weight: 500;" :style="parseInt(item.status) === 2 ? '' : 'background-color: #EC392F55;'">
                  <td style="padding: 4px;">{{ item.nip }}</td>
                  <td style="padding: 4px;">{{ parseInt(item.status) === 2 ? "Sukses" : "Gagal" }}</td>
                </tr>
              </tbody>
            </table>
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
  watch: {
    "jenisPenambahanData.checked" () {
      this.resetDokumen()
      this.resetNip()
    }
  },
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
      },
      dataProcessed: {
        data: [],
        count: {
          success: 0,
          failed: 0
        },
        isDone: false
      }
    }
  },
  computed: {
    isFulfilled() {
      return this.dataPegawai.statusKepegawaian !== 0 && this.dataPegawai.nip !== "" && this.dataPegawai.nama !== "" && this.dataPegawai.tempatLahir !== "" && this.dataPegawai.tanggalLahir !== "" && this.dataPegawai.nik !== ""
    },
  },
  methods: {
    resetDataProcessed() {
      this.dataProcessed = {
        data: [],
        count: {
          success: 0,
          failed: 0
        },
        isDone: false
      }
    },
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
    resetNip() {
      this.nip = {
        error: {
          message: "",
          isError: false
        },
        value: ""
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
      this.resetDataProcessed()
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/add-pegawai`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(data), u)
        }
      }).then(res => {
        this.dataProcessed.data = res.data.message
        this.dataProcessed.data.forEach(el => {
          if (parseInt(el.status) === 2) this.dataProcessed.count.success++
          else if (parseInt(el.status) === 3) this.dataProcessed.count.failed++
        })
        this.dataProcessed.isDone = true
      })
    },
    onUsulkan() {
      if (parseInt(this.jenisPenambahanData.checked) === 0) {
        if (this.dokumen.nama === "") {
          this.dokumen.error.isError = this.dokumen.nama === ""
          this.dokumen.error.message = "Dokumen harus diisi"
          return
        }
        let reader = new FileReader()
        reader.readAsText(this.dokumen.value)
        reader.addEventListener(
          "load",
          () => {
            let nips = reader.result
            let arrayNip = nips.split("\r\n")
            this.addPegawai(arrayNip)
          }
        )
      } else if (parseInt(this.jenisPenambahanData.checked) === 1) {
        if (this.nip.value === "") {
          this.nip.error.isError = this.nip.value === ""
          this.nip.error.message = "NIP harus diisi"
          return
        }
        this.addPegawai([this.nip.value])
      }
    }
  }
}
</script>