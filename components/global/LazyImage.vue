<template>
  <span class="lazy" :style="{ maxWidth }">
    <picture :style="{ paddingBottom }">
      <source :data-srcset="srcsetWebp" :sizes="sizes" type="image/webp" />
      <source :data-srcset="srcset" :sizes="sizes" :type="meta.format" />
      <img
        :width="meta.width"
        :height="meta.height"
        :src="lqip"
        :alt="alt"
        class="lazy__image lazy__image--load"
      />
      <!-- Fallback image -->
      <noscript inline-template>
        <img
          :width="meta.width"
          :height="meta.height"
          :src="original"
          :alt="alt"
          class="lazy__image lazy__image--loaded"
        />
      </noscript>
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
  computed: {
    srcRel() {
      return this.src.replace(/^\/assets\/images\/dynamic\//, '')
    },
    srcset() {
      return require(`~/assets/images/dynamic/${this.srcRel}?srcset`)
    },
    srcsetWebp() {
      return require(`~/assets/images/dynamic/${this.srcRel}?srcset&format=webp`)
    },
    lqip() {
      return require(`~/assets/images/dynamic/${this.srcRel}?size=20&format=jpeg&inline`)
    },
    meta() {
      return require(`~/assets/images/dynamic/${this.srcRel}?meta`)
    },
    original() {
      return require(`~/assets/images/dynamic/${this.srcRel}`)
    },
    paddingBottom() {
      return `calc(100% * ${this.meta.height / this.meta.width})`
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
    overflow: hidden;
    position: relative;

    @supports (backdrop-filter: blur(1rem)) {
      &::after {
        backdrop-filter: blur(1rem);
        content: '';
        inset: 0;
        position: absolute;
        transition: backdrop-filter 150ms $transition__normal--out;
      }
    }
  }

  &--loaded picture::after {
    backdrop-filter: none;
  }
}

.lazy__image {
  height: 100%;
  inset: 0;
  object-fit: cover;
  position: absolute;
  width: 100%;
}
</style>
