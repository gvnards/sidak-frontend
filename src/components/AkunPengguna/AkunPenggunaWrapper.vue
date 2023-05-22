<template>
  <div id="unit-organisasi-wrapper">
    <AkunPenggunaHeader />
    <div id="unit-organisasi" class="text-left">
      <div class="btn-wrapper">
        <div class="btn-unor text-center" :class="btnActive == 'asn' ? 'active' : ''" @click="btnActive='asn'">
          <span>Akun ASN</span>
        </div>
        <div class="btn-unor text-center" :class="btnActive == 'admin' ? 'active' : ''" @click="btnActive='admin'">
          <span>Akun Admin</span>
        </div>
      </div>
      <IllustrationDataJabatan class="illustration-bg" />
      <div class="unit-organisasi-content">
        <LoadingAnimation class="loading" v-if="isLoading" />
        <div v-if="!isLoading" style="height: 100%; max-height: 100%;">
          <div
            class="data-not-found-wrapper text-center"
            v-if="!isLoading && dataAkun.length == 0"
          >
            <DataEmpty @addData="addDataJabatan" />
          </div>
          <div v-else style="height: 100%; max-height: 100%;">
            <div class="form-group search-wrapper">
              <i
                class="fa-solid fa-magnifying-glass search-icon text-primary"
              ></i>
              <input
                type="text"
                v-model="searchValue"
                class="form-control search"
                placeholder="Cari data... (isikan minimal 5 karakter)"
              />
            </div>
            <div class="unor-item-wrapper" :style="btnActive !== 'asn' ? 'max-height: calc(100% - 120px);' : 'max-height: calc(100% - 60px);'">
              <AkunPenggunaItem
                @onReset="resetPassword(item)"
                v-for="item in dataAkun"
                v-show="searchValue.length > 4 ? item.username.toLowerCase().includes(searchValue.toLowerCase()) : true"
                :key="item.id"
                :username="`${item.username}`"
              />
            </div>
            <div
              v-if="btnActive !== 'asn'"
              class="btn btn-block my-btn-primary tambah-unor"
              data-toggle="modal"
              data-target="#modal"
              data-backdrop="static"
              data-keyboard="false"
              @click="addAkunAdmin()"
            >
              Tambah Akun Admin
            </div>
            <div
              data-toggle="modal"
              data-target="#modal"
              data-backdrop="static"
              data-keyboard="false"
              hidden id="modal-reset-password"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AkunPenggunaHeader from "./Content/AkunPenggunaHeader.vue"
import AkunPenggunaItem from "./Content/AkunPenggunaItem.vue"
import axios from "axios"
const env = import.meta.env
export default {
  components: {
    AkunPenggunaHeader,
    AkunPenggunaItem
  },
  data() {
    return {
      btnActive: "admin",
      isLoading: false,
      dataAkun: [],
      searchValue: "",
      newAkun: {}
    }
  },
  watch: {
    btnActive() {
      this.getUsers()
    }
  },
  methods: {
    resetPassword(item) {
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let data = this.$store.getters.getEncrypt(JSON.stringify(item), u)
      axios({
        url: `${env.VITE_BACKEND_URL}/reset-password`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: data
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        $("#modal-reset-password").click()
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusChangePassword")
        this.$store.commit("onModalData", data)
      })
    },
    getUsers() {
      this.isLoading = true
      this.dataAkun = []
      axios({
        url: `${env.VITE_BACKEND_URL}/user-${this.btnActive}`,
        method: "GET",
        headers: {
          "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        this.isLoading = false
        let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        this.dataAkun = data.message
      })
    },
    addAkunAdmin() {
      this.$store.commit("onModalMethod", "CREATE")
      this.$store.commit("onModalFolder", "AkunPengguna")
      this.$store.commit("onModalContent", "AkunPengguna")
    },
  },
  created() {
    this.getUsers()
  }
}
</script>

<style lang="less" scoped>
.illustration-bg {
  position: absolute;
  width: 90%;
  height: 90%;
  opacity: 0.05;
  z-index: 0;
}
.unor-item-wrapper {
  height: 100%;
  min-height: 200px;
  box-sizing: border-box;
  margin: 20px 0px;
  overflow: hidden;
  overflow-y: auto;
}
.search {
  border-radius: 40px;
  padding-left: 50px;
  letter-spacing: 1px;
  &-wrapper {
    position: relative;
    .search-icon {
      position: absolute;
      width: 20px;
      height: 20px;
      top: 50%;
      padding: 6px;
      padding-left: 16px;
      transform: translateY(-50%);
    }
  }
}
.loading {
  display: inline-block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
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
#unit-organisasi-wrapper {
  background-color: #ffffff;
  box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.1);
  min-width: 200px;
  margin: 0px 20px;
  padding: 40px;
  height: 100vh;
  max-height: 100%;
  box-sizing: border-box;
  position: relative;
}
#unit-organisasi {
  margin-top: 20px;
  height: 100%;
  max-height: calc(100% - 80px);
  display: block;
  position: relative;
  .btn-wrapper {
    .btn-unor {
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
        margin-top: 1px;
        border-bottom-width: 2px;
        z-index: 2;
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
  .unit-organisasi-content {
    position: relative;
    border: 1px solid #477b79;
    border-radius: 0px 6px 6px 6px;
    height: 100%;
    max-height: calc(100% - 40px);
    overflow-y: auto;
    scrollbar-width: thin;
    padding: 20px;
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