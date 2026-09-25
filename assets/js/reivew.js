document.addEventListener('DOMContentLoaded', () => {
  requestAnimationFrame(() => {
    document.body.classList.add('reveal-ready');
  });

  const placeOrderBtn = document.querySelector('.place-order-btn');
  if (placeOrderBtn) {
    placeOrderBtn.addEventListener('click', () => {
      window.location.href = 'order_placed.html';
    });
  }

  const returnLink = document.querySelector('.return-link');
  if (returnLink) {
    returnLink.addEventListener('click', (event) => {
      event.preventDefault();
      window.location.href = 'payment.html';
    });
  }

  const applyBtn = document.querySelector('.apply-btn');
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