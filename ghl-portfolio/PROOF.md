# Portfolio case studies

Edit `projects.json` for cards and case-study content. Edit `src/index.html` for the retained homepage, navigation and footer, and `src/proof.css` for project styling. Run `node build.cjs` from this directory to regenerate the homepage, work index and detail pages. Do not run the older one-off copy modification scripts against the generated output.

Preview: `node server.cjs` (port 4174). Vercel uses this directory as its project root, runs `node build.cjs`, and publishes `dist`.

Client names are withheld, including from public URLs and metadata. Current routes use anonymous slugs. No source screenshots or project data file containing client names are copied into the public directory.

## Evidence and pending details

Reviewed the brief and both original Notion screenshots in Downloads. The local originals are clearer than the dimensions described in the brief. The buyer record shows five checked deliverables. The second record supports six workflow group headings and a Zapier sync to FUB, but does not establish conversion/revenue results or Akorede's individual role beyond the supplied brief.

Still needed: client naming permission; permission and approved redactions for individual gallery images; meaning of HBW; confirmation of individual contribution; working authorized walkthrough URLs. Review wording is visible in the local original, but attribution to Akorede and publication permission remain unconfirmed, so it is omitted.

## Adding evidence

Put approved, redacted images under `dist/projects/<anonymous-slug>/`. Add gallery entries with `src` (root-relative `/projects/...`), meaningful `alt`, `caption`, and `privacyApproved: true`. Missing files and unapproved entries are omitted. Set `walkthroughApproved: true` alongside a real HTTPS `walkthroughUrl` to expose a video. Testimonials require `permissionConfirmed: true`; authors remain anonymous while `clientNameApproved` is false. Review every free-text field for identifiers before publication.

The existing `noindex,nofollow` draft setting remains; remove it deliberately when the portfolio is ready for search indexing. No production deployment was performed in this phase.
