import fs from 'fs'
import path from 'path'
import https from 'https'
import dotenv from 'dotenv'
import routes from '../contents/routes'

// Generate images on `yarn opengraph`
if (require.main === module) {
  generateImages(routes)
}

function generateImages(routes) {
  // Load API key
  dotenv.config()

  if (process.env.APIFLASH_API_KEY !== undefined) {
    ;[...routes, '/'].forEach((route) => {
      // Create new static directory for Open Graph image
      const directory = path.join(process.cwd(), 'static', route.slice(1))
      fs.mkdirSync(directory, { recursive: true })

      // Check if Open Graph image already exists
      const filepath = path.join(directory, 'og.png')
      if (fs.existsSync(filepath)) return

      // URL to corresponding meta page
      const url = encodeURIComponent(`https://gopal.vercel.app/meta${route}`)

      // ApiFlash endpoint
      const api = `https://api.apiflash.com/v1/urltoimage?access_key=${process.env.APIFLASH_API_KEY}&format=png&height=630&response_type=image&url=${url}&width=1200&fresh=true`

      // Write response to file
      https.get(api, (response) => {
        const file = fs.createWriteStream(filepath)
        response.pipe(file)
        file.on('finish', file.close)
      })
    })
  }
}

export const openGraphTags = [
  {
    hid: 'og:type',
    property: 'og:type',
    content: 'website'
  },
  {
    hid: 'og:site_name',
    property: 'og:site_name',
    content: 'Gopal Kumar'
  },
  {
    hid: 'og:title',
    property: 'og:title',
    content: 'Gopal Kumar'
  },
  {
    hid: 'og:description',
    property: 'og:description',
    content: 'Personal site and portfolio of Gopal Kumar.'
  },
  {
    hid: 'og:url',
    property: 'og:url',
    content: 'https://gopal.vercel.app/'
  },
  {
    hid: 'og:image',
    property: 'og:image',
    content: 'https://gopal.vercel.app/og.png'  //replace all these url tags if issue presist
  },
  {
    hid: 'og:image:type',
    property: 'og:image:type',
    content: 'image/png'
  },
  {
    hid: 'og:image:width',
    property: 'og:image:width',
    content: '1200'
  },
  {
    hid: 'og:image:height',
    property: 'og:image:height',
    content: '630'
  },
  {
    hid: 'twitter:card',
    name: 'twitter:card',
    content: 'summary_large_image'
  },
  {
    hid: 'twitter:site',
    name: 'twitter:site',
    content: '@gopalkumar4'
  }
]
