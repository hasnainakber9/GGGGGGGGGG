/* ═══════════════════════════════════════════════════════════════
   MEHFOOZ — script.js
   Refined & Elevated Edition
   Features: preloader, scroll progress, parallax hero, GSAP reveals,
   stats counters, testimonial slider, FAQ, contact form, AI chat,
   nav active tracking, keyboard accessibility, mobile menu
   ═══════════════════════════════════════════════════════════════ */

'use strict';

/* ─────────────────────────────────────────────────────────────
   1. PRELOADER
   Simulated progress that accelerates and caps naturally
──────────────────────────────────────────────────────────────── */
(function initPreloader() {
    var loader  = document.getElementById('loadingScreen');
    var bar     = document.getElementById('loadingBar');
    var pct     = document.getElementById('loaderPercent');
    var wrapper = bar ? bar.closest('[role="progressbar"]') : null;
    if (!loader) return;

    var progress = 0;
    var done     = false;

    function setProgress(val) {
        val = Math.min(100, Math.round(val));
        if (bar)     bar.style.width = val + '%';
        if (pct)     pct.textContent  = val + '%';
        if (wrapper) wrapper.setAttribute('aria-valuenow', val);
    }

    function finish() {
        if (done) return;
        done = true;
        setProgress(100);
        setTimeout(function () {
            loader.style.transition = 'transform 1.15s cubic-bezier(0.77,0,0.18,1)';
            loader.style.transform  = 'translateY(-100%)';
            setTimeout(function () {
                loader.style.display = 'none';
                document.dispatchEvent(new CustomEvent('mehfooz:ready'));
            }, 1200);
        }, 260);
    }

    // Accelerating fake progress
    var iv = setInterval(function () {
        if (done) { clearInterval(iv); return; }
        var inc = Math.random() * 12 + 5;
        // Slow down near end
        if (progress > 80) inc = Math.random() * 4 + 1;
        progress += inc;
        if (progress >= 100) { clearInterval(iv); finish(); }
        else setProgress(progress);
    }, 90);

    // Failsafe: always complete within 4.5s
    setTimeout(finish, 4500);
}());

