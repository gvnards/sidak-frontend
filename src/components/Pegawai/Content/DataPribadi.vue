<template>
  <div id="data-pribadi">
    <LoadingAnimation class="loading" v-if="isLoading" />
    <div v-else>
      <div class="form-group text-left">
        <label for="fieldKtp">Nomor Induk Kependudukan</label>
        <input
          type="text"
          class="form-control"
          id="fieldKtp"
          placeholder="Nomor Induk Kependudukan"
          :value="dataPribadi.ktp"
          disabled
        />
      </div>
      <div class="form-group text-left">
        <label for="fieldNama">Nama</label>
        <input
          type="text"
          class="form-control"
          id="fieldNama"
          placeholder="Nama"
          :value="dataPribadi.nama"
          disabled
        />
      </div>
      <div class="form-group text-left">
        <label for="fieldJenisKelamin">Jenis Kelamin</label>
        <input
          type="text"
          class="form-control"
          id="fieldJenisKelamin"
          placeholder="Jenis Kelamin"
          :value="getJenisKelamin"
          disabled
        />
      </div>
      <div class="form-group text-left">
        <label for="fieldTempatTanggalLahir">Tempat Tanggal Lahir</label>
        <input
          type="text"
          class="form-control"
          id="fieldTempatTanggalLahir"
          placeholder="Tempat Tanggal Lahir"
          :value="
            dataPribadi.tanggalLahir == undefined
              ? ''
              : `${dataPribadi.tempatLahir}, ${dateToDateString(
                  dataPribadi.tanggalLahir,
                  'yyyy-mm-dd',
                  'no-day'
                )}`
          "
          disabled
        />
      </div>
      <div class="form-group text-left">
        <label for="fieldAlamat">Alamat</label>
        <textarea
          class="form-control"
          name="fieldAlamat"
          id="fieldAlamat"
          cols="30"
          rows="3"
          v-model="dataPribadi.alamat"
          placeholder="Alamat Anda"
        ></textarea>
      </div>
      <div class="form-group text-left">
        <label for="fieldEmail">Email</label>
        <input
          type="email"
          class="form-control"
          id="fieldEmail"
          placeholder="Alamat Email Anda"
          v-model="dataPribadi.email"
        />
      </div>
      <div class="form-group text-left">
        <label for="fieldNomorHp">Nomor HP</label>
        <input
          type="text"
          class="form-control"
          id="fieldNomorHp"
          placeholder="Nomor HP Anda"
          v-model="dataPribadi.nomorHp"
        />
      </div>
      <div class="form-group text-left">
        <label for="fieldNpwp">NPWP</label>
        <input
          type="text"
          class="form-control"
          id="fieldNpwp"
          placeholder="Nomor NPWP Anda"
          v-model="dataPribadi.npwp"
        />
      </div>
      <div class="form-group text-left">
        <label for="fieldBpjs">BPJS</label>
        <input
          type="text"
          class="form-control"
          id="fieldBpjs"
          placeholder="Nomor BPJS Anda"
          v-model="dataPribadi.bpjs"
        />
      </div>
      <div
        class="btn my-btn-primary btn-block text-center"
        @click="updateDataPribadi()"
        style="z-index: 2;"
      >
        <span>Simpan Data Pribadi</span>
      </div>
      <button
        type="button"
        hidden
        id="showModal"
        data-toggle="modal"
        data-target="#modal"
        data-backdrop="static"
        data-keyboard="false"
      ></button>
    </div>
  </div>
</template>

<script>
import mixins from "@/mixins/index.js"
import axios from "axios"
const env = import.meta.env
export default {
  mixins: [mixins],
  data() {
    return {
      dataPribadi: {
        nip: "",
        nama: "",
        tempatLahir: "",
        tanggalLahir: "",
        alamat: "",
        ktp: "",
        nomorHp: "",
        email: "",
        npwp: "",
        bpjs: ""
      },
      dataJenisKelamin: {},
      isLoading: false,
    }
  },
  methods: {
    getData() {
      this.dataPribadi = {}
      try {
        let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
        let url = `/data-pribadi/${this.$store.getters.getIdPegawai}`
        axios({
          baseURL: `${env.VITE_BACKEND_URL}${url}`,
          method: "GET",
          headers: {
            "Authorization": localStorage.getItem("token")
          }
        }).then((res) => {
          this.isLoading = false
          let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
          if (data.status === 1) {
            this.dataPribadi = data.message[0]
          } else {
            localStorage.clear()
            this.$router.push({
              name: "login"
            })
          }
        }).catch(() => {
          localStorage.clear()
          this.$router.push({
            name: "login"
          })
        })
      } catch (e) {
        // localStorage.clear()
        // this.$router.push({
        //   name: "login"
        // })
      }
    },
    updateDataPribadi() {
      let p = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      axios({
        baseURL: `${env.VITE_BACKEND_URL}/data-pribadi/${this.dataPribadi.id}`,
        method: "PUT",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify({
            alamat: this.dataPribadi.alamat,
            nomorHp: this.dataPribadi.nomorHp,
            email: this.dataPribadi.email,
            npwp: this.dataPribadi.npwp,
            bpjs: this.dataPribadi.bpjs,
          }), p)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), p)
        this.$store.commit("onModalMethod", "UPDATE")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: data.status === 1 || data.status === true ? "Success" : "Failed",
          message: data.message
        })
        $("#showModal").trigger("click")
        this.getData()
      }).catch(() => {
        this.$store.commit("onModalMethod", "UPDATE")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: "Failed",
          message: "Terjadi kesalahan server. Silahkan menghubungi penyedia layanan Sidak."
        })
        $("#showModal").trigger("click")
      })
    }
  },
  computed: {
    getJenisKelamin() {
      if (this.dataPribadi.nip === undefined) {
        return ""
      }
      return this.dataPribadi.nip.substring(14, 15) === "1" ? "Laki-laki" : "Perempuan"
    }
  },
  created() {
    this.getData()
  },
  destroyed() {
    this.$destroy()
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
#data-pribadi {
  box-sizing: border-box;
  padding: 0px 10px;
  position: relative;
  height: 100%;
  max-height: 100%;
}
.my-btn-primary {
  position: sticky;
  bottom: 0;
  height: 40px;
  font-size: 14px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
  span {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>