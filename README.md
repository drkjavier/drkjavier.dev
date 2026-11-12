# drkjavier.dev — Portfolio

Portfolio personal de **Dereck Curtis Albizu** — Senior Software Engineer.

## 🚀 Quick Start

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📁 Estructura del proyecto

```
drkjavier.dev/
├── src/
│   ├── data/              ← 🤖 ARCHIVOS QUE LA IA ACTUALIZA
│   │   ├── profile.yaml       # Info personal y resumen
│   │   ├── skills.yaml        # Habilidades técnicas
│   │   ├── experience.yaml    # Experiencia laboral
│   │   ├── projects.yaml      # Proyectos destacados
│   │   ├── education.yaml     # Educación
│   │   └── translations.yaml  # Textos de la UI en ES/EN
│   ├── components/        ← Componentes del portafolio
│   │   ├── Navbar.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Experience.astro
│   │   ├── Projects.astro
│   │   ├── Education.astro
│   │   ├── Contact.astro
│   │   ├── Footer.astro
│   │   └── LanguageToggle.tsx
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── data.ts        ← Utilidad para cargar YAMLs
│   ├── pages/
│   │   ├── index.astro    ← Página principal (ES)
│   │   └── en/
│   │       └── index.astro  ← Página en inglés
│   └── styles/
│       ├── global.css
│       └── themes/
│           └── theme-corporate.css  ← Tema actual
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── tailwind.config.mjs
├── vercel.json
└── package.json
```

## 🤖 Instrucciones para actualización por IA

### Flujo de actualización

1. **Leer el CV** (PDF) del profesional
2. **Extraer** la información relevante
3. **Actualizar** los archivos YAML en `src/data/`
4. **NO** modificar componentes, layouts ni estilos (a menos que se solicite explícitamente)

### Formato de los archivos YAML

#### `profile.yaml`
```yaml
name: "Nombre completo"
title: "Título profesional"
subtitle: "Subtítulo / especialización"
email: "email@ejemplo.com"
phone: "+XXX XXXXXXXX"
location: "Ciudad, País"
linkedin: "https://linkedin.com/in/..."
github: "https://github.com/..."
yearsOfExperience: 10
summary:
  es: "Resumen profesional en español..."
  en: "Professional summary in English..."
```

#### `skills.yaml`
```yaml
categories:
  - name: "Nombre de categoría"  # Siempre en inglés
    icon: "server|monitor|cloud|brain|database|workflow"
    items:
      - name: "Technology"        # Siempre en inglés
        versions: "8-17"          # Opcional
        level: 95                 # 0-100 (opcional)
```

#### `experience.yaml`
```yaml
jobs:
  - company: "Nombre empresa"
    role: "Título del puesto"
    location: "Ubicación"
    startDate: "YYYY-MM"
    endDate: "YYYY-MM"           # null si es actual
    current: false
    description:
      es: "Descripción en español..."
      en: "Description in English..."
    achievements:
      - es: "Logro en español..."
        en: "Achievement in English..."
    technologies:
      - "Java"
      - "Spring Boot"
      # ... todas las tecnologías usadas
```

#### `projects.yaml`
```yaml
projects:
  - name: "Nombre del proyecto"
    company: "Empresa"
    period: "YYYY-YYYY"
    description:
      es: "Descripción en español..."
      en: "Description in English..."
    highlights:
      - es: "Logro destacado en español..."
        en: "Key highlight in English..."
    technologies:
      - "Tech1"
      - "Tech2"
```

#### `education.yaml`
```yaml
degrees:
  - title:
      es: "Título en español"
      en: "Title in English"
    institution: "Universidad / Institución"
    location: "Ciudad, País"
    status: "completed|in_progress"
```

### Reglas importantes para la IA

1. **Tecnologías y nombres técnicos SIEMPRE en inglés** (es el estándar de la industria)
2. **Textos descriptivos** deben estar en ambos idiomas (es/en)
3. **No modificar** la estructura de los YAML, solo los valores
4. **Para agregar una nueva categoría de skills**, agregar un nuevo item al array `categories`
5. **Para agregar una nueva experiencia**, agregar un nuevo item al array `jobs`
6. **Para agregar un nuevo proyecto**, agregar un nuevo item al array `projects`
7. **Mantener coherencia** entre los datos del CV y los archivos YAML

## 🎨 Cambiar tema

Para migrar a un nuevo estilo visual:

1. Crear un nuevo archivo en `src/styles/themes/` (ej: `theme-modern.css`)
2. Copiar la estructura de variables CSS del tema actual
3. Modificar los valores de las variables
4. Cambiar el import en `src/styles/global.css`:
   ```css
   /* Antes */
   @import './themes/theme-corporate.css';
   /* Después */
   @import './themes/theme-modern.css';
   ```

Los temas disponibles:
- `theme-corporate.css` — Corporativo/serio (actual)

## 🌐 Idiomas

- **Español (ES)**: Idioma por defecto, ruta raíz `/`
- **Inglés (EN)**: Ruta `/en/`
- **Secciones técnicas** (nombres de tecnologías, categorías): Siempre en inglés
- **Toggle ES/EN**: Componente `<LanguageToggle>` en la navbar

## 📦 Deploy en Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

O conectar el repositorio de GitHub a Vercel para deploy automático.

**Namespace en Vercel**: `drkjavier`
