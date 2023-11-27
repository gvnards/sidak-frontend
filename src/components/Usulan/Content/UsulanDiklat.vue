<template>
  <div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Jenis Diklat
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataDiklatKursusBeforeUpdate.jenisDiklat }}
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
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataDiklatKursusBeforeUpdate.diklat }}
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
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataDiklatKursusBeforeUpdate.namaDiklat }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataDiklatKursus.namaDiklat }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Lama Diklat (Jam)
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataDiklatKursusBeforeUpdate.lamaDiklat }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataDiklatKursus.lamaDiklat }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12 col-sm-6">
          <p class="text-primary usulan-item-header">
            Tanggal Mulai Diklat
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataDiklatKursusBeforeUpdate.tanggalDiklat }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataDiklatKursus.tanggalDiklat }}
          </p>
        </div>
        <div class="col-12 col-sm-6">
          <p class="text-primary usulan-item-header">
            Tanggal Selesai Diklat
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataDiklatKursusBeforeUpdate.tanggalSelesaiDiklat }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataDiklatKursus.tanggalSelesaiDiklat }}
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
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataDiklatKursusBeforeUpdate.instansi }}
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
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataDiklatKursusBeforeUpdate.institusiPenyelenggara }}
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
            Nomor Dokumen Diklat/Kursus
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataDiklatKursusBeforeUpdate.nomorDokumen }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataDiklatKursus.nomorDokumen }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Dokumen Diklat/Kursus
          </p>
          <iframe v-if="dataDiklatKursus.dokumen !== '' && dataDiklatKursus.dokumen !== null && isUsulanUpdate" :src="dataDiklatKursus.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #EC392F; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <iframe v-if="dataDiklatKursus.dokumen !== '' && dataDiklatKursus.dokumen !== null" :src="dataDiklatKursus.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #477b79; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <div v-else class="text-danger" style="font-weight: 600;">Tidak ada Dokumen Diklat/Kursus</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isUsulanUpdate: {
      default: false,
      required: true,
      type: Boolean
    },
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
    },
    dataDiklatKursusBeforeUpdate: {
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
  &.usulan-item-fill-red {
    border: 1px solid #EC392F;
    margin-top: 4px;
    background-color: #EBEBEB;
    border-radius: 4px;
    font-weight: 500;
    padding: 6px 10px;
    box-sizing: border-box;
    cursor: default;
  }
}
</style>