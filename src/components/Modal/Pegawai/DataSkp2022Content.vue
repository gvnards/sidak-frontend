<template>
  <ModalHeaderFooter :header-title="'SKP'" :header-subtitle="'skp'" :illustration="'IllustrationDataSkp'" @onUsulkan="onUsulkan()" :primaryText="'Perbaharui'">
    <ShimmeringItem v-if="loading" :layouts="[12,6,6,12,12,12,12,12,12]" />
    <div v-else>
      <div class="text-red" style="padding: 0.375rem 1.75rem 0.375rem 0.75rem; border-radius: 0.25rem; border: 1px solid #EC392F; font-size: 14px; font-weight: 600; margin-bottom: 10px;">*Data SKP telah sesuai dengan yang ada di MySAPK.<br>*Silahkan mengunggah berkas dokumen SKP.</div>
      <div class="row row-form">
        <div class="col-12">
          <div class="form-group">
            <label for="tahun">Tahun</label>
            <input disabled id="tahun" style="cursor: not-allowed;" type="text" class="form-control" :value="dataSkp.tahun">
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="perilakuKerja">Perilaku Kerja</label>
            <input disabled id="perilakuKerja" style="cursor: not-allowed;" type="text" class="form-control" :value="dataSkp.perilakuKerja">
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <div class="form-group">
            <label for="hasilKinerja">Hasil Kinerja</label>
            <input disabled id="hasilKinerja" style="cursor: not-allowed;" type="text" class="form-control" :value="dataSkp.hasilKinerja">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="kuadranKinerja">Kuadran Kinerja</label>
            <input disabled id="kuadranKinerja" style="cursor: not-allowed;" type="text" class="form-control" :value="dataSkp.kuadranKinerja">
          </div>
        </div>
        <div class="col-12">
          <p style="color: #477b79; border-bottom: 1px solid #477b79;"><strong><i>Pejabat Penilai</i></strong></p>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="statusPejabatPenilai">Status</label>
            <input disabled id="statusPejabatPenilai" style="cursor: not-allowed;" type="text" class="form-control" :value="dataSkp.statusPejabatPenilai">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="nipNrpPejabatPenilai">NIP/NRP</label>
            <input disabled id="nipNrpPejabatPenilai" style="cursor: not-allowed;" type="text" class="form-control" :value="dataSkp.nipNrpPejabatPenilai">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="namaPejabatPenilai">Nama</label>
            <input disabled id="namaPejabatPenilai" style="cursor: not-allowed;" type="text" class="form-control" :value="dataSkp.namaPejabatPenilai">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label for="unitOrganisasiPejabatPenilai">Unit Organisasi</label>
            <input disabled id="unitOrganisasiPejabatPenilai" style="cursor: not-allowed;" type="text" class="form-control" :value="dataSkp.unitOrganisasiPejabatPenilai">
          </div>
        </div>
        <div class="col-12">
          <div class="form-group text-left">
            <label for="fieldDokumenSkp2022">Dokumen SKP</label>
            <div class="custom-file">
              <input type="file" class="custom-file-input" accept="application/pdf" id="fieldDokumenSkp2022" @change="onChangeFile">
              <label class="custom-file-label" for="fieldDokumenSkp2022" :class="inputError.dokumen.status ? 'form-error' : ''">Cari dokumen</label>
            </div>
            <small :class="inputError.dokumen.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.dokumen.status ? inputError.dokumen.description : `Ukuran dokumen maksimal ${fileCategory.ukuran}MB(${fileCategory.ukuran * 1024}KB).` }}</b></small>
          </div>
        </div>
        <div class="col-12">
          <iframe v-if="dataSkp.dokumen !== '' && dataSkp.dokumen !== null" :src="dataSkp.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
        </div>
      </div>
    </div>
  </ModalHeaderFooter>
</template>

<script>
import axios from "axios"
const env = import.meta.env
import mixins from "@/mixins/index.js"
import ShimmeringItem from "@/components/ShimmeringItem.vue"
export default {
  components: {
    ShimmeringItem
  },
  mixins: [mixins],
  data() {
    return {
      loading: true,
      dataSkp: {},
      inputError: {
        dokumen: {
          description: "",
          status: false
        }
      },
      fileCategory: {}
    }
  },
  methods: {
    onUsulkan() {
      if (this.dataSkp.dokumen === "") {
        this.inputError.dokumen.status = true
        this.inputError.dokumen.description = "Dokumen harus diisi"
        return
      }
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let dataSkp = {
        dokumen: this.dataSkp.dokumen,
        date: Date.now()
      }
      axios({
        url: `${env.VITE_BACKEND_URL}/data-skp/${this.dataSkp.tahun}/${this.dataSkp.id}`,
        method: "PUT",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(dataSkp), u)
        }
      }).then(res => {
        let data = res.data
        this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: parseInt(data.status) === 2 || data.status === true ? "Success" : "Failed",
          message: data.message
        })
      })
    },
    getDataSkp() {
      this.loading = true
      let idPegawai = this.$store.getters.getIdPegawai
      axios({
        url: `${env.VITE_BACKEND_URL}/data-skp/detail/${idPegawai}/${this.$store.getters.getModalData.tahun}/${this.$store.getters.getModalData.id}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.loading = false
        let data = res.data
        this.dataSkp = data.message.dataSkp[0]
        this.fileCategory = data.message.dokumenKategori
      })
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * this.fileCategory.ukuran)) {
          this.inputError.dokumen.status = true
          this.inputError.dokumen.description = `Ukuran file melebihi ${this.fileCategory.ukuran * 1024}KB.`
          item.target.value = null
          this.dataSkp.dokumen = ""
        } else if (item.target.files[0].type !== "application/pdf") {
          this.inputError.dokumen.status = true
          this.inputError.dokumen.description = "Dokumen harus berjenis PDF."
          item.target.value = null
          this.dataSkp.dokumen = ""
        } else {
          this.inputError.dokumen.status = false
          this.dataSkp.dokumen = await this.getBase64(item.target.files[0])
        }
      }
    },
  },
  created() {
    if(this.$store.getters.getModalMethod === "UPDATE") {
      this.getDataSkp()
    }
  },
  destroyed() {
    this.$destroy()
  }
}
</script>