// Interactive Animations & Scripts for Info Bantuan Malaysia

document.addEventListener('DOMContentLoaded', () => {
  // Configurable Telegram URL
  const TELEGRAM_URL = "https://t.me/pcpanel_23";

  // Telegram Button Redirect Handler
  const telegramButtons = document.querySelectorAll('.telegram-btn');
  telegramButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      // Simple visual feedback before redirecting
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = '';
        window.open(TELEGRAM_URL, '_blank');
      }, 150);
    });
  });

  // Mobile Menu Drawer Toggle
  const menuToggleBtn = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuToggleBtn && mobileMenu) {
    menuToggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // FAQ Accordion Expand/Collapse Logic
  const accordionItems = document.querySelectorAll('.accordion-item');
  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    header.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const content = otherItem.querySelector('.accordion-content');
        if (content) {
          content.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        item.classList.add('active');
        const content = item.querySelector('.accordion-content');
        if (content) {
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      }
    });
  });

  // SCROLL REVEAL INTERSECTION OBSERVER
  const revealElements = document.querySelectorAll('.reveal-on-scroll, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // Reveal only once
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ANIMATED SUBSCRIBER COUNTER
  const counterElement = document.getElementById('sub-counter');
  if (counterElement) {
    let countTriggered = false;
    const targetCount = 12548;

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countTriggered) {
          countTriggered = true;
          let currentCount = 0;
          const duration = 2000; // 2 seconds
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = targetCount / steps;

          const timer = setInterval(() => {
            currentCount += increment;
            if (currentCount >= targetCount) {
              currentCount = targetCount;
              clearInterval(timer);
            }
            counterElement.textContent = Math.floor(currentCount).toLocaleString('en-US') + ' ahli sudah bergabung';
          }, stepTime);
        }
      });
    }, { threshold: 0.5 });

    counterObserver.observe(counterElement);
  }

  // Smooth Scrolling for Nav Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
          }
          targetElement.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
