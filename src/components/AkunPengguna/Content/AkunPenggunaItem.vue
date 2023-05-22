<template>
  <div id="unor-item" class="text-black" style="position: relative;">
    <div @click="$emit('onReset')" class="btn my-btn-primary btn-sm" style="position: absolute; top: 4px; left: 4px;">Reset Password</div>
    <div style="position: absolute; width: 2px; background-color: #EFF5F5; height: 60%; top: 50%; transform: translateY(-50%); left: 140px;"></div>
    <div :title="username" style="font-size: 14px; height: 100%; max-width: calc(100% - 148px);position: relative; left: 148px;">
      <div style="position: relative; top: 50%; transform: translateY(-50%); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; box-sizing: border-box;">
        Username: {{ username }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    username: {
      default: "",
      required: true,
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
#unor-item {
  padding: 0px 0px;
  // padding-left: 20px;
  height: 40px;
  width: 100%;
  border: 1px solid #EFF5F5;
  font-weight: 600;
  box-sizing: border-box;
  overflow: hidden;
  .unor-item-icon {
    font-size: 18px;
    cursor: pointer;
  }
}
</style>