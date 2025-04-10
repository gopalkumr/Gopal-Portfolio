const GITHUB_URL = 'https://github.com/'
const GITHUB_API = 'https://api.github.com/repos/'

export async function projectLoader(projectSlug) {
  const project = await import(`~/contents/projects/${projectSlug}.md`)
  project.attributes.slug = projectSlug
  project.attributes.date = new Date(project.attributes.date)
  project.attributes.link = `/projects/${projectSlug}/`
  project.attributes.mins = Math.round(project.body.length / 1250) || 1

  if (project.attributes.github) {
    const repository = project.attributes.github.replace(GITHUB_URL, '')
    const response = await fetch(`${GITHUB_API}${repository}`)
    const { stargazers_count: stars } = await response.json()
    project.attributes.stars = stars
  }

  // Extract table of contents from post
  project.attributes.tableOfContents = (() => {
    let fragment
    if (process.server) {
      const { JSDOM } = require('jsdom')
      fragment = JSDOM.fragment(`<div>${project.html}</div>`).firstChild
    } else {
      fragment = document.createElement('div')
      fragment.innerHTML = project.html
    }

    const tableOfContents = fragment.querySelector('.table-of-contents')
    return tableOfContents && tableOfContents.outerHTML
  })()

  return project
}

export const projectSlugs = [

  //this has to be removed
  // add the project title here
  'vgpt',
  'visionml',
  'icon-packs',
  'Farmhelp',
  'Flutter-animated-rive',
  'plant-diseases-detection-with-custom-api',

]
