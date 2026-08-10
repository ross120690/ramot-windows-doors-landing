(function(){
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Hero: shatter-to-seal ---------- */
  var crackPaths = Array.prototype.slice.call(document.querySelectorAll('.crack-lines path'));
  var impactPoint = document.querySelector('.impact-point');
  var paneGlow = document.querySelector('.pane-glow');
  var lineCrack = document.querySelector('.line-crack');
  var lineFix = document.querySelector('.line-fix');
  var afterHeadline = document.querySelectorAll('.hero [data-anim="fade-up"]');

  if (reduceMotion) {
    gsap.set(crackPaths, { strokeDashoffset: 0, opacity: 0.4 });
    gsap.set(lineFix, { opacity: 1, y: 0 });
    gsap.set(afterHeadline, { opacity: 1, y: 0 });
  } else {
    crackPaths.forEach(function(path){
      var len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    });
    gsap.set(lineFix, { opacity: 0, y: 14 });
    gsap.set(afterHeadline, { opacity: 0, y: 20 });
    gsap.set(impactPoint, { scale: 0, transformOrigin: '50% 50%' });
    gsap.set(paneGlow, { opacity: 0 });

    var pane = document.querySelector('.hero-glass');
    var tl = gsap.timeline({ delay: 0.15 });

    tl.to(impactPoint, { scale: 1, duration: 0.15, ease: 'back.out(3)' })
      .to(crackPaths, {
          strokeDashoffset: 0,
          duration: 0.55,
          ease: 'power2.out',
          stagger: 0.035
        }, 0.05)
      .to(pane, {
          x: -4, duration: 0.05, repeat: 5, yoyo: true, ease: 'power1.inOut'
        }, 0.1)
      .set(pane, { x: 0 })
      .to(lineCrack, { skewX: -4, duration: 0.06, repeat: 3, yoyo: true }, 0.1)
      .set(lineCrack, { skewX: 0 })
      /* hold the broken state briefly before healing */
      .to({}, { duration: 0.45 })
      .to(paneGlow, { opacity: 1, duration: 0.9, ease: 'power2.out' }, '<')
      .to(crackPaths, {
          opacity: 0,
          duration: 0.7,
          ease: 'power2.inOut',
          stagger: 0.02
        }, '<0.1')
      .to(lineFix, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '<0.1')
      .to(afterHeadline, {
          opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08
        }, '<0.15');
  }

  /* ---------- Scroll reveals ---------- */
  if (!reduceMotion) {
    ScrollTrigger.batch('[data-reveal]', {
      start: 'top 88%',
      once: true,
      onEnter: function(batch){
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          overwrite: true
        });
      }
    });
  }

  /* ---------- Quote form (no backend wired up yet) ---------- */
  var form = document.querySelector('.quote-form');
  if (form) {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var wrap = form.parentElement;
      var note = document.createElement('p');
      note.className = 'form-note';
      note.textContent = 'Thanks — that\'s in. We\'ll call you back today. If it\'s urgent, use the phone number above.';
      form.replaceWith(note);
    });
  }
})();
