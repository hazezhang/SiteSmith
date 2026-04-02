# DSL → Code Mapping — 从 DSL 到可执行代码

> 每个 DSL 字段都有确定的 CSS/HTML/JS 输出映射

---

## Layout → CSS

### `layout.type`

```
single-column:
  .container { max-width: var(--max-width); margin: 0 auto; }

grid:
  .grid { display: grid; grid-template-columns: repeat(${columns}, 1fr); gap: var(--space-6); }

asymmetric:
  .layout { display: grid; grid-template-columns: 1.5fr 1fr; gap: var(--space-8); }
  /* alternating sections flip the ratio */

reading-column:
  .content { max-width: 65ch; margin: 0 auto; }

split:
  .split { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-8); align-items: center; }

magazine:
  .magazine { display: grid; grid-template-columns: 2fr 1fr; grid-template-rows: auto; gap: var(--space-6); }
```

### `layout.section_spacing`

```
compact:   --section-gap: var(--space-12);  /* 48px */
default:   --section-gap: var(--space-16);  /* 64px */
generous:  --section-gap: var(--space-24);  /* 96px */
```

### `layout.max_width`

```
720px:   --container-max: 720px;   /* reading / minimal */
1080px:  --container-max: 1080px;  /* balanced */
1200px:  --container-max: 1200px;  /* standard */
1280px:  --container-max: 1280px;  /* wide */
full:    --container-max: 100%;    /* edge-to-edge */
```

---

## Density → CSS Variables

```
low:
  --component-padding: var(--space-8);
  --card-padding: var(--space-8);
  --element-gap: var(--space-6);
  --section-gap: var(--space-24);

medium:
  --component-padding: var(--space-6);
  --card-padding: var(--space-6);
  --element-gap: var(--space-4);
  --section-gap: var(--space-16);

high:
  --component-padding: var(--space-4);
  --card-padding: var(--space-4);
  --element-gap: var(--space-3);
  --section-gap: var(--space-12);
```

---

## Typography → CSS

### `typography.font_pairing` → `@import` + variables

```css
/* ["Playfair Display", "Inter"] */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --font-heading: 'Playfair Display', Georgia, serif;
  --font-body: 'Inter', -apple-system, system-ui, sans-serif;
}
```

### `typography.scale` → Font size ladder

```css
/* scale: 1.25 (major third), base: 16px */
:root {
  --text-xs:  0.64rem;    /* 10.24px */
  --text-sm:  0.8rem;     /* 12.8px  */
  --text-base: 1rem;      /* 16px    */
  --text-lg:  1.25rem;    /* 20px    */
  --text-xl:  1.563rem;   /* 25px    */
  --text-2xl: 1.953rem;   /* 31.25px */
  --text-3xl: 2.441rem;   /* 39.06px */
  --text-4xl: 3.052rem;   /* 48.83px */
}
```

### `typography.weight_strategy`

```
uniform:        h1-h6: 600, body: 400
contrast:       h1: 700, h2: 600, h3: 600, body: 400, light-text: 300
heavy-headings: h1: 900, h2: 800, h3: 700, body: 400
```

---

## Color → CSS Variables

### `color.mode` → Variable generation strategy

```
monochrome:
  --color-primary-*: shade variations of single hue
  --color-accent: one contrasting accent
  All other colors are gray scale

neutral:
  --color-primary-*: gray/slate palette
  --color-accent: single saturated color
  --color-surface: white/off-white

soft:
  --color-primary-*: desaturated warm tones
  --color-background: warm white (#faf8f5, #fef7ec)
  All shadows use warm-tinted rgba

vibrant:
  --color-primary-*: fully saturated
  --color-accent: contrasting saturated
  Gradient support enabled

dark:
  --color-background: #0a0a0a ~ #1a1a2e
  --color-surface: #1e1e1e ~ #2a2a2e
  --color-text: #e0e0e0
  Accent colors are bright/neon
```

---

## Interaction → CSS/JS

### `interaction.hover`

