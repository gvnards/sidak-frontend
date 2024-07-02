<template>
  <div data-toggle="modal" data-target="#modal" data-backdrop="static" data-keyboard="false" id="delete-wrapper" class="text-center"><i class="fa-solid fa-trash-can icon-delete"></i></div>
</template>

<style lang="less" scoped>
#delete-wrapper {
  border-radius: 8px;
  background-color: rgba(236, 57, 47, 0.8);
  margin: 20px 10px 0px 0px;
  box-sizing: border-box;
  padding: 4px;
  min-width: 30px;
  height: 80px;
  box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.1);
  overflow: hidden;
  transition: all 0.4s;
  cursor: pointer;
  text-align: left;
  position: relative;
  &:hover {
    transform: scale(1.01);
    box-shadow: 0px 10px 20px -2px rgba(71, 123, 121, 0.25);
  }
  .icon-delete {
    font-size: 18px;
    color: white;
    position: relative;
    // top: 50;
    margin-top: 100%;
    // border: 1px solid black;
  }
}
</style>