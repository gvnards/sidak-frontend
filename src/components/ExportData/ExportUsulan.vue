<template>
  <div class="row">
    <div class="col-12">
      <ShimmeringItem :layouts="[12]" v-if="isLoading" />
      <div class="form-group" v-else>
        <label for="fieldDaftarUsulan">Daftar Usulan</label>
        <div class="input-group">
          <div class="input-group-prepend" v-for="item in daftarFilter.daftarUsulan" :key="item.id">
            <div class="input-group-text" style="background-color: transparent; border: 0px solid transparent;">
              <input type="checkbox" class="form-control checked-box" style="width: 16px; height: 16px;" @click="onCheckedFilter(item.id, 'daftarUsulan')">
              <span class="checkbox-item text-primary">{{ item.nama }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-md-3">
      <ShimmeringItem :layouts="[12]" v-if="isLoading" />
      <div class="form-group" v-else>
        <label for="fieldStatusVerifikasi">Status Verifikasi</label>
        <div class="input-group">
          <div class="input-group-prepend" v-for="item in daftarFilter.statusVerifikasi" :key="item.id">
            <div class="input-group-text" style="background-color: transparent; border: 0px solid transparent;">
              <input type="checkbox" class="form-control checked-box" style="width: 16px; height: 16px;" @click="onCheckedFilter(item.id, 'statusVerifikasi')">
              <label class="checkbox-item text-primary">{{ item.nama }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-3">
      <ShimmeringItem :layouts="[12]" v-if="isLoading" />
      <div class="form-group" v-else>
        <label for="fieldStartDate">Dari Tanggal</label>
        <input type="date" class="form-control" v-model="dataFilter.startDate">
      </div>
    </div>
    <div class="col-12 col-sm-6 col-md-3">
      <ShimmeringItem :layouts="[12]" v-if="isLoading" />
      <div class="form-group" v-else>
        <label for="fieldEndDate">Sampai Tanggal</label>
        <input type="date" class="form-control" v-model="dataFilter.endDate">
      </div>
    </div>
    <div class="col-12" v-if="validation.isError" style="margin-bottom: 12px; border-left: 2px solid #dc3545;">
      <small class="text-danger" style="white-space: pre-line; font-weight: 500;">
        {{ validation.message }}
      </small>
    </div>
    <div class="col-12">
      <button :disabled="isLoading" class="btn btn-sm my-btn-primary btn-block" @click="onExport()">Export</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"
const env = import.meta.env
import ShimmeringItem from "../ShimmeringItem.vue"
export default {
  components: {
    ShimmeringItem
  },
  data() {
    return {
      isLoading: true,
      validation: {
        isError: false,
        message: ""
      },
      daftarFilter: {
        statusVerifikasi: [],
        daftarUsulan: [],
      },
      dataFilter: {
        statusVerifikasi: [],
        daftarUsulan: [],
        startDate: null,
        endDate: null
      }
    }
  },
  methods: {
    onExport() {
      this.validation.isError = false
      this.validation.message = ""
      if (this.dataFilter.daftarUsulan.length === 0) {
        this.validation.isError = true
        this.validation.message += "* Daftar Usulan belum dipilih\n"
      }
      if (this.dataFilter.statusVerifikasi.length === 0) {
        this.validation.isError = true
        this.validation.message += "* Status verifikasi belum dipilih\n"
      }
      if (this.dataFilter.startDate === null) {
        this.validation.isError = true
        this.validation.message += "* Tanggal mulai harus diisi\n"
      }
      if (this.dataFilter.endDate === null) {
        this.validation.isError = true
        this.validation.message += "* Tanggal selesai harus diisi\n"
      }
      if (this.validation.isError) return
      this.$emit("onExport", this.dataFilter)
    },
    onCheckedFilter(item, daftarFilter) {
      let countData = this.dataFilter[daftarFilter].filter(el => parseInt(el) === parseInt(item))
      let itemInt = parseInt(item)
      countData.length > 0 ? this.dataFilter[daftarFilter] = this.dataFilter[daftarFilter].filter(el => parseInt(el) !== itemInt) : this.dataFilter[daftarFilter].push(itemInt)
    },
    getDaftarFilter() {
      axios({
        url: `${env.VITE_BACKEND_URL}/export/data-usulan/created`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let message = res.data.message
        this.isLoading = false
        this.daftarFilter.statusVerifikasi = message.statusVerifikasi
        this.daftarFilter.daftarUsulan = message.daftarUsulan
      })
    }
  },
  created() {
    this.getDaftarFilter()
  }
}
</script>

<style lang="less" scoped>
.checkbox-item {
  font-weight: 500;
  margin-left: 6px;
}
</style>