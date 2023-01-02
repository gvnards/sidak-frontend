<template>
  <div id="loading">
    <div class="batang batang-1"></div>
    <div class="batang batang-2"></div>
    <div class="batang batang-3"></div>
    <div class="batang batang-4"></div>
    <div class="batang batang-5"></div>
    <div class="batang batang-6"></div>
    <div class="batang batang-7"></div>
  </div>
</template>

<style lang="less" scoped>
#loading {
  height: 60px;
  .batang {
    background-color: #477b79;
    height: 100%;
    width: 4px;
    margin: 2px;
    display: inline-block;
    animation-name: loading-animation;
    animation-iteration-count: infinite;
    animation-fill-mode: backwards;
    animation-duration: 0.8s;
    animation-direction: alternate;
    &-1 {
      animation-delay: 0.2s;
    }
    &-2 {
      animation-delay: 0.4s;
    }
    &-3 {
      animation-delay: 0.6s;
    }
    &-4 {
      animation-delay: 0.8s;
    }
    &-5 {
      animation-delay: 1s;
    }
    &-6 {
      animation-delay: 1.2s;
    }
    &-7 {
      animation-delay: 1.4s;
    }
  }
}
@keyframes loading-animation {
  0% {
    transform: scaleY(0.25);
    // transform: scaleY(1);
  }
  25% {
    transform: scaleY(0.25);
    // transform: scaleY(1);
  }
  100% {
    // transform: scaleY(0.25);
    transform: scaleY(1);
  }
}
</style>