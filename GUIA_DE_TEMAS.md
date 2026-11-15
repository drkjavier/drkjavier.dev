# 🎨 Guía de temas — cómo cambiar el estilo (para agentes de IA y personas)

> **Uso:** cuando el dueño pida *"cambia el tema"*, *"prueba el estilo X"* o *"crea un tema nuevo"*,
> **lee este documento completo antes de tocar nada** y sigue el procedimiento tal cual.
> Es la referencia canónica del sistema de temas; el resto de docs solo enlazan aquí.
>
> Documentos hermanos: [`AI_UPDATE_GUIDE.md`](AI_UPDATE_GUIDE.md) (contenido/CV) ·
> [`EXPERIMENTOS_ESTILO.md`](EXPERIMENTOS_ESTILO.md) (mapa histórico v1) ·
> [`PROPUESTA_ESTILO_V2.md`](PROPUESTA_ESTILO_V2.md) (diseño de Aurora) ·
> [`BITACORA_CAMBIOS.md`](BITACORA_CAMBIOS.md) (memoria de cambios — regístrate ahí al terminar).

---

## ⚡ TL;DR — Cambiar de tema (30 segundos)

**ÚNICO lugar que se cambia:** `src/layouts/Layout.astro` **línea 16**:

```astro
<html lang={lang} data-theme="terminal">   <!-- terminal | aurora -->
```

Cambia `terminal` ↔ `aurora` → cambia **todo** (colores, efectos, tipografía). Nada más.
Luego: `npm run build` → verificar → `npx vercel --prod --yes`.

---

## 🗺️ Mapa del sistema de temas

| Archivo | Qué es | ¿Se toca al cambiar de tema? |
|---|---|---|
| **`src/layouts/Layout.astro:16`** | **`data-theme` = EL SWITCH** (nombre del tema activo) | ✅ **SÍ — único cambio** |
| `src/styles/themes/theme-terminal.css` | Tema **Terminal Dark** (default): tokens `html[data-theme='terminal']` + importa sus efectos | ❌ no |
| `src/styles/themes/theme-aurora.css` | Tema **Aurora Glass**: tokens `html[data-theme='aurora']` + importa sus efectos | ❌ no |
| `src/styles/experiments-terminal.css` | Efectos de Terminal (scanlines, glow verde, contraste `#06120a`) — scopeado | ❌ no |
| `src/styles/experiments-aurora.css` | Efectos de Aurora (aurora de fondo, glass, degradados) — scopeado | ❌ no |
| `src/styles/global.css` | **100% genérico**: importa los 2 temas + estilos base con variables | ❌ **NUNCA meter reglas de tema aquí** |
| `tailwind.config.mjs` | `sans: Inter`, `mono: JetBrains Mono` (fijos; cada tema elige con `--font-family-base`) | ❌ no (el switch no lo requiere) |
| `src/layouts/Layout.astro` (fonts) | Google Fonts carga **Inter + JetBrains Mono siempre** (para ambos temas) | ❌ no |
| `src/components/ThemeToggle.astro` | Botón `Terminal \| Aurora` — catálogo en la línea 11 | ❌ (solo al agregar temas nuevos) |
| `src/components/Navbar.astro:13` | `showThemeToggle = import.meta.env.DEV` → el botón **solo existe en dev** | ❌ no |

**Arquitectura (por qué funciona con un nombre):** ambos temas están siempre en el bundle,
scopeados a `html[data-theme='X']`. El atributo decide cuáles reglas aplican. Cada tema es
autocontenido: `theme-*.css` importa sus `experiments-*.css` en la primera línea.

---

## 🎛️ Catálogo de temas

| `data-theme` | Nombre | Estilo | Tipografía | Efectos |
|---|---|---|---|---|
| **`terminal`** *(default)* | Terminal Dark | Oscuro consola: fondo `#0d1117`, primario verde `#3fb950`, acento ámbar `#d29922` | JetBrains Mono | Scanlines CRT, glow verde en tarjetas, texto oscuro en botones (`#06120a`) |
| **`aurora`** | Aurora Glass | SaaS premium: fondo `#08090d`, primario indigo `#4f46e5`, acento cian `#22d3ee`, tarjetas de vidrio | Inter (cuerpo) + Mono (acentos) | Aurora radial animada, glass con blur, títulos en degradado, navbar de vidrio |

Tokens compartidos que **siempre** existen en ambos temas: `--color-*`, `--color-on-primary`
(texto sobre el primario), `--gradient-brand`, `--gradient-brand-solid`, `--font-family-base`,
`--font-family-mono`, sombras, radios y transiciones.

---

## 📋 Procedimiento A — Cambiar el tema (lo más común)

1. **Editar** `src/layouts/Layout.astro` línea 16: `data-theme="terminal"` → `data-theme="aurora"` (o al revés).
2. **Build:** `npm run build` → debe decir `2 page(s) built` sin errores.
3. **Verificar el build:**
   ```bash
   grep -o 'data-theme="[a-z]*"' dist/index.html dist/en/index.html   # → terminal o aurora (los 2)
   grep -c "data-theme-id\|getItem('theme')" dist/index.html          # → SIEMPRE 0 (código dev no sale)
   ```
4. **Ver en local (opcional):** `npm run dev` → http://localhost:4321 (o usa el botón `Terminal | Aurora` de la navbar para previsualizar **sin** editar nada — solo en dev).
5. **Publicar:**
   ```bash
   npx vercel --prod --yes
   ```
