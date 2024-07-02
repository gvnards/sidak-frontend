<template>
  <div>
    <div class="row">
      <div style="margin-top: 12px; margin-bottom: 6px;" :class="layout === 12 ? `col-${layout}` : `col-12 col-sm-${layout}`" v-for="(layout,idx) in layouts" :key="idx">
        <div class="shine shine-small" style="max-width: 40%; height: 20px; background-color: lightgray;"></div>
        <div style="height: 8px;"></div>
        <div class="shine shine-big" style="height: 50px; background-color: lightgray;"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    layouts: {
      default: Array,
      required: true,
      type: Array
    }
  },
}
</script>

<style lang="less" scoped>
.shine {
  position: relative;
  overflow: hidden;
}
.shine-big::after {
  height: 50px;
}
.shine-small::after {
  height: 20px;
}
.shine::after {
	content:'';
  top:0;
	transform:translateX(100%);
	width:100%;
	position: absolute;
	z-index:1;
	animation: slide 1.4s infinite;
  background: -moz-linear-gradient(left, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(128,186,232,0) 99%, rgba(125,185,232,0) 100%); /* FF3.6+ */
	background: -webkit-gradient(linear, left top, right top, color-stop(0%,rgba(255,255,255,0)), color-stop(50%,rgba(255,255,255,0.8)), color-stop(99%,rgba(128,186,232,0)), color-stop(100%,rgba(125,185,232,0))); /* Chrome,Safari4+ */
	background: -webkit-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* Chrome10+,Safari5.1+ */
	background: -o-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* Opera 11.10+ */
	background: -ms-linear-gradient(left, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* IE10+ */
	background: linear-gradient(to right, rgba(255,255,255,0) 0%,rgba(255,255,255,0.8) 50%,rgba(128,186,232,0) 99%,rgba(125,185,232,0) 100%); /* W3C */
	filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#007db9e8',GradientType=1 ); /* IE6-9 */
}

/* animation */

@keyframes slide {
	0% {transform:translateX(-100%);}
	100% {transform:translateX(100%);}
}
</style>
