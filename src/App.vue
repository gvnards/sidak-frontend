<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  margin: 0 !important;
  padding: 0 !important;
}
#app {
  margin: 0 !important;
  padding: 0 !important;
}
.text-black {
  color: #0b0a0f;
}
.text-red {
  color: #EC392F;
}
.text-primary {
  color: #477b79 !important;
}
.btn {
  border-radius: 8px;
  box-sizing: border-box;
}
.btn-circle {
  border-radius: 100%;
  padding: 6px;
}
.my-btn-primary {
  background-color: #477b79;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.4s;
  cursor: pointer;
  &:hover {
    background-color: #284f4d;
  }
  &:active {
    background-color: #1f403f;
  }
}
.my-btn-danger {
  background-color: #EC392F;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.4s;
  cursor: pointer;
  &:hover {
    background-color: #d32921;
  }
  &:active {
    background-color: #bb1e16;
  }
}
.my-btn-outline-primary {
  border-color: #477b79;
  color: #477b79;
  background-color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.4s;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #477b79;
  }
  &:active {
    color: #ffffff;
    background-color: #284f4d;
  }
}

.my-btn-secondary {
  background-color: #a8a8a8;
  color: #ffffff;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.4s;
  cursor: pointer;
  &:hover {
    background-color: #919191;
  }
  &:active {
    background-color: #797979;
  }
}
.my-btn-outline-secondary {
  border-color: #a8a8a8;
  color: #616161;
  font-weight: 600;
  font-size: 14px;
  transition: all 0.4s;
  cursor: pointer;
  &:hover {
    color: #ffffff;
    background-color: #919191;
  }
  &:active {
    color: #ffffff;
    background-color: #797979;
  }
}
* {
  box-sizing: border-box;
}

// forms
.form-group {
  label {
    font-weight: 600;
    font-size: 16px;
    color: #477b79;
  }
  input,
  textarea,
  select {
    font-weight: 600;
    font-size: 14px;
    color: #477b79;
    border: 1px solid #477b79;
    background-color: rgba(255, 255, 255, 0.3);
    &:focus {
      color: #477b79;
      border: 1px solid #477b79;
      box-shadow: 0px 0px 8px 0px #477b7999;
      transition: all 0.2s;
      background-color: rgba(255, 255, 255, 0.3);
    }
    &:disabled {
      background-color: rgba(188, 188, 188, 0.5);
      user-select: none;
    }
    &::placeholder {
      opacity: 0.5;
    }
  }
  .form-error {
    border-color: #EC392F;
  }
  option {
    font-weight: 600;
  }
}
.row-form {
  margin-bottom: 8px;
}

// modal
.modal-title {
  color: #477b79;
  font-weight: 600;
}
.modal-header {
  color: #477b79;
  border-bottom-color: rgba(134, 158, 158, 1);
  border-bottom-style: dashed;
  border-bottom-width: 2px;
}
</style>
