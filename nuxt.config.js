import fs from 'fs'
import path from 'path'
import Mode from 'frontmatter-markdown-loader/mode'
import routes from './contents/routes'
import markdown from './config/markdown'
import minify from './config/minify'
import { openGraphTags } from './config/opengraph'
import head from './config/head'

// Load primary color from sass variables
const [, primaryColor] = fs
  .readFileSync(path.join(__dirname, 'assets', 'scss', '_variables.scss'), {
    encoding: 'utf8'
  })
  .match(/\$color__primary:\s*([^;]+);/)

export default {
  // ✅ Ensure Netlify-compatible static generation
  target: 'static',
  ssr: false,

  // ✅ Safe fallback page for Netlify routing (SPA)
  generate: {
    fallback: true,
    routes: [...routes, '/meta/', ...routes.map((route) => `/meta${route}`)]
  },

  // ✅ Recaptcha configuration
  recaptcha: {
    hideBadge: false,
    siteKey: process.env.SITE_RECAPTCHA_KEY || '6Lf4XbAoAAAAAO75S80KvVXYAVl_w1V_sIpA6LvI',
    size: 'invisible',
    version: 2
  },

  // ✅ Page head configuration
  head: {
    title: 'Gopal portfolio',
    titleTemplate: '%s • Personal Blog',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Personal site and portfolio of freelance developer Gopal Kumar.'
      },
      { name: 'msapplication-TileColor', content: '#3355ff' },
      { hid: 'theme-color', name: 'theme-color', content: '#3355ff' },
      ...openGraphTags
    ],
    link: [
      { rel: 'preconnect', href: 'https://www.google-analytics.com' },
      { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
      { rel: 'dns-prefetch', href: 'https://www.google-analytics.com' },
      { rel: 'dns-prefetch', href: 'https://cdn.jsdelivr.net' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#3355ff' }
    ],
    script: [
      {
        innerHTML: head
      }
    ],
    noscript: [
      {
        innerHTML:
          '<style>.theme-toggle,.lazy>picture::after,.lazy>picture>img{display:none;}</style>'
      }
    ],
    __dangerouslyDisableSanitizers: ['noscript', 'script']
  },

  // ✅ Global loading bar
  loading: {
    color: primaryColor,
    duration: 3000
  },

  // ✅ Global CSS
  css: ['~/assets/scss/default.scss'],

  // ✅ Plugins
  plugins: [
    '~/plugins/auth.js',
    '~/plugins/components.js',
    '~/plugins/dynamic-content.client.js',
    '~/plugins/dynamic-content.server.js',
    '~/plugins/lazy-images.client.js',
    '~/plugins/markdown.client.js',
    '~/plugins/tabbing.client.js'
  ],

  // ✅ Build Modules
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/google-analytics',
    '@nuxtjs/pwa'
  ],

  // ✅ Modules
  modules: ['@nuxtjs/recaptcha', '@nuxtjs/sitemap'],

  // ✅ SCSS resources
  styleResources: {
    scss: [
      '~/assets/scss/_variables.scss',
      '~/assets/scss/_mixins.scss',
      '~/assets/scss/_typography.scss'
    ]
  },

  // ✅ Google Analytics
  googleAnalytics: {
    id: 'UA-115006226-1'
  },

  // ✅ Sitemap configuration
  sitemap: {
    gzip: true,
    hostname: process.env.URL || 'https://gopal-kumar.netlify.app',
    routes
  },

  // ✅ Router - add trailing slash for Netlify
  router: {
    trailingSlash: true
  },

  // ✅ Renderer configuration for preload optimization
  render: {
    bundleRenderer: {
      shouldPreload: (file, type) => {
        if (type === 'font') return /\.woff2$/.test(file)
        return ['script', 'style'].includes(type)
      }
    }
  },

  // ✅ PWA Configuration
  pwa: {
    icon: false,
    meta: false,
    manifest: false
  },

  // ✅ Build optimizations and loaders
  build: {
    filenames: {
      app: ({ isDev }) => (isDev ? '[name].js' : '[contenthash:7].js'),
      chunk: ({ isDev }) => (isDev ? '[name].js' : '[contenthash:7].js'),
      css: ({ isDev }) => (isDev ? '[name].css' : '[contenthash:7].css'),
      img: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'img/[contenthash:7].[ext]',
      font: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'fonts/[contenthash:7].[ext]',
      video: ({ isDev }) =>
        isDev ? '[path][name].[ext]' : 'videos/[contenthash:7].[ext]'
    },
    html: { minify },
    postcss: null,

    extend(config, { isClient, loaders: { vue } }) {
      // Allow Nuxt to handle lazy-loaded images properly
      if (isClient) {
        vue.transformAssetUrls.img = ['data-src', 'src']
        vue.transformAssetUrls.source = ['data-srcset', 'srcset']
      }

      // Resolve material design icons alias
      config.resolve.alias.icons = path.resolve(
        __dirname,
        'node_modules/vue-material-design-icons'
      )

      // Custom image loader using sharp
      config.module.rules.forEach((rule) => {
        if (rule.test && rule.test.test('.png')) {
          rule.use = [
            {
              loader: path.resolve(__dirname, 'loaders', 'sharp'),
              options: { quality: 80 }
            }
          ]
        }
      })

      // Markdown loader
      config.module.rules.unshift({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          mode: [Mode.HTML, Mode.BODY, Mode.VUE_RENDER_FUNCTIONS],
          vue: { root: 'markdown' },
          markdown
        }
      })
    }
  }
}