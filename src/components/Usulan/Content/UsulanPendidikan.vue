<template>
  <div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Jenis Pendidikan
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPendidikanBeforeUpdate.jenisPendidikan }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPendidikan.jenisPendidikan }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Tingkat Pendidikan
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPendidikanBeforeUpdate.tingkatPendidikan }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPendidikan.tingkatPendidikan }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Pendidikan
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPendidikanBeforeUpdate.pendidikan }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPendidikan.pendidikan }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Nama Sekolah
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPendidikanBeforeUpdate.namaSekolah }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPendidikan.namaSekolah }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Gelar Depan
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPendidikanBeforeUpdate.gelarDepan }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPendidikan.gelarDepan }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Gelar Belakang
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPendidikanBeforeUpdate.gelarBelakang }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPendidikan.gelarBelakang }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Nomor Ijazah
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPendidikanBeforeUpdate.nomorDokumen }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPendidikan.nomorDokumen }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Ijazah
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataPendidikanBeforeUpdate.tanggalDokumen }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataPendidikan.tanggalDokumen }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Dokumen Ijazah
          </p>
          <iframe v-if="dataPendidikanBeforeUpdate.dokumen !== '' && dataPendidikanBeforeUpdate.dokumen !== null && isUsulanUpdate" :src="dataPendidikanBeforeUpdate.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #EC392F; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <iframe v-if="dataPendidikan.dokumen !== '' && dataPendidikan.dokumen !== null" :src="dataPendidikan.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #477b79; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <div v-else class="text-danger" style="font-weight: 600;">Tidak ada Dokumen Ijazah</div>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Dokumen Transkrip
          </p>
          <iframe v-if="dataPendidikanBeforeUpdate.dokumenTranskrip !== '' && dataPendidikanBeforeUpdate.dokumenTranskrip !== null && isUsulanUpdate" :src="dataPendidikanBeforeUpdate.dokumenTranskrip" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #EC392F; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <iframe v-if="dataPendidikan.dokumenTranskrip !== '' && dataPendidikan.dokumenTranskrip !== null" :src="dataPendidikan.dokumenTranskrip" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #477b79; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <div v-else class="text-danger" style="font-weight: 600;">Tidak ada Dokumen Transkrip</div>
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
    dataPendidikan: {
      default() {
        return {
          jenisPendidikan: "",
          tingkatPendidikan: "",
          pendidikan: "",
          namaSekolah: "",
          gelarDepan: "",
          gelarBelakang: "",
          tanggalLulus: "",
          tahunLulus: "",
          nomorDokumen: "",
          tanggalDokumen: "",
          dokumen: "",
          dokumenTranskrip: "",
          keteranganUsulan: ""
        }
      },
      type: Object
    },
    dataPendidikanBeforeUpdate: {
      default() {
        return {
          jenisPendidikan: "",
          tingkatPendidikan: "",
          pendidikan: "",
          namaSekolah: "",
          gelarDepan: "",
          gelarBelakang: "",
          tanggalLulus: "",
          tahunLulus: "",
          nomorDokumen: "",
          tanggalDokumen: "",
          dokumen: "",
          dokumenTranskrip: "",
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