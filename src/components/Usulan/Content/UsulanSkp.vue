<template>
  <div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Jenis Jabatan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.jenisJabatan }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tahun SKP
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.tahun }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Jenis Peraturan Kinerja
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.peraturanKinerja }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-4">
          <p class="text-primary usulan-item-header">
            Nilai SKP
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.nilaiSkp }}
          </p>
        </div>
        <div class="col-4">
          <p class="text-primary usulan-item-header">
          </p>
          <p class="usulan-item-fill text-primary">
            60%
          </p>
        </div>
        <div class="col-4">
          <p class="text-primary usulan-item-header">
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.nilaiSkp * 60 / 100 }}
          </p>
        </div>
      </div>
    </div>
    <p class="text-primary usulan-item-header" style="border-bottom: 1px solid #477b79;">
      <i>Perilaku Kerja</i>
    </p>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Orientasi Pelayanan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.orientasiPelayanan }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Integritas
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.integritas }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Komitmen
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.komitmen }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Disiplin
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.disiplin }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Kerja Sama
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.kerjaSama }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Kepemimpinan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.kepemimpinan }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Nilai Prestasi Kerja
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.nilaiPrestasiKerja }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Nilai Konversi
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.nilaiKonversi }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Nilai Integrasi
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.nilaiIntegrasi }}
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
          <iframe v-if="dataSkp.dokumen !== '' && dataSkp.dokumen !== null" :src="dataSkp.dokumen" frameborder="0" style="width: 100%; height: 600px;"></iframe>
        </div>
      </div>
    </div>
    <p class="text-primary usulan-item-header" style="border-bottom: 1px solid #477b79;">
      <i>Data Pejabat Penilai</i>
    </p>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Status
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.statusPejabatPenilai }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            NIP/NRP
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.nipNrpPejabatPenilai }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Nama
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.namaPejabatPenilai }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Jabatan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.jabatanPejabatPenilai }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Unit Organisasi
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.unitOrganisasiPejabatPenilai }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Golongan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.golonganPejabatPenilai }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            TMT Golongan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.tmtGolonganPejabatPenilai }}
          </p>
        </div>
      </div>
    </div>
    <p class="text-primary usulan-item-header" style="border-bottom: 1px solid #477b79;">
      <i>Data Atasan Pejabat Penilai</i>
    </p>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Status
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.statusAtasanPejabatPenilai }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            NIP/NRP
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.nipNrpAtasanPejabatPenilai }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Nama
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.namaAtasanPejabatPenilai }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Jabatan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.jabatanAtasanPejabatPenilai }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Unit Organisasi
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.unitOrganisasiAtasanPejabatPenilai }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Golongan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.golonganAtasanPejabatPenilai }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            TMT Golongan
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataSkp.tmtGolonganAtasanPejabatPenilai }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataSkp: {
      default() {
        return {
          jenisJabatan: "",
          tahun: "",
          peraturanKinerja: "",
          nilaiSkp: 0,
          orientasiPelayanan: 0,
          integritas: 0,
          komitmen: 0,
          disiplin: 0,
          kerjaSama: 0,
          kepemimpinan: 0,
          nilaiPrestasiKerja: 0,
          nilaiKonversi: 0,
          nilaiIntegrasi: 0,
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