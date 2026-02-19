/* ============================================================
   MEHFOOZ — script.js  (HubCycled Edition)
   5-State Cycling Cursor × Locomotive-Style Scroll Skew
   Parallax Images × Enhanced GSAP Reveals × All original features
   ============================================================ */

'use strict';

/* ─── 1. PRELOADER ─────────────────────────────────────────── */
(function () {
    var loader   = document.getElementById('loadingScreen');
    var bar      = document.getElementById('loadingBar');
    var pct      = document.getElementById('loaderPercent');
    if (!loader) return;

    var progress = 0, done = false;

    function setProgress(val) {
        val = Math.min(100, Math.round(val));
        if (bar) bar.style.width  = val + '%';
        if (pct) pct.textContent  = val + '%';
    }
    function finish() {
        if (done) return;
        done = true;
        setProgress(100);
        setTimeout(function () {
            loader.style.transition = 'transform 1.1s cubic-bezier(0.77,0,0.18,1)';
            loader.style.transform  = 'translateY(-100%)';
            setTimeout(function () {
                loader.style.display = 'none';
                document.dispatchEvent(new Event('preloader:done'));
            }, 1200);
        }, 280);
    }

    var iv = setInterval(function () {
        if (done) { clearInterval(iv); return; }
        progress += Math.random() * 14 + 4;
        if (progress >= 100) { clearInterval(iv); finish(); }
        else { setProgress(progress); }
    }, 95);

    setTimeout(finish, 4200);
}());

