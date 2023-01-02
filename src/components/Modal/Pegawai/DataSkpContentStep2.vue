<template>
  <div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldStatusPejabatPenilai">Status Pejabat Penilai</label>
          <select id="fieldStatusPejabatPenilai" class="custom-select" v-model="dataSkp.idStatusPejabatPenilai">
            <option disabled selected>Pilih Status Pejabat Penilai</option>
            <option :value="item.id" v-for="item in statusPejabatPenilai" :key="item.id">{{ item.nama }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div :class="dataSkp.idStatusPejabatPenilai === 1 ? 'col-10' : 'col-12'">
        <div class="form-group">
          <label for="fieldNipNrp">NIP/NRP</label>
          <input type="text" placeholder="Masukkan NIP/NRP" class="form-control">
        </div>
      </div>
      <div class="col-2" v-if="dataSkp.idStatusPejabatPenilai === 1">
        <input type="text" style="visibility: hidden;">
        <div class="btn my-btn-primary">Cari</div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldNamaPejabatPenilai">Nama</label>
          <input type="text" class="form-control" :disabled="dataSkp.idStatusPejabatPenilai === 1" :value="dataSkp.namaPejabatPenilai">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldJabatanPejabatPenilai">Jabatan</label>
          <input type="text" class="form-control" :disabled="dataSkp.idStatusPejabatPenilai === 1" :value="dataSkp.jabatanPejabatPenilai">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldUnitOrganisasiPejabatPenilai">Unit Organisasi</label>
          <input type="text" class="form-control" :disabled="dataSkp.idStatusPejabatPenilai === 1" :value="dataSkp.unitOrganisasiPejabatPenilai">
        </div>
      </div>
    </div>
    <div class="row row-form">
      <div class="col-6">
        <div class="form-group">
          <label for="fieldGolonganPejabatPenilai">Golongan</label>
          <input type="text" class="form-control" :disabled="dataSkp.idStatusPejabatPenilai === 1" :value="dataSkp.golonganPejabatPenilai">
        </div>
      </div>
      <div class="col-6">
        <div class="form-group">
          <label for="fieldTmtGolonganPejabatPenilai">TMT Golongan</label>
          <input type="date" class="form-control" :disabled="dataSkp.idStatusPejabatPenilai === 1" :value="dataSkp.tmtGolonganPejabatPenilai">
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
      statusPejabatPenilai: []
    }
  },
  methods: {
    getStatusPejabatPenilai() {
      axios({
        url: `${env.VITE_BACKEND_URL}/statusPejabatPenilai`,
        method: "GET"
      }).then(res => {
        this.statusPejabatPenilai = res.data
      })
      setTimeout(() => {
        this.statusPejabatPenilai = [
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
    this.getStatusPejabatPenilai()
  }
}
</script>