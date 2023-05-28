<template>
  <div class="modal-content" style="max-width: 500px; left: 50%; transform: translateX(-50%);">
    <div class="modal-body text-center">
      <div v-if="getStatus === 2">
        <IllustrationLaunch class="illustration" />
        <h5 class="text-primary">{{ getText }}</h5>
        <p v-if="getModalMethod === 'LOGIN'">Silahkan klik lanjutkan untuk masuk ke dalam aplikasi Sidak.</p>
        <p v-if="getModalMethod === 'FORGETPASSWORD'">Silahkan login dengan menggunakan password sama dengan NIP Anda.</p>
      </div>
      <div v-else>
        <IllustrationCaution class="illustration" />
        <h5 :class="getStatus === 2 ? 'text-primary' : 'text-red'">{{ getText }}</h5>
        <p v-if="getModalMethod === 'LOGIN'">Silahkan cek kembali username/password Anda masukkan.</p>
        <p v-if="getModalMethod === 'FORGETPASSWORD'">Silahkan cek kembali NIP/NIK yang Anda masukkan.</p>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" @click="closeModal()" class="btn btn-lg btn-block my-btn-primary">{{ getStatus === 2 ? 'Lanjutkan' : 'Tutup'}}</button>
    </div>
  </div>
</template>

<script>
import IllustrationLaunch from "@/components/icons/IllustrationLaunch.vue"
import IllustrationCaution from "@/components/icons/IllustrationCaution.vue"
export default {
  components: {
    IllustrationLaunch,
    IllustrationCaution
  },
  methods: {
    closeModal() {
      if (this.getStatus === 2 && this.getModalMethod === "LOGIN") {
        this.$router.push({
          name: "sidak",
        })
      }
      this.$store.commit("resetModal")
      $("#modal").modal("hide")
    }
  },
  computed: {
    getModalMethod() {
      return this.$store.getters.getModalMethod
    },
    getStatus() {
      return this.$store.getters.getModalData.status
    },
    getText() {
      return this.$store.getters.getModalData.message
    }
  }
}
</script>

<style lang="less" scoped>
.illustration {
  max-width: 50%;
  max-height: 180px;
}
.modal-body {
  box-sizing: border-box;
  padding-top: 20px;
  h5 {
    margin: 10px 0;
    font-weight: 600;
    // color: #284f4d;
  }
  p {
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 14px;
  }
}
.btn {
  font-size: 14px;
}
</style>