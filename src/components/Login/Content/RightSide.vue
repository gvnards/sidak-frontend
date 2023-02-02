<template>
  <div id="right-side-wrapper">
    <BlobShape1 class="blob-1" />
    <BlobShape1 class="blob-2" fill="rgb(236, 57, 47)" />
    <BlobShape1 class="blob-3" fill="rgb(198, 227, 227)" />
    <div class="right-side">
      <AppLogoVue @click="changeMode()" class="logo" />
      <div style="height: 40px;"></div>
      <h3 class="text-primary">Selamat Datang di</h3>
      <h1 class="text-primary">Sistem Informasi Data Administrasi Kepegawaian</h1>
      <div style="height: 10px;"></div>
      <p class="text-black">{{ mode === 'login' ? 'Silahkan Login dengan memasukkan username dan password yang telah dimiliki.' : 'Fitur Lupa Password, silahkan gunakan fitur ini dengan bijak.' }}</p>
      <div style="height: 40px;"></div>
      <div v-if="mode === 'login'" class="login">
        <div class="form-group">
          <label for="fieldUsername">Username</label>
          <input :class="inputError.username.status ? 'form-error' : ''" type="text" class="form-control" v-model="username" placeholder="Masukkan username">
        </div>
        <div class="password-wrapper">
          <div class="form-group">
            <label for="fieldPassword">Password</label>
            <input :class="inputError.password.status ? 'form-error' : ''" :type="isShowPassword ? 'text' : 'password'" class="form-control password" v-model="password" placeholder="Masukkan password">
          </div>
          <!-- <div v-if="!isShowPassword" class="show-password" @click="asd()">
            <i class="fa-solid fa-eye-slash text-primary"></i>
          </div>
          <div v-else class="show-password" @click="asd()">
            <i class="fa-solid fa-eye text-primary"></i>
          </div> -->
        </div>
        <div style="height: 20px;"></div>
        <button :disabled="isLoading" :style="isLoading ? 'cursor: not-allowed;' : ''" @click="login()" class="btn btn-block my-btn-primary">Masuk</button>
        <div style="height: 20px;"></div>
        <p>Lupa dengan password ? <span class="text-red" style="cursor: pointer;" @click="$emit('changeMode')">Silahkan klik disini.</span></p>
      </div>
      <div v-else class="forget-password">
        <div class="form-group">
          <label for="fieldUsername">Username</label>
          <input :class="inputError.username.status ? 'form-error' : ''" type="text" class="form-control" v-model="username" placeholder="Masukkan username">
        </div>
        <div class="password-wrapper">
          <div class="form-group">
            <label for="fieldPassword">NIK</label>
            <input :class="inputError.nik.status ? 'form-error' : ''" type="text" class="form-control password" v-model="nik" placeholder="Masukkan NIK">
          </div>
          <!-- <div v-if="!isShowPassword" class="show-password" @click="asd()">
            <i class="fa-solid fa-eye-slash text-primary"></i>
          </div>
          <div v-else class="show-password" @click="asd()">
            <i class="fa-solid fa-eye text-primary"></i>
          </div> -->
        </div>
        <div style="height: 20px;"></div>
        <div @click="forgetPassword()" class="btn btn-block my-btn-primary">Reset Password</div>
        <div style="height: 20px;"></div>
        <p class="back-to-login" style="cursor: pointer;" @click="$emit('changeMode')"><i class="fa-solid fa-arrow-left"></i> Kembali ke halaman login.</p>
      </div>
    </div>
    <div
      data-toggle="modal"
      data-target="#modal"
      data-backdrop="static"
      data-keyboard="false"
      hidden id="modal-login"></div>
  </div>
</template>

<script>
import axios from "axios"
import AppLogoVue from "../../icons/AppLogo.vue"
import BlobShape1 from "../../icons/BlobShape1.vue"
const env = import.meta.env
export default {
  props: {
    mode: {
      default: "login",
      type: String
    }
  },
  components: {
    AppLogoVue,
    BlobShape1
  },
  watch: {
    mode() {
      this.username = ""
      this.password = ""
      this.nik = "",
      this.isLoading = false
    }
  },
  data() {
    return {
      inputError: {
        username: {
          status: false,
          description: ""
        },
        password: {
          status: false,
          description: ""
        },
        nik: {
          status: false,
          description: ""
        }
      },
      isShowPassword: false,
      username: "",
      password: "",
      nik: "",
      isLoading: false
    }
  },
  methods: {
    asd() {
      this.isShowPassword = !this.isShowPassword
    },
    login() {
      this.isLoading = true
      let data = this.$store.getters.getEncrypt(JSON.stringify({
        username: this.username,
        password: this.password
      }), "sidak.bkpsdmsitubondokab")
      axios({
        url: `${env.VITE_BACKEND_URL}/login`,
        method: "POST",
        data: {
          message: data
        }
      }).then(res => {
        this.isLoading = false
        let getData = this.$store.getters.getDecrypt(JSON.stringify(res.data), "sidak.bkpsdmsitubondokab")
        if(getData.status === 1) {
          localStorage.setItem("token", this.$store.getters.getEncrypt(JSON.stringify({
            id: getData.id,
            username: getData.username,
            password: getData.password,
            idAppRoleUser: parseInt(getData.idAppRoleUser),
            appRoleUser: getData.appRoleUser
          }), "sidak.bkpsdmsitubondokab"))
        }
        $("#modal-login").click()
        this.$store.commit("onModalMethod", "LOGIN")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusLogin")
        this.$store.commit("onModalData", getData)
      }).catch(e => {
        console.log(e)
      })
    },
    forgetPassword() {
      this.isLoading = true
      let data = this.$store.getters.getEncrypt(JSON.stringify({
        username: this.username,
        nik: this.nik
      }), "sidak.bkpsdmsitubondokab")
      axios({
        url: `${env.VITE_BACKEND_URL}/forget-password`,
        method: "POST",
        data: {
          message: data
        }
      }).then(res => {
        this.isLoading = false
        $("#modal-login").click()
        this.$store.commit("onModalMethod", "FORGETPASSWORD")
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusLogin")
        this.$store.commit("onModalData", this.$store.getters.getDecrypt(JSON.stringify(res.data), "sidak.bkpsdmsitubondokab"))
      })
    }
  }
}
</script>

<style lang="less" scoped>
.blob-1 {
  position: absolute;
  top: -100px;
  right: -100px;
  opacity: 0.75;
}
.blob-2 {
  position: absolute;
  top: 25%;
  opacity: 0.05;
}
.blob-3 {
  position: absolute;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.3;
}
#right-side-wrapper {
  box-sizing: border-box;
  width: 100%;
  max-width: 50%;
  overflow: hidden;
  position: relative;
}
.right-side {
  box-sizing: border-box;
  padding: 40px;
  width: 100%;
  max-width: 100%;
  max-height: 100vh;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  h3 {
    font-size: 24px;
    font-weight: 600;
  }
  h1 {
    font-size: 26px;
    font-weight: 700;
  }
  p {
    font-size: 14px;
    // color: #5c9593;
    font-weight: 500;
  }
  .login {
    .password-wrapper {
      position: relative;
      .password {
        // padding-right: 40px;
      }
      .show-password {
        position: absolute;
        cursor: pointer;
        bottom: 5px;
        right: 24%;
      }
    }
  }
  .forget-password {
    .back-to-login {
      color: #EC392F;
      display: inline-block;
    }
  }
}
@media only screen and (max-width: 800px) {
  #right-side-wrapper {
    max-width: 100%;
  }
}
</style>