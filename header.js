async function loadSiteHeader() {
  const headerMount = document.querySelector('[data-site-header]');

  if (!headerMount) {
    return;
  }

  try {
    const response = await fetch('header.html');

    if (!response.ok) {
      throw new Error(`Header request failed: ${response.status}`);
    }

    headerMount.outerHTML = await response.text();

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links [data-page]').forEach((link) => {
      link.classList.toggle('active', `${link.dataset.page}.html` === currentPage);
    });
  } catch (error) {
    console.error('Unable to load the shared header.', error);
  }
}

loadSiteHeader();
