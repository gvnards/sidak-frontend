<template>
  <div id="data-skp" class="text-left">
    <div class="btn-wrapper">
      <div
        class="btn-skp text-center active"
      >
        <span>SKP</span>
      </div>
    </div>
    <div class="data-skp-content text-center">
      <LoadingAnimation class="loading" v-if="isLoading" />
        <div
          class="data-not-found-wrapper"
          v-if="!isLoading && dataSkp.length == 0"
        >
          <DataEmpty @addData="addDataSkp()" />
        </div>
        <div v-else-if="!isLoading && dataSkp.length > 0">
          <div v-for="item in dataSkp" :key="item.id" data-toggle="modal" data-target="#modal" data-backdrop="static" data-keyboard="false" @click="editDataSkp(item)">
            <data-found :icon="'fa-solid fa-graduation-cap'" :primaryBrief="`${item.tahun}`" :secondaryBrief="`${item.nilaiPrestasiKerja} | ${gradeNilaiSkp(item.nilaiPrestasiKerja)}`"></data-found>
          </div>
          <div
            class="btn my-btn-primary btn-circle"
            data-toggle="modal"
            data-target="#modal"
            data-backdrop="static"
            data-keyboard="false"
            @click="addDataSkp()"
          >
            <i class="fa-solid fa-plus icon-plus"></i>
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
      isLoading: false,
      dataSkp: []
    }
  },
  methods: {
    addDataSkp() {
      this.$store.commit("onModalMethod", "CREATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataSkp")
    },
    editDataSkp(item) {
      this.$store.commit("onModalMethod", "UPDATE")
      this.$store.commit("onModalFolder", "Pegawai")
      this.$store.commit("onModalContent", "DataSkp")
      this.$store.commit("onModalData", item)
    },
    gradeNilaiSkp(value) {
      if (!value) return ""
      let val_ = parseInt(value)
      if(val_ >= 91) {
        return "Sangat Baik"
      } else if(val_ >= 76 && val_ <= 90) {
        return "Baik"
      } else if(val_ >= 61 && val_ <= 75) {
        return "Cukup"
      } else if(val_ >= 51 && val_ <= 60) {
        return "Kurang"
      } else {
        return "Buruk"
      }
    },
    getDataSkp() {
      this.isLoading = true
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let url = `/data-skp/${this.$store.getters.getIdPegawai}`
      console.log(url)
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.isLoading = false
        if (data.status === 1) {
          this.dataSkp = data.message
        }
        // else {
        //   localStorage.clear()
        //   this.$router.push({
        //     name: "login"
        //   })
        // }
      })
      // .catch(() => {
      //   localStorage.clear()
      //   this.$router.push({
      //     name: "login"
      //   })
      // })
    }
  },
  created() {
    this.getDataSkp()
  }
}
</script>


<style lang="less" scoped>
.icon-plus {
  font-size: 18px;
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.btn-circle {
  width: 32px;
  height: 32px;
}
.loading {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
#data-skp {
  height: 100%;
  .btn-wrapper {
    .btn-skp {
      display: inline-block;
      padding: 6px 16px;
      box-sizing: border-box;
      height: 40px;
      border: 1px solid transparent;
      position: relative;
      z-index: 2;
      top: 1px;
      min-width: 100px;
      font-weight: 600;
      font-size: 14px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      color: #869e9e;
      cursor: pointer;
      transition: all 0.4s;
      &.active {
        color: #477b79;
        border-color: #477b79;
        border-bottom-color: white;
        &:hover {
          color: #477b79 !important;
          border-color: #477b79 !important;
          border-bottom-color: white !important;
        }
      }
      &:hover {
        color: #477b79;
        border-color: #477b79;
      }
    }
  }
  .data-skp-content {
    position: relative;
    border: 1px solid #477b79;
    border-radius: 0px 6px 6px 6px;
    height: 100%;
    max-height: calc(100% - 40px);
    overflow-y: auto;
    scrollbar-width: thin;
    box-sizing: border-box;
    .data-not-found-wrapper {
      box-sizing: border-box;
      padding-top: 40px;
      padding-bottom: 40px;
      .illustration-not-found {
        margin-bottom: 6px;
      }
      p {
        color: #0b0a0f;
        font-weight: 500;
        font-size: 14px;
        margin: 0;
        padding: 0;
      }
    }
    .data-found-wrapper {
      box-sizing: border-box;
      padding: 20px 10px;
      .data-found {
        cursor: pointer;
        border: 1px solid #477b79;
        border-radius: 6px;
        background-color: rgba(255, 255, 255, 0.8);
        font-weight: 700;
        box-sizing: border-box;
        padding: 6px;
        color: #477b79;
        transition: all 0.4s;
        margin: 6px 0px;
        &:hover {
          background-color: rgba(71, 123, 121, 0.8);
          color: white;
        }
      }
    }
  }
}
</style>