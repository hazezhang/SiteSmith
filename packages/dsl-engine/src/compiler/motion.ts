import type { MotionConfig } from '../types';

export function compileMotionVars(motion: MotionConfig): Record<string, string> {
  if (motion.type === 'none') return {};
  return {
    '--entrance-duration': motion.duration ?? '250ms',
    '--entrance-easing': motion.easing ?? 'ease-out',
  };
}

export function compileMotionCss(motion: MotionConfig): string {
  if (motion.type === 'none') return '';

  const rules: string[] = [];
  const translateY = motion.type === 'subtle-fade' ? '0' : motion.type === 'fade-in' ? '10px' : '20px';

  // Base reveal class
  if (translateY === '0') {
    rules.push(`.reveal { opacity: 0; transition: opacity var(--entrance-duration) var(--entrance-easing); }`);
  } else {
    rules.push(`.reveal { opacity: 0; transform: translateY(${translateY}); transition: opacity var(--entrance-duration) var(--entrance-easing), transform var(--entrance-duration) var(--entrance-easing); }`);
  }
  rules.push(`.reveal.visible { opacity: 1; transform: translateY(0); }`);

  // Stagger delays
  if (motion.type === 'stagger') {
    const delays = Array.from({ length: 6 }, (_, i) =>
      `.reveal-stagger > .reveal:nth-child(${i + 1}) { transition-delay: ${i * 80}ms; }`
    );
    rules.push(delays.join('\n'));
  }

  // Reduced motion override
  if (motion.reduced_motion !== false) {
    rules.push([
      `@media (prefers-reduced-motion: reduce) {`,
      `  .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }`,
      `  .interactive:hover, .card:hover { transform: none; }`,
      `}`,
    ].join('\n'));
  }

  return rules.join('\n\n');
}

export function compileMotionJs(motion: MotionConfig): string {
  if (motion.type === 'none') return '// Motion disabled';

  return `// Scroll reveal — IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navMenu) navMenu.classList.remove('open');
      }
    });
  });
});`;
}
