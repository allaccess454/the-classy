document.addEventListener('DOMContentLoaded', () => {

  /* ---- fire the one orchestrated entrance ---- */
  requestAnimationFrame(() => {
    document.body.classList.add('reveal-ready');
  });

  const TAX_RATE = 0.08;
  const fmt = (n) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const lineItems = Array.from(document.querySelectorAll('.line-item'));
  const subtotalEl = document.querySelector('.sum-subtotal');
  const taxEl = document.querySelector('.sum-tax');
  const totalEl = document.querySelector('.sum-total');

  function animateNumber(el, from, to, prefix = '$') {
    const duration = 420;
    const start = performance.now();
    function tick(now) {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = from + (to - from) * eased;
      el.textContent = prefix + fmt(val);
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function recalc() {
    let subtotal = 0;
    lineItems.forEach(item => {
      const unit = parseFloat(item.dataset.price);
      const qty = parseInt(item.querySelector('.qty-value').textContent, 10);
      const lineTotal = unit * qty;
      item.querySelector('.item-price').textContent = '$' + fmt(lineTotal);
      subtotal += lineTotal;
    });
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;

    const prevSubtotal = parseFloat(subtotalEl.textContent.replace(/[^0-9.]/g, '')) || subtotal;
    const prevTax = parseFloat(taxEl.textContent.replace(/[^0-9.]/g, '')) || tax;
    const prevTotal = parseFloat(totalEl.textContent.replace(/[^0-9.]/g, '')) || total;

    animateNumber(subtotalEl, prevSubtotal, subtotal);
    animateNumber(taxEl, prevTax, tax);
    animateNumber(totalEl, prevTotal, total);
  }

  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const stepper = btn.closest('.qty-stepper');
      const valueEl = stepper.querySelector('.qty-value');
      let qty = parseInt(valueEl.textContent, 10);
      if (btn.dataset.action === 'inc') qty = Math.min(9, qty + 1);
      if (btn.dataset.action === 'dec') qty = Math.max(1, qty - 1);
      valueEl.textContent = String(qty).padStart(2, '0');
      recalc();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.line-item');
      item.style.transition = 'opacity .45s ease, transform .45s ease, max-height .45s ease';
      item.style.opacity = '0';
      item.style.transform = 'translateX(-14px)';
      setTimeout(() => {
        item.remove();
        recalc();
      }, 430);
    });
  });

  /* ---- carousel arrows ---- */
  const track = document.getElementById('carouselTrack');
  const prev = document.getElementById('arrowPrev');
  const next = document.getElementById('arrowNext');
  let offset = 0;

  function scrollCarousel(dir) {
    const cardWidth = track.firstElementChild.getBoundingClientRect().width + 26;
    const maxOffset = -(cardWidth * (track.children.length - Math.floor(track.parentElement.clientWidth / cardWidth)));
    offset = Math.max(Math.min(offset - dir * cardWidth, 0), maxOffset);
    track.style.transform = `translateX(${offset}px)`;
  }

  next && next.addEventListener('click', () => scrollCarousel(1));
  prev && prev.addEventListener('click', () => scrollCarousel(-1));

  /* ---- shipping form (shipping.html) ---- */
  const shipForm = document.querySelector('.ship-form');
  if (shipForm) {
    shipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      shipForm.querySelectorAll('input').forEach(input => {
        const field = input.closest('.field');
        if (field) field.classList.remove('field-invalid');
        if (!input.value.trim()) {
          valid = false;
          if (field) field.classList.add('field-invalid');
        }
      });
      if (!valid) return;

      const btn = shipForm.querySelector('.ship-submit span');
      const original = btn ? btn.textContent : 'Continue to Payment';
      if (btn) btn.textContent = 'Proceeding…';
      setTimeout(() => {
        const steps = document.querySelectorAll('.stepper .step');
        if (steps[0]) { steps[0].classList.remove('is-active'); steps[0].classList.add('is-complete'); }
        if (steps[1]) { steps[1].classList.add('is-active'); }
        if (btn) btn.textContent = original;
        window.location.href = 'payment.html';
      }, 700);
    });
  }

  const promoApply = document.getElementById('promoApply');
  if (promoApply) {
    promoApply.addEventListener('click', () => {
      const input = document.querySelector('.promo-input');
      if (!input.value.trim()) {
        input.focus();
        return;
      }
      promoApply.classList.add('is-applied');
      promoApply.textContent = 'Applied';
    });
  }

});