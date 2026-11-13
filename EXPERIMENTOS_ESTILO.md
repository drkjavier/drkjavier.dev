# 🎨 Mapa de experimentos de estilo — `experiment/styles`

> **Para cualquier modelo/persona que trabaje aquí:** este documento mapea **cada** ajuste visual experimental
> hecho en la rama `experiment/styles` para poder **revertirlo de forma quirúrgica**.
> No es la bitácora general del proyecto (eso es `BITACORA_CAMBIOS.md`): aquí solo viven cambios de estilo descartables.

| Dato | Valor |
|---|---|
| Rama | **`experiment/styles`** (local, **sin push**) |
| Commit base (antes de los experimentos) | **`00a5948`** (`docs: agrega bitacora de cambios…`) = mismo contenido que `origin/main` |
| Producción | intacta (https://drkjavier-dev.vercel.app sirve `main`) |
| Dev server | `http://localhost:4321` (`npm run dev`) |
| Última actualización del mapa | 2026-11-12 |

---

## 📋 Resumen de experimentos

| # | Experimento | Commit | Archivos tocados | Revertir |
|---|---|---|---|---|
| 1 | Tema oscuro + tipografía mono | `433ec47` | `src/styles/themes/theme-corporate.css`, `src/styles/global.css`, `src/layouts/Layout.astro`, `tailwind.config.mjs` | `git revert 433ec47` |
| 2 | Títulos verde terminal + acento ámbar | `d5e4651` | `src/styles/themes/theme-corporate.css`, `src/styles/global.css` | `git revert d5e4651` |
| 3 | Glow en tarjetas + scanlines CRT | `1615971` | `src/styles/experiments.css` (nuevo), `src/styles/global.css` | `git revert 1615971` |

⚠️ **Orden de reversión:** del más reciente al antiguo → `1615971`, `d5e4651`, `433ec47`.
(O en una sola línea:) `git revert --no-commit 1615971 d5e4651 433ec47 && git commit`

### Revert total (volver exactamente a `main`)
```bash
git checkout main                 # la rama experiment/styles queda guardada por si la quieres retomar
# o, para borrarla:
git checkout main && git branch -D experiment/styles
```

---

## 1️⃣ Tema oscuro + tipografía mono — `433ec47`

**Objetivo:** pasar de tema claro *Corporate* a *Terminal Dark* y de Inter a JetBrains Mono.

| Archivo | Cambio |
|---|---|
| `src/styles/themes/theme-corporate.css` | Comentario del tema; paleta completa a valores oscuros; nuevo token `--font-family-base`; `--font-size-hero: 3.5rem → 3rem` |
| `src/styles/global.css` | `body { font-family: 'Inter', system-ui, sans-serif }` → `font-family: var(--font-family-base, 'JetBrains Mono', …)` |
| `src/layouts/Layout.astro` | Google Fonts: `family=Inter:wght@400;500;600;700` → `family=JetBrains+Mono:wght@400;500;700` (se conserva `Fira+Code`) |
| `tailwind.config.mjs` | `fontFamily.sans`: `['Inter','system-ui','sans-serif']` → `['JetBrains Mono','ui-monospace','SFMono-Regular','Menlo','monospace']`; `fontFamily.mono` ahora incluye fallback `ui-monospace` |

**Valores de color antes → después (los que siguen vigentes):**

| Token | Antes | Después |
|---|---|---|
| `--color-background` | `#ffffff` | `#0d1117` |
| `--color-surface` | `#f7fafc` | `#161b22` |
| `--color-surface-alt` | `#edf2f7` | `#21262d` |
| `--color-text` | `#1a202c` | `#e6edf3` |
| `--color-text-muted` | `#718096` | `#9198a1` |
| `--color-border` | `#e2e8f0` | `#30363d` |
| `--color-border-light` | `#edf2f7` | `#21262d` |
| `--color-secondary` | `#2d3748` | `#8b949e` |
| `--color-secondary-light` | `#4a5568` | `#a2aab5` |

**Revertir:** `git revert 433ec47` (o `git checkout 00a5948 -- src/styles src/layouts/Layout.astro tailwind.config.mjs`).

---

## 2️⃣ Títulos verde terminal + acento ámbar — `d5e4651`

**Objetivo:** look 100 % terminal → títulos/enlaces de marca en verde, links y puntos del timeline en ámbar.

| Archivo | Cambio |
|---|---|
| `src/styles/themes/theme-corporate.css` | `--color-primary: #1f6feb → #3fb950` · `--color-primary-light: #388bfd → #56d364` · `--color-primary-dark: #10233f → #0f3d24` · `--color-accent: #3fb950 → #d29922` · `--color-accent-light: #56d364 → #e3b341` |
| `src/styles/global.css` | Reglas de contraste **sin capa** (ganan sobre `@layer components`): `.btn-primary, .btn-primary:hover { color: #06120a }` y `button[style*="--color-primary"] { color: #06120a !important }` |

**Por qué las reglas de contraste:** con `--color-primary: #3fb950` el texto blanco (`--color-text-inverse`) da **2.57:1** en `.btn-primary` y en el botón activo del selector de idioma (`LanguageToggle.tsx`, que usa estilos inline). Con texto `#06120a` se llega a **≈9:1**.
→ *Si algún día `--color-primary` vuelve a un tono oscuro, estas dos reglas deben eliminarse junto con este commit.*

**Revertir:** `git revert d5e4651`.

---

## 3️⃣ Glow en tarjetas + scanlines CRT — `1615971`

**Objetivo:** profundidad y textura de consola.

| Archivo | Cambio |
|---|---|
| `src/styles/experiments.css` **(nuevo)** | `.card` → borde `#21262d` + sombra con halo verde `rgba(63,185,80,.06)`; `.card:hover` → borde `rgba(63,185,80,.45)` y glow `rgba(63,185,80,.12)`; `body::after` → overlay fijo de **scanlines** (`repeating-linear-gradient`, alpha `0.025`, `z-index: 100`, `pointer-events: none`) |
| `src/styles/global.css` | 1 línea: `@import './experiments.css';` |

**Notas:**
- Todo el experimento vive en **un solo archivo**: para descartarlo basta con borrar `experiments.css` y esa línea de `@import`.
- Si los scanlines se ven fuertes: bajar `0.025 → 0.015`. Si estorban en texto pequeño: eliminar el bloque `body::after`.
- La regla `.card` de `experiments.css` está **sin capa**, por eso pisa a `.card` de `@layer components` en `global.css`.

**Revertir:** `git revert 1615971` (o borrar el archivo + la línea de import).

---

## ✅ Verificación después de cualquier cambio o reversión

```bash
npm run build                                   # debe compilar sin errores
curl -s http://localhost:4321/ | grep -o "JetBrains Mono" | head -1   # tipografía activa
grep -o "#3fb950\|#d29922\|repeating-linear-gradient" dist/_astro/*.css | sort | uniq -c   # experimentos activos
git log --oneline -6                            # historial de experimentos
git status -sb                                  # working tree limpio
```

Valores de referencia con **todos** los experimentos activos:
`#0d1117` fondo · `#161b22` superficie · `#e6edf3` texto · `#3fb950` primario/verde · `#d29922` acento/ámbar · `JetBrains Mono` tipografía · scanlines presentes.

---

## 🚀 Si el experimento gusta

```bash
# 1. llevar los experimentos a main
git checkout main
git merge experiment/styles

# 2. build + deploy (esto SÍ afecta producción)
npm run build && npx vercel --prod --yes

# 3. push
git push origin main
```
Si solo gusta **parte**: hacer `git revert <commit>` de los que no gusten **antes** del merge.
