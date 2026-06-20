export async function postLoader(postSlug) {
  const post = await import(`~/contents/blog/${postSlug}.md`)
  post.attributes.slug = postSlug
  post.attributes.date = new Date(post.attributes.date)
  post.attributes.link = `/blog/${postSlug}/`
  post.attributes.mins = Math.round(post.body.length / 1250) || 1

  // Extract table of contents from post
  post.attributes.tableOfContents = (() => {
    let fragment
    if (process.server) {
      const { JSDOM } = require('jsdom')
      fragment = JSDOM.fragment(`<div>${post.html}</div>`).firstChild
    } else {
      fragment = document.createElement('div')
      fragment.innerHTML = post.html
    }

    const tableOfContents = fragment.querySelector('.table-of-contents')
    return tableOfContents && tableOfContents.outerHTML
  })()

  return post
}

export const postSlugs = [
  'build-a-blog-with-nuxt-and-markdown',
  'choosing-a-cms-for-your-website',
  'interpolating-colour-with-css',
  'my-markdown-it-configuration',
  'nuxt-netlify-forms-and-recaptcha',
  'optimising-the-fonts-on-my-website',
  'styling-a-sectionlist-in-react-native',
  'leading-the-mlsc-as-a-core-team-member',
  'how-to-get-azure-credits-for-students',
  'iasf-2024-student-forum',
  'OpenStack-using-microstack-installation-in-ubuntu',
  'install-hadoop-using-docker',
  'internship-at-iitd',
  'Day1-at-amazon',
  'Interview-Experience-at-amazon',
  'Transforming-the-Transformer',
  'prompt-as-a-skill-knowledge-pre-seeding'
]
