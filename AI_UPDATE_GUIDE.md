# Guía de Actualización por IA - drkjavier.dev

## 🎯 Objetivo

Este documento proporciona instrucciones para que cualquier modelo de IA pueda actualizar el portafolio de Dereck Curtis a partir de su CV en PDF.

## 📁 Estructura del Proyecto

```
drkjavier.dev/
├── src/
│   ├── data/              ← 🤖 SOLO MODIFICAR ESTOS ARCHIVOS
│   │   ├── profile.yaml       # Información personal y resumen profesional
│   │   ├── skills.yaml        # Habilidades técnicas agrupadas por categoría
│   │   ├── experience.yaml    # Experiencia laboral (todas las empresas)
│   │   ├── projects.yaml      # Proyectos destacados
│   │   ├── education.yaml     # Educación formal
│   │   └── translations.yaml  # Textos de la interfaz (ES/EN)
│   ├── components/        ← ⚠️ NO MODIFICAR (estructura de componentes)
│   ├── layouts/           ← ⚠️ NO MODIFICAR (layout principal)
│   ├── pages/             ← ⚠️ NO MODIFICAR (rutas)
│   └── styles/            ← 🔧 MODIFICAR SOLO PARA CAMBIOS DE ESTILO
│       ├── global.css              # 100% genérico (importa los 2 temas)
│       ├── experiments-terminal.css# Efectos del tema Terminal (autocontenido)
│       ├── experiments-aurora.css  # Efectos del tema Aurora (autocontenido)
│       └── themes/                 # Temas (tokens CSS + import de sus efectos)
│           ├── theme-terminal.css  # Terminal Dark (DEFAULT)
│           └── theme-aurora.css    # Aurora Glass (alterno)
└── public/                # Assets estáticos (favicon, imágenes)
```

> **🎨 Tema visual actual:** **Terminal Dark** (default) — fondo `#0d1117`, superficies `#161b22`, primario verde `#3fb950`, acento ámbar `#d29922`, tipografía **JetBrains Mono**.
> **Switch de tema = UN nombre:** `src/layouts/Layout.astro` → `<html data-theme="terminal">` (`terminal` ↔ `aurora`). Cada tema arrastra sus tokens, efectos y tipografía (ver README → *Cambiar tema*).
> Mapeo de experimentos y cómo revertirlos: [`EXPERIMENTOS_ESTILO.md`](EXPERIMENTOS_ESTILO.md) · Tema alterno: [`PROPUESTA_ESTILO_V2.md`](PROPUESTA_ESTILO_V2.md).
> **No cambiar el tema salvo petición explícita.** (En desarrollo hay un botón en la navbar para previsualizar; no existe en producción.)

## 🔄 Flujo de Actualización

### Paso 1: Leer el CV
El modelo debe leer el PDF del CV ubicado en:
```
C:\Users\user\Documents\dereck-curtis\Dereck_Curtis_Resume_EN_v4.pdf
```

### Paso 2: Extraer Información
Extraer las siguientes secciones del CV:
- **Información personal**: nombre, email, teléfono, ubicación, LinkedIn, GitHub
- **Resumen profesional**: párrafo introductorio
- **Habilidades técnicas**: agrupadas por categoría (Backend, Frontend, Cloud, DB, etc.)
- **Experiencia laboral**: cada empresa con sus logros y tecnologías
- **Proyectos**: proyectos destacados con descripciones
- **Educación**: títulos académicos

### Paso 3: Actualizar Archivos YAML
Actualizar **solo** los archivos en `src/data/` siguiendo los formatos especificados abajo.

### Paso 4: Verificar
Ejecutar `npm run build` para asegurar que no hay errores.

### Paso 5: Registrar en la bitácora de cambios
Añadir una entrada al inicio de [`BITACORA_CAMBIOS.md`](BITACORA_CAMBIOS.md) con el formato de la plantilla (qué cambió, por qué, cómo se verificó, deploy e impacto/pendientes). Ese documento es la memoria del proyecto para cualquier modelo o persona que trabaje aquí: léelo antes de empezar y actualízalo antes de terminar.

## 📝 Formato de Archivos YAML

### profile.yaml

