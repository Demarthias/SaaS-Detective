addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  let path = url.pathname;

  // Redirect /SaaS-Detective- to /SaaS-Detective
  if (path === '/SaaS-Detective-' || path === '/SaaS-Detective-/') {
    return Response.redirect('https://venom-industries.com/SaaS-Detective', 301);
  }

  // Direct access to GitHub repository
  const githubBase = 'https://raw.githubusercontent.com/Demarthias/Venom-Industries-LLC/main';

  // Route correction: Ensure the root points to index.html
  if (path === '/SaaS-Detective' || path === '/SaaS-Detective/') {
    path = '/SaaS-Detective/index.html';
  }

  const targetUrl = githubBase + path;
  const response = await fetch(targetUrl);

  if (response.ok) {
    let contentType = 'text/plain';
    if (path.endsWith('.html')) contentType = 'text/html';
    else if (path.endsWith('.css')) contentType = 'text/css';
    else if (path.endsWith('.js')) contentType = 'application/javascript';
    else if (path.endsWith('.png')) contentType = 'image/png';
    else if (path.endsWith('.jpg') || path.endsWith('.jpeg')) contentType = 'image/jpeg';

    return new Response(response.body, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache'
      }
    });
  }

  return new Response('Error 404: File not found — path: ' + path, { status: 404 });
}
