<template>
  <div id="right-side">
    <h4 class="text-primary">Ubah Password Anda</h4>
    <div style="height: 24px;"></div>
    <div class="form-group" style="position: relative;">
      <label for="fieldOldPassword">Password Lama</label>
      <input :type="isShow.oldPassword ? 'text' : 'password'" id="fieldOldPassword" class="form-control" v-model="password.oldPassword" placeholder="Masukkan password lama Anda" style="padding-right: 44px;">
      <div v-show="!isShow.oldPassword" @click="isShow.oldPassword = true" style="width: fit-content; height: fit-content; cursor: pointer; position: absolute; bottom: 4px; right: 12px;">
        <i class="fa-solid fa-eye-slash text-primary"></i>
      </div>
      <div v-show="isShow.oldPassword" @click="isShow.oldPassword = false" style="width: fit-content; height: fit-content; cursor: pointer; position: absolute; bottom: 4px; right: 12px;">
        <i class="fa-solid fa-eye text-primary"></i>
      </div>
    </div>
    <div class="form-group" style="position: relative;">
      <label for="fieldNewPassword">Password Baru</label>
      <input :type="isShow.newPassword ? 'text' : 'password'" id="fieldNewPassword" class="form-control" v-model="password.newPassword" placeholder="Masukkan password baru Anda" style="padding-right: 44px;">
      <div v-show="!isShow.newPassword" @click="isShow.newPassword = true" style="width: fit-content; height: fit-content; cursor: pointer; position: absolute; bottom: 4px; right: 12px;">
        <i class="fa-solid fa-eye-slash text-primary"></i>
      </div>
      <div v-show="isShow.newPassword" @click="isShow.newPassword = false" style="width: fit-content; height: fit-content; cursor: pointer; position: absolute; bottom: 4px; right: 12px;">
        <i class="fa-solid fa-eye text-primary"></i>
      </div>
    </div>
    <div class="form-group" style="position: relative;">
      <label for="fieldConfirmNewPassword">Konfirmasi Password Baru</label>
      <input :type="isShow.confirmNewPassword ? 'text' : 'password'" id="fieldConfirmNewPassword" class="form-control" v-model="password.confirmNewPassword" placeholder="Masukkan lagi password baru Anda" style="padding-right: 44px;">
      <small class="text-red" v-if="!validation.confirmNewPassword && password.confirmNewPassword !== ''"><b>*Password tidak sama</b></small>
      <div v-show="!isShow.confirmNewPassword" @click="isShow.confirmNewPassword = true" style="width: fit-content; height: fit-content; cursor: pointer; position: absolute; right: 12px;" :style="!validation.confirmNewPassword && password.confirmNewPassword !== '' ? 'bottom: 28px;' : 'bottom: 4px;'">
        <i class="fa-solid fa-eye-slash text-primary"></i>
      </div>
      <div v-show="isShow.confirmNewPassword" @click="isShow.confirmNewPassword = false" style="width: fit-content; height: fit-content; cursor: pointer; position: absolute; right: 12px;" :style="!validation.confirmNewPassword && password.confirmNewPassword !== '' ? 'bottom: 28px;' : 'bottom: 4px;'">
        <i class="fa-solid fa-eye text-primary"></i>
      </div>
    </div>
    <div style="height: 12px;"></div>
    <div class="btn my-btn-primary btn-block" @click="changePassword()">Ubah Password</div>
    <div style="height: 24px;"></div>
    <p class="text-black"><b>Ketentuan password baru:</b></p>
    <p class="text-black" :class="validation.newPassword.capital ? 'text-primary' : ''" :style="validation.newPassword.capital ? 'font-weight: 500; text-decoration: line-through; text-decoration-style: double;' : ''">1. Password harus memiliki minimal 1 huruf besar</p>
    <p class="text-black" :class="validation.newPassword.number ? 'text-primary' : ''" :style="validation.newPassword.number ? 'font-weight: 500; text-decoration: line-through; text-decoration-style: double;' : ''">2. Password harus memiliki minimal 1 angka</p>
    <p class="text-black" :class="validation.newPassword.long ? 'text-primary' : ''" :style="validation.newPassword.long ? 'font-weight: 500; text-decoration: line-through; text-decoration-style: double;' : ''">3. Password harus memiliki panjang minimal 8 karakter</p>
    <div
      data-toggle="modal"
      data-target="#modal"
      data-backdrop="static"
      data-keyboard="false"
      hidden id="modal-change-password"></div>
  </div>
</template>

<script>
import axios from "axios"
const env = import.meta.env
export default {
  watch: {
    "password.newPassword" (val) {
      this.validation.newPassword.capital = /[A-Z]/.test(val)
      this.validation.newPassword.number = /[0-9]/.test(val)
      this.validation.newPassword.long = val.length >= 8
    },
    "password.confirmNewPassword" (val) {
      this.validation.confirmNewPassword = val === this.password.newPassword
    }
  },
  data() {
    return {
      password: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      },
      isShow: {
        oldPassword: false,
        newPassword: false,
        confirmNewPassword: false
      },
      validation: {
        newPassword: {
          capital: false,
          number: false,
          long: false
        },
        confirmNewPassword: false
      }
    }
  },
  methods: {
    changePassword() {
      if (!this.validation.newPassword.capital || !this.validation.newPassword.number || !this.validation.newPassword.long || !this.validation.confirmNewPassword) return
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let password = {...this.password}
      password.username = u
      axios({
        url: `${env.VITE_BACKEND_URL}/change-password`,
        method: "PUT",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(password), u)
        }
      }).then(res => {
        let data = this.$store.getters.getDecrypt(JSON.stringify(res.data), u)
        if(data.status === 1) {
          localStorage.setItem("token", this.$store.getters.getEncrypt(JSON.stringify({
            id: data.id,
            username: data.username,
            password: data.password,
            idAppRoleUser: data.idAppRoleUser,
            appRoleUser: data.appRoleUser
          }), "sidak.bkpsdmsitubondokab"))
        }
        $("#modal-change-password").click()
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusChangePassword")
        this.$store.commit("onModalData", {
          message: data.message,
          status: data.status
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
#right-side {
  width: 100%;
  min-width: 200px;
  box-sizing: border-box;
  position: relative;
  height: 100%;
  overflow: hidden;
  overflow-y: auto;
  p {
    font-size: 14px;
    padding: 0;
    margin: 0;
  }
}
</style>