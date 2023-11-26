<template>
  <div class="usulan-open-item-wrapper">
    <div class="row row-form">
      <div class="col-12">
        <p class="usulan-item-info">
          <i class="fa-solid fa-circle-info text-info"></i> Sekilas info:<br />Untuk pembaharuan (update):<br/><span class="text-danger" style="font-weight: 800;">Text merah</span> = data sebelum diupdate<br /><span class="text-primary" style="font-weight: 800;">Text hijau</span> = data akan diupdate
        </p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.usulan-item-info {
  margin: 0px;
  border: 1px solid #477b79;
  background-color: #ffffff;
  border-radius: 4px;
  font-weight: 500;
  padding: 6px 10px !important;
  box-sizing: border-box;
  cursor: default;
}
</style>