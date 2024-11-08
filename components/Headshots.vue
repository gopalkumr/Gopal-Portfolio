<template>
  <picture class="headshots" ref="headshot">
    <source :srcset="srcsetAvif" type="image/avif" />
    <source :srcset="srcsetWebp" type="image/webp" />
    <img
      :src="srcset"
      :srcset="srcset"
      :data-preview="preview"
      :data-preview-webp="previewWebp"
      :data-preview-avif="previewAvif"
      alt="Gopal Kumar"
      width="500"
      height="500"
    />
  </picture>
</template>

<script>
export default {
  data() {
    return {
      mounted: false
    }
  },
  computed: {
    preview() {
      return require('~/assets/images/dynamic/gopal-grey-background.png')
    },
    previewWebp() {
      return require('~/assets/images/dynamic/gopal-grey-background.png?format=webp')
    },
    previewAvif() {
      return require('~/assets/images/dynamic/gopal-grey-background.png?format=avif')
    },
    srcset() {
      if (!this.mounted) return
      // Use a static headshot image
      return require('~/assets/images/dynamic/gopal-grey-background.png')
    },
    srcsetWebp() {
      if (!this.mounted) return
      return require('~/assets/images/dynamic/gopal-grey-background.png?format=webp')
    },
    srcsetAvif() {
      if (!this.mounted) return
      return require('~/assets/images/dynamic/gopal-grey-background.png?format=avif')
    }
  },
  mounted() {
    this.mounted = true
  }
}
</script>

<style lang="scss">
.headshots {
  display: block;
  margin: 0 auto;
  max-width: 500px;
  position: relative;
  width: 100%;

  img {
    display: block;
    height: auto;
    width: 100%;
  }
}
</style>