6. **Verificar en vivo:**
   ```bash
   curl -s https://drkjavier-dev.vercel.app/ | grep -o 'data-theme="[a-z]*"'
   ```
7. **Registrar:** entrada nueva arriba del todo en [`BITACORA_CAMBIOS.md`](BITACORA_CAMBIOS.md) (qué, por qué, cómo se verificó, deploy) y commit convencional (`feat(themes): activa tema aurora en produccion`).

## 📋 Procedimiento B — Solo previsualizar (sin cambiar nada)

`npm run dev` → clic en la pastilla **`Terminal | Aurora`** de la navbar.
Es una herramienta **solo desarrollo**: cambia `data-theme` en vivo y guarda en `localStorage` (clave `theme`).
**Nunca llega a producción** (renderizado bajo `import.meta.env.DEV`) → en producción siempre manda el valor de `Layout.astro`.

---

## 📋 Procedimiento C — Crear un tema nuevo (p. ej. `sunset`)

1. Copiar la plantilla:
   ```bash
   cp src/styles/themes/theme-aurora.css src/styles/themes/theme-sunset.css
   cp src/styles/experiments-aurora.css src/styles/experiments-sunset.css
   ```
2. En **`theme-sunset.css`**: cambiar el `@import '../experiments-aurora.css';` → `'../experiments-sunset.css';` y **reemplazar todos los selectores** `html[data-theme='aurora']` → `html[data-theme='sunset']` (tokens + import). Ajustar colores/tipografía (mantener **todos** los tokens; `--color-on-primary` debe dar ≥4.5:1 sobre `--color-primary`).
3. En **`experiments-sunset.css`**: reemplazar todos los selectores `html[data-theme='aurora']` → `html[data-theme='sunset']` y ajustar/eliminar efectos. Scope **obligatorio**: sin el prefijo, el tema se fuga a los demás.
4. Registrar el import en **`global.css`** (línea ~11): `@import './themes/theme-sunset.css';` (los imports no llevan scope; el orden no importa porque los selectores son excluyentes).
5. Agregar al catálogo del botón dev: **`ThemeToggle.astro` línea 11-12** → `{ id: 'sunset', label: 'Sunset' }` y la lista del script en **`Layout.astro`** (`t === 'terminal' || t === 'aurora'` → añadir `|| t === 'sunset'`).
6. Activarlo: `Layout.astro` → `data-theme="sunset"`.
7. Build + verificar + deploy + bitácora (Procedimiento A, pasos 2-7).

---

## ⚠️ Reglas duras y errores comunes

1. **El switch es solo `data-theme` en `Layout.astro`.** No "arregles" el cambio de estilo tocando `global.css`, Tailwind o los fonts de `Layout.astro`.
2. **`global.css` no puede contener** colores hex fijos ni selectores `data-theme` (es genérico). Si ves reglas de tema ahí → móvelas al `experiments-*` de su tema.
3. **Todo efecto nuevo va scopeado:** `html[data-theme='X'] .selector { … }`. Sin scope rompe el otro tema.
4. **No importes un solo tema en `global.css`** (rompería el botón dev y obligaría a rebuild para previsualizar). Van los dos.
5. **Los temas son autocontenidos:** sus efectos se importan desde el propio tema (`@import '../experiments-*.css';` como primera línea), nunca desde `global.css`.
6. **Contraste obligatorio:** texto sobre `--color-primary` ≥ 4.5:1 → usa `var(--color-on-primary)` (verde brillante usa `#06120a`, indigo usa `#ffffff`).
7. **El botón dev no es para producción:** no quites la condición `import.meta.env.DEV` sin decisión explícita del dueño.
8. **`localStorage` (`theme`) solo se lee en dev** — en producción no se emite el script (valor definido garantizado).
9. **No renombres archivos de tema sin actualizar** este documento, `README.md` (sección *Cambiar tema*), `AI_UPDATE_GUIDE.md` y la tabla de renombres de `EXPERIMENTOS_ESTILO.md`.
10. **Siempre regístralo en `BITACORA_CAMBIOS.md`** (append-only, entrada nueva arriba) y haz commit con convención (`feat|fix|docs|chore(alcance): descripción`).

---

## 🔍 Comandos de verificación rápidos

```bash
npm run build                                                  # build (2 páginas)
grep -o 'data-theme="[a-z]*"' dist/index.html dist/en/index.html   # tema activo en build
grep -c "data-theme-id" dist/index.html                        # 0 = sin código dev en prod
css=$(ls dist/_astro/*.css)
grep -oE "html\[data-theme=.?[a-z]+" $css | sort | uniq -c     # reglas por tema (ambos presentes)
grep -oE "3fb950|4f46e5|0d1117|08090d" $css | sort | uniq -c   # paletas de ambos temas
npm run dev && curl -s http://127.0.0.1:4321/ | grep -o 'data-theme-id="[a-z]*"'   # botón dev
npx vercel --prod --yes                                        # deploy
curl -s https://drkjavier-dev.vercel.app/ | grep -o 'data-theme="[a-z]*"'          # producción
git log --oneline -5 && git status -sb                         # historial/estado
```

**Estado de referencia (2026-11-13):** default `terminal` en producción ✅ · botón dev sin emitir en prod ✅ ·
rama `main` única, en sync con `origin/main` ✅.
