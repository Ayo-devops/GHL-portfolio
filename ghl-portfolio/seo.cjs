const fs = require('node:fs');
const path = require('node:path');
const origin = 'https://ghl-with-ako.vercel.app';
const root = __dirname;
const projects = JSON.parse(fs.readFileSync(path.join(root, 'projects.json'), 'utf8'));
const routes = ['/', '/work/', ...projects.map(p => `/work/${p.slug}/`)];
const plain = s => s.replace(/<[^>]*>/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
const person = {
  '@type': 'Person', '@id': `${origin}/#akorede`, name: 'Akorede A.',
  url: `${origin}/`, jobTitle: 'GoHighLevel Specialist',
  sameAs: ['https://www.linkedin.com/in/da-original-kay', 'https://x.com/da_original_Ayo'],
  knowsAbout: ['GoHighLevel', 'CRM systems', 'Workflow automation', 'Sales funnels', 'Appointment booking', 'AI integrations']
};
for (const route of routes) {
  const file = path.join(root, 'dist', route, 'index.html');
  let html = fs.readFileSync(file, 'utf8');
  const title = plain(html.match(/<title>(.*?)<\/title>/s)[1]);
  const description = plain(html.match(/<meta name="description" content="([^"]*)"/)[1]);
  const url = origin + route;
  const graph = [person, {'@type':'WebSite', '@id':`${origin}/#website`, url:origin+'/', name:'Akorede A. | GoHighLevel Specialist', publisher:{'@id':person['@id']}},
    {'@type':route === '/work/' ? 'CollectionPage' : route === '/' ? 'ProfilePage' : 'WebPage', '@id':url+'#page', url, name:title, description, inLanguage:'en', isPartOf:{'@id':`${origin}/#website`}, about:{'@id':person['@id']}, ...(route==='/' ? {mainEntity:{'@id':person['@id']}} : {})}];
  if (route !== '/') {
    const crumbs = [{name:'Home',item:origin+'/'},{name:'Selected Work',item:origin+'/work/'}];
    if(route !== '/work/') crumbs.push({name:title.replace(/ \| Akorede A\.$/,''), item:url});
    graph.push({'@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))});
  } else {
    const questions = [...html.matchAll(/<details><summary>(.*?)<\/summary>(.*?)<\/details>/gs)].map(m=>({'@type':'Question',name:plain(m[1]),acceptedAnswer:{'@type':'Answer',text:plain(m[2])}}));
    if(questions.length) graph.push({'@type':'FAQPage','@id':origin+'/#faq',mainEntity:questions});
  }
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'');
  html = html.replace('</head>', `<link rel="canonical" href="${url}"><meta property="og:url" content="${url}"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replace(/</g,'\\u003c')}</script></head>`);
  fs.writeFileSync(file, html);
}
fs.writeFileSync(path.join(root,'dist/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync(path.join(root,'dist/sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(r=>`  <url><loc>${origin+r}</loc></url>`).join('\n')}\n</urlset>\n`);
for(const name of fs.readdirSync(path.join(root,'src/public'))) fs.copyFileSync(path.join(root,'src/public',name),path.join(root,'dist',name));
console.log('Added canonical URLs, structured data, sitemap, robots.txt and verification file.');
