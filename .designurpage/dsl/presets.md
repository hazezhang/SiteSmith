# Design DSL Presets — 预设风格库

> 每个 preset 是一套完整的 DSL 默认值，用户选择 preset 后可以逐维度覆盖

---

## Minimal

```json
{
  "$schema": "design-dsl/v1",
  "style": "minimal",
  "layout": {
    "type": "single-column",
    "alignment": "center",
    "max_width": "720px",
    "section_spacing": "generous"
  },
  "density": "low",
  "typography": {
    "font_pairing": ["Inter", "Inter"],
    "scale": "1.25",
    "base_size": "18px",
    "line_height": "1.6",
    "weight_strategy": "contrast",
    "paragraph_width": "65ch"
  },
  "color": {
    "mode": "monochrome",
    "primary": "#171717",
    "accent": "#007aff",
    "background": "#fafafa",
    "text": "#171717",
    "contrast": "high"
  },
  "interaction": {
    "level": "low",
    "hover": "opacity",
    "click_feedback": "subtle-scale",
    "focus": "ring",
    "scroll_behavior": "smooth"
  },
  "motion": {
    "type": "subtle-fade",
    "duration": "200ms",
    "easing": "ease-out",
    "reduced_motion": true
  },
  "personality": "clean, calm, premium"
}
```

---

## Modern

```json
{
  "$schema": "design-dsl/v1",
  "style": "modern",
  "layout": {
    "type": "grid",
    "grid": true,
    "columns": 2,
    "alignment": "center",
    "max_width": "1200px",
    "section_spacing": "default"
  },
  "density": "medium",
  "typography": {
    "font_pairing": ["Plus Jakarta Sans", "Inter"],
    "scale": "1.25",
    "base_size": "16px",
    "line_height": "1.5",
    "weight_strategy": "contrast",
    "paragraph_width": "65ch"
  },
  "color": {
    "mode": "neutral",
    "primary": "#2563eb",
    "accent": "#f59e0b",
    "background": "#ffffff",
    "text": "#1e293b",
    "contrast": "high"
  },
  "interaction": {
    "level": "medium",
    "hover": "shadow-lift",
    "click_feedback": "subtle-scale",
    "focus": "ring",
    "scroll_behavior": "smooth"
  },
  "motion": {
    "type": "fade-in",
    "duration": "200ms",
    "easing": "ease-out",
    "reduced_motion": true,
    "entrance": "slide-up"
  },
  "personality": "professional, approachable, polished"
}
```

---

## Creative

```json
{
  "$schema": "design-dsl/v1",
  "style": "creative",
  "layout": {
    "type": "asymmetric",
    "grid": true,
    "alignment": "mixed",
    "max_width": "full",
    "section_spacing": "generous"
  },
  "density": "medium",
  "typography": {
    "font_pairing": ["Space Grotesk", "DM Sans"],
    "scale": "1.333",
    "base_size": "18px",
    "line_height": "1.5",
    "weight_strategy": "heavy-headings",
    "letter_spacing": "tight",
    "paragraph_width": "55ch"
  },
  "color": {
    "mode": "vibrant",
    "primary": "#7c3aed",
    "accent": "#f43f5e",
    "background": "#fafafa",
    "text": "#0f172a",
    "contrast": "high"
  },
  "interaction": {
    "level": "high",
    "hover": "scale",
    "click_feedback": "ripple",
    "focus": "glow",
    "scroll_behavior": "smooth"
  },
  "motion": {
    "type": "scroll-driven",
    "duration": "300ms",
    "easing": "spring",
    "reduced_motion": true,
    "entrance": "clip"
  },
  "personality": "expressive, bold, artistic"
}
```

---

## Editorial

```json
{
  "$schema": "design-dsl/v1",
  "style": "editorial",
  "layout": {
    "type": "reading-column",
    "alignment": "left",
    "max_width": "720px",
    "section_spacing": "generous"
  },
  "density": "medium",
  "typography": {
    "font_pairing": ["Playfair Display", "Source Sans 3"],
    "scale": "1.2",
    "base_size": "18px",
    "line_height": "1.8",
    "weight_strategy": "contrast",
    "letter_spacing": "normal",
    "paragraph_width": "65ch"
  },
  "color": {
    "mode": "soft",
    "primary": "#1e293b",
    "accent": "#b45309",
    "background": "#faf8f5",
    "text": "#1e293b",
    "contrast": "medium"
  },
  "interaction": {
    "level": "low",
    "hover": "underline",
    "click_feedback": "none",
    "focus": "outline",
    "scroll_behavior": "auto"
  },
  "motion": {
    "type": "none",
    "reduced_motion": true
  },
  "personality": "intellectual, elegant, timeless"
}
```

---

## Product / SaaS

```json
{
  "$schema": "design-dsl/v1",
  "style": "product",
  "layout": {
    "type": "grid",
    "grid": true,
    "columns": 3,
    "alignment": "center",
    "max_width": "1280px",
    "section_spacing": "default"
  },
  "density": "high",
  "typography": {
    "font_pairing": ["Inter", "Inter"],
    "scale": "1.2",
    "base_size": "16px",
    "line_height": "1.5",
    "weight_strategy": "uniform",
    "paragraph_width": "55ch"
  },
  "color": {
    "mode": "neutral",
    "primary": "#2563eb",
    "accent": "#10b981",
    "background": "#ffffff",
    "text": "#111827",
    "contrast": "high"
  },
  "interaction": {
    "level": "medium",
    "hover": "shadow-lift",
    "click_feedback": "subtle-scale",
    "focus": "ring",
    "scroll_behavior": "smooth"
  },
  "motion": {
    "type": "micro-interaction",
    "duration": "150ms",
    "easing": "ease-out",
    "reduced_motion": true,
    "entrance": "fade"
  },
  "personality": "structured, efficient, trustworthy"
}
```

