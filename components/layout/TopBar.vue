<template>
  <header class="header">

    <div class="header__content">
      <div class="header__logo">
        <nuxt-link to="/">Gopal Kumar</nuxt-link>
      </div>
      <input id="menu" type="checkbox" />
      <nav-bar />
      <div class="header__buttons">
        <theme-toggle />
        <hamburger />
      </div>
    </div>
  </header>
</template>

<script>
import NavBar from '~/components/layout/NavBar'
import Hamburger from '~/components/layout/Hamburger'
import ThemeToggle from '~/components/layout/ThemeToggle'

export default {
  components: {
    NavBar,
    Hamburger,
    ThemeToggle
  }
}
</script>

<style lang="scss">
.header {
  background-color: $color__body--overlay;
  box-shadow: $box-shadow;
  line-height: 2rem;
  padding: 0.75rem 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;

  @media (min-width: $breakpoint--md) {
    overflow: hidden;
  }

  @supports (backdrop-filter: blur(0.5rem)) {
    background-color: $color__body--blur;
    backdrop-filter: blur(0.5rem);
  }

  @media print {
    display: none;
  }
}

.banner {
  background-color: #f8d7da;
  color: #721c24;
  text-align: center;
  padding: 0.5rem;
  font-size: 0.875rem;
  border-bottom: 1px solid #f5c6cb;
}

.header__content {
  @include container;

  display: flex;
}

.header__logo {
  @include font__fancy;

  align-items: center;
  display: flex;
  flex-grow: 1;
  font-size: 120%;

  a:hover {
    color: $color__primary;
  }
}

.header__buttons {
  height: 100%;
  z-index: 3;
}

#menu {
  display: none;
}
</style>
