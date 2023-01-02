<template>
  <div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldStatusAtasanPejabatPenilai">Status Atasan Pejabat Penilai</label>
          <select id="fieldStatusAtasanPejabatPenilai" class="custom-select" v-model="dataSkp.idStatusAtasanPejabatPenilai">
            <option disabled selected>Pilih Status Atasan Pejabat Penilai</option>
            <option :value="item.id" v-for="item in statusAtasanPejabatPenilai" :key="item.id">{{ item.nama }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div :class="dataSkp.idStatusAtasanPejabatPenilai === 1 ? 'col-10' : 'col-12'">
        <div class="form-group">
          <label for="fieldNipNrp">NIP/NRP</label>
          <input type="text" placeholder="Masukkan NIP/NRP" class="form-control">
        </div>
      </div>
      <div class="col-2" v-if="dataSkp.idStatusAtasanPejabatPenilai === 1">
        <input type="text" style="visibility: hidden;">
        <div class="btn my-btn-primary">Cari</div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldNamaAtasanPejabatPenilai">Nama</label>
          <input type="text" class="form-control" :disabled="dataSkp.idStatusAtasanPejabatPenilai === 1" :value="dataSkp.namaAtasanPejabatPenilai">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldJabatanAtasanPejabatPenilai">Jabatan</label>
          <input type="text" class="form-control" :disabled="dataSkp.idStatusAtasanPejabatPenilai === 1" :value="dataSkp.jabatanAtasanPejabatPenilai">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldUnitOrganisasiAtasanPejabatPenilai">Unit Organisasi</label>
          <input type="text" class="form-control" :disabled="dataSkp.idStatusAtasanPejabatPenilai === 1" :value="dataSkp.unitOrganisasiAtasanPejabatPenilai">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldGolonganAtasanPejabatPenilai">Golongan</label>
          <input type="text" class="form-control" :disabled="dataSkp.idStatusAtasanPejabatPenilai === 1" :value="dataSkp.golonganAtasanPejabatPenilai">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldTmtGolonganAtasanPejabatPenilai">TMT Golongan</label>
          <input type="date" class="form-control" :disabled="dataSkp.idStatusAtasanPejabatPenilai === 1" :value="dataSkp.tmtGolonganAtasanPejabatPenilai">
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
      statusAtasanPejabatPenilai: []
    }
  },
  methods: {
    getStatusAtasanPejabatPenilai() {
      axios({
        url: `${env.VITE_BACKEND_URL}/statusAtasanPejabatPenilai`,
        method: "GET"
      }).then(res => {
        this.statusAtasanPejabatPenilai = res.data
      })
      setTimeout(() => {
        this.statusAtasanPejabatPenilai = [
          {
            id: 1,
            nama: "PNS"
          },
          {
            id: 2,
            nama: "Bukan PNS"
          }
        ]
      }, 1000)
    }
  },
  created() {
    this.getStatusAtasanPejabatPenilai()
  }
}
</script>