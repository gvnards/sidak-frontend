<template>
  <div class="modal-content" style="max-width: 600px; left: 50%; transform: translateX(-50%); padding: 10px 10px 10px 40px;">
    <div class="row">
      <div class="col-12 text-center" :class="parseInt(getData.idAppRoleUser) === 1 ? 'col-sm-6' : ''">
        <div style="border-bottom: 1px solid #477b79;" class="form-group text-center">
          <label>Foto Sekarang</label>
        </div>
        <div class="profile-picture-wrapper" style="margin: 4px;">
          <img
            class="profile-picture-item"
            :src="getData.foto"
            alt="Foto Profil"
            v-if="getData.foto !== undefined && getData.foto !== null && getData.foto !== ''"
          />
          <illustration-profile-picture-man
            class="profile-picture-item"
            v-if="
              (getData.foto === undefined || getData.foto === null || getData.foto === '') &&
              getData.jenisKelamin === 'L'
            "
          ></illustration-profile-picture-man>
          <illustration-profile-picture-woman
            class="profile-picture-item"
            v-else-if="
              (getData.foto === undefined || getData.foto === null || getData.foto === '') &&
              getData.jenisKelamin === 'P'
            "
          ></illustration-profile-picture-woman>
        </div>
      </div>
      <div class="col-12 col-sm-6 text-center" v-if="parseInt(getData.idAppRoleUser) === 1">
        <div style="border-bottom: 1px solid #477b79;" class="form-group text-center">
          <label>Foto Baru</label>
        </div>
        <div v-if="changePhoto.photo !== undefined && changePhoto.photo !== null && changePhoto.photo !== ''">
          <div class="profile-picture-wrapper" style="margin: 4px;">
            <img
              class="profile-picture-item"
              :src="changePhoto.photo"
              alt="Foto Profil"
            />
          </div>
          <div class="btn btn-sm btn-block my-btn-outline-primary" style="position: relative; cursor: pointer;">
            Pilih Foto
            <input type="file" @change="onChangeFile" style="z-index: 2; position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; cursor: pointer;">
          </div>
        </div>
        <div class="change-picture text-center" style="margin: 4px;" v-else>
          <input @change="onChangeFile" type="file" style="position: absolute; width: 100%; height: 100%; opacity: 0; left: 0; top: 0; z-index: 2; cursor: pointer;" accept="image/jpeg">
          <div class="text-black" style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%);">
            <i class="fa-solid fa-image" style="font-size: 4rem;"></i>
            <div style="font-size: 14px; font-weight: 500; margin-top: 4px; width: fit-content; padding: 4px 20px; background-color: white; border-radius: 6px;">Pilih Foto</div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <small v-if="parseInt(getData.idAppRoleUser) === 1" :class="inputError.changePhoto.status ? 'text-red' : 'text-primary'"><b>*{{ inputError.changePhoto.status ? inputError.changePhoto.description : `Ukuran foto maksimal 0.5 MB(${0.5 * 1024}KB).` }}</b></small>
        <div style="height: 24px;"></div>
      </div>
      <div :class="parseInt(getData.idAppRoleUser) === 1 ? 'col-6' : 'col-12'">
        <div class="btn my-btn-secondary btn-small btn-block" @click="closeModal()">Tutup</div>
      </div>
      <div class="col-6" v-if="parseInt(getData.idAppRoleUser) === 1">
        <div class="btn my-btn-primary btn-small btn-block" @click="uploadPhoto()">Simpan Perubahan Foto</div>
      </div>
    </div>
  </div>
</template>

<script>
import IllustrationProfilePictureMan from "../../icons/IllustrationProfilePictureMan.vue"
import IllustrationProfilePictureWoman from "../../icons/IllustrationProfilePictureWoman.vue"
import mixins from "@/mixins/index.js"
import axios from "axios"
const env = import.meta.env
export default {
  mixins: [mixins],
  components: {
    IllustrationProfilePictureMan,
    IllustrationProfilePictureWoman
  },
  data() {
    return {
      changePhoto: {
        photo: null
      },
      inputError: {
        changePhoto: {
          description: "",
          status: false
        }
      }
    }
  },
  computed: {
    getData() {
      return this.$store.getters.getModalData
    }
  },
  methods: {
    uploadPhoto() {
      let dt = {...this.changePhoto, nip: this.getData.nip}
      if (dt.photo === null || dt.photo === "") return
      let u = this.$store.getters.getDecrypt(localStorage.getItem("token"), "sidak.bkpsdmsitubondokab").username
      let url = "/change-photo"
      axios({
        url: `${env.VITE_BACKEND_URL}${url}`,
        method: "POST",
        headers: {
          "Authorization": localStorage.getItem("token")
        },
        data: {
          message: this.$store.getters.getEncrypt(JSON.stringify(dt), u)
        }
      }).then(res => {
        let data = res.data
        this.$store.commit("onModalMethod", this.$store.getters.getModalMethod)
        this.$store.commit("onModalFolder", "StatusCallback")
        this.$store.commit("onModalContent", "StatusCallback")
        this.$store.commit("onModalStatusCallback", {
          status: parseInt(data.status) === 2 || data.status === true ? "Success" : "Failed",
          message: data.message
        })
      })
    },
    closeModal() {
      this.$store.commit("resetModal")
      $("#modal").modal("hide")
    },
    async onChangeFile(item) {
      if (item.target.files.length !== 0) {
        if (item.target.files[0].size > (1024000 * 0.5)) {
          this.inputError.changePhoto.status = true
          this.inputError.changePhoto.description = `Ukuran foto melebihi ${0.5 * 1024}KB.`
          item.target.value = null
          this.changePhoto.photo = ""
        } else if (item.target.files[0].type !== "image/jpeg") {
          this.inputError.changePhoto.status = true
          this.inputError.changePhoto.description = "Foto harus berjenis JPEG/JPG."
          item.target.value = null
          this.changePhoto.photo = ""
        } else {
          this.inputError.changePhoto.status = false
          this.changePhoto.photo = await this.getBase64(item.target.files[0])
        }
      }
    },
  }
}
</script>

<style lang="less" scoped>
.profile-picture {
  &-wrapper {
    height: 240px;
  }
  &-item {
    max-height: 100%;
    max-width: 100%;
  }
}
.change-picture {
  height: 240px;
  position: relative;
  overflow: hidden;
  background-color: rgb(245,245,245);
  input:hover {
    & ~ div {
    color: rgb(100, 100, 100) !important;
      div {
        background-color: rgb(253, 253, 253) !important;
        color: #0b0a0f !important;
      }
    }
  }
}
</style>