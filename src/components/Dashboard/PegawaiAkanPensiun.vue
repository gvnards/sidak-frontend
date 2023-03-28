<template>
  <div style="height: 400px; overflow-y: auto; border: 1px solid #dee2e6;">
    <table class="table table-bordered" style="margin: 0; position: sticky; top: 0; z-index: 2;">
      <thead class="thead-dark">
        <tr>
          <th colspan="2" style="background-color: #477b79; border-color: #477b79;"><i class="fa-solid fa-house-user" style="margin-right: 10px;"></i>Data Pegawai Akan Pensiun</th>
        </tr>
      </thead>
      <tbody style="background-color: #fff;">
        <tr>
          <td style="padding: 0; margin: 0; padding-left: 12px; width: 100px; vertical-align: middle; background-color: #fff;" class="text-primary"><small style="font-weight: 600;">Tahun</small></td>
          <td>
            <small class="text-primary" style="font-weight: 600;">
              <div class="form-group" style="margin: 0;">
                <select class="custom-select" v-model="filterYear">
                  <option :value="getYear" selected>{{ getYear }}</option>
                  <option :value="getYear+1">{{ getYear+1 }}</option>
                </select>
              </div>
            </small>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <small>
              <div class="form-group" style="padding: 0; margin: 0;">
                <input type="text" class="form-control" placeholder="Cari NIP/Nama pegawai">
              </div>
            </small>
          </td>
        </tr>
      </tbody>
    </table>
    <table class="table table-bordered">
      <tbody v-for="i in 100" :key="i">
        <tr>
          <td class="text-primary" style="font-weight: 600; vertical-align: middle;">
            <span>Giovani Ardiansyah</span>
            <br>
            <small class="text-black">199601162019031001</small>
          </td>
          <td class="text-primary text-center" style="font-weight: 600; vertical-align: middle; width: 120px;">
            <small><strong>16-01-1996</strong></small>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filterYear: ""
    }
  },
  computed: {
    getYear() {
      return (new Date()).getFullYear()
    }
  },
  created() {
    this.filterYear = this.getYear
  }
}
</script>