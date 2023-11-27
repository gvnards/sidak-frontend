<template>
  <div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Jenis Angka Kredit
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAngkaKreditBeforeUpdate.jenisAngkaKredit }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAngkaKredit.jenisAngkaKredit }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Jabatan pada Angka Kredit
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAngkaKreditBeforeUpdate.jabatan }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAngkaKredit.jabatan }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper" v-if="dataAngkaKredit.jenisAngkaKredit === 'Konversi'">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Tahun Penilaian Angka Kredit
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAngkaKreditBeforeUpdate.tahun }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAngkaKredit.tahun }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Periode Penilaian
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Mulai
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAngkaKreditBeforeUpdate.periodePenilaianMulai }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAngkaKredit.periodePenilaianMulai }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Selesai
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAngkaKreditBeforeUpdate.periodePenilaianSelesai }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAngkaKredit.periodePenilaianSelesai }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Penilaian Angka Kredit
          </p>
        </div>
        <div class="col-6" v-if="dataAngkaKredit.jenisAngkaKredit === 'Angka Kredit Pertama'">
          <p class="text-primary usulan-item-header">
            Utama
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAngkaKreditBeforeUpdate.angkaKreditUtama }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAngkaKredit.angkaKreditUtama }}
          </p>
        </div>
        <div class="col-6" v-if="dataAngkaKredit.jenisAngkaKredit === 'Angka Kredit Pertama'">
          <p class="text-primary usulan-item-header">
            Penunjang
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAngkaKreditBeforeUpdate.angkaKreditPenunjang }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAngkaKredit.angkaKreditPenunjang }}
          </p>
        </div>
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Total
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAngkaKreditBeforeUpdate.angkaKreditTotal }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAngkaKredit.angkaKreditTotal }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Nomor Dokumen
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAngkaKreditBeforeUpdate.nomorDokumen }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAngkaKredit.nomorDokumen }}
          </p>
        </div>
        <div class="col-6">
          <p class="text-primary usulan-item-header">
            Tanggal Dokumen
          </p>
          <p v-if="isUsulanUpdate" class="usulan-item-fill-red text-red">
            {{ dataAngkaKreditBeforeUpdate.tanggalDokumen }}
          </p>
          <p class="usulan-item-fill text-primary">
            {{ dataAngkaKredit.tanggalDokumen }}
          </p>
        </div>
      </div>
    </div>
    <div class="usulan-open-item-wrapper">
      <div class="row row-form">
        <div class="col-12">
          <p class="text-primary usulan-item-header">
            Dokumen Angka Kredit
          </p>
          <iframe v-if="dataAngkaKreditBeforeUpdate.dokumen !== '' && dataAngkaKreditBeforeUpdate.dokumen !== null && isUsulanUpdate" :src="dataAngkaKreditBeforeUpdate.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #EC392F; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <iframe v-if="dataAngkaKredit.dokumen !== '' && dataAngkaKredit.dokumen !== null" :src="dataAngkaKredit.dokumen" frameborder="0" style="width: 100%; height: 600px; border: 1px solid #477b79; border-radius: 4px; box-sizing: border-box; padding: 10px;"></iframe>
          <div v-else class="text-danger" style="font-weight: 600;">Tidak ada Dokumen Akta Kelahiran</div>
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
    dataAngkaKredit: {
      required: true,
      type: Object,
      default: () => {
        return {
          jenisAngkaKredit: "",
          jabatan: "",
          tahun: "",
          angkaKreditUtama: "",
          angkaKreditPenunjang: "",
          angkaKreditTotal: "",
          periodePenilaianMulai: "",
          periodePenilaianSelesai: "",
          nomorDokumen: "",
          tanggalDokumen: "",
          dokumen: ""
        }
      }
    },
    dataAngkaKreditBeforeUpdate: {
      required: true,
      type: Object,
      default: () => {
        return {
          jenisAngkaKredit: "",
          jabatan: "",
          tahun: "",
          angkaKreditUtama: "",
          angkaKreditPenunjang: "",
          angkaKreditTotal: "",
          periodePenilaianMulai: "",
          periodePenilaianSelesai: "",
          nomorDokumen: "",
          tanggalDokumen: "",
          dokumen: ""
        }
      }
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