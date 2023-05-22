<template>
  <ModalHeaderFooter :header-title="'Akun Pengguna Admin'" :header-subtitle="'akun pengguna admin'" :illustration="'IllustrationDataUnitOrganisasi'" @onUsulkan="actionButtonAkunPengguna()" :primaryText="'Tambahkan'">
    <div class="row">
      <div class="col-12">
        <div class="form-group"><label for="fieldRoleUser"></label>
          <select id="fieldRoleUser" class="custom-select">
            <option value="">Role 1</option>
          </select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldUsername">Username</label>
          <input type="text" id="fieldUsername" class="form-control" placeholder="Masukkan username untuk admin">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="form-group">
          <label for="fieldKodeUnor">Kode Komponen Unit Organisasi</label>
          <input type="text" id="fieldKodeUnor" class="form-control" placeholder="Masukkan kode komponen unit organisasi">
        </div>
      </div>
    </div>
  </ModalHeaderFooter>
</template>
<script>
export default {
  methods: {
    actionButtonAkunPengguna() {}
  }
}
</script>