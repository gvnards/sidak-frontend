<template>
  <div style="cursor: default; border: 1px solid #477b79; border-radius: 4px; min-height: 100px; padding: 8px; box-sizing: border-box; margin: 8px 0px; position: relative;">
    <div style="position: absolute; right: 8px; top: 50%; transform: translateY(-50%); opacity: 0.15; z-index: 1;">
      <i class="fa-solid fa-users text-primary" style="font-size: 42px;"></i>
    </div>
    <h6 style="font-weight: 600; z-index: 2;" class="text-primary">Total {{ topText }}</h6>
    <p style="z-index: 2; font-weight: 600;" class="text-black">{{ bottomText }} ASN</p>
  </div>
</template>

<script>
export default {
  props: {
    topText: {
      default: "",
      type: String
    },
    bottomText: {
      default: 0,
      type: Number
    }
  }
}
</script>