---

## Cyberpunk / Dark Tech

```json
{
  "$schema": "design-dsl/v1",
  "style": "cyberpunk",
  "layout": {
    "type": "grid",
    "grid": true,
    "columns": 2,
    "alignment": "center",
    "max_width": "1200px",
    "section_spacing": "default"
  },
  "density": "medium",
  "typography": {
    "font_pairing": ["JetBrains Mono", "Inter"],
    "scale": "1.25",
    "base_size": "16px",
    "line_height": "1.5",
    "weight_strategy": "contrast",
    "letter_spacing": "wide"
  },
  "color": {
    "mode": "dark",
    "primary": "#00ff88",
    "accent": "#ff00ff",
    "background": "#0a0a0a",
    "text": "#e0e0e0",
    "contrast": "high",
    "dark_mode": true
  },
  "interaction": {
    "level": "high",
    "hover": "color-shift",
    "click_feedback": "ripple",
    "focus": "glow",
    "scroll_behavior": "smooth"
  },
  "motion": {
    "type": "micro-interaction",
    "duration": "200ms",
    "easing": "ease-out",
    "reduced_motion": true,
    "entrance": "clip"
  },
  "personality": "futuristic, edgy, technical"
}
```

---

## Portfolio

```json
{
  "$schema": "design-dsl/v1",
  "style": "portfolio",
  "layout": {
    "type": "grid",
    "grid": true,
    "columns": 2,
    "alignment": "center",
    "max_width": "1200px",
    "section_spacing": "generous"
  },
  "density": "low",
  "typography": {
    "font_pairing": ["DM Serif Display", "DM Sans"],
    "scale": "1.333",
    "base_size": "18px",
    "line_height": "1.5",
    "weight_strategy": "heavy-headings",
    "paragraph_width": "55ch"
  },
  "color": {
    "mode": "neutral",
    "primary": "#171717",
    "accent": "#6366f1",
    "background": "#ffffff",
    "text": "#171717",
    "contrast": "high"
  },
  "interaction": {
    "level": "medium",
    "hover": "scale",
    "click_feedback": "subtle-scale",
    "focus": "ring",
    "scroll_behavior": "smooth"
  },
  "motion": {
    "type": "stagger",
    "duration": "300ms",
    "easing": "ease-out",
    "reduced_motion": true,
    "entrance": "slide-up"
  },
  "personality": "visual-first, curated, confident"
}
```

---

## Warm / Friendly

```json
{
  "$schema": "design-dsl/v1",
  "style": "warm",
  "layout": {
    "type": "single-column",
    "alignment": "center",
    "max_width": "800px",
    "section_spacing": "generous"
  },
  "density": "low",
  "typography": {
    "font_pairing": ["Lora", "Nunito"],
    "scale": "1.25",
    "base_size": "18px",
    "line_height": "1.75",
    "weight_strategy": "contrast",
    "paragraph_width": "65ch"
  },
  "color": {
    "mode": "soft",
    "primary": "#b45309",
    "accent": "#d97706",
    "background": "#faf8f5",
    "text": "#292524",
    "contrast": "medium"
  },
  "interaction": {
    "level": "low",
    "hover": "opacity",
    "click_feedback": "subtle-scale",
    "focus": "ring",
    "scroll_behavior": "smooth"
  },
  "motion": {
    "type": "subtle-fade",
    "duration": "300ms",
    "easing": "ease-out",
    "reduced_motion": true,
    "entrance": "fade"
  },
  "personality": "warm, approachable, friendly"
}
```

---

## Natural Language → DSL Diff Mapping

| 用户说 | DSL Diff |
|--------|----------|
| "更简洁" | `density: "low"`, `interaction.level: "low"`, `color.mode: "monochrome"`, `motion.type: "subtle-fade"` |
| "更丰富" | `density: "medium"`, `color.mode: "vibrant"`, `motion.type: "scroll-driven"` |
| "更温暖" | `color.mode: "soft"`, `color.background: "#faf8f5"`, `typography.font_pairing[0]: "serif"` |
| "更冷/更酷" | `color.mode: "monochrome"`, `color.background: "#fafafa"`, `typography.font_pairing: ["sans","sans"]` |
| "更活泼" | `interaction.level: "medium→high"`, `motion.type: "stagger"`, `color.mode: "vibrant"`, `typography.weight_strategy: "heavy-headings"` |
| "更沉稳" | `interaction.level: "low"`, `motion.type: "none"`, `typography.font_pairing[0]: "serif"`, `color.contrast: "medium"` |
| "更专业" | `layout.alignment: "center"`, `typography.weight_strategy: "uniform"`, `color.mode: "neutral"`, `density: "medium"` |
| "更有个性" | `layout.type: "asymmetric"`, `typography.scale: "1.333+"`, `interaction.level: "high"`, `motion.type: "scroll-driven"` |
| "像Apple" | → `minimal` preset + `interaction.hover: "opacity"`, `motion.duration: "300ms"`, `typography.weight_strategy: "contrast"` |
| "像Notion" | → `minimal` preset + `color.mode: "monochrome"`, `layout.max_width: "720px"`, `motion.type: "none"` |
