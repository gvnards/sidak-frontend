<template>
  <div id="open-list-wrapper" :style="getIsUsulanMobile ? '' : 'margin: 20px;'">
    <i class="fa-solid fa-envelope-open-text bg-icon"></i>
    <UsulanHeader :mainText="getUsulanData.usulanKriteria" style="position: relative; z-index: 2;" />
    <div id="usulan-open-item">
      <div class="usulan-open-item-wrapper usulan-status" v-if="(getUsulanData.idUsulanStatus !== undefined && getUsulanData.idUsulanStatus == 3 && usulanDetail.id !== undefined)">
        <div class="row row-form">
          <div class="col-12">
            <p class="usulan-item-header" :style="getUsulanData.idUsulanHasil == 1 ? 'color: #477b79;' : 'color: #EC392F;'">
              Alasan Usulan {{ getUsulanData.idUsulanHasil == 1 ? 'Diterima' : 'Ditolak' }}
            </p>
            <p class="usulan-item-fill" style="white-space: pre;" :style="getUsulanData.idUsulanHasil == 1 ? 'border: 1px solid #477b79; color: #477b79;' : 'border: 1px solid #EC392F; color: #EC392F;'">
              {{ usulanDetail.keteranganUsulan }}
            </p>
          </div>
        </div>
      </div>
      <UsulanPasangan v-if="getUsulanData.usulanKriteria === 'Data Pasangan'" :dataPasangan="usulanDetail" />
      <UsulanAnak v-if="getUsulanData.usulanKriteria === 'Data Anak'" :dataAnak="usulanDetail" />
      <UsulanPendidikan v-if="getUsulanData.usulanKriteria === 'Data Pendidikan'" :dataPendidikan="usulanDetail" />
      <UsulanPangkat v-if="getUsulanData.usulanKriteria === 'Data Pangkat'" :dataPangkat="usulanDetail" />
      <UsulanDiklat v-if="getUsulanData.usulanKriteria === 'Data Diklat'" :dataDiklatKursus="usulanDetail" />
      <UsulanSkp v-if="getUsulanData.usulanKriteria === 'Data SKP'" :dataSkp="usulanDetail" />
      <UsulanJabatan v-if="getUsulanData.usulanKriteria === 'Data Jabatan'" :dataJabatan="usulanDetail" />
    </div>
    <div class="row row-form" style="margin-top: 10px; position: relative; z-index: 2;" v-if="(getUsulanData.id !== undefined) && (getUsulanData.idUsulanStatus !== 3) && isVisibleButton">
      <div class="col-6"><div class="btn btn-block my-btn-danger"
            data-toggle="modal"
            data-target="#modal"
            data-backdrop="static"
            data-keyboard="false"
            @click="usulanPopup('DECLINE')">Tolak</div></div>
      <div class="col-6"><div class="btn btn-block my-btn-primary"
            data-toggle="modal"
            data-target="#modal"
            data-backdrop="static"
            data-keyboard="false"
            @click="usulanPopup('APPROVE')">Setuju</div></div>
    </div>
  </div>
</template>

<script>
import UsulanHeader from "./Content/UsulanHeader.vue"
import UsulanPasangan from "./Content/UsulanPasangan.vue"
import UsulanAnak from "./Content/UsulanAnak.vue"
import UsulanPendidikan from "./Content/UsulanPendidikan.vue"
import UsulanPangkat from "./Content/UsulanPangkat.vue"
import UsulanDiklat from "./Content/UsulanDiklat.vue"
import UsulanSkp from "./Content/UsulanSkp.vue"
import UsulanJabatan from "./Content/UsulanJabatan.vue"
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    UsulanHeader,
    UsulanPasangan,
    UsulanAnak,
    UsulanPendidikan,
    UsulanPangkat,
    UsulanDiklat,
    UsulanSkp,
    UsulanJabatan
  },
  watch: {
    getUsulanData(val) {
      if (!this.isEmpty(val)) {
        this.getUsulanDetail(val)
      }
    },
  },
  computed: {
    getUsulanData() {
      return this.$store.getters.getUsulanData
    },
    getIsUsulanMobile() {
      return this.$store.getters.getIsUsulanMobile
    }
  },
  data() {
    return {
      usulanDetail: {},
      isVisibleButton: false
    }
  },
  methods: {
    usulanPopup(val) {
      let usulan = {...this.usulanDetail}
      usulan.usulanKriteria = this.getUsulanData.usulanKriteria
      this.$store.commit("onModalMethod", val)
      this.$store.commit("onModalFolder", "Usulan")
      this.$store.commit("onModalContent", "Usulan")
      this.$store.commit("onModalData", usulan)
    },
    getUsulanDetail(item) {
      this.usulanDetail = {}
      this.isVisibleButton = false
      let token = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab")
      let u = token.username
      let role = token.idAppRoleUser
      axios({
        url: `${env.VITE_BACKEND_URL}/usulan-detail/${item.id}/${item.usulanKriteria}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.usulanDetail = data.message[0]
        if(this.usulanDetail.idUsulanHasil == 3) {
          if (role === 1) {
            this.isVisibleButton = true
          } else if ((role === 2 || role === 3) && (item.usulanKriteria === "Data Pasangan" || item.usulanKriteria === "Data Anak")) {
            this.isVisibleButton = true
          }
        }
      })
    },
    isEmpty(object) {
      for (const property in object) {
        return false
      }
      return true
    }
  },
  created() {
    if (!this.isEmpty(this.getUsulanData)) {
      this.getUsulanDetail(this.getUsulanData)
    }
  }
}
</script>

<style lang="less" scoped>

.usulan-open-item-wrapper {
  margin-bottom: 20px;
  padding-bottom: 20px;
  &.usulan-status {
    border-bottom: 2px dashed #477b79;
  }
}
p {
  padding: 0;
  margin: 0px;
  word-break: break-all;
  min-height: 32px;
  &.usulan-item-header {
    font-weight: 600;
    margin-bottom: 4px;
  }
  &.usulan-item-fill {
    margin-top: 4px;
    border: 1px solid #477b79;
    background-color: #EBEBEB;
    border-radius: 4px;
    font-weight: 500;
    padding: 6px 10px;
    box-sizing: border-box;
    cursor: default;
  }
}
#open-list-wrapper {
  background-color: #FFFFFF;
  box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.1);
  width: 100%;
  min-width: 200px;
  padding: 40px;
  box-sizing: border-box;
  position: relative;
  max-height: calc(100% - 60px);
  .bg-icon {
    width: 80%;
    height: 80%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #477B7905;
    z-index: 1;
  }
}

#usulan-open-item {
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: auto;
  max-height: calc(100% - 80px);
  position: relative;
  z-index: 2;
}
</style>