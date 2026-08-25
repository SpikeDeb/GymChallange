// PRAMAAN — shared interactions

document.addEventListener('DOMContentLoaded', () => {

  // mobile nav
  const burger = document.querySelector('.burger');
  const navlinks = document.querySelector('.navlinks');
  if(burger && navlinks){
    burger.addEventListener('click', () => {
      const open = navlinks.style.display === 'flex';
      navlinks.style.display = open ? 'none' : 'flex';
      navlinks.style.cssText += open ? '' : 'position:absolute; top:74px; left:0; right:0; flex-direction:column; background:#1C1B1A; padding:20px 28px; border-bottom:1px solid rgba(241,237,228,0.14); gap:18px;';
      burger.setAttribute('aria-expanded', String(!open));
    });
  }

  // scroll reveal
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold:0.12 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // animated count-up for .readout b[data-count]
  const counters = document.querySelectorAll('[data-count]');
  counters.forEach(el => {
    const target = parseFloat(el.getAttribute('data-count'));
    const suffix = el.getAttribute('data-suffix') || '';
    const decimals = el.getAttribute('data-decimals') ? parseInt(el.getAttribute('data-decimals')) : 0;
    let started = false;
    const run = () => {
      if(started) return; started = true;
      let start = null; const dur = 1400;
      function step(ts){
        if(!start) start = ts;
        const p = Math.min((ts - start) / dur, 1);
        const val = target * (1 - Math.pow(1 - p, 3));
        el.textContent = val.toFixed(decimals) + suffix;
        if(p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    };
    if('IntersectionObserver' in window){
      const io2 = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) run(); });
      }, { threshold:0.4 });
      io2.observe(el);
    } else { run(); }
  });

  // filter chips (challenges page)
  const chips = document.querySelectorAll('.chip[data-filter]');
  const cards = document.querySelectorAll('[data-cat]');
  if(chips.length && cards.length){
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const f = chip.getAttribute('data-filter');
        cards.forEach(card => {
          card.style.display = (f === 'all' || card.getAttribute('data-cat') === f) ? '' : 'none';
        });
      });
    });
  }

  // demo registration form (no backend yet)
  const form = document.getElementById('registerForm');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const original = btn.textContent;
      btn.textContent = 'Submitted — Verification Pending';
      btn.disabled = true;
      btn.style.opacity = '0.7';
      setTimeout(() => { btn.textContent = original; btn.disabled = false; btn.style.opacity = '1'; }, 2600);
    });
  }

  // gym partner form
  const gform = document.getElementById('gymForm');
  if(gform){
    gform.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = gform.querySelector('button[type="submit"]');
      btn.textContent = 'Request Sent ✓';
      btn.disabled = true;
    });
  }
});
