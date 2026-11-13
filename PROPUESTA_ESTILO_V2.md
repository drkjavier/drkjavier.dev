# ✨ Propuesta de estilo v2 — **Aurora Glass**
> Rama: **`experiment/styles-v2`** (parte de `main` = tema *Terminal Dark* actual).
> Documento de **propuesta**: aquí NO está implementado todavía. Si se aprueba, se implementa en
> pasos (abajo) y se registra en `BITACORA_CAMBIOS.md`.
> Mapa del estilo actual (v1, desplegado): `EXPERIMENTOS_ESTILO.md`.

## 🎯 Concepto

De **"terminal hacker"** (verde sobre negro + mono total + scanlines) a **"producto SaaS premium"**:
fondo casi negro con **auroras de color** difusas, **tarjetas de vidrio** (glass), acentos en
**degradado indigo → cian** y tipografía **Inter para lectura + JetBrains Mono solo como acento**
(etiquetas, eyebrows, bloques de código).

### ¿Por qué capta la atención de un reclutador?
1. **Legibilidad ante todo:** un reclutador escanea ~7 s. Inter > JetBrains Mono para párrafos largos
   (la mono en todo el sitio obliga a leer más despacio).
2. **Señal de "moderno":** es el lenguaje visual de Linear, Vercel, Resend, Stripe dark → comunica
   front-end actualizado sin decirlo.
3. **Diferenciación sin payasías:** el v1 (scanlines CRT) puede leerse como *gimmick*; el glass + aurora
   impresiona y a la vez sigue pareciendo un portfolio corporativo serio.
4. **Jerarquía visual:** el degradado en el H1 y en el CTA concentra la mirada donde importa
   (nombre → propuesta de valor → contacto).

## 🎨 Tokens (antes v1 Terminal Dark → después v2 Aurora Glass)

| Token | v1 (actual) | v2 (propuesto) |
|---|---|---|
| `--color-background` | `#0d1117` | `#08090d` (negro azulado) |
| `--color-surface` | `#161b22` | `rgba(255,255,255,0.045)` + `backdrop-filter: blur(14px)` |
| `--color-surface-alt` | `#21262d` | `rgba(255,255,255,0.07)` |
| `--color-primary` | `#3fb950` | `#6366f1` (indigo 500) |
| `--color-primary-light` | `#56d364` | `#818cf8` |
| `--color-primary-dark` | `#0f3d24` | `#4338ca` |
| `--color-accent` | `#d29922` | `#22d3ee` (cian 400) |
| `--color-accent-light` | `#e3b341` | `#67e8f9` |
| `--color-text` | `#e6edf3` | `#f4f5f7` |
| `--color-text-muted` | `#9198a1` | `#9aa4b2` |
| `--color-border` | `#30363d` | `rgba(255,255,255,0.09)` |
| `--font-family-base` | JetBrains Mono (todo) | **Inter** (cuerpo) · JetBrains Mono → solo `code`, `.eyebrow`, etiquetas |
| `--font-size-hero` | `3rem` | `3.25rem` + `background-clip:text` en degradado |

**Degradado de marca:** `linear-gradient(90deg, #818cf8 0%, #22d3ee 100%)` → H1, CTA primario y
bordes inferiores de sección.

## 🧱 Efectos (4 pasos, cada uno revertible por separado)

| # | Paso | Archivo | Revertir |
|---|---|---|---|
| 1 | Nuevo tema con los tokens de arriba | `src/styles/themes/theme-aurora.css` **(nuevo)** + cambiar 1 línea de import en `global.css` | volver el import a `theme-corporate.css` |
| 2 | Aurora de fondo + tarjetas glass + H1 en degradado + hover lift; **apaga los scanlines** (`body::after { display:none }`) y el glow verde | `src/styles/experiments-v2.css` **(nuevo)** + 1 línea de import | borrar archivo + import |
| 3 | Tipografía: Inter para cuerpo, Mono como acento | `tailwind.config.mjs` + `src/layouts/Layout.astro` (Google Fonts) | `git revert` del commit |
| 4 | Micro-polish: sticky nav con blur, `:focus-visible` indigo, `prefers-reduced-motion` para la deriva de las auroras | `experiments-v2.css` | `git revert` del commit |

**Fondo aurora (paso 2):** 3 `radial-gradient` de gran radio con opacidad ≤ .35 —
indigo `#6366f1` arriba-izq., cian `#22d3ee` arriba-der., esmeralda `#10b981` abajo —
con drift animado a 24 s, **deshabilitado bajo `prefers-reduced-motion`**.

## ♿ Accesibilidad (requisito de aprobación)

| Elemento | Ratio mínimo | Estado previsto |
|---|---|---|
| Texto `#f4f5f7` sobre `#08090d` | ≥ 7:1 | ✅ ~17:1 |
| Texto muted `#9aa4b2` sobre fondo | ≥ 4.5:1 | ✅ ~7.4:1 |
| Blanco sobre degradado `#6366f1→#22d3ee` (CTA) | ≥ 4.5:1 | ✅ ~4.6:1 (verificar en build) |
| Indigo `#818cf8` como texto sobre fondo oscuro | ≥ 4.5:1 | ✅ ~7:1 |
| Foco visible | `:focus-visible` con anillo `#818cf8` | paso 4 |
| Animación | sin movimiento si `prefers-reduced-motion` | paso 4 |

## 🔍 Cómo revisarlo (sin tocar producción)

```bash
npm run dev                     # http://localhost:4321  (esta rama NO se despliega sola)
npm run build                   # debe compilar OK
grep -o "6366f1\|22d3ee\|backdrop-filter" dist/_astro/*.css | sort | uniq -c
```
Producción queda intacta hasta que se haga merge a `main` + `npx vercel --prod --yes`.

## 🗺️ Decisión

- [ ] **A** → Implementar Aurora Glass completo (pasos 1–4)
- [ ] **B** → Solo pasos 1–2 (color/glass, conservar Mono como tipografía única)
- [ ] **C** → Descartar; proponer alternativa (ver abajo)
- [ ] **D** → Mantener v1 Terminal Dark en producción

**Alternativa descartada por ahora — "Editorial Serif"** (fondo hueso `#faf9f7`, títulos serif tipo
Fraunces, acento terracota): elegante y muy "diseñador", pero resta señal técnica front-end a un
perfil Senior/Cloud y ya existe riesgo de parecerse a portfolios genéricos de reclutamiento.