```css
/* opacity */
.interactive:hover { opacity: 0.7; transition: opacity var(--transition-fast); }

/* scale */
.interactive:hover { transform: scale(1.03); transition: transform var(--transition-fast); }

/* shadow-lift */
.interactive:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
  transition: all var(--transition-base);
}

/* color-shift */
.interactive:hover { background: var(--color-primary-50); transition: background var(--transition-fast); }

/* underline */
.interactive:hover { text-decoration: underline; text-underline-offset: 4px; }
```

### `interaction.click_feedback`

```css
/* subtle-scale */
.interactive:active { transform: scale(0.97); transition: transform 80ms ease-in; }

/* ripple — requires JS */
/* See scripts/interactions.js ripple implementation */
```

### `interaction.focus`

```css
/* ring */
.interactive:focus-visible { outline: 2px solid var(--color-primary-500); outline-offset: 2px; }

/* glow */
.interactive:focus-visible { box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.4); outline: none; }
```

---

## Motion → CSS/JS

### `motion.type`

```css
/* subtle-fade */
.reveal { opacity: 0; transition: opacity ${duration} ${easing}; }
.reveal.visible { opacity: 1; }

/* fade-in (with translate) */
.reveal {
  opacity: 0; transform: translateY(10px);
  transition: opacity ${duration} ${easing}, transform ${duration} ${easing};
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* slide-up */
.reveal {
  opacity: 0; transform: translateY(20px);
  transition: opacity ${duration} ${easing}, transform ${duration} ${easing};
}
.reveal.visible { opacity: 1; transform: translateY(0); }

/* stagger — add delay per item */
.reveal:nth-child(1) { transition-delay: 0ms; }
.reveal:nth-child(2) { transition-delay: 80ms; }
.reveal:nth-child(3) { transition-delay: 160ms; }
/* ... */
```

### JavaScript: IntersectionObserver trigger

```javascript
// Used by all motion types except "none"
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### Reduced motion override

```css
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```

---

## Full Example: Minimal DSL → Complete CSS

**Input DSL:**
```json
{
  "style": "minimal",
  "layout": { "type": "single-column", "max_width": "720px", "section_spacing": "generous" },
  "density": "low",
  "typography": { "font_pairing": ["Inter", "Inter"], "scale": "1.25", "line_height": "1.6" },
  "color": { "mode": "monochrome", "accent": "#007aff", "background": "#fafafa", "text": "#171717" },
  "interaction": { "level": "low", "hover": "opacity" },
  "motion": { "type": "subtle-fade", "duration": "200ms", "easing": "ease-out" }
}
```

**Output `variables.css`:**
```css
:root {
  /* Layout */
  --container-max: 720px;
  --container-padding: 1.5rem;
  --section-gap: 6rem;

  /* Density */
  --component-padding: 2rem;
  --card-padding: 2rem;
  --element-gap: 1.5rem;

  /* Typography */
  --font-heading: 'Inter', -apple-system, sans-serif;
  --font-body: 'Inter', -apple-system, sans-serif;
  --text-base: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.563rem;
  --text-2xl: 1.953rem;
  --text-3xl: 2.441rem;
  --text-4xl: 3.052rem;
  --leading-normal: 1.6;
  --weight-heading: 700;
  --weight-body: 400;
  --paragraph-width: 65ch;

  /* Color */
  --color-primary: #171717;
  --color-accent: #007aff;
  --color-background: #fafafa;
  --color-surface: #ffffff;
  --color-text: #171717;
  --color-text-muted: #737373;
  --color-border: #e5e5e5;

  /* Border & Shadow */
  --radius-md: 4px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.07);

  /* Interaction */
  --transition-fast: 150ms ease-out;
  --transition-base: 200ms ease-out;

  /* Motion */
  --entrance-duration: 200ms;
  --entrance-easing: ease-out;
}
```

**Output Tailwind equivalent (if using Tailwind):**
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      maxWidth: { 'content': '720px' },
      fontFamily: { 'heading': ['Inter', 'sans-serif'], 'body': ['Inter', 'sans-serif'] },
      colors: {
        primary: '#171717',
        accent: '#007aff',
        background: '#fafafa',
        surface: '#ffffff',
      },
      spacing: { 'section': '6rem' },
    }
  }
}
```
