# Vercel deployment and analytics
This is a static HTML portfolio. Vercel Web Analytics is included via its script integration, not the Next.js-only Analytics component.
Deploy the dist directory on Vercel and enable Web Analytics in the project dashboard. Analytics is disabled on localhost. Verify collection on the deployed domain; it has not been verified locally.
The /_vercel/insights/script.js endpoint must be served by the deployment. If the dashboard provides a unique analytics path, replace the endpoint with that exact path.