/* ─── 2. MAIN APP ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

    var hasGSAP = typeof gsap !== 'undefined';
    var hasScrollTrigger = typeof ScrollTrigger !== 'undefined';
    if (hasGSAP && hasScrollTrigger) gsap.registerPlugin(ScrollTrigger);

    /* ─────────────────────────────────────────────────────────
       3. SCROLL PROGRESS BAR
    ──────────────────────────────────────────────────────────── */
    var progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        window.addEventListener('scroll', function () {
            var total  = document.documentElement.scrollHeight - window.innerHeight;
            var current = window.scrollY;
            progressBar.style.width = (current / total * 100).toFixed(1) + '%';
        }, { passive: true });
    }

    /* ─────────────────────────────────────────────────────────
       4. CUSTOM CURSOR — 5-STATE AUTO-CYCLING SYSTEM
       States cycle every 3.8s: default → diamond → ring → blob → pill → repeat
    ──────────────────────────────────────────────────────────── */
    var curDot  = document.getElementById('cursor-dot');
    var curRing = document.getElementById('cursor-ring');
    var mx = 0, my = 0, rx = 0, ry = 0;

    // State machine
    var cursorState = 0;
    var TOTAL_STATES = 5;
    var cycleInterval = null;
    var isHovering = false;

    function setCursorState(n) {
        cursorState = n;
        // Remove all state classes
        for (var i = 1; i < TOTAL_STATES; i++) {
            document.body.classList.remove('cursor-state-' + i);
        }
        if (n > 0) {
            document.body.classList.add('cursor-state-' + n);
        }
    }

    function startCursorCycle() {
        if (cycleInterval) clearInterval(cycleInterval);
        cycleInterval = setInterval(function () {
            if (isHovering) return;
            var next = (cursorState + 1) % TOTAL_STATES;
            setCursorState(next);
        }, 3800);
    }

    function stopCursorCycle() {
        if (cycleInterval) { clearInterval(cycleInterval); cycleInterval = null; }
    }

    if (curDot && curRing) {
        // Mouse tracking
        window.addEventListener('mousemove', function (e) {
            mx = e.clientX; my = e.clientY;
            curDot.style.left = mx + 'px';
            curDot.style.top  = my + 'px';
        });

        // Laggy ring follows with lerp
        (function animRing() {
            rx += (mx - rx) * 0.12;
            ry += (my - ry) * 0.12;
            curRing.style.left = rx + 'px';
            curRing.style.top  = ry + 'px';
            requestAnimationFrame(animRing);
        }());

        // Hover detection
        var hoverTargets = 'a, button, .program-card, .testi-card, .tool-card, .blog-card, .pillar-card, .faq-question, .featured-logo-link';
        document.querySelectorAll(hoverTargets).forEach(function (el) {
            el.addEventListener('mouseenter', function () {
                isHovering = true;
                curRing.classList.add('is-hovering');
                curDot.classList.add('is-hovering');
            });
            el.addEventListener('mouseleave', function () {
                isHovering = false;
                curRing.classList.remove('is-hovering');
                curDot.classList.remove('is-hovering');
            });
        });

        // Hide on touch devices
        window.addEventListener('touchstart', function () {
            if (curDot)  curDot.style.display  = 'none';
            if (curRing) curRing.style.display = 'none';
            stopCursorCycle();
        }, { once: true });

        // Start cycling after preloader
        document.addEventListener('preloader:done', function () {
            startCursorCycle();
        });
    }

    /* ─────────────────────────────────────────────────────────
       5. COSMIC STARFIELD CANVAS
    ──────────────────────────────────────────────────────────── */
    var canvas = document.getElementById('cosmicBackground');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var W = 0, H = 0, stars = [];

        function buildCanvas() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
            stars = Array.from({ length: 80 }, function () {
                return {
                    x: Math.random() * W, y: Math.random() * H,
                    r: Math.random() * 1.5 + 0.3,
                    speed: Math.random() * 0.18 + 0.04,
                    phase: Math.random() * Math.PI * 2,
                    phaseSpeed: Math.random() * 0.015 + 0.005
                };
            });
        }
        buildCanvas();
        window.addEventListener('resize', buildCanvas, { passive: true });

        function drawCosmos() {
            ctx.clearRect(0, 0, W, H);
            ctx.fillStyle = 'rgba(17,17,17,0.035)';
            for (var gx = 0; gx < W; gx += 60) {
                for (var gy = 0; gy < H; gy += 60) {
                    ctx.beginPath(); ctx.arc(gx, gy, 1.4, 0, Math.PI * 2); ctx.fill();
                }
            }
            stars.forEach(function (s) {
                s.phase += s.phaseSpeed;
                var alpha = 0.04 + 0.09 * (0.5 + 0.5 * Math.sin(s.phase));
                ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(17,17,17,' + alpha.toFixed(3) + ')';
                ctx.fill();
                s.y -= s.speed;
                if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
            });
            requestAnimationFrame(drawCosmos);
        }
        drawCosmos();
    }

    /* ─────────────────────────────────────────────────────────
       6. MAGNETIC BUTTONS
    ──────────────────────────────────────────────────────────── */
    document.querySelectorAll('.magnetic').forEach(function (btn) {
        btn.addEventListener('mousemove', function (e) {
            var rect = btn.getBoundingClientRect();
            var cx   = rect.left + rect.width  / 2;
            var cy   = rect.top  + rect.height / 2;
            var dx   = (e.clientX - cx) * 0.26;
            var dy   = (e.clientY - cy) * 0.26;
            btn.style.transform = 'translate(' + dx + 'px,' + dy + 'px)';
        });
        btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });

    /* ─────────────────────────────────────────────────────────
       7. PARALLAX HERO SHAPES on mousemove
    ──────────────────────────────────────────────────────────── */
    var heroSection = document.querySelector('.hero-section');
    var shapes = Array.from(document.querySelectorAll('.playful-shape'));
    var confettiPieces = Array.from(document.querySelectorAll('.conf'));

    if (heroSection && shapes.length) {
        heroSection.addEventListener('mousemove', function (e) {
            var rect = heroSection.getBoundingClientRect();
            var rx2 = (e.clientX - rect.left) / rect.width  - 0.5;
            var ry2 = (e.clientY - rect.top)  / rect.height - 0.5;
            shapes.forEach(function (s, i) {
                var depth = 0.015 * ((i % 3) + 1);
                s.style.transform = 'translate(' + (rx2 * rect.width * depth) + 'px,' + (ry2 * rect.height * depth) + 'px)';
            });
            confettiPieces.forEach(function (c, i) {
                var depth = 0.008 * ((i % 4) + 1);
                c.style.transform = 'translate(' + (rx2 * rect.width * depth) + 'px,' + (ry2 * rect.height * depth) + 'px)';
            });
        });
        heroSection.addEventListener('mouseleave', function () {
            shapes.forEach(function (s) { s.style.transform = ''; });
            confettiPieces.forEach(function (c) { c.style.transform = ''; });
        });
    }

    /* ─────────────────────────────────────────────────────────
       8. HERO REVEAL after preloader
    ──────────────────────────────────────────────────────────── */
    function revealHero() {
        startStatsBand();
        if (!hasGSAP) return;

        gsap.fromTo('.hero-eyebrow', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', delay: .2 });
        gsap.fromTo('.hero-line', { opacity: 0, y: 52 }, { opacity: 1, y: 0, duration: 1, ease: 'power4.out', stagger: .1, delay: .35 });
        gsap.fromTo('.hero-subtitle', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .9, ease: 'power3.out', delay: .75 });
        gsap.fromTo('.hero-actions', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: .8, ease: 'back.out(1.7)', delay: .9 });
        gsap.fromTo('.hero-trust', { opacity: 0, scale: .94 }, { opacity: 1, scale: 1, duration: .7, ease: 'back.out(1.5)', delay: 1.1 });
    }
    document.addEventListener('preloader:done', revealHero);

    /* ─────────────────────────────────────────────────────────
       9. FADE-UP — INTERSECTION OBSERVER
    ──────────────────────────────────────────────────────────── */
    var ioFade = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (e.isIntersecting) { e.target.classList.add('visible'); ioFade.unobserve(e.target); }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up').forEach(function (el) { ioFade.observe(el); });

    /* ─────────────────────────────────────────────────────────
       10. GSAP SCROLL REVEALS
    ──────────────────────────────────────────────────────────── */
    if (hasGSAP && hasScrollTrigger) {

        // Cards stagger
        var staggerTargets = '.pillar-card, .tool-card, .program-card, .blog-card, .testi-card';
        document.querySelectorAll(staggerTargets).forEach(function (el, i) {
            gsap.fromTo(el,
                { opacity: 0, y: 36, scale: .97 },
                { opacity: 1, y: 0, scale: 1, duration: .75, ease: 'power3.out', delay: (i % 4) * 0.09,
                  scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
            );
        });

        // Section headings pop
        document.querySelectorAll('.section-heading').forEach(function (el) {
            gsap.fromTo(el,
                { opacity: 0, y: 32 },
                { opacity: 1, y: 0, duration: 1, ease: 'power4.out',
                  scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
            );
        });

        // Section tags slide from left (HubCycled-inspired)
        document.querySelectorAll('.section-tag').forEach(function (el) {
            gsap.fromTo(el,
                { opacity: 0, x: -28 },
                { opacity: 1, x: 0, duration: .7, ease: 'power3.out',
                  scrollTrigger: { trigger: el, start: 'top 88%', once: true } }
            );
        });

        // Tool card accent bars expand on scroll
        document.querySelectorAll('.tool-card-accent').forEach(function (el) {
            gsap.fromTo(el,
                { width: 0 },
                { width: '100%', duration: .8, ease: 'power3.out',
                  scrollTrigger: { trigger: el, start: 'top 80%', once: true } }
            );
        });

        // Stats band
        gsap.fromTo('.stat-band-item', { opacity: 0, scale: .84 }, {
            opacity: 1, scale: 1, duration: .65, ease: 'back.out(1.7)', stagger: .1,
            scrollTrigger: { trigger: '.stats-band', start: 'top 82%', once: true }
        });

        // Pillar numbers
        document.querySelectorAll('.pillar-number').forEach(function (el, i) {
            gsap.fromTo(el, { opacity: 0, y: 20 }, {
                opacity: 1, y: 0, duration: .6, ease: 'power3.out', delay: i * 0.1,
                scrollTrigger: { trigger: el, start: 'top 85%', once: true }
            });
        });

        // Contact form fields stagger
        gsap.fromTo('.form-group', { opacity: 0, y: 18 }, {
            opacity: 1, y: 0, duration: .6, ease: 'power3.out', stagger: 0.1,
            scrollTrigger: { trigger: '.contact-form', start: 'top 85%', once: true }
        });

        // Testimonial track slide from right
        gsap.fromTo('.testi-track', { opacity: 0, x: 40 }, {
            opacity: 1, x: 0, duration: 1, ease: 'power4.out',
            scrollTrigger: { trigger: '.testi-track-wrap', start: 'top 85%', once: true }
        });

        // Footer brand scale-bounce
        gsap.fromTo('.footer-brand', { opacity: 0, scale: .9 }, {
            opacity: 1, scale: 1, duration: .8, ease: 'back.out(1.4)',
            scrollTrigger: { trigger: '.main-footer', start: 'top 90%', once: true }
        });

        // Blog header band
        gsap.fromTo('.blog-header-band', { opacity: 0 }, {
            opacity: 1, duration: .7, ease: 'power3.out',
            scrollTrigger: { trigger: '.blog-header-band', start: 'top 88%', once: true }
        });

        // Image parallax on program + blog cards
        document.querySelectorAll('.program-card-img img, .blog-card-img img').forEach(function (img) {
            gsap.fromTo(img,
                { yPercent: 0 },
                { yPercent: -8, ease: 'none',
                  scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true }
                }
            );
        });
    }

    /* ─────────────────────────────────────────────────────────
       11. LOCOMOTIVE-STYLE SCROLL SKEW
       Sections skew slightly based on scroll velocity — resets when still
    ──────────────────────────────────────────────────────────── */
    var locoSections = document.querySelectorAll('.loco-section');
    var lastScrollY = window.scrollY;
    var skewResetTimer = null;
    var MAX_SKEW = 2.5; // degrees

    if (locoSections.length) {
        window.addEventListener('scroll', function () {
            var currentScrollY = window.scrollY;
            var delta = currentScrollY - lastScrollY;
            lastScrollY = currentScrollY;

            var skew = Math.max(-MAX_SKEW, Math.min(MAX_SKEW, delta * 0.045));

            locoSections.forEach(function (sec) {
                sec.style.transform = 'skewY(' + skew + 'deg)';
                sec.style.transition = 'transform 0.15s ease-out';
            });

            // Reset skew when scrolling stops
            if (skewResetTimer) clearTimeout(skewResetTimer);
            skewResetTimer = setTimeout(function () {
                locoSections.forEach(function (sec) {
                    sec.style.transform = 'skewY(0deg)';
                    sec.style.transition = 'transform 0.5s ease-out';
                });
            }, 140);
        }, { passive: true });
    }

    /* ─────────────────────────────────────────────────────────
       12. STATS BAND COUNTERS
    ──────────────────────────────────────────────────────────── */
    function startStatsBand() {
        var ioStats = new IntersectionObserver(function (entries) {
            entries.forEach(function (e) {
                if (!e.isIntersecting) return;
                var el = e.target;
                var raw = el.getAttribute('data-target');
                if (!raw) return;
                var target = parseInt(raw, 10);
                if (isNaN(target)) return;
                var current = 0, inc = target / 70;
                var t = setInterval(function () {
                    current = Math.min(current + inc * 1.8, target);
                    el.textContent = Math.ceil(current).toLocaleString();
                    if (current >= target) clearInterval(t);
                }, 24);
                ioStats.unobserve(el);
            });
        }, { threshold: 0.4 });
        document.querySelectorAll('.stat-band-num').forEach(function (el) { ioStats.observe(el); });
    }
    startStatsBand();

    /* ─────────────────────────────────────────────────────────
       13. NAVIGATION — scroll state + mobile menu
    ──────────────────────────────────────────────────────────── */
    var nav        = document.getElementById('mainNav');
    var toggle     = document.getElementById('mobileToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var menuOpen   = false;

    if (nav) {
        window.addEventListener('scroll', function () { nav.classList.toggle('scrolled', window.scrollY > 40); }, { passive: true });
    }
    function closeMobileMenu() {
        if (!menuOpen) return;
        menuOpen = false;
        if (mobileMenu) { mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden', 'true'); }
        if (toggle)     { toggle.classList.remove('active'); toggle.setAttribute('aria-expanded', 'false'); }
        document.body.style.overflow = '';
    }
    if (toggle && mobileMenu) {
        toggle.addEventListener('click', function () {
            menuOpen = !menuOpen;
            mobileMenu.classList.toggle('open', menuOpen);
            toggle.classList.toggle('active', menuOpen);
            toggle.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
            mobileMenu.setAttribute('aria-hidden', menuOpen ? 'false' : 'true');
            document.body.style.overflow = menuOpen ? 'hidden' : '';
        });
    }
    document.querySelectorAll('.mobile-link').forEach(function (l) { l.addEventListener('click', closeMobileMenu); });

    /* ─────────────────────────────────────────────────────────
       14. SMOOTH SCROLL
    ──────────────────────────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href   = link.getAttribute('href');
            if (!href || href === '#') return;
            var target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            closeMobileMenu();
            var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 72;
            window.scrollTo({ top: target.getBoundingClientRect().top + window.pageYOffset - navH, behavior: 'smooth' });
        });
    });

    /* ─────────────────────────────────────────────────────────
       15. NAV ACTIVE SECTION TRACKING
    ──────────────────────────────────────────────────────────── */
    var sections = ['home', 'mission', 'programs', 'impact', 'blog', 'contact'];
    var ioSection = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
            if (!e.isIntersecting) return;
            var id = e.target.id;
            document.querySelectorAll('.nav-link').forEach(function (l) {
                l.classList.toggle('active', l.getAttribute('href') === '#' + id);
            });
        });
    }, { threshold: 0.35 });
    sections.forEach(function (id) { var sec = document.getElementById(id); if (sec) ioSection.observe(sec); });

    /* ─────────────────────────────────────────────────────────
       16. FAQ ACCORDION
    ──────────────────────────────────────────────────────────── */
    document.querySelectorAll('.faq-question').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item   = btn.parentElement;
            var isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(function (it) {
                it.classList.remove('open');
                it.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            });
            if (!isOpen) { item.classList.add('open'); btn.setAttribute('aria-expanded', 'true'); }
        });
    });

    /* ─────────────────────────────────────────────────────────
       17. TESTIMONIALS SLIDER
    ──────────────────────────────────────────────────────────── */
    var track    = document.getElementById('testiTrack');
    var prevBtn  = document.getElementById('testiPrev');
    var nextBtn  = document.getElementById('testiNext');
    var testiIdx = 0;
    var testiAutoTimer;

    function getCardWidth() {
        var card = track ? track.querySelector('.testi-card') : null;
        if (!card) return 400;
        return card.offsetWidth + 24;
    }
    function maxIdx() {
        if (!track) return 0;
        var total   = track.querySelectorAll('.testi-card').length;
        var visible = Math.max(1, Math.floor((window.innerWidth * 0.94) / getCardWidth()));
        return Math.max(0, total - visible);
    }
    function setTrack(idx) {
        if (!track) return;
        testiIdx = Math.max(0, Math.min(idx, maxIdx()));
        track.style.transform = 'translateX(-' + (testiIdx * getCardWidth()) + 'px)';
    }
    function startTestiAuto() { testiAutoTimer = setInterval(function () { var next = testiIdx + 1; if (next > maxIdx()) next = 0; setTrack(next); }, 5500); }
    function stopTestiAuto()  { clearInterval(testiAutoTimer); }

    if (prevBtn) prevBtn.addEventListener('click', function () { stopTestiAuto(); setTrack(testiIdx - 1); startTestiAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { stopTestiAuto(); setTrack(testiIdx + 1); startTestiAuto(); });
    if (track) {
        track.addEventListener('mouseenter', stopTestiAuto);
        track.addEventListener('mouseleave', startTestiAuto);
        var touchStartX = 0;
        track.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', function (e) {
            var diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) setTrack(diff > 0 ? testiIdx + 1 : testiIdx - 1);
        });
    }
    startTestiAuto();

    /* ─────────────────────────────────────────────────────────
       18. CONTACT FORM
    ──────────────────────────────────────────────────────────── */
    var contactForm = document.getElementById('contactForm');
    var formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            var btn     = contactForm.querySelector('button[type="submit"]');
            var btnText = btn ? btn.querySelector('.btn-text') : null;
            var btnIcon = btn ? btn.querySelector('.btn-icon') : null;
            if (btn) btn.disabled = true;
            if (btnText) btnText.textContent = 'Sending…';
            if (btnIcon) btnIcon.textContent = '↻';
            if (formSuccess) { formSuccess.textContent = ''; formSuccess.style.color = ''; }

            try {
                var res = await fetch('https://formspree.io/f/xnngrpzb', {
                    method: 'POST', body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    if (btnText) btnText.textContent = 'Sent ✓';
                    if (btnIcon) btnIcon.textContent = '✓';
                    if (formSuccess) formSuccess.textContent = 'Thank you! We\'ll be in touch soon.';
                    contactForm.reset();
                    setTimeout(function () {
                        if (btnText) btnText.textContent = 'Send Message';
                        if (btnIcon) btnIcon.textContent = '→';
                        if (formSuccess) formSuccess.textContent = '';
                        if (btn) btn.disabled = false;
                    }, 4500);
                } else throw new Error('non-ok');
            } catch (_) {
                if (btnText) btnText.textContent = 'Try Again';
                if (btnIcon) btnIcon.textContent = '!';
                if (formSuccess) { formSuccess.textContent = 'Something went wrong — email hello@mehfooz.internet directly.'; formSuccess.style.color = 'var(--red)'; }
                if (btn) btn.disabled = false;
            }
        });
    }

    /* ─────────────────────────────────────────────────────────
       19. BACK TO TOP
    ──────────────────────────────────────────────────────────── */
    var backTop = document.querySelector('.back-top');
    if (backTop) {
        backTop.addEventListener('click', function (e) { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    }

    /* ─────────────────────────────────────────────────────────
       20. AI CHAT MODAL
    ──────────────────────────────────────────────────────────── */
    var chatModal    = document.getElementById('chatModal');
    var chatLog      = document.getElementById('chat-log');
    var chatForm2    = document.getElementById('chatForm');
    var chatInput    = document.getElementById('chat-input');
    var chatBackdrop = document.getElementById('chatBackdrop');
    var sessionId    = 'mhfz-' + Math.random().toString(36).substring(2, 10);
    var isWaiting    = false;

    function openChat() {
        if (!chatModal) return;
        chatModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        if (chatLog && chatLog.children.length === 0) {
            addMessage('bot', 'Hello! I\'m the Mehfooz Assistant — your AI-powered digital literacy guide for Gilgit Baltistan. How can I help you today? 🌟');
        }
        if (chatInput) setTimeout(function () { chatInput.focus(); }, 300);
    }
    function closeChat() {
        if (!chatModal) return;
        chatModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    ['openChatBtn', 'openChatMobile', 'openChatHero'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', function (e) { e.preventDefault(); openChat(); });
    });
    var closeBtn = document.getElementById('closeChatBtn');
    if (closeBtn)     closeBtn.addEventListener('click', closeChat);
    if (chatBackdrop) chatBackdrop.addEventListener('click', closeChat);
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && chatModal && !chatModal.classList.contains('hidden')) closeChat();
    });

    function addMessage(sender, text) {
        if (!chatLog) return null;
        var div = document.createElement('div');
        div.className = 'chat-msg msg-' + sender;
        if (sender === 'bot' && text === '...') div.classList.add('typing');
        div.textContent = text;
        chatLog.appendChild(div);
        chatLog.scrollTop = chatLog.scrollHeight;
        return div;
    }

    async function callAI(userMessage) {
        try {
            var res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-session-id': sessionId },
                body: JSON.stringify({ message: userMessage }),
                signal: AbortSignal.timeout(12000)
            });
            if (res.ok) { var data = await res.json(); if (data && data.reply) return data.reply; }
        } catch (e) { console.warn('[Mehfooz] Server unavailable, using fallback:', e.message); }

        try {
            var SYSTEM = 'You are the Mehfooz Assistant — a helpful, warm, and knowledgeable digital literacy expert serving communities in Gilgit Baltistan, Pakistan. Help with digital safety, cybersecurity, misinformation, and Mehfooz programs. Be concise (2-3 sentences), friendly, and practical. Switch to Urdu if the user writes in Urdu.';
            var pollRes = await fetch('https://text.pollinations.ai/openai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'openai',
                    messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: userMessage }],
                    max_tokens: 200, temperature: 0.72, seed: 42
                }),
                signal: AbortSignal.timeout(14000)
            });
            if (pollRes.ok) {
                var pd    = await pollRes.json();
                var reply = pd.choices && pd.choices[0] && pd.choices[0].message && pd.choices[0].message.content;
                if (reply) return reply.trim();
            }
        } catch (pe) { console.warn('[Mehfooz] Pollinations unavailable:', pe.message); }

        return getOfflineReply(userMessage);
    }

    function getOfflineReply(msg) {
        var m = msg.toLowerCase();
        if (/misinfo|fake|hoax|rumor|rumour|verify|fact.?check/.test(m))
            return 'Spotting misinformation: always check the original source, look for corroborating reports from credible outlets, and use our MehfoozBot fact-checking tool. 🔍';
        if (/safe|secur|hack|password|phish|scam|privacy/.test(m))
            return 'For cyber safety: use strong, unique passwords, enable two-factor authentication, and avoid clicking suspicious links. Our Cyber Safety workshops go deeper! 🛡️';
        if (/program|course|learn|train|workshop|join|enroll/.test(m))
            return 'Mehfooz offers: Community Engagement, Campus Programs, DigiSaheli for women, Virtual Events, Mini-Courses, and our Digital Learning Hub. Visit our Programs section! 📚';
        if (/digisaheli|women|woman|female/.test(m))
            return 'DigiSaheli is our flagship program empowering women in Gilgit Baltistan with digital skills, online safety, and tools for safe digital participation. 💜';
        if (/ulema|religious|mosque|imam/.test(m))
            return 'Our Ulema Training program equips religious leaders in GB with digital literacy so they can guide their communities safely online. 🕌';
        if (/gilgit|baltistan|gb|remote|rural|offline/.test(m))
            return 'Mehfooz is built for Gilgit Baltistan — with offline-accessible content and local language support, reaching even the most remote valleys. 🏔️';
        if (/urdu|language|local/.test(m))
            return 'We are actively developing Urdu and local language interfaces. MehfoozBot already responds in Urdu! 🌐';
        if (/bot|mehfoozbot|ai|assistant/.test(m))
            return 'MehfoozBot is our AI-powered digital literacy assistant. It answers questions about online safety, fact-checking, and helps navigate government services in local languages. 🤖';
        if (/contact|email|reach/.test(m))
            return 'Reach Mehfooz at hello@mehfooz.internet or through our social channels. We\'d love to hear from you! 📧';
        if (/hello|hi|salam|salaam|hey|assalam/.test(m))
            return 'Wa alaikum assalam! 👋 I\'m the Mehfooz Assistant. I can help with digital safety, misinformation, or anything about our programs. What can I help you with?';
        return 'Mehfooz Internet empowers Gilgit Baltistan with digital literacy. Explore our programs, use MehfoozBot, or contact us at hello@mehfooz.internet for more! 💬';
    }

    if (chatForm2) {
        chatForm2.addEventListener('submit', async function (e) {
            e.preventDefault();
            if (isWaiting || !chatInput) return;
            var text = chatInput.value.trim();
            if (!text) return;
            addMessage('user', text);
            chatInput.value = ''; chatInput.disabled = true; isWaiting = true;
            var typing = addMessage('bot', '...');
            try {
                var reply = await callAI(text);
                if (typing) { typing.textContent = reply; typing.classList.remove('typing'); }
            } catch (_) {
                if (typing) { typing.textContent = 'Sorry, I couldn\'t connect. Please try again.'; typing.classList.remove('typing'); }
            } finally {
                isWaiting = false; chatInput.disabled = false; chatInput.focus();
                if (chatLog) chatLog.scrollTop = chatLog.scrollHeight;
            }
        });
    }

    /* ─────────────────────────────────────────────────────────
       21. PILLAR + TESTI CARD WIGGLE on hover
    ──────────────────────────────────────────────────────────── */
    document.querySelectorAll('.pillar-card, .testi-card').forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            if (hasGSAP) gsap.to(card, { rotation: -0.7, duration: .14, ease: 'power1.out' });
        });
        card.addEventListener('mouseleave', function () {
            if (hasGSAP) gsap.to(card, { rotation: 0, duration: .32, ease: 'elastic.out(1, 0.5)' });
        });
    });

    /* ─────────────────────────────────────────────────────────
       22. TICKER — keyboard pause
    ──────────────────────────────────────────────────────────── */
    var tickerWrap = document.querySelector('.ticker-wrap');
    if (tickerWrap) {
        tickerWrap.setAttribute('tabindex', '0');
        tickerWrap.addEventListener('focus', function () {
            var track = tickerWrap.querySelector('.ticker-track');
            if (track) track.style.animationPlayState = 'paused';
        });
        tickerWrap.addEventListener('blur', function () {
            var track = tickerWrap.querySelector('.ticker-track');
            if (track) track.style.animationPlayState = '';
        });
    }

}); // end DOMContentLoaded
