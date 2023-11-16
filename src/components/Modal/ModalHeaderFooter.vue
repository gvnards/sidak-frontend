<template>
  <div class="modal-content" style="max-width: 600px; left: 50%; transform: translateX(-50%);">
    <div class="modal-header">
      <IllustrationNotes style="width: 100%;" />
      <h1 class="text-center">{{ getModalMethod }} Data {{ headerTitle }}</h1>
      <p class="text-center text-black">Silahkan {{ getModalMethod.toLowerCase() }} data {{ headerSubtitle }} Anda.</p>
    </div>
    <div class="modal-body">
      <runtime-template-compiler
        class="illustration-bg"
        :template="`<${illustration} />`"
      ></runtime-template-compiler>
      <slot></slot>
    </div>
    <div class="modal-footer">
      <div v-if="step === 'step' || step === 'stepEnd'" type="button" class="btn my-btn-outline-secondary" style="position: absolute; left: 18px;" @click="closeModal()">Batal</div>
      <div type="button" class="btn my-btn-secondary" @click="step === 'step' || step == 'stepEnd' ? $emit('onPrev') : closeModal()">
        {{ step == 'step' || step == 'stepEnd' ? 'Sebelumnya' : 'Batal'}}
      </div>
      <button v-if="step !== 'stepEnd'" type="button" class="btn my-btn-primary" @click="step === 'step' ? $emit('onNext') : $emit('onUsulkan')">{{ step == 'step' ? 'Selanjutnya' : primaryText }}</button>
    </div>
  </div>
</template>

<script>
import IllustrationNotes from "./../icons/IllustrationNotes.vue"
export default {
  components: {
    IllustrationNotes
  },
  props: {
    primaryText: {
      default: "Usulkan",
      type: String
    },
    headerTitle: {
      default: "",
      type: String,
      required: true
    },
    headerSubtitle: {
      default: "",
      type: String,
      required: true
    },
    illustration: {
      default: "",
      type: String,
      required: true
    },
    step: {
      default: "",
      type: String
    }
  },
  computed: {
    getModalMethod() {
      let modalMethod = ""
      let getModalMethod = this.$store.getters.getModalMethod
      if (getModalMethod === "CREATE") modalMethod = "Tambah"
      else if (getModalMethod === "UPDATE") modalMethod = "Ubah"
      else if (getModalMethod === "DELETE") modalMethod = "Hapus"
      return modalMethod
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("resetModal")
      $("#modal").modal("hide")
    }
  }
}
</script>

<style lang="less" scoped>
.illustration-bg {
  & ~ div {
    z-index: 1;
  }
  position: absolute;
  z-index: 0;
  width: 90%;
  height: 90%;
  opacity: 0.05;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.modal-header {
  display: block;
  h1 {
    font-size: 1.1rem;
    margin: 0;
    margin-top: 8px;
    font-weight: 600;
  }
  p {
    margin: 0;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
  }
}
.modal-lg {
  max-width: 600px;
}
</style>