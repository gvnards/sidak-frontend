<template>
  <div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Jenis Pendidikan
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
          <p class="usulan-item-fill text-primary">
            {{ dataPendidikan.gelarDepan }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Gelar Belakang
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
          <p class="usulan-item-fill text-primary">
            {{ dataPendidikan.nomorDokumen }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Ijazah
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
          <iframe v-if="dataPendidikan.dokumen !== '' && dataPendidikan.dokumen !== null" :src="dataPendidikan.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
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
          <iframe v-if="dataPendidikan.dokumenTranskrip !== '' && dataPendidikan.dokumenTranskrip !== null" :src="dataPendidikan.dokumenTranskrip" frameborder="0" style="width: 100%; height: 600px;"></iframe>
          <div v-else class="text-danger" style="font-weight: 600;">Tidak ada Dokumen Transkrip</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
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