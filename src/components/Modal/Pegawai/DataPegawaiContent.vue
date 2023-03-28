<template>
  <ModalHeaderFooter :header-title="'Pegawai'" :header-subtitle="'pegawai'" :illustration="'IllustrationDataPangkatGolongan'" :primaryText="'Tambah'" @onUsulkan="onUsulkan()">
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldStatusKepegawaian">Status Kepegawaian</label>
          <select id="fieldStatusKepegawaian" class="custom-select" :class="inputError.statusKepegawaian.status ? 'form-error' : ''" v-model="dataPegawai.statusKepegawaian">
            <option value="0" selected disabled>Pilih Status Kepegawaian</option>
            <option :selected="item.id === dataPegawai.statusKepegawaian" :value="item.id" v-for="item in daftarStatusKepegawaian" :key="item.id">
              {{ item.nama }}
            </option>
          </select>
          <small class="text-red" v-if="inputError.statusKepegawaian.status"><b>*{{ inputError.statusKepegawaian.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldNip">NIP</label>
          <input type="text" :class="inputError.nip.status ? 'form-error' : ''" class="form-control" id="fieldNip" placeholder="NIP pegawai" v-model="dataPegawai.nip">
          <small class="text-red" v-if="inputError.nip.status"><b>*{{ inputError.nip.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldNama">Nama</label>
          <input :class="inputError.nama.status ? 'form-error' : ''" v-model="dataPegawai.nama" type="text" class="form-control" id="fieldNama" placeholder="Nama lengkap pegawai (tanpa gelar)">
          <small class="text-red" v-if="inputError.nama.status"><b>*{{ inputError.nama.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group text-left">
          <label for="fieldTempatLahir">Tempat Lahir</label>
          <input :class="inputError.tempatLahir.status ? 'form-error' : ''" v-model="dataPegawai.tempatLahir" type="text" class="form-control" id="fieldTempatLahir" placeholder="Tempat lahir pegawai">
          <small class="text-red" v-if="inputError.tempatLahir.status"><b>*{{ inputError.tempatLahir.description }}</b></small>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group text-left">
          <label for="fieldTanggalLahir">Tanggal Lahir</label>
          <input :class="inputError.tanggalLahir.status ? 'form-error' : ''" v-model="dataPegawai.tanggalLahir" type="date" class="form-control" id="fieldTanggalLahir" placeholder="Tanggal lahir pegawai">
          <small class="text-red" v-if="inputError.tanggalLahir.status"><b>*{{ inputError.tanggalLahir.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldNik">NIK</label>
          <input :class="inputError.nik.status ? 'form-error' : ''" v-model="dataPegawai.nik" type="text" class="form-control" id="fieldNik" placeholder="NIK pegawai">
          <small class="text-red" v-if="inputError.nik.status"><b>*{{ inputError.nik.description }}</b></small>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldAlamat">Alamat</label>
          <textarea v-model="dataPegawai.alamat" id="fieldAlamat" cols="30" rows="4" class="form-control" placeholder="Alamat pegawai"></textarea>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldNomorHp">Nomor HP</label>
          <input v-model="dataPegawai.nomorHp" type="text" class="form-control" id="fieldNomorHp" placeholder="Nomor HP pegawai">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group text-left">
          <label for="fieldEmail">Email</label>
          <input v-model="dataPegawai.email" type="email" class="form-control" id="fieldEmail" placeholder="Email pegawai">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12 col-sm-6">
        <div class="form-group text-left">
          <label for="fieldNpwp">Nomor NPWP</label>
          <input v-model="dataPegawai.npwp" type="text" id="fieldNpwp" placeholder="Nomor NPWP pegawai" class="form-control">
        </div>
      </div>
      <div class="col-12 col-sm-6">
        <div class="form-group text-left">
          <label for="fieldBpjs">Nomor BPJS</label>
          <input v-model="dataPegawai.bpjs" type="text" id="fieldBpjs" placeholder="Nomor BPJS pegawai" class="form-control">
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
      dataPegawai: {
        statusKepegawaian: 0,
        nip: "",
        nama: "",
        tempatLahir: "",
        tanggalLahir: "",
        alamat: "",
        nik: "",
        nomorHp: "",
        email: "",
        npwp: "",
        bpjs: ""
      },
      daftarStatusKepegawaian: [],
      inputError: {
        statusKepegawaian: {
          description: "",
          status: false
        },
        nip: {
          description: "",
          status: false
        },
        nama: {
          description: "",
          status: false
        },
        tempatLahir: {
          description: "",
          status: false
        },
        tanggalLahir: {
          description: "",
          status: false
        },
        nik: {
          description: "",
          status: false
        },
      }
    }
  },
  computed: {
    isFulfilled() {
      return this.dataPegawai.statusKepegawaian !== 0 && this.dataPegawai.nip !== "" && this.dataPegawai.nama !== "" && this.dataPegawai.tempatLahir !== "" && this.dataPegawai.tanggalLahir !== "" && this.dataPegawai.nik !== ""
    },
  },
  methods: {
    getDaftarStatusKepegawaian() {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/daftar-status-kepegawaian`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.daftarStatusKepegawaian = data.message
      })
    },
    whereError() {
      this.inputError.statusKepegawaian.status = this.dataPegawai.statusKepegawaian === 0
      this.inputError.statusKepegawaian.description = this.dataPegawai.statusKepegawaian === 0 ? "Status kepegawaian harus dipilih" : ""
      this.inputError.nip.status = this.dataPegawai.nip === ""
      this.inputError.nip.description = this.dataPegawai.nip === "" ? "NIP pegawai harus diisi" : ""
      this.inputError.nama.status = this.dataPegawai.nama === ""
      this.inputError.nama.description = this.dataPegawai.nama === "" ? "Nama pegawai harus diisi" : ""
      this.inputError.tempatLahir.status = this.dataPegawai.tempatLahir === ""
      this.inputError.tempatLahir.description = this.dataPegawai.tempatLahir === "" ? "Tempat lahir pegawai harus diisi" : ""
      this.inputError.tanggalLahir.status = this.dataPegawai.tanggalLahir === ""
      this.inputError.tanggalLahir.description = this.dataPegawai.tanggalLahir === "" ? "Tanggal lahir pegawai harus diisi" : ""
      this.inputError.nik.status = this.dataPegawai.nik === ""
      this.inputError.nik.description = this.dataPegawai.nik === "" ? "NIK pegawai harus diisi" : ""
    },
    onUsulkan() {
      if (!this.isFulfilled) return this.whereError()
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        url: `${env.VITE_BACKEND_URL}/user-pegawai`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(this.dataPegawai), u)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        console.log(data)
      })
    }
  },
  created() {
    this.getDaftarStatusKepegawaian()
  }
}
</script>