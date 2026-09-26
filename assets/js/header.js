const fallbackComponents = {
  header: `
    <header class="site-header">
      <div class="header-inner">
        <div class="logo"><a href="../pages/home.html">THE CLASSY</a></div>

        <nav class="nav-links" aria-label="Main Navigation">
          <a href="../pages/home.html" data-page="home">Home</a>
          <a href="../pages/fragrances.html" data-page="fragrances">Fragrances</a>
          <a href="../pages/wallets.html" data-page="wallets">Wallets</a>
          <a href="../pages/gifts.html" data-page="gifts">Gifts</a>
          <a href="../pages/antique.html" data-page="antique">Antique</a>
        </nav>

        <div class="nav-actions" aria-label="Account actions">
          <button class="search-button" type="button" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="5.5"/><path d="M16 16l4.5 4.5"/></svg>
          </button>
          <a href="../pages/cart.html" class="icon-button" aria-label="Bag">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9h12l-1 11H7L6 9Z"/><path d="M9 9V7a3 3 0 0 1 6 0v2"/></svg>
          </a>
          <a href="../pages/profile.html" class="icon-button" aria-label="Profile">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="8" r="4"/></svg>
          </a>
        </div>
      </div>
    </header>`,
  footer: `
    <footer class="site-footer">
      <div class="wrap">
        <div class="logo"><a href="../pages/home.html">THE CLASSY</a></div>
        <div class="foot-links">
          <a href="#">Sustainability</a>
          <a href="#">Heritage</a>
          <a href="#">Care Guides</a>
          <a href="#">Privacy</a>
        </div>
        <div class="foot-right">© 2024 THE CLASSY. ALL RIGHTS RESERVED.</div>
      </div>
    </footer>`
};

async function loadComponent(selector, componentPath, fallbackMarkup) {
  const mount = document.querySelector(selector);

  if (!mount) {
    return;
  }

  try {
    const response = await fetch(componentPath);

    if (!response.ok) {
      throw new Error(`Component request failed: ${response.status}`);
    }

    mount.outerHTML = await response.text();
  } catch (error) {
    console.error(`Unable to load component from ${componentPath}.`, error);
    mount.outerHTML = fallbackMarkup;
  }
}

async function loadSiteComponents() {
  await Promise.all([
    loadComponent('[data-site-header]', '../components/header.html', fallbackComponents.header),
    loadComponent('[data-site-footer]', '../components/footer.html', fallbackComponents.footer)
  ]);

  const currentPage = window.location.pathname.split('/').pop() || 'home.html';
  const currentKey = currentPage.replace(/\.html$/, '');

  document.querySelectorAll('.nav-links [data-page]').forEach((link) => {
    const pageKey = link.dataset.page;
    const isActive = pageKey === currentKey || (pageKey === 'fragrances' && currentKey === 'fragrances_details');
    link.classList.toggle('active', isActive);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    loadSiteComponents();
  });
} else {
  loadSiteComponents();
}
