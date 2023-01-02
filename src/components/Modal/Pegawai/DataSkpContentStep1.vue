<template>
  <div>
    <div class="row row-pegawai">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldJenisJabatan">Jenis Jabatan</label>
          <select id="fieldJenisJabatan" v-model="dataSkp.idJenisJabatan" class="custom-select" :class="inputError.jenisJabatan.status ? 'form-error' : ''">
            <option disabled selected>Pilih Jenis Jabatan</option>
            <option v-for="item in daftarJenisJabatan" :key="item.id" :value="item.id">{{ item.nama }}</option>
          </select>
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldTahun">Tahun SKP</label>
          <input type="number" v-model="dataSkp.tahunSkp" id="fieldTahun" class="form-control" :class="inputError.tahun.status ? 'form-error' : ''" placeholder="2010">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldJenisPeraturanKinerja">Jenis Peraturan Kinerja</label>
          <select id="fieldJenisPeraturanKinerja" v-model="dataSkp.idJenisPeraturanKinerja" class="custom-select" :class="inputError.jenisPeraturanKinerja.status ? 'form-error' : ''">
            <option disabled selected>Pilih Jenis Peraturan Kinerja</option>
            <option v-for="item in daftarJenisPeraturanKinerja" :key="item.id" :value="item.id">{{ item.nama }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-4">
        <div class="form-group">
          <label for="fieldNilaiSkp">Nilai SKP</label>
          <input type="number" v-model="dataSkp.nilaiSkp" id="fieldNilaiSkp" class="form-control" step="0.01" min="0.00" :class="inputError.nilaiSkp.status ? 'form-error' : ''" placeholder="89.42">
        </div>
      </div>
      <div class="col-4">
        <div class="form-group">
          <label for="fieldPersen" style="visibility: hidden;">.</label>
          <input type="text" id="fieldPersen" class="form-control" disabled value="60%">
        </div>
      </div>
      <div class="col-4">
        <div class="form-group">
          <label for="fieldHasilNilaiSkp" style="visibility: hidden;">.</label>
          <input type="text" id="fieldHasilNilaiSkp" class="form-control" disabled :value="dataSkp.nilaiSkp">
        </div>
      </div>
    </div>
    <p style="color: #477b79; border-bottom: 1px solid #477b79;"><strong><i>Perilaku Kerja</i></strong></p>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldOrientasiPelayanan">Orientasi Pelayanan</label>
          <input type="number" step="0.01" placeholder="89.42" id="fieldOrientasiPelayanan" min="0.00" class="form-control" v-model="dataSkp.orientasiPelayanan">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldIntegritas">Integritas</label>
          <input type="number" id="fieldIntegritas" step="0.01" placeholder="89.42" min="0.00" class="form-control" v-model="dataSkp.integritas">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldKomitmen">Komitmen</label>
          <input type="number" step="0.01" placeholder="89.42" id="fieldKomitmen" min="0.00" class="form-control" v-model="dataSkp.komitmen">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldDisiplin">Disiplin</label>
          <input type="number" id="fieldDisiplin" step="0.01" placeholder="89.42" min="0.00" class="form-control" v-model="dataSkp.disiplin">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldKerjaSama">Kerja Sama</label>
          <input type="number" step="0.01" placeholder="89.42" id="fieldKerjaSama" min="0.00" class="form-control" v-model="dataSkp.kerjaSama">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldKepemimpinan">Kepemimpinan</label>
          <input type="number" id="fieldKepemimpinan" step="0.01" placeholder="89.42" min="0.00" class="form-control" v-model="dataSkp.kepemimpinan">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-4">
        <div class="form-group">
          <label for="fieldNilaiPerilakuKerja">Nilai Perilaku Kerja</label>
          <input type="number" v-model="dataSkp.nilaiPerilakuKerja" id="fieldNilaiPerilakuKerja" class="form-control" step="0.01" min="0.00" placeholder="89.42">
        </div>
      </div>
      <div class="col-4">
        <div class="form-group">
          <label for="fieldPersen" style="visibility: hidden;">.</label>
          <input type="text" id="fieldPersen" class="form-control" disabled value="60%">
        </div>
      </div>
      <div class="col-4">
        <div class="form-group">
          <label for="fieldHasilNilaiPerilakuKerja" style="visibility: hidden;">.</label>
          <input type="text" id="fieldHasilNilaiPerilakuKerja" class="form-control" disabled :value="dataSkp.nilaiPerilakuKerja">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldNilaiPrestasiKerja">Nilai Prestasi Kerja</label>
          <input type="number" min="0.00" step="0.01" disabled :value="dataSkp.nilaiPrestasi" class="form-control">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldNilaiKonversi">Nilai Konversi</label>
          <input type="number" step="0.01" disabled id="fieldNilaiKonversi" min="0.00" class="form-control" :value="dataSkp.nilaiKonversi">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldNilaiIntegrasi">Nilai Integrasi</label>
          <input type="number" disabled id="fieldNilaiIntegrasi" step="0.01" min="0.00" class="form-control" :value="dataSkp.nilaiIntegrasi">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
const env = import.meta.env
export default {
  data() {
    return {
      dataSkp: {},
      inputError: {
        jenisJabatan: {
          status: false,
          description: ""
        },
        tahun: {
          status: false,
          description: ""
        },
        nilaiSkp: {
          status: false,
          description: ""
        },
        jenisPeraturanKinerja: {
          status: false,
          description: ""
        }
      },
      daftarJenisPeraturanKinerja: [],
      daftarJenisJabatan: []
    }
  },
  methods: {
    getJenisJabatan() {
      axios({
        url: `${env.VITE_BACKEND_URL}/jenisJabatan`,
        method: "GET"
      }).then(res => {
        this.daftarJenisJabatan = res.data
      })
      setTimeout(() => {
        this.daftarJenisJabatan = [
          {
            id: 1,
            nama: "Struktural"
          },
          {
            id: 2,
            nama: "Fungsional Umum"
          },
          {
            id: 3,
            nama: "Fungsional Tertentu"
          }
        ]
      }, 1000)
    },
    getJenisPeraturanKinerja() {
      axios({
        url: `${env.VITE_BACKEND_URL}/jenisJabatan`,
        method: "GET"
      }).then(res => {
        this.daftarJenisPeraturanKinerja = res.data
      })
      setTimeout(() => {
        this.daftarJenisPeraturanKinerja = [
          {
            id: 1,
            nama: "PP 46 Tahun 2013"
          },
          {
            id: 2,
            nama: "PP 30 Tahun 2019"
          }
        ]
      }, 1000)
    }
  },
  created() {
    this.getJenisJabatan()
    this.getJenisPeraturanKinerja()
  },
  destroyed() {
    this.$destroy()
  }
}
</script>