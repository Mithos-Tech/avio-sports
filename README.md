# AVIO Sports | Movilidad Eléctrica de Alto Rendimiento (2026)

![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-Framer_v12-black?logo=framer&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)
![Vercel Ready](https://img.shields.io/badge/Deploy-Vercel_Ready-000000?logo=vercel&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green.svg)

**AVIO Sports** es una plataforma web cinematográfica de alta gama inspirada en la estética minimalista de **Framer**, concebida para exhibir la nueva era de la movilidad eléctrica de lujo e hiperdeportivos sostenibles. Diseñada con un enfoque de cero compromiso visual, incorpora capas de profundidad 3D, navegación reactiva por físicas de resorte, tarjetas apiladas (*stacking cards*) y microinteracciones de nivel editorial.

---

## 💎 Créditos y Dirección de Arte

* **Dirección de Arte y Diseño UI/UX**: **[Inspyrio Studio](https://inspyrio.com)**
* **Desarrollo Frontend**: Arquitectura SPA moderna en React 19 + TypeScript + Tailwind CSS 4.
* **Activos Multimedia & CDN**: [Cloudinary](https://cloudinary.com/) (imágenes optimizadas `f_auto,q_auto`).
* **Tipografías**: [Google Fonts](https://fonts.google.com/) (*Syncopate* para titulares de impacto y *Space Grotesk* para datos y lectura técnica).
* **Iconografía**: [Lucide React](https://lucide.dev/).

---

## 🌐 Páginas y Arquitectura de la Experiencia

| Página / Sección | Ruta / Hash | Descripción |
| :--- | :--- | :--- |
| **Inicio (Home)** | `#home` | Hero cinematográfico con auto emergente, especificaciones técnicas y llamadas a la acción dinámicas. |
| **Catálogo de Modelos** | `#catalog` | Showcase multidimensional con física continua en Desktop (`useSpring`) y carrusel táctil con snap en Móvil (`Neon GT`, `Zenith S`, `Orion X`, `Pulsar R`, `Lumina E`, `Titan V`). |
| **Experiencia de Conducción** | `#experience` | Inmersión en el habitáculo tecnológico y ergonomía de competición. |
| **Avio Insights (Journal)** | `#blog` | Noticias y análisis técnicos con layout interactivo de 2 columnas en Desktop y acordeón optimizado en Móvil. |
| **Servicios AVIO** | `#services` | Tarjetas apiladas dinámicas (*Sticky Stacking Cards*) con degradado `#2484BF` – `#1F547D` (Financiación, Vende tu Coche, Alquiler Premium, Servicio Técnico) y planes de suscripción concierge. |
| **Nosotros (About)** | `#about` | Hero tridimensional con capas de profundidad (el deportivo roza la base del título *MOVIMIENTO*), cronología histórica de hitos y presentación del equipo visionario. |
| **Centro Legal & Cumplimiento** | `#legal` | Portal legal con motor de búsqueda en tiempo real, pestañas dedicadas a Términos (`#legal/terms`), Privacidad GDPR (`#legal/privacy`), Normativa IA 2026 (`#legal/ai`) y ejercicio de derechos ARCO+. |

---

## 🛡️ Seguridad, Privacidad y Rendimiento

* **Zero Backend Oculto / Zero Telemetría Invasiva**: El cliente se ejecuta de manera 100% autónoma en el navegador. No almacena cookies de terceros ni realiza llamadas a APIs no declaradas.
* **Cabeceras HTTP de Protección (`vercel.json`)**:
  * `X-Content-Type-Options: nosniff`
  * `X-XSS-Protection: 1; mode=block`
  * `Referrer-Policy: strict-origin-when-cross-origin`
  * `Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()`
  * Caché inmutable para activos estáticos (`max-age=31536000`).
* **Conformidad Legal 2026**:
  * Reglamento Europeo de Inteligencia Artificial (**EU AI Act 2024/1689**).
  * Estándar de Ciberseguridad Vehicular **ISO/SAE 21434**.
  * Reglamento General de Protección de Datos (**GDPR / LOPD-GDD**).

---

## 🔍 SEO y Social Share Cards

* **OpenGraph & Twitter Card**: Previsualizaciones enriquecidas para compartir en Slack, WhatsApp, X (Twitter), LinkedIn y Facebook con tarjetas a 1200x630px.
* **Datos Estructurados Schema.org (JSON-LD)**: Marcado canónico de Organización y Sitio Web para indexación en motores de búsqueda.
* **Archivos Canónicos**: `robots.txt` y `sitemap.xml` integrados en el directorio `public/`.

---

## 🚀 Despliegue en Vercel (Producción 2026)

Este proyecto está completamente configurado para desplegarse en **Vercel** en un solo clic:

1. **Subir a GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: release AVIO Sports 2026"
   git branch -M main
   git remote add origin https://github.com/tu-usuario/avio-sports.git
   git push -u origin main
   ```

2. **Importar en Vercel**:
   - Entra en [vercel.com/new](https://vercel.com/new).
   - Conecta tu cuenta de GitHub y selecciona el repositorio `avio-sports`.
   - Vercel detectará automáticamente **Vite** como framework preset:
     - **Build Command**: `npm run build`
     - **Output Directory**: `dist`
     - **Install Command**: `npm install`
   - Haz clic en **Deploy**.

3. **Sin Variables de Entorno Obligatorias**:
   La demo funciona de inmediato para el usuario final sin requerir backend o variables de entorno complejas.

---

## 🛠️ Ejecución Local

1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Iniciar servidor de desarrollo en puerto 3000:
   ```bash
   npm run dev
   ```
3. Comprobar tipos y sintaxis:
   ```bash
   npm run lint
   ```
4. Generar build de producción:
   ```bash
   npm run build
   ```

---

© 2026 AVIO® Automobili. Diseñado por **Inspyrio Studio**. Todos los derechos reservados.