```yaml
# ============================================
# PROFILE DATA - Información personal
# ============================================
name: "Nombre completo"
title: "Título profesional (ej: Senior Software Engineer)"
subtitle: "Subtítulo / especialización"
email: "email@ejemplo.com"
phone: "+XXX XXXXXXXX"
location: "Ciudad, País"
linkedin: "https://linkedin.com/in/username"
github: "https://github.com/username"
yearsOfExperience: 10

summary:
  es: |
    Resumen profesional en español. Debe ser un párrafo coherente
    que describa la experiencia y especialización.
  en: |
    Professional summary in English. Should be a coherent paragraph
    describing experience and specialization.
```

**Reglas:**
- `name`: Nombre completo del profesional
- `title`: Título profesional (siempre en inglés, es estándar de la industria)
- `summary.es` y `summary.en`: Deben ser traducciones equivalentes

### skills.yaml

```yaml
# ============================================
# SKILLS DATA - Habilidades técnicas
# ============================================
categories:
  - name: "Nombre de Categoría"  # Siempre en INGLÉS (estándar)
    icon: "server|monitor|cloud|brain|database|workflow"
    items:
      - name: "Technology"        # Siempre en INGLÉS
        versions: "8-17"          # Opcional: versiones específicas
        level: 95                 # Opcional: 0-100 (dominio)
```

**Iconos disponibles:**
- `server` → Backend
- `monitor` → Frontend
- `cloud` → Cloud & DevOps
- `brain` → AI-Augmented
- `database` → Databases
- `workflow` → Methodologies

**Reglas:**
- Los nombres de tecnologías SIEMPRE van en inglés (Java, Spring Boot, React, etc.)
- Los nombres de categorías SIEMPRE van en inglés (Backend, Frontend, Cloud, etc.)
- `level` es opcional, va de 0 a 100
- `versions` es opcional, para especificar versiones (ej: "8-17" para Java)

**Ejemplo completo:**
```yaml
categories:
  - name: "Backend"
    icon: "server"
    items:
      - name: "Java"
        versions: "8-17"
        level: 95
      - name: "Spring Boot"
        level: 95
      - name: "Spring Cloud"
        level: 85

  - name: "Frontend"
    icon: "monitor"
    items:
      - name: "React"
        level: 85
      - name: "Angular"
        level: 85
      - name: "TypeScript"
        level: 85
```

### experience.yaml

```yaml
# ============================================
# EXPERIENCE DATA - Experiencia laboral
# ============================================
jobs:
  - company: "Nombre de la empresa"
    role: "Título del puesto"
    location: "Ciudad, País"
    startDate: "YYYY-MM"        # Formato: Año-Mes
    endDate: "YYYY-MM"          # null si es el trabajo actual
    current: false              # true si es el trabajo actual
    description:
      es: |
        Descripción del rol en español. Debe ser un párrafo
        que explique las responsabilidades principales.
      en: |
        Role description in English. Should be a paragraph
        explaining main responsibilities.
    achievements:
      - es: "Logro específico en español con métricas cuantificables."
        en: "Specific achievement in English with quantifiable metrics."
      - es: "Otro logro importante..."
        en: "Another important achievement..."
    technologies:
      - "Java"
      - "Spring Boot"
      - "React"
      # ... todas las tecnologías usadas en este rol
```

**Reglas:**
- `startDate` y `endDate`: Formato "YYYY-MM" (ej: "2015-09" para septiembre 2015)
- `endDate`: Debe ser `null` si es el trabajo actual
- `current`: `true` solo para el trabajo actual
- `description.es` y `description.en`: Deben ser traducciones equivalentes
- `achievements`: Array de logros, cada uno con versión ES y EN
- `technologies`: Array de strings con nombres de tecnologías (siempre en inglés)

**Ejemplo completo:**
```yaml
jobs:
  - company: "Ericsson Guatemala"
    role: "Senior Software Engineer"
    location: "Guatemala City, Guatemala"
    startDate: "2015-09"
    endDate: "2026-02"
    current: false
    description:
      es: |
        Arquitecté e implementé soluciones end-to-end: backend de
        microservicios Java/Spring Boot con dashboards frontend React.
      en: |
        Architected and implemented end-to-end solutions: Java/Spring Boot
        microservices backend with React frontend dashboards.
    achievements:
      - es: "Lideré la migración a microservicios, mejorando escalabilidad en 40%."
        en: "Led migration to microservices, improving scalability by 40%."
      - es: "Implementé pipelines CI/CD, reduciendo incidentes en 30%."
        en: "Implemented CI/CD pipelines, reducing incidents by 30%."
    technologies:
      - "Java 8-17"
      - "Spring Boot"
      - "Spring Cloud"
      - "React"
      - "Angular"
      - "TypeScript"
      - "Kubernetes"
      - "Docker"
```

