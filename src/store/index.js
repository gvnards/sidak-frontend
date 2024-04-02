// import Vuex from "vuex"
import Vuex from "vuex";
import Vue from "vue";
import cryptoJS from "crypto-js";

Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    return {
      CryptoJSAesJson: {
        stringify: function (cipherParams) {
          var j = { ct: cipherParams.ciphertext.toString(cryptoJS.enc.Base64) }
          if (cipherParams.iv) j.iv = cipherParams.iv.toString()
          if (cipherParams.salt) j.s = cipherParams.salt.toString()
          return JSON.stringify(j)
        },
        parse: function (jsonStr) {
          var j = JSON.parse(jsonStr)
          var cipherParams = cryptoJS.lib.CipherParams.create({ ciphertext: cryptoJS.enc.Base64.parse(j.ct) })
          if (j.iv) cipherParams.iv = cryptoJS.enc.Hex.parse(j.iv)
          if (j.s) cipherParams.salt = cryptoJS.enc.Hex.parse(j.s)
          return cipherParams
        }
      },
      modalData: {},
      modalFolder: '',
      modalContent: '',
      modalMethod: '', // CREATE, UPDATE, DELETE
      modalStatusCallback: {}, // dipakai ketika akan memunculkan popup status, seperti GAGAL/BERHASIL
      idPegawai: 0,
      usulanData: {},
      isUsulanMobile: false,
      windowWidth: window.innerWidth,
      resultCallbackReload: "",
      modalBeforeAddUpdateData: {
        status: "wait", // status: wait/sync/next -> wait=masih belum milih - sync=milih sync - next=lanjut ke proses add/update data
        // onData: "wait" // onData: wait/{di data mana dia berada, jabatan/pangkat/dsb}
      }
    }
  },
  getters: {
    getModalData: state => state.modalData,
    getModalMethod: state => state.modalMethod,
    getModalFolder: state => state.modalFolder,
    getModalContent: state => state.modalContent,
    getModalStatusCallback: state => state.modalStatusCallback,
    getEncrypt: state => (plaintext, password) => cryptoJS.AES.encrypt(JSON.stringify(plaintext), password, { format: state.CryptoJSAesJson }).toString(),
    getDecrypt: state => (ecryptedText, password) => JSON.parse(JSON.parse(cryptoJS.AES.decrypt(ecryptedText, password, { format: state.CryptoJSAesJson }).toString(cryptoJS.enc.Utf8))),
    getIdPegawai: state => state.idPegawai,
    getUsulanData: state => state.usulanData,
    getIsUsulanMobile: state => state.isUsulanMobile,
    getWindowWidth: state => state.windowWidth,
    getResultCallbackReload: state => state.resultCallbackReload,
    getModalBeforeAddUpdateDataStatus: state => state.modalBeforeAddUpdateData.status,
    // getModalBeforeAddUpdateDataOnData: state => state.modalBeforeAddUpdateData.onData,
  },
  mutations: {
    onResultCallbackReload(state, val) {
      state.resultCallbackReload = val
    },
    resetModal(state) {
      state.modalContent = ""
      state.modalData = {}
      state.modalMethod = ""
      state.modalFolder = ""
      state.modalStatusCallback = {}
    },
    onModalData(state, val) {
      state.modalData = val
    },
    onModalMethod(state, val) {
      state.modalMethod = val
    },
    onModalFolder(state, val) {
      state.modalFolder = val
    },
    onModalContent(state, val) {
      state.modalContent = val
    },
    onModalStatusCallback(state, val) {
      state.modalStatusCallback = val
    },
    onIdPegawai(state, val) {
      state.idPegawai = val
    },
    onUsulanData(state, val) {
      state.usulanData = val
    },
    resetUsulanData(state) {
      state.usulanData = {}
    },
    onIsUsulanMobile(state, val) {
      state.isUsulanMobile = val
    },
    onWindowWidth(state, val) {
      state.windowWidth = val
    },
    onModalBeforeAddUpdateDataStatus(state, val) {
      state.modalBeforeAddUpdateData.status = val
    },
    // onModalBeforeAddUpdateDataOnData(state, val) {
    //   state.modalBeforeAddUpdateData.onData = val
    // }
  }
});

export default store;