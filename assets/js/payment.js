document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.classList.add('reveal-ready');
  });

  document.querySelectorAll('.pay-option').forEach((opt) => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.pay-option').forEach((o) => {
        o.classList.remove('selected');
        o.classList.remove('is-changing');
      });

      opt.classList.add('selected');
      opt.classList.add('is-changing');

      requestAnimationFrame(() => {
        opt.classList.remove('is-changing');
      });
    });
  });

  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', () => {
      window.location.href = 'review.html';
    });
  }

  const applyBtn = document.querySelector('.promo-apply');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const input = document.querySelector('.promo-input');
      if (input && input.value.trim()) {
        applyBtn.textContent = 'Applied';
        applyBtn.style.background = '#f4cb58';
        applyBtn.style.color = '#181409';
      }
    });
  }
});