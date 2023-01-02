<template>
  <div class="item-wrapper" :title="menu.text" :class="active ? 'active' : ''">
    <span class="text">{{ menu.nama }}</span>
    <i :class="menu.icon" class="icon"></i>
  </div>
</template>

<script>
export default {
  props: {
    menu: {
      required: true,
      default() {
        return {
          icon: String,
          nama: String,
        }
      },
      type: Object,
    },
    active: {
      default: false,
      type: Boolean,
    },
  },
}
</script>

<style lang="less" scoped>
.item-wrapper {
  max-width: 180px;
  width: 100%;
  min-width: 180px;
  border-radius: 8px;
  box-sizing: border-box;
  padding: 6px 14px 6px 14px;
  transition: all 0.4s;
  cursor: pointer;
  color: #869e9e;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  .text {
    transition: all 0.4s;
    font-weight: 500;
    font-size: 14px;
  }
  .icon {
    font-size: 16px;
  }
  &:hover {
    background-color: #eff5f5;
    color: #477b79;
    .text {
      margin-left: 4px;
      font-weight: 600;
    }
  }
  &.active {
    background-color: #eff5f5;
    color: #477b79;
    .text {
      margin-left: 4px;
      font-weight: 600;
    }
  }
}
</style>
