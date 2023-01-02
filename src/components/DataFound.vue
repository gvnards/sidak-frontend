<template>
  <div id="data-found">
    <div class="data-item">
      <div class="circle">
        <i :class="`${icon} data-found-icon`"></i>
      </div>
      <div class="short-brief">
        <p class="primary-brief">{{ primaryBrief }}</p>
        <p class="secondary-brief text-black">{{ secondaryBrief }}</p>
      </div>
      <div class="love">
        <i class="fa-solid fa-leaf data-found-icon"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      default: "",
      type: String
    },
    primaryBrief: {
      default: "",
      type: String
    },
    secondaryBrief: {
      default: "",
      type: String
    }
  }
}
</script>

<style lang="less" scoped>
#data-found {
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.8);
  margin: 20px;
  box-sizing: border-box;
  padding: 16px 40px;
  height: 80px;
  box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.1);
  overflow: hidden;
  transition: all 0.4s;
  cursor: pointer;
  text-align: left;
  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.25);
  }
  .data-item {
    position: relative;
    display: flex;
    .data-found-icon {
      font-size: 24px;
      position: relative;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #477b79;
    }
    .circle {
      border: 2px solid #477b79;
      min-width: 40px;
      min-height: 40px;
      max-width: 40px;
      max-height: 40px;
      border-radius: 100%;
    }
    .short-brief {
      flex-grow: 1;
      min-width: 120px;
      box-sizing: border-box;
      margin: 0px 20px;
      p {
        padding: 0;
        margin: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        &.primary-brief {
          color: #477b79;
          font-weight: 600;
          font-size: 16px;
        }
        &.secondary-brief {
          font-weight: 500;
          font-size: 14px;
        }
      }
    }
    .love {
      min-width: 40px;
      min-height: 40px;
      max-width: 40px;
      max-height: 40px;
      .data-found-icon {
        color: #77B255;
      }
    }
  }
}
@media only screen and (max-width: 500px) {
  .love, .circle {
    display: none;
  }
  #data-found {
    padding: 16px 20px;
  }
}
</style>