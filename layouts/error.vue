<template>
  <main class="error">
    <client-only>
      <h1 v-if="statusCode === 404" class="error__title">
        Page <span class="error__title--primary">Not Found</span>
      </h1>
      <h1 v-else class="error__title">
        An <span class="error__title--primary">Error</span> Occurred
      </h1>
    </client-only>
    <p class="error__message">
      If you think there's something wrong with my website, please could you
      <nuxt-link to="/contact/" class="error__contact">let me know</nuxt-link>?
      Otherwise you can head back over to the home page!
    </p>
    <nuxt-link to="/" class="error__home">Take me home</nuxt-link>
  </main>
</template>

<script>
export default {
  layout: 'default',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  computed: {
    statusCode() {
      return (this.error && this.error.statusCode) || 500
    }
  }
}
</script>

<style lang="scss">
.error {
  @include page;
}

.error__title {
  @include title;

  margin-bottom: 4rem;
}

.error__title--primary {
  @include title--primary;
}

.error__message {
  margin-bottom: 3rem;
  width: 100%;

  @media (min-width: $breakpoint--md) {
    width: 50%;
  }
}

.error__contact {
  @include link;
}

.error__home {
  @include button;
  @include button--primary;
}
</style>
