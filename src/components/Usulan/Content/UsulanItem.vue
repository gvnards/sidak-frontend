<template>
  <div class="item-wrapper">
    <div class="row">
      <div class="col-2">
        <div class="form-group" style="height: 100%;">
          <input type="checkbox" class="form-control checked-box" style="width: 16px; height: 16px; transform: translateY(-50%); top: 50%; margin: auto; position: relative;" :checked="isChecked && !isDisabled" :disabled="isDisabled">
        </div>
      </div>
      <div class="col-2">
        <div class="circle" :class="isSetujui ? 'setuju' : 'tolak'">
          <i class="icon" :class="icon"></i>
        </div>
      </div>
      <div class="col-8">
        <div class="text-wrapper">
          <h6 class="text-black">{{ mainText }}</h6>
          <p class="nama">{{ subText }}</p>
          <p class="waktu">{{ timeText }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isDisabled: {
      default: false,
      required: true,
      type: Boolean
    },
    isChecked: {
      default: false,
      required: true,
      type: Boolean
    },
    statusUsulan: {
      default: "",
      required: true,
      type: String
    },
    mainText: {
      default: "",
      required: true,
      type: String
    },
    subText: {
      default: "",
      required: true,
      type: String
    },
    timeText: {
      default: "",
      required: true,
      type: String
    },
    isSetujui: {
      default: true,
      required: true,
      type: Boolean
    }
  },
  computed: {
    checked() {
      return this.isChecked
    },
    icon() {
      if(this.statusUsulan === "Belum Diproses") return "fa-solid fa-envelope"
      else if(this.statusUsulan === "Sedang Diproses") return "fa-solid fa-envelope-open-text"
      else return "fa-solid fa-envelope-open"
    }
  }
}
</script>

<style lang="less" scoped>
.item-wrapper {
  width: 100%;
  height: 54px;
  padding: 8px 14px;
  box-sizing: border-box;
  transition: all 0.4s;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 4px;
  &:hover {
    background-color: #EFF5F5;
  }
  .circle {
    border-radius: 100%;
    width: 38px;
    height: 38px;
    position: relative;
    overflow: hidden;
    &.setuju {
      background-color: #477B79;
    }
    &.tolak {
      background-color: #EC392F;
    }
    .icon {
      color: #FFFFFF;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      height: 20px;
    }
  }
  .text-wrapper {
    position: relative;
    h6 {
      width: 100%;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      padding: 0px;
      margin: 0px;
    }
    p {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      font-weight: 500;
      position: absolute;
      width: 100%;
      color: #537777;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      &.nama {
        left: 0;
        max-width: 73%;
      }
      &.waktu {
        right: 0;
        max-width: 27%;
        text-align: end;
      }
    }
  }
}
</style>