### projects.yaml

```yaml
# ============================================
# PROJECTS DATA - Proyectos destacados
# ============================================
projects:
  - name: "Nombre del Proyecto"
    company: "Empresa donde se realizó"
    period: "YYYY-YYYY"         # Rango de años
    description:
      es: |
        Descripción del proyecto en español. Debe explicar qué es
        el proyecto y su propósito principal.
      en: |
        Project description in English. Should explain what the
        project is and its main purpose.
    highlights:
      - es: "Logro destacado del proyecto en español."
        en: "Key highlight of the project in English."
      - es: "Otro logro importante..."
        en: "Another important highlight..."
    technologies:
      - "Tech1"
      - "Tech2"
      # ... tecnologías usadas en el proyecto
```

**Reglas:**
- `period`: Formato "YYYY-YYYY" (ej: "2018-2019")
- `description.es` y `description.en`: Deben ser traducciones equivalentes
- `highlights`: Array de logros destacados, cada uno con versión ES y EN
- `technologies`: Array de strings con nombres de tecnologías (siempre en inglés)

**Ejemplo completo:**
```yaml
projects:
  - name: "Network Configuration Management System"
    company: "Ericsson Guatemala"
    period: "2018-2019"
    description:
      es: |
        Sistema de gestión de configuración de red que monitorea millones
        de nodos de red simultáneamente.
      en: |
        Network configuration management system that monitors millions of
        network nodes simultaneously.
    highlights:
      - es: "Arquitectura de microservicios con Java/Spring Boot y Apache Camel."
        en: "Microservices architecture with Java/Spring Boot and Apache Camel."
      - es: "Dashboard en tiempo real con Angular 12 y TypeScript."
        en: "Real-time dashboard with Angular 12 and TypeScript."
      - es: "Reducción del 60% en tiempo de configuración manual."
        en: "60% reduction in manual configuration time."
    technologies:
      - "Java"
      - "Spring Boot"
      - "Angular"
      - "TypeScript"
      - "Apache Camel"
      - "Oracle"
      - "REST APIs"
```

### education.yaml

```yaml
# ============================================
# EDUCATION DATA - Educación formal
# ============================================
degrees:
  - title:
      es: "Título en español"
      en: "Title in English"
    institution: "Nombre de la universidad o institución"
    location: "Ciudad, País"
    status: "completed"         # "completed" o "in_progress"
    startDate: null             # Opcional: "YYYY-MM"
    endDate: null               # Opcional: "YYYY-MM"
```

**Reglas:**
- `title.es` y `title.en`: Deben ser traducciones equivalentes
- `status`: Solo dos valores permitidos: "completed" o "in_progress"
- `startDate` y `endDate`: Opcionales, formato "YYYY-MM" o `null`

**Ejemplo completo:**
```yaml
degrees:
  - title:
      es: "Licenciatura en Sistemas de Información y Ciencias de la Computación"
      en: "Bachelor of Science in Information Systems and Computer Science"
    institution: "Universidad de San Carlos de Guatemala"
    location: "Guatemala City, Guatemala"
    status: "in_progress"
    startDate: null
    endDate: null

  - title:
      es: "Bachiller en Ciencias y Letras"
      en: "Bachelor in Sciences and Letters"
    institution: "Colegio Italiano de Guatemala"
    location: "Guatemala City, Guatemala"
    status: "completed"
    startDate: null
    endDate: null
```

### translations.yaml

```yaml
# ============================================
# UI TRANSLATIONS - Textos de la interfaz
# ============================================
navigation:
  about:
    es: "Sobre mí"
    en: "About"
  skills:
    es: "Habilidades"
    en: "Skills"
  # ... más secciones

hero:
  cta:
    es: "Ver experiencia"
    en: "View experience"
  available:
    es: "Disponible para nuevos retos"
    en: "Available for new challenges"

# ... más textos de UI
```