/* ─────────────────────────────────────────────────────────────
   2. MAIN APP — runs after DOM is ready
──────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {

    /* ── GSAP ── */
    var hasGSAP = typeof gsap !== 'undefined';
    var hasST   = typeof ScrollTrigger !== 'undefined';
    if (hasGSAP && hasST) gsap.registerPlugin(ScrollTrigger);

    /* ─────────────────────────────────────────────────────────
       3. SCROLL PROGRESS BAR
    ──────────────────────────────────────────────────────────── */
    var progressBar = document.getElementById('scrollProgress');
    if (progressBar) {
        window.addEventListener('scroll', function () {
            var total   = document.documentElement.scrollHeight - window.innerHeight;
            var current = window.scrollY;
            progressBar.style.width = (total > 0 ? (current / total * 100) : 0).toFixed(1) + '%';
        }, { passive: true });
    }

    /* ─────────────────────────────────────────────────────────
       4. HERO CANVAS — dot grid + gentle twinkle
    ──────────────────────────────────────────────────────────── */
    var canvas = document.getElementById('heroBg');
    if (canvas) {
        var ctx = canvas.getContext('2d');
        var W = 0, H = 0, stars = [];

        function resizeCanvas() {
            W = canvas.width  = window.innerWidth;
            H = canvas.height = window.innerHeight;
            stars = Array.from({ length: 60 }, function () {
                return {
                    x:  Math.random() * W,
                    y:  Math.random() * H,
                    r:  Math.random() * 1.4 + 0.3,
                    speed: Math.random() * 0.15 + 0.03,
                    phase: Math.random() * Math.PI * 2,
                    phaseSpeed: Math.random() * 0.013 + 0.004
                };
            });
        }
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas, { passive: true });

        function drawHeroBg() {
            ctx.clearRect(0, 0, W, H);
            // Dot grid
            ctx.fillStyle = 'rgba(17,17,17,0.045)';
            for (var gx = 0; gx < W; gx += 56) {
                for (var gy = 0; gy < H; gy += 56) {
                    ctx.beginPath();
                    ctx.arc(gx, gy, 1.4, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            // Twinkling particles
            stars.forEach(function (s) {
                s.phase += s.phaseSpeed;
                var alpha = 0.03 + 0.09 * (0.5 + 0.5 * Math.sin(s.phase));
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
                ctx.fillStyle = 'rgba(17,17,17,' + alpha.toFixed(3) + ')';
                ctx.fill();
                s.y -= s.speed;
                if (s.y < -2) { s.y = H + 2; s.x = Math.random() * W; }
            });
            requestAnimationFrame(drawHeroBg);
        }
        drawHeroBg();
    }

    /* ─────────────────────────────────────────────────────────
       5. HERO PARALLAX — shapes follow mouse
    ──────────────────────────────────────────────────────────── */
    var heroSection = document.querySelector('.hero-section');
    var heroPhotos  = Array.from(document.querySelectorAll('.hero-photo'));
    var confs       = Array.from(document.querySelectorAll('.conf'));

    if (heroSection && (heroPhotos.length || confs.length)) {
        heroSection.addEventListener('mousemove', function (e) {
            var r  = heroSection.getBoundingClientRect();
            var rx = (e.clientX - r.left)  / r.width  - 0.5; // -0.5 to 0.5
            var ry = (e.clientY - r.top)   / r.height - 0.5;

            heroPhotos.forEach(function (el, i) {
                var depth = 0.014 * ((i % 3) + 1);
                el.style.transform = 'translate(' + (rx * r.width * depth) + 'px,' + (ry * r.height * depth) + 'px)';
            });
            confs.forEach(function (el, i) {
                var depth = 0.007 * ((i % 4) + 1);
                el.style.transform = 'translate(' + (rx * r.width * depth) + 'px,' + (ry * r.height * depth) + 'px)';
            });
        });
        heroSection.addEventListener('mouseleave', function () {
            heroPhotos.forEach(function (el) { el.style.transform = ''; });
            confs.forEach(function (el)       { el.style.transform = ''; });
        });
    }

    /* ─────────────────────────────────────────────────────────
       6. HERO REVEAL — fires after preloader exits
    ──────────────────────────────────────────────────────────── */
    function revealHero() {
        triggerStatCounters(); // also start counters
        if (!hasGSAP) return;

        var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        tl.fromTo('.hero-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .75 }, .2)
          .fromTo('.hl',           { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .85, stagger: .1 }, .34)
          .fromTo('.hero-sub',     { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .75 }, .65)
          .fromTo('.hero-actions', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: .65, ease: 'back.out(1.8)' }, .82)
          .fromTo('.trust-strip',  { opacity: 0, scale: .94 }, { opacity: 1, scale: 1, duration: .65, ease: 'back.out(1.5)' }, 1.0);
    }
    document.addEventListener('mehfooz:ready', revealHero);

    /* ─────────────────────────────────────────────────────────
       7. FADE-UP — IntersectionObserver
    ──────────────────────────────────────────────────────────── */
    var ioFade = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                ioFade.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-up').forEach(function (el) {
        ioFade.observe(el);
    });

    /* ─────────────────────────────────────────────────────────
       8. GSAP SCROLL REVEALS (enhancement layer)
    ──────────────────────────────────────────────────────────── */
    if (hasGSAP && hasST) {
        var cards = '.pillar-card, .tool-card, .prog-card, .blog-card, .testi-card';
        document.querySelectorAll(cards).forEach(function (el, i) {
            gsap.fromTo(el,
                { opacity: 0, y: 28, scale: .96 },
                {
                    opacity: 1, y: 0, scale: 1, duration: .65, ease: 'power3.out',
                    delay: (i % 4) * 0.07,
                    scrollTrigger: { trigger: el, start: 'top 90%', once: true }
                }
            );
        });

        document.querySelectorAll('.section-heading').forEach(function (el) {
            gsap.fromTo(el,
                { opacity: 0, y: 26 },
                {
                    opacity: 1, y: 0, duration: .85, ease: 'power3.out',
                    scrollTrigger: { trigger: el, start: 'top 88%', once: true }
                }
            );
        });

        gsap.fromTo('.stat-band-item',
            { opacity: 0, scale: .82 },
            {
                opacity: 1, scale: 1, duration: .55, ease: 'back.out(1.8)',
                stagger: .09,
                scrollTrigger: { trigger: '.stats-band', start: 'top 84%', once: true }
            }
        );
    }

    /* ─────────────────────────────────────────────────────────
       9. STATS COUNTERS
    ──────────────────────────────────────────────────────────── */
    function animateCounter(el, target) {
        var current = 0;
        var inc = target / 70;
        var iv = setInterval(function () {
            current = Math.min(current + inc * 1.8, target);
            el.textContent = Math.ceil(current).toLocaleString();
            if (current >= target) { el.textContent = target.toLocaleString(); clearInterval(iv); }
        }, 24);
    }

    function triggerStatCounters() {
        var ioStats = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el     = entry.target;
                var target = parseInt(el.getAttribute('data-target'), 10);
                if (!isNaN(target)) animateCounter(el, target);
                ioStats.unobserve(el);
            });
        }, { threshold: 0.4 });

        document.querySelectorAll('.stat-num[data-target]').forEach(function (el) {
            ioStats.observe(el);
        });
    }
    triggerStatCounters(); // also runs from revealHero

    /* ─────────────────────────────────────────────────────────
       10. NAVIGATION — scroll state + active tracking
    ──────────────────────────────────────────────────────────── */
    var mainNav = document.getElementById('mainNav');
    if (mainNav) {
        window.addEventListener('scroll', function () {
            mainNav.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });
    }

    // Active section tracking
    var sectionIds = ['home','mission','programs','impact','testimonials','faq','blog','contact'];
    var ioSection  = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            var id = entry.target.id;
            document.querySelectorAll('.nav-link').forEach(function (link) {
                link.classList.toggle('active', link.getAttribute('href') === '#' + id);
            });
        });
    }, { threshold: 0.3 });

    sectionIds.forEach(function (id) {
        var sec = document.getElementById(id);
        if (sec) ioSection.observe(sec);
    });

    /* ─────────────────────────────────────────────────────────
       11. MOBILE MENU
    ──────────────────────────────────────────────────────────── */
    var toggle     = document.getElementById('mobileToggle');
    var mobileMenu = document.getElementById('mobileMenu');
    var isMenuOpen = false;

    function openMobileMenu() {
        isMenuOpen = true;
        if (mobileMenu) { mobileMenu.classList.add('open'); mobileMenu.setAttribute('aria-hidden', 'false'); }
        if (toggle)     { toggle.classList.add('active'); toggle.setAttribute('aria-expanded', 'true'); }
        document.body.style.overflow = 'hidden';
    }
    function closeMobileMenu() {
        if (!isMenuOpen) return;
        isMenuOpen = false;
        if (mobileMenu) { mobileMenu.classList.remove('open'); mobileMenu.setAttribute('aria-hidden', 'true'); }
        if (toggle)     { toggle.classList.remove('active'); toggle.setAttribute('aria-expanded', 'false'); }
        document.body.style.overflow = '';
    }

    if (toggle) {
        toggle.addEventListener('click', function () {
            isMenuOpen ? closeMobileMenu() : openMobileMenu();
        });
    }
    document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', closeMobileMenu);
    });
    // Close on Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && isMenuOpen) closeMobileMenu();
    });

    /* ─────────────────────────────────────────────────────────
       12. SMOOTH SCROLL FOR ANCHOR LINKS
    ──────────────────────────────────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            var href = link.getAttribute('href');
            if (!href || href === '#') return;
            var target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            closeMobileMenu();
            var navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'), 10) || 74;
            var top  = target.getBoundingClientRect().top + window.pageYOffset - navH;
            window.scrollTo({ top: top, behavior: 'smooth' });
        });
    });

    /* ─────────────────────────────────────────────────────────
       13. FAQ ACCORDION
    ──────────────────────────────────────────────────────────── */
    document.querySelectorAll('.faq-q').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var item   = btn.parentElement;
            var isOpen = item.classList.contains('open');

            // Close all
            document.querySelectorAll('.faq-item').forEach(function (it) {
                it.classList.remove('open');
                it.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
            });

            // Open this one if it was closed
            if (!isOpen) {
                item.classList.add('open');
                btn.setAttribute('aria-expanded', 'true');
                // Animate icon wiggle
                if (hasGSAP) {
                    gsap.fromTo(btn.querySelector('.faq-chevron'), { scale: .8 }, { scale: 1, duration: .35, ease: 'back.out(2)' });
                }
            }
        });
    });

    /* ─────────────────────────────────────────────────────────
       14. TESTIMONIAL SLIDER
    ──────────────────────────────────────────────────────────── */
    var track       = document.getElementById('testiTrack');
    var prevBtn     = document.getElementById('testiPrev');
    var nextBtn     = document.getElementById('testiNext');
    var testiIdx    = 0;
    var autoTimer;

    function getCardW() {
        var card = track ? track.querySelector('.testi-card') : null;
        if (!card) return 360;
        // gap between cards = 0 (border is part of card), just width
        return card.offsetWidth;
    }
    function maxIndex() {
        if (!track) return 0;
        var total   = track.querySelectorAll('.testi-card').length;
        var visible = Math.max(1, Math.floor(track.parentElement.offsetWidth / getCardW()));
        return Math.max(0, total - visible);
    }
    function setSlide(idx) {
        if (!track) return;
        testiIdx = Math.max(0, Math.min(idx, maxIndex()));
        track.style.transform = 'translateX(-' + (testiIdx * getCardW()) + 'px)';
    }
    function startAuto() {
        autoTimer = setInterval(function () {
            setSlide(testiIdx + 1 > maxIndex() ? 0 : testiIdx + 1);
        }, 5500);
    }
    function stopAuto() { clearInterval(autoTimer); }

    if (prevBtn) prevBtn.addEventListener('click', function () { stopAuto(); setSlide(testiIdx - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { stopAuto(); setSlide(testiIdx + 1); startAuto(); });
    if (track) {
        track.addEventListener('mouseenter', stopAuto);
        track.addEventListener('mouseleave', startAuto);
        // Touch swipe
        var touchX0 = 0;
        track.addEventListener('touchstart', function (e) { touchX0 = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', function (e) {
            var diff = touchX0 - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 44) { stopAuto(); setSlide(diff > 0 ? testiIdx + 1 : testiIdx - 1); startAuto(); }
        });
    }
    startAuto();
    window.addEventListener('resize', function () { setSlide(testiIdx); }, { passive: true });

    /* ─────────────────────────────────────────────────────────
       15. CONTACT FORM
    ──────────────────────────────────────────────────────────── */
    var contactForm = document.getElementById('contactForm');
    var formStatus  = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            var submitBtn = contactForm.querySelector('button[type="submit"]');
            var btnText   = submitBtn ? submitBtn.querySelector('.btn-text') : null;
            var btnIcon   = submitBtn ? submitBtn.querySelector('.btn-icon') : null;

            if (submitBtn) submitBtn.disabled = true;
            if (btnText)   btnText.textContent = 'Sending…';
            if (btnIcon)   btnIcon.textContent = '↻';
            if (formStatus) { formStatus.textContent = ''; formStatus.style.color = ''; }

            try {
                var res = await fetch('https://formspree.io/f/xnngrpzb', {
                    method: 'POST',
                    body: new FormData(contactForm),
                    headers: { 'Accept': 'application/json' }
                });
                if (res.ok) {
                    if (btnText)  btnText.textContent  = 'Sent ✓';
                    if (btnIcon)  btnIcon.textContent  = '✓';
                    if (formStatus) {
                        formStatus.textContent = 'Thank you! We\'ll be in touch soon.';
                        formStatus.style.color = 'var(--green)';
                    }
                    contactForm.reset();
                    setTimeout(function () {
                        if (btnText)  btnText.textContent  = 'Send Message';
                        if (btnIcon)  btnIcon.textContent  = '→';
                        if (formStatus) { formStatus.textContent = ''; formStatus.style.color = ''; }
                        if (submitBtn) submitBtn.disabled = false;
                    }, 4000);
                } else {
                    throw new Error('Server returned ' + res.status);
                }
            } catch (err) {
                console.warn('[Mehfooz] Form submission error:', err.message);
                if (btnText)   btnText.textContent  = 'Try Again';
                if (btnIcon)   btnIcon.textContent  = '!';
                if (formStatus) {
                    formStatus.textContent = 'Something went wrong — email hello@mehfooz.internet directly.';
                    formStatus.style.color = 'var(--red)';
                }
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    /* ─────────────────────────────────────────────────────────
       16. BACK TO TOP
    ──────────────────────────────────────────────────────────── */
    var backTop = document.querySelector('.back-top');
    if (backTop) {
        backTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ─────────────────────────────────────────────────────────
       17. AI CHAT MODAL
    ──────────────────────────────────────────────────────────── */
    var chatModal    = document.getElementById('chatModal');
    var chatLog      = document.getElementById('chat-log');
    var chatForm     = document.getElementById('chatForm');
    var chatInput    = document.getElementById('chat-input');
    var chatBackdrop = document.getElementById('chatBackdrop');
    var sessionId    = 'mhfz-' + Math.random().toString(36).slice(2, 10);
    var isWaiting    = false;

    function openChat() {
        if (!chatModal) return;
        chatModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        // Show welcome on first open
        if (chatLog && chatLog.children.length === 0) {
            addMessage('bot', 'Hello! I\'m the Mehfooz Assistant — your digital literacy guide for Gilgit Baltistan. How can I help you today? 🌟');
        }
        setTimeout(function () { if (chatInput) chatInput.focus(); }, 320);
    }
    function closeChat() {
        if (!chatModal) return;
        chatModal.classList.add('hidden');
        document.body.style.overflow = '';
    }

    // Open triggers
    ['openChatBtn', 'openChatMobile'].forEach(function (id) {
        var el = document.getElementById(id);
        if (el) el.addEventListener('click', function (e) { e.preventDefault(); openChat(); });
    });
    // Close triggers
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
        if (sender === 'bot' && text === '…') div.classList.add('typing');
        div.textContent = text;
        chatLog.appendChild(div);
        chatLog.scrollTop = chatLog.scrollHeight;
        return div;
    }

    async function callAI(userMessage) {
        // Try own API endpoint first
        try {
            var res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-session-id': sessionId },
                body: JSON.stringify({ message: userMessage }),
                signal: AbortSignal.timeout(12000)
            });
            if (res.ok) {
                var data = await res.json();
                if (data && data.reply) return data.reply;
            }
        } catch (e) {
            console.warn('[Mehfooz] Own API unavailable, trying fallback:', e.message);
        }

        // Fallback: Pollinations AI
        try {
            var SYSTEM = 'You are the Mehfooz Assistant — a helpful, warm, and knowledgeable digital literacy expert serving communities in Gilgit Baltistan, Pakistan. Help with digital safety, cybersecurity, misinformation, and Mehfooz programs. Be concise (2–3 sentences), friendly, and practical. Switch to Urdu if the user writes in Urdu.';
            var pollRes = await fetch('https://text.pollinations.ai/openai', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    model: 'openai',
                    messages: [
                        { role: 'system', content: SYSTEM },
                        { role: 'user',   content: userMessage }
                    ],
                    max_tokens: 200, temperature: 0.72, seed: 42
                }),
                signal: AbortSignal.timeout(14000)
            });
            if (pollRes.ok) {
                var pd = await pollRes.json();
                var reply = pd.choices && pd.choices[0] && pd.choices[0].message && pd.choices[0].message.content;
                if (reply) return reply.trim();
            }
        } catch (pe) {
            console.warn('[Mehfooz] Pollinations unavailable:', pe.message);
        }

        return offlineReply(userMessage);
    }

    function offlineReply(msg) {
        var m = msg.toLowerCase();
        if (/misinfo|fake|hoax|rumor|verify|fact.?check/.test(m))
            return 'Spotting misinformation: always check the original source, look for corroborating reports from credible outlets, and use our MehfoozBot fact-checking tool. 🔍';
        if (/safe|secur|hack|password|phish|scam|privacy/.test(m))
            return 'For cyber safety: use strong, unique passwords, enable two-factor authentication, and never click suspicious links. Our Cyber Safety workshops go deeper! 🛡️';
        if (/program|course|learn|train|workshop|join|enroll/.test(m))
            return 'Mehfooz offers: Community Engagement, Campus Programs, DigiSaheli for women, the Digital Learning Hub, and MehfoozBot. Visit our Programs section! 📚';
        if (/digisaheli|women|woman|female/.test(m))
            return 'DigiSaheli is our flagship program empowering women in Gilgit Baltistan with digital skills, online safety, and safe participation tools. 💜';
        if (/ulema|religious|mosque|imam/.test(m))
            return 'Our Ulema Training program equips religious leaders in GB with digital literacy so they can guide their communities safely online. 🕌';
        if (/gilgit|baltistan|gb|remote|rural|offline/.test(m))
            return 'Mehfooz is built for Gilgit Baltistan — with offline-accessible content and local language support, reaching even the most remote valleys. 🏔️';
        if (/urdu|language|local/.test(m))
            return 'We\'re actively developing Urdu and local language interfaces. MehfoozBot already responds in Urdu! 🌐';
        if (/bot|mehfoozbot|ai|assistant/.test(m))
            return 'MehfoozBot is our AI-powered literacy assistant. It answers questions about online safety, fact-checking, and government services in local languages. 🤖';
        if (/contact|email|reach/.test(m))
            return 'Reach Mehfooz at hello@mehfooz.internet or through our social channels. We\'d love to hear from you! 📧';
        if (/hello|hi|salam|salaam|hey|assalam/.test(m))
            return 'Wa alaikum assalam! 👋 I\'m the Mehfooz Assistant. I can help with digital safety, misinformation, or our programs. What would you like to know?';
        return 'Mehfooz empowers Gilgit Baltistan with digital literacy. Explore our programs, try MehfoozBot, or contact us at hello@mehfooz.internet! 💬';
    }

    if (chatForm) {
        chatForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            if (isWaiting || !chatInput) return;
            var text = chatInput.value.trim();
            if (!text) return;

            addMessage('user', text);
            chatInput.value   = '';
            chatInput.disabled = true;
            isWaiting = true;

            var typingMsg = addMessage('bot', '…');

            try {
                var reply = await callAI(text);
                if (typingMsg) {
                    typingMsg.textContent = reply;
                    typingMsg.classList.remove('typing');
                }
            } catch (_) {
                if (typingMsg) {
                    typingMsg.textContent = 'Sorry, I couldn\'t connect. Please try again.';
                    typingMsg.classList.remove('typing');
                }
            } finally {
                isWaiting          = false;
                chatInput.disabled = false;
                chatInput.focus();
                if (chatLog) chatLog.scrollTop = chatLog.scrollHeight;
            }
        });
    }

    /* ─────────────────────────────────────────────────────────
       18. PILLAR CARD HOVER WIGGLE (micro-delight)
    ──────────────────────────────────────────────────────────── */
    if (hasGSAP) {
        document.querySelectorAll('.pillar-card, .prog-card').forEach(function (card) {
            card.addEventListener('mouseenter', function () {
                gsap.to(card, { rotation: -.6, duration: .14, ease: 'power1.out' });
            });
            card.addEventListener('mouseleave', function () {
                gsap.to(card, { rotation: 0, duration: .35, ease: 'elastic.out(1,0.5)' });
            });
        });
    }

    /* ─────────────────────────────────────────────────────────
       19. TICKER KEYBOARD ACCESSIBILITY
    ──────────────────────────────────────────────────────────── */
    var tickerWrap = document.querySelector('.ticker-wrap');
    if (tickerWrap) {
        tickerWrap.setAttribute('tabindex', '0');
        tickerWrap.addEventListener('focus', function () {
            var t = tickerWrap.querySelector('.ticker-track');
            if (t) t.style.animationPlayState = 'paused';
        });
        tickerWrap.addEventListener('blur', function () {
            var t = tickerWrap.querySelector('.ticker-track');
            if (t) t.style.animationPlayState = '';
        });
    }

    /* ─────────────────────────────────────────────────────────
       20. PREFETCH NEXT-PAGE ON LINK HOVER (performance)
    ──────────────────────────────────────────────────────────── */
    var prefetched = new Set();
    document.querySelectorAll('a[href^="http"]').forEach(function (link) {
        link.addEventListener('mouseenter', function () {
            var href = link.href;
            if (!prefetched.has(href) && 'requestIdleCallback' in window) {
                requestIdleCallback(function () {
                    var l = document.createElement('link');
                    l.rel = 'prefetch'; l.href = href;
                    document.head.appendChild(l);
                    prefetched.add(href);
                });
            }
        }, { once: true });
    });

}); // end DOMContentLoaded
