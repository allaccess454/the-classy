document.addEventListener('DOMContentLoaded', () => {

  const toastEl = document.createElement('div');
  toastEl.className = 'toast';
  document.body.appendChild(toastEl);

  let toastTimer = null;
  function showToast(message){
    clearTimeout(toastTimer);
    toastEl.textContent = message;
    toastEl.classList.add('show');
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2600);
  }

  const downloadBtn = document.getElementById('downloadBtn');
  downloadBtn.addEventListener('click', () => {
    showToast('Preparing your archival deed — connect a backend to enable the real PDF export.');
  });

  const trackBtn = document.getElementById('trackBtn');
  trackBtn.addEventListener('click', () => {
    showToast('Courier tracking will appear here once a shipping provider is connected.');
  });

  // gentle parallax tilt on the certificate corners when hovered, for a touch of tactility
  const certificate = document.querySelector('.certificate');
  if (certificate && window.matchMedia('(hover: hover)').matches){
    certificate.addEventListener('mousemove', (e) => {
      const rect = certificate.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      certificate.style.transform = `perspective(1400px) rotateY(${x * 1.4}deg) rotateX(${-y * 1.4}deg)`;
    });
    certificate.addEventListener('mouseleave', () => {
      certificate.style.transform = 'perspective(1400px) rotateY(0deg) rotateX(0deg)';
    });
  }
});