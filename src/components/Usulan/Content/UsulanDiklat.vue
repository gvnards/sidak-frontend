<template>
  <div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Jenis Diklat
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataDiklatKursus.jenisDiklat }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Diklat
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataDiklatKursus.diklat }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Nama Diklat
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataDiklatKursus.namaDiklat }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Lama Diklat (Jam)
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataDiklatKursus.lamaDiklat }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Mulai Diklat
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataDiklatKursus.tanggalDiklat }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Instansi
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataDiklatKursus.instansi }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Institusi Penyelenggara
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataDiklatKursus.institusiPenyelenggara }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Dokumen
          </p>
          <iframe v-if="dataDiklatKursus.dokumen !== '' && dataDiklatKursus.dokumen !== null" :src="dataDiklatKursus.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataDiklatKursus: {
      default() {
        return {
          jenisDiklat: "",
          diklat: "",
          namaDiklat: "",
          lamaDiklat: "",
          tanggalDiklat: "",
          instansi: "",
          institusiPenyelenggara: "",
          dokumen: "",
          keteranganUsulan: ""
        }
      },
      type: Object
    }
  }
}
</script>

<style lang="less" scoped>
.usulan-open-item-wrapper {
  margin-bottom: 20px;
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
</style>