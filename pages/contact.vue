<template>
  <main class="contact">
    <h1 class="contact__title">
      <span class="contact__title--primary">Contact</span> Me
    </h1>
    <div class="contact__layout">
      <div class="contact__text">
        <markdown :markdown="markdown" />
        <div class="contact__social">
          <div class="contact__social-item">
            <a class="contact__social-icon" href="mailto:gopalkumargupta337@gmail.com">
              <email-icon title="Email" />
              <span class="contact__social-text">Email me for a chat</span>
            </a>
          </div>
          <div class="contact__social-item">
            <a
              class="contact__social-icon"
              href="https://www.linkedin.com/in/gopalkumar0/"
            >
              <linkedin-icon title="LinkedIn" />
              <span class="contact__social-text">Connect with me</span>
            </a>
          </div>
          <div class="contact__social-item">
            <a class="contact__social-icon" href="https://github.com/gopalkumr">
              <github-icon title="GitHub" />
              <span class="contact__social-text">Check out my projects</span>
            </a>
          </div>
          <div class="contact__social-item">
            <a class="contact__social-icon" href="https://devpost.com/gopalkumr">
              <devpost-icon title="Devpost" />
              <span class="contact__social-text">Hackathon submissions</span>
            </a>
          </div>
          <div class="contact__social-item">
            <a
              class="contact__social-icon"
              href="https://twitter.com/gopalkumar4"
            >
              <twitter-icon title="Twitter" />
              <span class="contact__social-text">Follow me on Twitter</span>
            </a>
          </div>
        </div>
      </div>
      <div class="contact__form">
        <contact-form />
      </div>
    </div>
  </main>
</template>

<script>
import EmailIcon from 'icons/EmailVariant'
import TwitterIcon from 'icons/Twitter'
import GithubIcon from 'icons/Github'
import DevpostIcon from 'icons/HexagonOutline'
import LinkedinIcon from 'icons/Linkedin'
import ContactForm from '~/components/ContactForm'

export default {
  components: {
    ContactForm,
    EmailIcon,
    TwitterIcon,
    GithubIcon,
    DevpostIcon,
    LinkedinIcon
  },
  async asyncData() {
    const { vue } = await import('~/contents/contact.md')
    return {
      markdown: {
        vue
      }
    }
  },
  head() {
    return {
      title: 'Contact'
    }
  }
}
</script>

<style lang="scss">
.contact {
  @include page;
  @include background(
    ((calc(50% + 30rem) 15rem 10rem), (calc(50% - 40rem) -10rem 40rem))
  );
}

.contact__title {
  @include title;

  margin-bottom: 4rem;
}

.contact__title--primary {
  @include title--primary;
}

.contact__layout {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 3rem;

  @media (min-width: $breakpoint--md) {
    grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  }
}

.contact__social {
  margin-top: 2rem;
}

.contact__social-item {
  ~ .contact__social-item {
    margin-top: 0.5rem;
  }
}

.contact__social-icon {
  &:hover,
  &:focus {
    color: $color__primary;
  }

  &:hover {
    .contact__social-text {
      @include link--active;
    }
  }

  span {
    margin-right: 1rem;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }

  &[href*='devpost.com'] {
    svg {
      transform: rotate(90deg);
    }
  }
}

.contact__social-text {
  @include link;
}
</style>
