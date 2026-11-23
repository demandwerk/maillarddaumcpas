(function () {
  // Mobile menu
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Client Services dropdown (click / keyboard; hover handled in CSS on desktop)
  document.querySelectorAll('.dd').forEach(function (dd) {
    var btn = dd.querySelector('button');
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      var open = dd.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  });
  document.addEventListener('click', function (e) {
    document.querySelectorAll('.dd.open').forEach(function (dd) {
      if (!dd.contains(e.target)) {
        dd.classList.remove('open');
        dd.querySelector('button').setAttribute('aria-expanded', 'false');
      }
    });
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.dd.open').forEach(function (dd) {
      dd.classList.remove('open');
      var b = dd.querySelector('button');
      b.setAttribute('aria-expanded', 'false');
      b.focus();
    });
  });

  // Footer year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  // Contact form.
  // To go live, set data-endpoint on the <form> to a form service URL
  // (e.g. Formspree, Netlify Forms, or the host's own handler).
  var form = document.getElementById('contact-form');
  if (form) {
    var status = document.getElementById('form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var endpoint = form.getAttribute('data-endpoint');
      if (!endpoint) {
        status.hidden = false;
        status.textContent = 'Online messages are not connected yet. Please call or email the office directly using the details on this page.';
        return;
      }
      var btn = form.querySelector('button[type="submit"]');
      btn.disabled = true;
      fetch(endpoint, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
        .then(function (r) {
          status.hidden = false;
          if (r.ok) {
            status.textContent = 'Thank you. Your message reached our office and we will reply within one business day.';
            form.reset();
          } else {
            status.textContent = 'Your message did not go through. Please try again, or call the office.';
          }
        })
        .catch(function () {
          status.hidden = false;
          status.textContent = 'Your message did not go through. Please check your connection, or call the office.';
        })
        .finally(function () { btn.disabled = false; });
    });
  }
})();