**Reglas:**
- Este archivo contiene SOLO textos de la interfaz de usuario
- Los nombres de tecnologías y categorías NO van aquí
- Cada texto debe tener versiones `es` y `en`
- Generalmente no necesitas modificar este archivo a menos que cambies la estructura del portafolio

## 📓 Bitácora de cambios

**`BITACORA_CAMBIOS.md`** (raíz del repo) registra cada cambio hecho al proyecto y el contexto operativo (comandos de build/deploy, URLs, fuentes de verdad, pendientes abiertos).

- Léela **antes** de modificar cualquier cosa y añade tu entrada **después** de terminar.
- No borres entradas anteriores: es un historial de más reciente a más antiguo.
- Si tu cambio altera un flujo, un comando o cierra un pendiente, actualiza también las secciones *Contexto operativo* y *Estado conocido y pendientes*.

## 🚫 Reglas Importantes

### ✅ LO QUE SÍ DEBES HACER

1. **Leer el CV completo** antes de actualizar
2. **Mantener coherencia** entre los datos del CV y los archivos YAML
3. **Proporcionar traducciones** (ES/EN) para todos los textos descriptivos
4. **Usar inglés para tecnologías** (Java, Spring Boot, React, etc.)
5. **Validar el YAML** después de modificar (sintaxis correcta)
6. **Ejecutar `npm run build`** para verificar que no hay errores

### ❌ LO QUE NO DEBES HACER

1. **NO modificar componentes** en `src/components/`
2. **NO modificar layouts** en `src/layouts/`
3. **NO modificar páginas** en `src/pages/`
4. **NO cambiar la estructura** de los archivos YAML (solo los valores)
5. **NO traducir nombres de tecnologías** (siempre en inglés)
6. **NO agregar campos nuevos** a los YAML sin consultar

## 📋 Ejemplos de Cambios Comunes

### Agregar nueva experiencia laboral

1. Abrir `src/data/experience.yaml`
2. Agregar nuevo objeto al array `jobs`:
```yaml
  - company: "Nueva Empresa S.A."
    role: "Full Stack Developer"
    location: "Ciudad de México, México"
    startDate: "2023-01"
    endDate: null
    current: true
    description:
      es: "Descripción del rol en español..."
      en: "Role description in English..."
    achievements:
      - es: "Logro 1..."
        en: "Achievement 1..."
    technologies:
      - "React"
      - "Node.js"
      - "PostgreSQL"
```
3. Ejecutar `npm run build` para verificar

### Agregar nueva habilidad técnica

1. Abrir `src/data/skills.yaml`
2. Encontrar la categoría correspondiente
3. Agregar nuevo item al array `items`:
```yaml
      - name: "Nueva Tecnología"
        level: 80
```
4. Ejecutar `npm run build` para verificar

### Agregar nueva categoría de habilidades

1. Abrir `src/data/skills.yaml`
2. Agregar nuevo objeto al array `categories`:
```yaml
  - name: "Nueva Categoría"
    icon: "cloud"  # Usar icono disponible
    items:
      - name: "Tecnología 1"
        level: 75
      - name: "Tecnología 2"
        level: 85
```
3. Ejecutar `npm run build` para verificar

### Actualizar resumen profesional

1. Abrir `src/data/profile.yaml`
2. Modificar los campos `summary.es` y `summary.en`:
```yaml
summary:
  es: |
    Nuevo resumen en español...
  en: |
    New summary in English...
```
3. Ejecutar `npm run build` para verificar

## 🚀 Deploy a Producción

Después de actualizar los datos:

```bash
# 1. Construir el proyecto
npm run build

# 2. Verificar localmente (opcional)
npm run preview

# 3. Deploy a Vercel
vercel --prod
```

## ✅ Checklist de Validación

Antes de hacer commit, verificar:

- [ ] Todos los archivos YAML tienen sintaxis válida
- [ ] `npm run build` se ejecuta sin errores
- [ ] Las traducciones ES/EN son coherentes
- [ ] Las tecnologías están en inglés
- [ ] No se modificaron componentes, layouts o páginas
- [ ] La estructura de los YAML no cambió

## 📞 Soporte

Si encuentras problemas:
1. Revisa que la sintaxis YAML sea válida (usa https://yamlvalidator.com/)
2. Ejecuta `npm run build` y revisa los errores
3. Consulta el README.md principal del proyecto
