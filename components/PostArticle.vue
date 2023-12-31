<template>
  <article class="article">
    <div class="article__title">
      <h1>{{ post.title }}</h1>
    </div>
    <div class="article__sidebar">
      <p v-if="type !== 'hidden'" class="article__details">
        <small class="article__date">{{ date }}</small>
        <small v-if="type === 'post'" class="article__mins">
          {{ post.mins }} minute read
        </small>
      </p>
      <ul v-if="post.tags" class="article__tags">
        <li v-for="tag in post.tags" :key="tag">{{ tag }}</li>
      </ul>
      <div v-if="post.tableOfContents" class="article__contents">
        <strong>Table of Contents</strong>
        <div v-html="post.tableOfContents"></div>
      </div>
    </div>
    <div class="article__body">
      <p
        v-if="type === 'post' && post.description"
        class="article__description"
      >
        {{ post.description }}
      </p>
      <markdown :markdown="post" />
      <div v-if="type !== 'hidden'" class="article__footer">
        <back-icon />
        <nuxt-link v-if="type === 'post'" to="/blog/" class="article__back">
          See all blog posts
        </nuxt-link>
        <nuxt-link
          v-if="type === 'project'"
          to="/projects/"
          class="article__back"
        >
          See all projects
        </nuxt-link>
      </div>
    </div>
  </article>
</template>

<script>
import BackIcon from 'icons/KeyboardBackspace'

export default {
  components: {
    BackIcon
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    date() {
      return this.post.date.toLocaleString('en-GB', {
        ...(this.type === 'post' && { day: 'numeric' }),
        month: 'short',
        year: 'numeric'
      })
    }
  }
}
</script>

<style lang="scss">
.article {
  display: grid;
  grid-template-columns: 100%;

  @media (min-width: $breakpoint--lg) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
  }
}

.article__title {
  margin-bottom: 5rem;
  position: relative;

  @media (min-width: $breakpoint--lg) {
    grid-column: 1 / 3;
    padding-left: math.div(100%, 3);
  }

  @media print {
    margin-bottom: 2rem;

    &::before {
      display: none;
    }
  }

  h1 {
    @include h2;
  }
}

.article__sidebar {
  @media (min-width: $breakpoint--lg) {
    padding-right: 3rem;
  }
}

.article__contents {
  display: none;
  max-height: calc(100vh - 5.5rem);
  opacity: 0.4;
  overflow-y: auto;
  margin: -0.5rem -1rem;
  padding: 0.5rem 1rem;
  position: sticky;
  top: 4.5rem;
  transition: opacity 150ms $transition__normal;

  &:hover,
  &:focus-within {
    opacity: 1;
  }

  &::-webkit-scrollbar-track {
    background-color: $color__body;
  }

  @media (min-width: $breakpoint--lg) {
    display: block;
  }

  .table-of-contents {
    font-size: 80%;
    margin-top: 1rem;

    ol ol {
      margin-left: 1rem;
      font-size: 90%;
    }

    li {
      margin-top: 0.5rem;

      a {
        @include link;

        color: inherit;
      }
    }
  }
}

.article__body {
  .markdown {
    margin-bottom: 1.5rem;
  }

  @supports (pointer-events: none) {
    @media screen {
      &::after {
        background-image: linear-gradient(
          to top,
          $color__body 6rem,
          transparent
        );
        bottom: -5rem;
        content: '';
        display: block;
        height: 10rem;
        pointer-events: none;
        position: sticky;
        margin-left: -1rem;
        margin-right: -1rem;
        z-index: 1;
      }
    }
  }
}

.article__footer {
  display: inline-block;
  position: relative;

  .material-design-icon svg {
    color: $color__primary;
  }
}

.article__back {
  @include link;

  &::after {
    content: '';
    inset: 0;
    position: absolute;
  }
}

.article__details {
  color: $color__text--muted;
  margin-bottom: 1rem;
}

.article__mins {
  white-space: nowrap;

  &::before {
    content: '\2022';
  }
}

.article__tags {
  display: none;
  margin-bottom: 2rem;
  margin-left: -0.1rem;

  @media (min-width: $breakpoint--lg) {
    display: block;
  }

  li {
    background-color: $color__primary--muter;
    border-radius: 1000rem;
    color: $color__text--muted;
    display: inline-block;
    font-size: 80%;
    margin-right: 0.3rem;
    margin-bottom: 0.25rem;
    padding: 0.1rem 0.5rem;
  }
}

.article__description {
  @include h5;

  color: $color__primary;
  font-weight: 300;
  margin-bottom: 3rem;
}
</style>
