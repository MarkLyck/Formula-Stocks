const fs = require('fs')
const globby = require('globby')

function addPage(page) {
  console.log('page', page)
  const path = page.replace('pages', '').replace('.mdx', '').replace('.tsx', '').replace('.ts', '').replace('src/', '')
  const route = path === '/index' ? '' : path

  return `  <url>
    <loc>${`${process.env.WEBSITE_URL}${route}`}</loc>
    <changefreq>hourly</changefreq>
  </url>`
}

async function generateSitemap() {
  // Ignore Next.js specific files (e.g., _app.js) and API routes.
  const pages = await globby(['src/pages/**/*{.ts,.mdx,.tsx}', '!src/pages/_*.{ts,tsx}', '!src/pages/api'])
  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(addPage).join('\n')}
</urlset>`

  fs.writeFileSync('public/sitemap.xml', sitemap)
}

generateSitemap()
