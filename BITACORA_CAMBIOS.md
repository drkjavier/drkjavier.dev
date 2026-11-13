# 📓 Bitácora de cambios — drkjavier.dev

> **Para modelos de IA (y personas):** registra aquí **cada** cambio, ajuste o corrección que hagas al proyecto.
> Este documento es la memoria a largo plazo del repo: léelo **antes** de tocar nada y actualízalo **después** de cada cambio.
> Documento complementario a `AI_UPDATE_GUIDE.md` (reglas de contenido) y `README.md` (setup).

---

## 🔄 Cómo usar esta bitácora

### Antes de empezar
1. Lee las **últimas entradas** del [Registro de cambios](#-registro-de-cambios) para no repetir trabajo ni reabrir algo ya resuelto.
2. Revisa [Estado conocido y pendientes](#-estado-conocido-y-pendientes): ahí están los problemas abiertos y las decisiones ya tomadas.
3. Revisa [Contexto operativo](#-contexto-operativo) (comandos, URLs, cuenta de Vercel, fuentes de verdad).

### Después de terminar
1. Ejecuta el checklist (`AI_UPDATE_GUIDE.md` → *Checklist de Validación*).
2. Haz commit con mensaje convencional (ver abajo).
3. **Añade una entrada nueva arriba de todo** en *Registro de cambios*.
4. Si el cambio altera flujos, comandos o pendientes, actualiza también *Contexto operativo* / *Estado conocido*.

### Formato de mensaje de commit (Convención Commits)
```
tipo(alcance): descripción corta en español
```
Tipos: `feat` (funcionalidad), `fix` (corrección), `docs` (documentación), `style` (estilo), `refactor` (reestructuración sin cambiar comportamiento), `test`, `chore` (deploy, dependencias, config).

Ejemplos reales de este repo:
- `fix(experience): BDG inicia en abril 2026`
- `feat(projects): refleja proyectos de GitHub en la seccion de proyectos destacados`

### Plantilla de entrada (copiar y pegar)

```markdown
### 📅 YYYY-MM-DD — <tipo>(<alcance>): <título corto>
**Autor:** modelo/persona · **Commit:** `<hash>` (rama `main`)
**Qué cambió:**
- Archivo → qué se modificó
**Por qué:** motivo o dato fuente que lo justifica
**Cómo se verificó:** build / inspección del HTML / URL en vivo / etc.
**Deploy:** producción ✅ (URL) | pendiente | no aplica
**Impacto / pendientes:** efectos secundarios o tareas abiertas
```

---

## 🧭 Contexto operativo

| Aspecto | Valor |
|---|---|
| Repo | `https://github.com/drkjavier/drkjavier.dev` (rama `main`) |
| Framework | Astro 5 + Tailwind + React, `output: static`, adapter `@astrojs/vercel` |
| Build | `npm run build` → `dist/` (y `.vercel/output/`) |
| Preview local | `npm run preview` / `npm run dev` |
| Deploy | `npx vercel --prod --yes` (requiere `npx vercel link` previo; `.vercel/` está en `.gitignore`) |
| Proyecto Vercel | team `dereck-curtis-projects` → proyecto **`drkjavier-dev`** |
| URL en producción | **https://drkjavier-dev.vercel.app** |
| Dominio custom | `drkjavier.dev` → ver *Estado conocido* (sin DNS) |
| CI/CD automático | **No hay** GitHub Actions conectadas: el push a `main` **no** despliega solo; hay que correr `vercel --prod` |
| Auth Vercel CLI | `~/.local/share/com.vercel.cli/auth.json` (usuario `drkjavier`) |
| Datos del sitio | `src/data/*.yaml` ← única fuente editable del contenido |
| Fuente original | CV PDF en `C:\Users\user\Documents\dereck-curtis\Dereck_Curtis_Resume_{EN,ES}_v4.pdf` (⚠️ ver pendientes) |
| Guía de contenido | `AI_UPDATE_GUIDE.md` |

### Comandos rápidos
```bash
npm run build                                   # build y validación
npx vercel --prod --yes                         # deploy a producción
curl -s https://drkjavier-dev.vercel.app | grep -o "Patrón a verificar"
git log --oneline -10                           # historial resumido
python3 -c "import yaml;print(yaml.safe_load(open('src/data/experience.yaml'))['jobs'][0])"   # validar YAML
```

---

## ⚠️ Estado conocido y pendientes

| # | Estado | Detalle | Última revisión |
|---|---|---|---|
| 1 | 🔴 Abierto | **CV PDF desactualizado**: `Dereck_Curtis_Resume_EN_v4.pdf` y `_ES_v4.pdf` dicen `BDG, S.A. — April 2015 – Present`. El dato real (según el dueño) es **Abril 2026 – Actualidad**. No hay fuente editable en el repo (solo PDFs) → pendiente corregir el PDF o regenerarlo. | 2026-11-12 |
| 2 | 🔴 Abierto | **Dominio `drkjavier.dev` no resuelve**: NXDOMAIN global (sin NS en el registry `.dev`) y 0 dominios en Vercel. La URL operativa es `drkjavier-dev.vercel.app`. Para el custom domain: registrar/apuntar DNS + `vercel domains add` / añadir dominio al proyecto. | 2026-11-12 |
| 3 | 🟡 Decisión | **`src/components/Projects.astro` fue modificado** (regla "NO MODIFICAR componentes" de `AI_UPDATE_GUIDE.md`) para renderizar el enlace opcional `link` ("Ver en GitHub ↗"). Si se quiere volver a la regla estricta: revertir ese archivo; `src/data/projects.yaml` sigue siendo válido. | 2026-11-12 |
| 4 | 🟡 Decisión | Se agregó el campo opcional `link` a los proyectos YAML (antes no existía). Solo se renderiza si está presente; el proyecto de Ericsson no lo lleva. | 2026-11-12 |
| 5 | 🟢 Resuelto | Períodos laborales corregidos: BDG `2026-04 → Actualidad` (primer puesto), Ericsson `2015-09 → 2026-02`, Icon Americas `2013-09 → 2015-09`. | 2026-11-12 |
| 6 | ℹ️ Info | Repos **privados** (no enlazar en el sitio): `beautify-hub`. Repos **sin remoto**: `bean-auditor-backend`, `spring-kafka-app`, `vertx-*`, `tickets`. Duplicado: `it-tickets-app` ≈ `it-tickets` (se usa `it-tickets`). | 2026-11-12 |
| 7 | ℹ️ Info | `tuipr` en el portafolio es un **fork** (`fork: true` en la API de GitHub); se presenta como "Open Source (fork)" y su tap es `homebrew-tuipr`. | 2026-11-12 |
| 8 | 🟢 Resuelto | **Tema del sitio**: de *Corporate* (azul `#1a365d`, Inter) a **Terminal Dark** (fondo `#0d1117`, primary verde `#3fb950`, acento ámbar `#d29922`, JetBrains Mono, glow verde + scanlines CRT). El archivo sigue llamándose `src/styles/themes/theme-corporate.css` (solo cambió su contenido); lo descartable vive en `src/styles/experiments.css` → mapeo de reversiones en `EXPERIMENTOS_ESTILO.md`. | 2026-11-13 |

---

## 📋 Reglas de registro

1. **No borres entradas anteriores**: la bitácora es un historial append-only (ordena de más reciente a más antiguo).
2. **Una entrada por cambio efectivo** (un commit o un lote relacionado). Si haces varios commits en una sesión, entradas separadas o una entrada con varios hashes.
3. Registra también los **no-cambios relevantes**: "no se modificó X porque…", "se descartó Y porque…".
4. Todo lo que un modelo futuro necesite saber y **no** esté en el código debe quedar aquí (decisiones, URLs, datos fuente, pendientes).
5. Si actualizas *Estado conocido*, cambia el estado (`🔴` → `🟢`) y la fecha; no borres la fila.
6. Mantén este archivo en **español** (idioma de los docs del proyecto) y en la raíz del repo.

---

## 📅 Registro de cambios

### 📅 2026-11-13 — feat(style): implementa Aurora Glass (v2, pasos 1–4)
**Autor:** modelo (pi/mimo-v2.6-flash) · **Commit:** `bb2172c` (rama `experiment/styles-v2`)
**Qué cambió:**
- `src/styles/themes/theme-aurora.css` **(nuevo)** → tema Aurora Glass: fondo `#08090d`, superficies `rgba(255,255,255,.045/.07)`, primario `#4f46e5` (+light `#818cf8`, dark `#3730a3`), acento cian `#22d3ee`, tokens `--gradient-brand` y `--font-family-mono`, base **Inter**.
- `src/styles/experiments-v2.css` **(nuevo)** → aurora de fondo (`body::before` fijo con 3 radial-gradients + deriva 24 s), títulos en degradado (`h1`, `.section-title`), tarjetas glass (`backdrop-filter` + hover lift), CTA con degradado sólido indigo + glow, navbar de vidrio, `:focus-visible` indigo, `prefers-reduced-motion`.
- `src/styles/global.css` → imports a `theme-aurora.css` + `experiments-v2.css` (se deja de importar `experiments.css` v1 → desaparecen scanlines y glow verde); eliminadas las reglas de contraste sobre verde del v1 (`#06120a`).
- `tailwind.config.mjs` → `sans: Inter`, `mono: JetBrains Mono`.
- `src/layouts/Layout.astro` → Google Fonts: `Inter` + `JetBrains Mono` (se quita `Fira Code`).
- `PROPUESTA_ESTILO_V2.md` → marcada como implementada; tokens ajustados (ver *Por qué*).
**Por qué:** decisión **A** del dueño: pasar de "terminal hacker" a "producto SaaS premium" (look Linear/Vercel) manteniendo legibilidad para reclutadores. Ajuste sobre la propuesta original: primario `#6366f1 → #4f46e5` porque el CTA con texto blanco en indigo 500 daba 4.46:1 (<4.5:1); con indigo 600 → **6.29:1**.
**Cómo se verificó:** `npm run build` OK (2 páginas); CSS de `dist/` con `08090d`/`4f46e5`/`22d3ee`/`818cf8`, `aurora-drift`, 7× `backdrop-filter`, 3× `radial-gradient`, e **Inter** en el link de fuentes; **ausentes** `3fb950`, `d29922`, `repeating-linear-gradient`, `06120a` (v1 eliminado); dev server sirve `--color-primary: #4f46e5`; contraste calculado (python): texto 18.2:1, muted 7.9:1, CTA 6.29:1, títulos 6.7:1, enlaces 11:1, footer blanco 9.93:1 — **todos ≥4.5:1**.
**Deploy:** no aplica (rama local `experiment/styles-v2`; producción sigue con v1 Terminal Dark hasta merge explícito + `npx vercel --prod --yes`).
**Impacto / pendientes:** revisar en local (`npm run dev`) y decidir merge; si se mergea, producción pasa a Aurora Glass; para volver a v1: revertir los commits de esta rama o seguir el *Revertir* de `PROPUESTA_ESTILO_V2.md`.

### 📅 2026-11-13 — docs: guías actualizadas al tema Terminal Dark y nueva rama de experimentos
**Autor:** modelo (pi/mimo-v2.6-flash) · **Commit:** `b5d8f30` (rama `main`)
**Qué cambió:**
- `README.md` → estructura (aparece `experiments.css`) y sección *Cambiar tema*: el tema actual es **Terminal Dark** (con nota de que el archivo sigue llamándose `theme-corporate.css`), enlace a `EXPERIMENTOS_ESTILO.md`.
- `AI_UPDATE_GUIDE.md` → nota *🎨 Tema visual actual* (tokens, archivos y "no cambiar salvo petición explícita") + `experiments.css` en el árbol.
- `EXPERIMENTOS_ESTILO.md` → cabecera actualizada: rama `experiment/styles` ya fusionada (`9e4fba0`) y desplegada.
- Se crea la rama **`experiment/styles-v2`** para la próxima iteración de estilo, con su propuesta en `PROPUESTA_ESTILO_V2.md`.
**Por qué:** las guías seguían describiendo el tema "corporate/serio" (azul, Inter), lo que confundiría a un modelo futuro; y se quería un espacio aislado para jugar con el estilo sin tocar `main`.
**Cómo se verificó:** `grep -i corporate` sobre los docs → solo queda la nota explicativa del nombre del archivo; build sin cambios de estilo (docs puros).
**Deploy:** no aplica (solo docs; producción intacta con el tema del commit `9e4fba0`).
**Impacto / pendientes:** `experiment/styles-v2` NO debe desplegarse sin decisión explícita; la propuesta de estilo está en la rama, no en `main`.

### 📅 2026-11-13 — style(theme): tema Terminal Dark pasa de `experiment/styles` a `main`
**Autor:** modelo (pi/mimo-v2.6-flash) · **Commit:** `9e4fba0` (merge, rama `main`)
**Qué cambió:**
- Merge `experiment/styles` → `main` (sin conflictos): `src/styles/themes/theme-corporate.css` (Corporate azul → Terminal Dark), `tailwind.config.mjs` (Inter → JetBrains Mono), `src/styles/global.css` (+`@import './experiments.css'` y contraste de texto de `.btn-primary` sobre verde), `src/styles/experiments.css` (nuevo: glow verde en `.card` + scanlines CRT en `body::after`), `src/layouts/Layout.astro` (Google Fonts ahora carga JetBrains Mono + Fira Code), `EXPERIMENTOS_ESTILO.md` (nuevo: mapa de experimentos y cómo revertirlos).
**Por qué:** el dueño pidió llevar a `main` (y desplegar) los experimentos de estilo creados en la rama `experiment/styles` (commits `433ec47`, `d5e4651`, `1615971`, `64f063d`).
**Cómo se verificó:** `npm run build` OK (2 páginas); CSS de `dist/` con `0d1117` + 5× `3fb950` + JetBrains Mono + `repeating-linear-gradient`; dev server `127.0.0.1:4321` sirve `--color-primary: #3fb950` y `Terminal Dark`. ⚠️ Antes del deploy, producción seguía con el tema viejo (`1a365d`) — por eso "no se veían los cambios en local" si se miraba la URL de Vercel o una pestaña cacheada.
**Deploy:** producción ✅ https://drkjavier-dev.vercel.app
**Impacto / pendientes:** `README.md`/`AI_UPDATE_GUIDE.md` describen el tema como "corporate" (el nombre del archivo no cambió, pero los colores ya no); rama `experiment/styles` queda fusionada y puede borrarse; para revertir solo el estilo: ver `EXPERIMENTOS_ESTILO.md`.

### 📅 2026-11-13 — feat(projects): profundización de proyectos y corrección de etiquetas Open Source
**Autor:** modelo (pi/mimo-v2.6-flash) · **Commit:** `e92f712` (rama `main`)
**Qué cambió:**
- `src/data/projects.yaml` → cada proyecto profundizado con arquitectura, testing, DevOps y prácticas verificadas en los repos reales (31 → 47 highlights; descripciones ampliadas; tecnologías añadidas: Spring Cloud, Docker, MDX, SQLite, NFC, Jest, Go, Lipgloss, GoReleaser, Brevo, Zustand, Recharts, Playwright, Node.js, YAML).
- Etiquetas `company` corregidas: solo `tuipr + Homebrew tap` queda como `Open Source (MIT)`; los demás pasan de `Open Source` a `Personal project`.
**Por qué:** (1) el dueño quiere que un reclutador vea un panorama amplio de habilidades por proyecto; (2) verificación con la API de GitHub (`/repos/{r}` y `/repos/{r}/license`, 2026-11-13): de los 8 proyectos solo `tuipr` tiene licencia (MIT, heredada de `cortezramos/tuipr`); los otros 6 repos públicos devuelven **404 en `/license`** → sin licencia no son open source (todo reservado), por lo que no se les puede poner esa etiqueta. El proyecto de Ericsson es propietario y sin repo público.
**Cómo se verificó:** YAML válido (python yaml); `npm run build` OK (2 páginas); HTML de producción con 1× `Open Source (MIT)`, 6× `Personal project`, 1× `Ericsson Guatemala`; highlights nuevos presentes (Spring Cloud, Gherkin, GoReleaser, offline-first).
**Deploy:** producción ✅ https://drkjavier-dev.vercel.app (deployment `drkjavier-9dumyf10d-dereck-curtis-projects.vercel.app`)
**Impacto / pendientes:** desplegado y verificado en vivo (1× `Open Source (MIT)`, 6× `Personal project`, highlights nuevos presentes). Si se quiere que los repos personales sean open source hay que añadirles un archivo `LICENSE` (p. ej. MIT) y reetiquetarlos; no se modificaron componentes.

### 📅 2026-11-12 — feat(projects): proyectos de GitHub en el portafolio
**Autor:** modelo (opencode/go) · **Commit:** `d762310` (rama `main`)
**Qué cambió:**
- `src/data/projects.yaml` → de 1 a 8 proyectos; se añadieron 7 con `link` a GitHub: `drkjavier.dev`, `IT Tickets`, `DC Rentals`, `Bean Auditor App`, `tuipr + Homebrew tap`, `Backend & Cloud Labs (Java)`, `GitHub Actions & Automation` (descripciones ES/EN, highlights y tecnologías verificadas contra los `package.json`/README reales).
- `src/components/Projects.astro` → renderiza enlace opcional `Ver en GitHub ↗` / `View on GitHub ↗` si el proyecto tiene `link` (ver pendiente #3).
**Por qué:** el dueño pidió reflejar en el portfolio los proyectos alojados en GitHub (`github.com/drkjavier`, 28 repos públicos).
**Cómo se verificó:** YAML válido; build OK; 7 enlaces con HTTP 200; HTML de producción contiene 8 tarjetas y 7 enlaces (ES y EN).
**Deploy:** producción ✅ https://drkjavier-dev.vercel.app
**Impacto / pendientes:** se tocó un componente (pendiente #3); se excluyeron repos boilerplate/legacy (ver #6).

### 📅 2026-11-12 — fix(experience): BDG inicia en abril 2026
**Autor:** modelo (opencode/go) · **Commit:** `c6483e8` (rama `main`)
**Qué cambió:**
- `src/data/experience.yaml` → `BDG, S.A.` `startDate: "2026-05"` → `"2026-04"` (sigue `endDate: null`, `current: true`, primer puesto).
**Por qué:** ajuste solicitado por el dueño (periodo correcto: abril 2026).
**Cómo se verificó:** build OK; ES `Abr 2026 — Actualidad`, EN `Apr 2026 — Present`; verificado por `curl` en producción.
**Deploy:** producción ✅ https://drkjavier-dev.vercel.app
**Impacto / pendientes:** el PDF del CV sigue desactualizado (pendiente #1).

### 📅 2026-11-12 — fix(experience): corrige periodos laborales
**Autor:** modelo (opencode/go) · **Commit:** `560c63d` (rama `main`)
**Qué cambió:**
- `src/data/experience.yaml` → `BDG, S.A.` pasó de `2015-04 / current: false` a `2026-05 / current: true` y se movió al **primer lugar** de la lista; Ericsson quedó `2015-09 → 2026-02`; Icon Americas `2013-09 → 2015-09`.
**Por qué:** el PDF mostraba `BDG — April 2015 – Present`, lo que se solapaba con Ericsson; el dato correcto es que el dueño labora en BDG desde 2026.
**Cómo se verificó:** YAML validado con `yaml.safe_load`; orden BDG → Ericsson → Icon en el HTML construido.
**Deploy:** producción ✅ https://drkjavier-dev.vercel.app
**Impacto / pendientes:** superado parcialmente por `c6483e8` (fecha final: abril 2026).

### 📅 2026-11-12 — chore: linkeo de Vercel y primer deploy del sitio
**Autor:** modelo (opencode/go)
**Qué cambió:**
- `npx vercel link --yes --project drkjavier-dev` → creó `.vercel/project.json` (ignorado por git).
- Primeros deploys a producción desde CLI (antes no había link en el repo).
**Por qué:** el repo no estaba linkeado y el deploy se hacía de forma manual/desconocida.
**Cómo se verificó:** `vercel inspect` → `target: production`, `status: Ready`; sitio responde 200.
**Deploy:** producción ✅ https://drkjavier-dev.vercel.app
**Impacto / pendientes:** el `deploy.sh` del repo usa `vercel` global (no `npx`); documentado arriba el comando real usado.

### 📅 2026-11-12 — docs: guías iniciales (README + AI_UPDATE_GUIDE)
**Autor:** modelo (opencode/go) · **Commit:** `58376b6` (*Initial commit: Portfolio drkjavier.dev*)
**Qué cambió:** estructura base del portafolio: `src/data/*.yaml`, componentes, layouts, páginas, `README.md` e `AI_UPDATE_GUIDE.md`.
**Deploy:** n/a (commit inicial)
**Impacto / pendientes:** creó las reglas "no modificar componentes" hoy parcialmente flexibilizadas (pendiente #3).

---

*Última actualización de esta bitácora: 2026-11-12.*
