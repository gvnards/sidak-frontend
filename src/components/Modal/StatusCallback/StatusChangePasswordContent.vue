<template>
  <div class="modal-content" style="max-width: 500px; left: 50%; transform: translateX(-50%);">
    <div class="modal-body text-center">
      <IllustrationSecurity style="max-height: 200px;" />
      <h5 :class="getModalData.status === 1 ? 'text-primary' : 'text-red'">{{ getModalData.status === 1 ? 'Selamat !' : 'Gagal !'}}</h5>
      <p>{{ getModalData.message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-lg btn-block my-btn-primary" data-dismiss="modal">Mengerti dan Tutup</button>
    </div>
  </div>
</template>

<script>
import IllustrationSecurity from "@/components/icons/IllustrationSecurity.vue"
export default {
  components: {
    IllustrationSecurity
  },
  computed: {
    getModalData() {
      return this.$store.getters.getModalData
    }
  }
}
</script>

<style lang="less" scoped>
.modal-body {
  box-sizing: border-box;
  padding-top: 20px;
  h5 {
    margin: 0;
    margin-top: 10px;
    font-weight: 700;
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