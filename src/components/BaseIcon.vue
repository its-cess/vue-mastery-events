<template>
  <!-- v-html points to the computed property we created, allowing us
to render our icon in the template -->

  <div class="icon-wrapper">
    <svg v-html="svg" class="icon" :width="width" :height="height">
      <use v-bind="{ 'xlink:href': '/feather-sprite.svg#' + name }" />
    </svg>
    <slot></slot>
  </div>
</template>

<script>
import feather from "feather-icons";

export default {
  //props setup so we can use Feather Icons
  props: {
    name: String,
    width: {
      type: [Number, String],
      default: 24,
    },
    height: {
      type: [Number, String],
      default: 24,
    },
  },
  computed: {
    //computed property to return an svg icon
    svg() {
      //return an icon with 'name' converting it to an svg image
      return feather.icons[this.name].toSvg({
        class: "icon",
        //using height and width properties we set in props
        width: this.width,
        height: this.height,
      });
    },
  },
};
</script>

<style scoped>
.icon-wrapper {
  display: inline-flex;
  align-items: center;
  color: rgba(0, 0, 0, 0.4);
  font-size: 1rem;
  font-weight: 600;
  margin-right: 6px;
}
.icon {
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
}
</style>
