<template>
  <span class="lazy" :class="{ 'lazy--loaded': loaded }" :style="{ maxWidth }">
    <picture :style="{ paddingBottom }">
      <source v-if="srcWebp" :srcset="srcWebp" type="image/webp" :sizes="sizes" />
      <img
        v-if="imgSrc"
        ref="img"
        :width="imgWidth"
        :height="imgHeight"
        :src="imgSrc"
        :alt="alt"
        class="lazy__image"
        @load="onLoad"
        @error="onLoad"
      />
    </picture>
  </span>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    sizes: {
      type: String,
      default: '(min-width: 992px) 66vw, 100vw'
    },
    maxWidth: {
      type: String,
      default: 'auto'
    }
  },
  data() {
    return {
      loaded: false
    }
  },
  computed: {
    srcRel() {
      return this.src.replace(/^\/assets\/images\/dynamic\//, '')
    },
    imgData() {
      try {
        // responsive-loader returns { src, srcSet, width, height, ... }
        const data = require(`~/assets/images/dynamic/${this.srcRel}`)
        console.log('imgData resolved for', this.srcRel, data)
        return data
      } catch (e) {
        console.error('imgData failed for', this.srcRel, e)
        return null
      }
    },
    imgDataWebp() {
      try {
        return require(`~/assets/images/dynamic/${this.srcRel}?format=webp`)
      } catch (e) {
        return null
      }
    },
    imgSrc() {
      if (!this.imgData) return ''
      // responsive-loader wraps the url with __webpack_public_path__ eval,
      // so .src is the resolved public URL string
      return typeof this.imgData === 'string' ? this.imgData : this.imgData.src
    },
    srcWebp() {
      if (!this.imgDataWebp) return null
      return typeof this.imgDataWebp === 'string'
        ? this.imgDataWebp
        : this.imgDataWebp.src
    },
    imgWidth() {
      return this.imgData && this.imgData.width ? this.imgData.width : undefined
    },
    imgHeight() {
      return this.imgData && this.imgData.height
        ? this.imgData.height
        : undefined
    },
    paddingBottom() {
      if (this.imgWidth && this.imgHeight) {
        return `calc(100% * ${this.imgHeight / this.imgWidth})`
      }
      return '56.25%'
    }
  },
  mounted() {
    console.log('LazyImage mounted. loaded:', this.loaded, 'imgSrc:', this.imgSrc)
    // If image already loaded before mounted (cached), mark as loaded
    if (this.$refs.img && this.$refs.img.complete) {
      console.log('Image already complete', this.srcRel)
      this.loaded = true
    }
  },
  methods: {
    onLoad() {
      console.log('Image onLoad fired', this.srcRel)
      this.loaded = true
    }
  }
}
</script>

<style lang="scss">
.lazy {
  background-color: $color__body;
  border-radius: $border-radius;
  display: block;
  margin: auto;
  width: 100%;

  picture {
    border-radius: $border-radius;
    display: block;
    overflow: hidden;
    position: relative;
  }
}

.lazy__image {
  display: block;
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  width: 100%;
  opacity: 1 !important; /* Force opacity to 1 for debugging */
  transition: opacity 400ms ease;
}

.lazy--loaded .lazy__image {
  opacity: 1;
}
</style>
