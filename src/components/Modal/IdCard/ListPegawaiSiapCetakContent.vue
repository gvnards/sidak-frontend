<template>
  <div class="modal-content" style="max-width: 600px; left: 50%; transform: translateX(-50%)">
    <div class="modal-header" style="font-weight: 500;">
      Daftar Pegawai Siap Cetak
    </div>
    <div class="modal-body" style="max-height: 400px; overflow-y: auto;">
      <div id="list-pegawai-wrapper">
        <p style="padding: 0px; margin: 0px; font-size: 14px; font-weight: 500;">Total {{ listPegawaiSiapCetak.length }} Pegawai</p>
        <table class="table">
          <tbody>
            <tr v-for="(item, idx) in listPegawaiSiapCetak" :key="idx" style="border: 2px solid rgb(239,245,245);">
              <td>
                <p style="padding: 0px; margin: 0px; font-size: 12px; font-weight: 500;">
                  {{ item.nama }} | {{ item.nip }}
                  <br>
                  {{ item.jabatan }} pada {{ item.unitOrganisasi }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal-footer">
      <div
        type="button"
        class="btn btn-block my-btn-outline-secondary"
        @click="closeModal()"
      >
        Batal
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    listPegawaiSiapCetak() {
      return this.$store.getters.getModalData
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("resetModal")
      $("#modal").modal("hide")
    },
  }
}
</script>