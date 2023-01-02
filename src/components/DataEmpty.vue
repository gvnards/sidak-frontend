<template>
  <div>
    <IllustrationDataNotFound class="illustration-not-found" />
    <p>Belum ada data yang ditambahkan.</p>
    <div
      class="btn my-btn-primary btn-circle"
      data-toggle="modal"
      data-target="#modal"
      data-backdrop="static"
      data-keyboard="false"
      @click="$emit('addData')"
    >
      <i class="fa-solid fa-plus icon-plus"></i>
    </div>
  </div>
</template>

<script>
import IllustrationDataNotFound from "./icons/IllustrationDataNotFound.vue"
export default {
  components: {
    IllustrationDataNotFound,
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
  margin-top: 10px;
  width: 32px;
  height: 32px;
}
</style>