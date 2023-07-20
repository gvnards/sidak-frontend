<template>
  <div id="unor-item" class="text-black" style="position: relative;">
    <div data-toggle="modal" data-target="#modal" data-backdrop="static" data-keyboard="false" @click="$emit('onDelete')" class="unor-item-icon" style="position: absolute; top: 50%; transform: translateY(-50%); left: 20px; width: fit-content; cursor: pointer;">
      <i class="fa-solid fa-trash-can text-red"></i>
    </div>
    <div data-toggle="modal" data-target="#modal" data-backdrop="static" data-keyboard="false" @click="$emit('onUpdate')" class="unor-item-icon" style="position: absolute; top: 50%; transform: translateY(-50%);width: fit-content; left: 62px; cursor: pointer;">
      <i class="fa-solid fa-pen-to-square text-primary"></i>
    </div>
    <div style="position: absolute; width: 2px; background-color: #EFF5F5; height: 60%; top: 50%; transform: translateY(-50%); left: 102px;"></div>
    <div :title="namaUnitKerja" style="font-size: 14px; height: 100%; max-width: calc(100% - 116px);position: relative; left: 116px;">
      <div style="position: relative; top: 50%; transform: translateY(-50%); white-space: nowrap; box-sizing: border-box;">
        <div :style="`width: ${orderUnitKerja}px;`" style="background-color: #0B0A0F; position: relative; height: 2px; display: inline-block; top: -4px;"></div> {{ namaUnitKerja }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    orderUnitKerja: {
      default: 0,
      type: Number
    },
    namaUnitKerja: {
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
  height: 40px;
  width: 100%;
  border: 1px solid #EFF5F5;
  font-weight: 600;
  box-sizing: border-box;
  .unor-item-icon {
    font-size: 18px;
    cursor: pointer;
  }
}
</style>