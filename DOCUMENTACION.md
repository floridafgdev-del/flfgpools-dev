# Florida Fiberglass Pools — Documentación del proyecto

> Documentación técnica y operativa del sitio web de Florida Fiberglass Pools.
>
> **Última revisión:** 23 de septiembre de 2026  
> **Versión del proyecto:** `2.0.0`

## 1. Resumen

Florida Fiberglass Pools es un sitio web comercial para mostrar piscinas, spas y tanning ledges de fibra de vidrio en el sur de Florida. El sitio permite:

- Navegar por el catálogo de productos.
- Consultar el showroom, la historia de la empresa y recursos educativos.
- Cambiar el idioma entre inglés, español y portugués.
- Configurar una piscina mediante el flujo **Create by Yourself**.
- Solicitar una cotización mediante el formulario de contacto.
- Consultar preguntas frecuentes mediante un chatbot local basado en palabras clave.
- Generar metadatos SEO, datos estructurados, sitemap y robots.txt.
- Proteger los formularios con reCAPTCHA v2 cuando las claves están configuradas.
- Registrar conversiones de leads mediante Google Tag Manager y el evento `generate_lead`.
- Entregar leads por SMTP, webhook o fallback `mailto`, según la configuración disponible.

El proyecto no utiliza base de datos, sistema de autenticación ni CMS. El catálogo, el contenido del chatbot y gran parte de la información comercial viven en archivos TypeScript y JSON dentro del repositorio.

## 2. Stack tecnológico

| Tecnología | Versión / uso |
|---|---|
| Next.js | `14.2.5`, App Router |
| React / React DOM | `18.3.1` |
| TypeScript | `5.5.3`, modo estricto |
| next-intl | `4.0.0`, internacionalización |
| Tailwind CSS | `3.4.6`, estilos utilitarios |
| Framer Motion | `11.3.0`, animaciones y transiciones |
| Lucide React | `0.408.0`, iconos |
| Zod | `3.23.8`, validación de payloads |
| Nodemailer | `9.0.1`, entrega de leads por SMTP |
| Vitest | `2.x`, pruebas unitarias |
| Remark / remark-html | Procesamiento de contenido Markdown/HTML |
| Vercel / cPanel | Configuración de despliegue en Vercel y Passenger |

El proyecto usa alias de importación `@/*`, que apunta a la raíz del repositorio.

## 3. Requisitos

- Node.js compatible con Next.js 14.
- npm.
- Variables de entorno para email, reCAPTCHA, Google Tag Manager y URL pública, según el entorno.
- Para desarrollo visual, un navegador moderno.

## 4. Instalación y comandos

Instalar dependencias:

```bash
npm install
```

Comandos disponibles:

```bash
npm run dev       # Servidor de desarrollo en http://localhost:3010
npm run build     # Compilación de producción
npm start         # Servidor Next.js de producción
npm run lint      # ESLint / Next lint
npm test          # Pruebas Vitest
npx tsc --noEmit  # Comprobación de tipos
```

Flujo recomendado antes de publicar:

```bash
npm run lint && npx tsc --noEmit && npm test && npm run build
```

## 5. Estructura del repositorio

```text
.
├── app/                         # Rutas, páginas, API routes y estilos globales
│   ├── [locale]/                # Segmento de idioma obligatorio
│   │   ├── page.tsx             # Inicio
│   │   ├── about/               # Sobre la empresa
│   │   ├── blog/                # Blog / recursos editoriales
│   │   ├── contact/             # Contacto
│   │   ├── create-by-yourself/  # Configurador de piscina
│   │   ├── info/                # Recursos educativos
│   │   ├── products/            # Catálogo y detalle de productos
│   │   ├── showroom/            # Galería / showroom
│   │   ├── layout.tsx           # Layout localizado y metadata global
│   │   └── opengraph-image.tsx  # Imagen OG dinámica por idioma
│   ├── api/                     # Route Handlers
│   ├── global.css               # Estilos globales y clases visuales
│   ├── robots.ts                # robots.txt dinámico
│   └── sitemap.ts               # sitemap.xml dinámico
├── components/                  # Componentes reutilizables de UI
├── config/                     # Información comercial, SEO y estadísticas
├── i18n/                       # Configuración de next-intl y navegación
├── lib/                        # Datos, email, chatbot, schema y utilidades
├── messages/                   # Traducciones en/en, es y pt
├── public/                     # Imágenes, logos, modelos y recursos estáticos
├── middleware.ts               # Redirección al idioma por defecto
├── next.config.mjs             # Configuración de Next.js y headers
├── app.js                      # Entry point alternativo para cPanel/Passenger
├── tailwind.config.ts          # Tokens y configuración de Tailwind
├── vercel.json                 # Identificación del framework en Vercel
└── package.json                # Scripts y dependencias
```

`Archivo.zip`, `.next`, `node_modules`, `.vercel` y archivos `.env*` son artefactos locales o de despliegue; no forman parte del código de aplicación que debe editarse normalmente.

## 6. Rutas públicas

Todas las páginas públicas utilizan el formato `/{locale}/...`, donde `locale` puede ser `en`, `es` o `pt`.

| Ruta | Función |
|---|---|
| `/{locale}` | Página principal con hero, beneficios, estadísticas, productos destacados, reseñas, certificaciones y CTA |
| `/{locale}/about` | Historia, valores, estadísticas y certificaciones |
| `/{locale}/products` | Catálogo filtrable de piscinas, spas y tanning ledges |
| `/{locale}/products/pools/{poolId}` | Detalle de una piscina |
| `/{locale}/products/pools/size/{slug}` | Detalle de piscina por ruta de tamaño/slug |
| `/{locale}/products/spa/{spaId}` | Detalle de un spa |
| `/{locale}/products/spa/size/{slug}` | Detalle de spa por ruta de tamaño/slug |
| `/{locale}/showroom` | Galería y experiencia del showroom |
| `/{locale}/blog` | Contenido editorial / guía de piscinas |
| `/{locale}/contact` | Información de contacto y formulario de leads |
| `/{locale}/create-by-yourself` | Configurador paso a paso para solicitar cotización |
| `/{locale}/info/faqs` | Preguntas frecuentes con FAQ schema |
| `/{locale}/info/colors` | Colores disponibles |
| `/{locale}/info/fiberglass-concrete` | Comparativa entre fibra de vidrio y concreto |
| `/{locale}/info/pool-benefits` | Beneficios de piscinas de fibra de vidrio |
| `/{locale}/info/pool-pricing-guide` | Guía de precios y financiación |

### Observación de rutas

El sitemap contiene también la ruta `/{locale}/faq`, pero en el árbol actual existe la página `/{locale}/info/faqs`. Si ambas rutas deben existir, hay que crear un alias o corregir el sitemap; de lo contrario, conviene retirar `/faq` del arreglo `staticPages`.

## 7. Internacionalización

Idiomas configurados en `i18n/routing.ts`:

- `en`: inglés, idioma por defecto.
- `es`: español.
- `pt`: portugués.

Los archivos de traducción son:

```text
messages/en.json
messages/es.json
messages/pt.json
```

`i18n/request.ts` carga dinámicamente el JSON correspondiente a cada request. Si el idioma no existe, usa `en`.

`middleware.ts` redirige las URLs sin idioma:

- `/` → `/en`
- `/products` → `/en/products`
- `/contact` → `/en/contact`

El middleware no procesa rutas de API, archivos estáticos, `_next`, Vercel, favicon, robots, sitemap ni rutas que contengan extensión de archivo.

Para navegación localizada se utilizan `Link`, `useRouter`, `usePathname` y `redirect` exportados desde `i18n/navigation.ts`, con `localePrefix: 'always'`.

Al agregar una nueva página traducible:

1. Crear la página dentro de `app/[locale]/...`.
2. Agregar sus claves a los tres JSON de `messages/`.
3. Usar `useTranslations()` en componentes cliente o `getTranslations()`/mensajes apropiados en servidor.
4. Agregar la URL al sitemap si corresponde.
5. Verificar metadata, canonical y enlaces alternativos.

## 8. Catálogo y modelo de datos

El catálogo se define en `lib/pools.ts`.

### Tipos principales

- `ProductClass`: `pool`, `spa` o `ledge`.
- `PoolShape`: `rectangle`, `freeform` o `beach-entry`.
- `SizeCategory`: `upTo16`, `16to22`, `22plus`, `spa` o `ledge`.

Cada objeto `Pool` puede contener:

- `slug`, `name` y `modelCode`.
- Clase de producto, forma y categoría de tamaño.
- Largo, ancho, profundidad, área y volumen.
- Peso y precios inicial/promedio/máximo.
- Disponibilidad, popularidad, rating y cantidad de reseñas.
- Imágenes y modelos isométricos.
- Colores compatibles.
- Descripción y características en los tres idiomas.

También se mantienen en este módulo:

- `pools`: catálogo completo.
- `poolColors`: colores, muestras, imágenes de referencia y gradientes.
- `poolColorNames`.
- `getPoolBySlug()` y otras funciones de consulta.
- `getFeaturedPools()` para la página de inicio.

`lib/product-data.ts` ofrece funciones de acceso específicas para las páginas:

- `getPoolById()`.
- `getPoolDetailById()`.
- `getSpaById()`.
- `getAllPoolIds()`.
- `getAllSpaIds()`.
- `getAllLedgeIds()`.

El configurador utiliza el catálogo local para filtrar modelos compatibles según tipo y tamaño, y muestra un cálculo orientativo.

### Cálculo orientativo del configurador

El componente `components/create-by-yourself.tsx` calcula:

- Precio base: `selectedPool.priceInitial`.
- Cada extra: `+$2,400`.
- Acceso estrecho: `+$3,500`.
- Grúa probable: `+$6,500`.

El resultado es orientativo y se presenta en USD. No sustituye una cotización final.

## 9. Componentes principales

| Componente | Responsabilidad |
|---|---|
| `Header` | Navegación principal, menú móvil y selector de idioma |
| `Footer` | Enlaces, contacto, horario y navegación secundaria |
| `PoolCard` | Tarjeta reutilizable de producto |
| `Carousel` | Carruseles de imágenes/contenido |
| `ImageGallery` / `ImageGalleryTrigger` | Galería y apertura de imágenes |
| `Breadcrumbs` | Migas de navegación localizadas |
| `ContactForm` | Captura y envío de leads de contacto |
| `CreateByYourself` | Configurador de cuatro pasos y envío de lead |
| `FaqAccordion` | Acordeón de preguntas frecuentes |
| `ShowroomContent` | Galería/interacción del showroom |
| `ReviewsWidget` | Bloque de reseñas |
| `Certifications` | Certificaciones de la empresa |
| `Chatbot` | Interfaz del asistente de preguntas frecuentes |
| `GlassCard` | Contenedor visual reutilizable |
| `SvgFilters` | Filtros SVG globales |

Las animaciones de scroll y reveal viven en `lib/motion/scroll-components.tsx` y `lib/motion/use-scroll-reveal.ts`. Se respeta `prefers-reduced-motion` en los componentes que lo contemplan.

## 10. Formularios y entrega de leads

### 10.1 Formulario de contacto

Componente: `components/contact-form.tsx`  
Endpoint: `POST /api/contact`  
Lógica de email: `lib/contact-email.ts`

Campos aceptados:

| Campo | Requerido | Validación |
|---|---:|---|
| `role` | Sí | `homeowner`, `contractor`, `realtor`, `investor` |
| `name` | Sí | Mínimo 2 caracteres |
| `phone` | Sí | Mínimo 7 caracteres |
| `email` | Sí | Email válido |
| `address` | No | Texto; valor por defecto vacío |
| `zip` | No | Cinco dígitos si se envía |
| `message` | No | Máximo 4,000 caracteres |
| `locale` | No | `en`, `es`, `pt`; por defecto `en` |

El cliente valida además que el ZIP, si se utiliza, esté entre `33000` y `33499`. El campo ZIP está actualmente comentado en la UI, aunque el backend todavía lo soporta.

### 10.2 Create by Yourself

Componente: `components/create-by-yourself.tsx`  
Endpoint: `POST /api/create-by-yourself`  
Lógica de email: `lib/create-by-yourself-email.ts`

El flujo contiene cuatro pasos:

1. **Pool**: tipo y rango de tamaño.
2. **Finish**: modelo, color y extras.
3. **Site**: ciudad, ZIP, acceso al patio y cronograma.
4. **Contact**: tipo de cliente, nombre, teléfono, email y notas.

Campos principales:

- `poolType`: `pool`, `spa`, `tanning-ledge`.
- `size`: `upTo16`, `16to22`, `22plus`, `spa`, `ledge`.
- `model`, `color`, `extras`.
- `city` y ZIP de cinco dígitos.
- `backyardAccess`: `wide-open`, `standard-gate`, `tight-access`, `crane-needed`, `not-sure`.
- `timeline`: `asap`, `1-3-months`, `3-6-months`, `planning`.
- `role`, `name`, `phone`, `email`, `notes`, `locale`.

### 10.3 Respuestas de API

En caso de éxito:

```json
{
  "ok": true,
  "delivered": true
}
```

Si no hay SMTP ni webhook configurado, la API responde correctamente pero entrega un fallback `mailto`:

```json
{
  "ok": true,
  "delivered": false,
  "mailto": "mailto:..."
}
```

En caso de payload inválido o error de envío:

```json
{
  "ok": false,
  "error": "..."
}
```

El status HTTP utilizado para errores es `400`.

### 10.4 Transporte de email

`lib/mailer.ts` centraliza:

- Transporte SMTP con Nodemailer.
- Fallback opcional mediante webhook.
- Generación de HTML y texto plano.
- Escapado HTML de valores de usuario.
- Enlaces `tel:`, `mailto:` y Google Maps.
- Logo embebido como attachment inline con CID.
- `replyTo` apuntando al correo del cliente.

Prioridad de entrega:

1. Si existen `SMTP_HOST`, `SMTP_USER` y `SMTP_PASS`, se usa SMTP.
2. Si SMTP no está configurado y existe `LEADS_WEBHOOK_URL`, se hace un `POST` JSON al webhook.
3. Si no existe ninguno, se devuelve el fallback `mailto` para que el usuario pueda abrir su cliente de correo.

La configuración de `next.config.mjs` incluye el logo en el tracing de las rutas de API para que el attachment funcione en producción.

### 10.5 Variables de entorno

Crear `.env.local` localmente y configurar las mismas variables en el proveedor de producción. No incluir valores reales en documentación ni commits.

```dotenv
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=mailbox@example.com
SMTP_PASS=<app-password>
SMTP_FROM="Florida Fiberglass Pools <mailbox@example.com>"
LEADS_TO_EMAIL=sales@example.com
LEADS_CC_EMAIL=
LEADS_WEBHOOK_URL=
NEXT_PUBLIC_SITE_URL=https://flfgpools.com
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<public-site-key>
RECAPTCHA_SECRET_KEY=<server-secret-key>
NEXT_PUBLIC_GTM_ID=GTM-MQNJZRG
```

Notas:

- Para Google Workspace se recomienda una contraseña de aplicación con 2-Step Verification.
- `SMTP_FROM` debe ser el buzón autenticado o un alias verificado.
- `LEADS_CC_EMAIL` es opcional.
- `LEADS_WEBHOOK_URL` se utiliza únicamente cuando SMTP no está configurado.
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` habilita el widget visible de reCAPTCHA v2.
- `RECAPTCHA_SECRET_KEY` permite la verificación server-side; nunca debe exponerse al navegador.
- Si solo una de las claves de reCAPTCHA está configurada, la protección no queda correctamente habilitada.
- `NEXT_PUBLIC_GTM_ID` configura el contenedor de Google Tag Manager; si no se define, se utiliza `GTM-MQNJZRG`.
- Todos los archivos `.env*` están excluidos por `.gitignore`.

### 10.6 reCAPTCHA v2

Los formularios de Contact y Create by Yourself utilizan reCAPTCHA v2 tipo checkbox cuando `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` está configurada.

- El componente está en `components/recaptcha.tsx`.
- La verificación del token está en `lib/recaptcha.ts`.
- Las rutas `/api/contact` y `/api/create-by-yourself` verifican el token antes de enviar el lead.
- La IP de la solicitud se envía a Google cuando está disponible.
- Si no se configuran las claves, el desarrollo local continúa sin widget ni validación de reCAPTCHA.
- En producción se deben registrar el dominio real y los dominios de prueba autorizados en Google reCAPTCHA.

### 10.7 Google Tag Manager y conversiones

El layout localizado carga Google Tag Manager en todas las páginas mediante `@next/third-parties/google`. El contenedor actual es `GTM-MQNJZRG`, salvo que se sobrescriba con `NEXT_PUBLIC_GTM_ID`.

Después de una entrega exitosa de cualquiera de los formularios, `lib/analytics.ts` publica en `window.dataLayer`:

```js
{ event: 'generate_lead', form: 'contact' }
{ event: 'generate_lead', form: 'create-by-yourself' }
```

En GTM se deben crear los triggers y tags de GA4/Google Ads basados en el evento `generate_lead`. Las credenciales antiguas de Site Kit de WordPress no forman parte de esta integración y no deben copiarse al proyecto.

### 10.8 Prueba manual del endpoint

Con el servidor iniciado:

```bash
curl -s -X POST http://localhost:3010/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"role":"homeowner","name":"Test Lead","phone":"7865550100","email":"test@example.com","address":"123 Main St, Miami, FL 33189","message":"Test","locale":"es"}'
```

Con SMTP configurado se espera `ok: true` y `delivered: true`. Sin SMTP ni webhook, se espera `ok: true`, `delivered: false` y un `mailto`.

Para probar sin enviar a un buzón real, utilizar una cuenta temporal de Ethereal y configurar las variables SMTP para ese servicio.

### 10.9 Endpoint de previsualización

`GET /api/email-preview` genera HTML de ejemplo. Por defecto muestra el email de contacto; con `?form=cby` muestra el email de **Create by Yourself**.

Está pensado para revisión visual del diseño del email y no debe utilizarse como mecanismo de envío. Si se expone en producción, conviene restringirlo o eliminarlo del despliegue.

## 11. Chatbot

El chatbot es completamente local; no llama a un modelo externo ni necesita API key.

Archivos:

- `components/chatbot.tsx`: interfaz y estado de conversación.
- `lib/chatbot/knowledge-base.ts`: preguntas, keywords, respuestas y enlaces en `en`, `es` y `pt`.
- `lib/chatbot/matcher.ts`: detección de idioma y matching.
- `lib/chatbot/matcher.test.ts`: pruebas unitarias.

El matcher:

1. Normaliza acentos, mayúsculas y puntuación.
2. Tokeniza y elimina stopwords por idioma.
3. Detecta el idioma por palabras indicadoras; si no puede decidir, usa el idioma del sitio.
4. Calcula coincidencias de frases y tokens.
5. Permite coincidencias difusas mediante distancia de edición para algunos errores tipográficos.
6. Devuelve `matched`, `ambiguous` o `unmatched`.
7. Ofrece hasta tres candidatos cuando la consulta es ambigua.

Para agregar una respuesta:

1. Añadir un `KnowledgeEntry` en `knowledge-base.ts`.
2. Definir `id`, keywords y answer en los tres idiomas.
3. Añadir `link` localizado si corresponde.
4. Agregar o actualizar una prueba en `matcher.test.ts`.
5. Ejecutar `npm test`.

## 12. SEO, metadata y datos estructurados

La metadata global por idioma se construye en `app/[locale]/layout.tsx` usando el bloque `Meta` de los mensajes y valores de `config/site.ts`.

Incluye:

- `metadataBase` basado en `SITE_URL`.
- Títulos con template `| FLFG Pools`.
- Descripción y keywords.
- Favicon.
- Canonical localizada.
- Alternates `en-US`, `es-US`, `pt-BR` y `x-default`.
- Open Graph por idioma.
- Twitter metadata.
- Datos estructurados JSON-LD.

Schemas disponibles en `lib/schema/`:

- `local-business.ts`: negocio local.
- `website.ts`: sitio web.
- `product.ts`: producto/piscina.
- `faq.ts`: FAQ.
- `breadcrumb.ts`: breadcrumbs.
- `index.ts`: composición de schemas globales.

`app/sitemap.ts` genera URLs localizadas para páginas estáticas, piscinas y spas, incluyendo alternates por idioma. `app/robots.ts` permite rastreo público, bloquea `/api/` y apunta al sitemap.

`SITE_URL` se resuelve así:

1. `NEXT_PUBLIC_SITE_URL`, si existe.
2. `https://{VERCEL_URL}`, si está disponible.
3. `https://flfgpools.com` como valor por defecto.

## 13. Configuración visual

Tailwind está configurado en `tailwind.config.ts` con:

- Colores de marca `pool.deep`, `pool.aqua`, `pool.sand`, `pool.cream` y `pool.mist`.
- Tipografías basadas en variables de Inter y Playfair Display.
- Radios `glass`, `glass-sm` y `glass-lg`.
- Blur `glass` y `glass-lg`.
- Animaciones `shimmer` y `float`.

El layout carga desde Google Fonts:

- Inter para texto general.
- Playfair Display para títulos.
- DM Sans para algunos bloques de contenido.

Las clases y estilos compartidos, incluidos los patrones de glassmorphism, están en `app/global.css`.

## 14. Seguridad y configuración de Next.js

`next.config.mjs` configura:

- AVIF y WebP para `next/image`.
- Dominios remotos permitidos para imágenes.
- Optimización de imports para Lucide y Framer Motion.
- Inclusión del logo en el output tracing de los endpoints de email.
- Headers de seguridad globales:
  - Content Security Policy.
  - `X-Frame-Options: SAMEORIGIN`.
  - `X-Content-Type-Options: nosniff`.
  - `Referrer-Policy: strict-origin-when-cross-origin`.
  - `Permissions-Policy` sin cámara, micrófono ni geolocalización.

Buenas prácticas para mantener:

- No registrar contraseñas SMTP, tokens ni valores completos de leads.
- No mover variables privadas a variables `NEXT_PUBLIC_*`.
- Mantener la validación Zod en el servidor aunque exista validación en el cliente.
- Escapar cualquier valor de usuario antes de incorporarlo al HTML del email.
- Revisar el endpoint de previsualización antes de desplegarlo públicamente.

## 15. Información comercial centralizada

`config/site.ts` contiene:

- `SITE_URL`.
- Enlaces sociales, WhatsApp, teléfono, email y dirección.
- Horarios del showroom.
- Nombre legal y comercial.
- Año de fundación.
- Área de servicio.
- Tamaño del showroom.
- Descripción, keywords y configuración SEO.
- Coordenadas geográficas.
- Mapa de locales SEO.

`config/stats.ts` contiene los valores que se muestran como estadísticas:

- Piscinas vendidas.
- Estilos/combinaciones disponibles.
- Años de experiencia.
- Garantía estructural de por vida.

Si cambia un dato comercial, actualizar primero estos archivos y después revisar traducciones, chatbot, metadata y schemas para evitar mensajes inconsistentes.

## 16. Imágenes y recursos estáticos

Los recursos públicos viven en `public/` y se sirven desde la raíz de la URL. Las carpetas incluyen imágenes de:

- Header y logotipo.
- Home.
- About.
- Proyectos.
- Modelos y colores.
- Tobias / renders.
- Certificaciones.
- Showroom.

En código, una imagen de `public/foo/bar.webp` se referencia como `/foo/bar.webp`.

Para imágenes externas, el hostname debe estar incluido en `images.remotePatterns` dentro de `next.config.mjs`.

## 17. Despliegue

### Vercel

El repositorio contiene `vercel.json` con framework `nextjs`. Pasos generales:

1. Conectar el repositorio a Vercel.
2. Configurar las variables de entorno de producción.
3. Ejecutar el build de Next.js.
4. Verificar dominio, metadata, sitemap y endpoints de formularios.
5. Probar envío de leads con un destinatario controlado.

### cPanel / Passenger

`app.js` es el entry point para hosting cPanel con Phusion Passenger. Passenger proporciona la variable `PORT`; si no existe, la aplicación utiliza el puerto `3010`. El archivo carga las variables definidas por cPanel mediante `dotenv/config`, inicia Next.js y gestiona el apagado ordenado para `SIGTERM` y `SIGINT`.

#### Configuración inicial

1. Subir el repositorio al directorio configurado para la aplicación Node.js.
2. Instalar dependencias con `npm install`.
3. Generar la compilación de producción con `npm run build`.
4. Configurar Passenger para ejecutar `app.js`.
5. Configurar `NODE_ENV=production` y, si el proveedor lo requiere, `HOSTNAME=0.0.0.0`.
6. Configurar en cPanel todas las variables de entorno de producción, especialmente SMTP, reCAPTCHA, GTM y `NEXT_PUBLIC_SITE_URL`.
7. Reiniciar la aplicación y verificar el dominio.

#### Actualización desde Git en cPanel

Este es el procedimiento operativo para actualizar una instalación existente:

1. Abrir la **Terminal de cPanel** y entrar al directorio raíz de la aplicación. También es posible acceder por SSH si el hosting lo permite.
2. Si la aplicación todavía no tiene conexión con el repositorio, subir previamente la carpeta `.git` mediante el File Manager de cPanel al directorio raíz de la aplicación. La carpeta `.git` debe provenir del repositorio correcto y conservar su estructura interna para que Git pueda utilizar el `origin` configurado. Verificar que el repositorio no contenga secretos ni archivos sensibles en su historial.
3. Confirmar que no haya cambios locales que deban conservarse.
4. Descargar las referencias remotas:

   ```bash
   git fetch origin
   ```

5. Sincronizar el servidor exactamente con la rama principal:

   ```bash
   git reset --hard origin/main
   ```

   Este comando descarta cambios locales versionados en el servidor. No ejecutarlo si existen modificaciones locales que deban conservarse.

6. Instalar dependencias y crear el build de producción:

   ```bash
   npm install
   npm run build
   ```

7. Exportar o preparar manualmente la carpeta `.next` generada.
8. Abrir **cPanel → File Manager** y subir/copiar manualmente `.next` al directorio raíz configurado para la aplicación, reemplazando la versión anterior cuando corresponda.
9. No reemplazar ni publicar `.env`, `.env.local` ni las variables privadas del panel. Los secretos deben permanecer configurados en cPanel.
10. Abrir el administrador de aplicaciones Node.js de cPanel y reiniciar el servicio Node.js/Passenger.
11. Verificar que el servicio esté ejecutándose en modo producción y revisar los logs si no inicia.

#### Verificación posterior

- Abrir `/en`, `/es` y `/pt`.
- Confirmar que `_next/static` y las imágenes carguen correctamente.
- Probar el formulario de contacto y Create by Yourself.
- Confirmar el evento `generate_lead` en el dataLayer/GTM.
- Verificar `/sitemap.xml`, `/robots.txt` y las metadata localizadas.
- Comprobar que el servicio siga activo después de un reinicio del proceso.

> Importante: `.next` es un artefacto generado. Si se compila en otro equipo, debe corresponder al mismo código, dependencias y entorno de producción del servidor. No subir secretos dentro de la carpeta del proyecto ni incluirlos en el repositorio.

## 18. Pruebas y verificación

La prueba automatizada localizada actualmente está en:

```text
lib/chatbot/matcher.test.ts
```

Antes de un cambio relevante ejecutar:

```bash
npm test
npx tsc --noEmit
npm run lint
npm run build
```

Pruebas manuales recomendadas:

- Abrir `/`, `/es` y `/pt`.
- Confirmar redirección de `/` a `/en`.
- Cambiar de idioma desde el header.
- Filtrar productos y abrir una ficha de piscina y una de spa.
- Completar el formulario de contacto con datos válidos e inválidos.
- Completar los cuatro pasos de Create by Yourself.
- Verificar el fallback `mailto` sin SMTP.
- Verificar el envío con una cuenta de prueba.
- Abrir `/api/email-preview` y `/api/email-preview?form=cby` durante revisión visual.
- Revisar `/sitemap.xml` y `/robots.txt`.
- Comprobar que los metadatos y JSON-LD cambian por idioma.
- Probar el chatbot en los tres idiomas y con consultas ambiguas.

## 19. Mantenimiento y extensión

### Nueva página

- Crear el segmento en `app/[locale]/`.
- Definir contenido traducido.
- Añadir metadata localizada.
- Añadir breadcrumbs si corresponde.
- Añadir schema si la página lo necesita.
- Añadir al sitemap.
- Verificar enlaces desde navegación, footer o páginas relacionadas.

### Nuevo producto

- Agregar el objeto a `lib/pools.ts`.
- Añadir imágenes a `public/`.
- Confirmar slug único.
- Completar descripciones y features en `en`, `es` y `pt`.
- Confirmar `productClass`, dimensiones, precios y colores.
- Revisar tarjetas, detalle, configurador y sitemap.

### Nuevo idioma

- Actualizar `locales` y `defaultLocale` según corresponda.
- Crear el JSON de mensajes.
- Añadir locale en `SEO_CONFIG.localeMap`.
- Revisar `lib/utils.ts`, chatbot, schemas y metadata.
- Ajustar alternates, middleware y sitemap.
- Traducir todos los campos del catálogo y formularios.

### Cambios en formularios

Actualizar siempre en conjunto:

1. UI del componente cliente.
2. Tipo/estado del formulario.
3. Schema Zod del servidor.
4. Builder de email.
5. Texto HTML y texto plano.
6. Traducciones.
7. Pruebas y verificación manual.

## 20. Limitaciones y puntos a revisar

- El contenido es estático; para editar productos o páginas hay que modificar el repositorio.
- La entrega de leads depende de SMTP o webhook correctamente configurado.
- El sitemap incluye una referencia a `/faq` que no corresponde exactamente a la página existente `/info/faqs`.
- El endpoint de previsualización de emails no tiene autenticación visible y debe revisarse antes de producción.
- El ZIP del formulario de contacto está soportado por el backend, pero el control está comentado en la UI.
- Algunos textos comerciales se mantienen tanto en traducciones como en el chatbot y pueden desincronizarse si se actualiza solo una fuente.
- El build utiliza renderizado dinámico en varias páginas (`force-dynamic`); cualquier optimización de caché debe probarse con cuidado.

## 21. Contacto comercial configurado

La información pública actual está centralizada en `config/site.ts`. Para modificarla, no cambiar componentes aislados sin revisar también:

- Header y footer.
- Página de contacto.
- Chatbot.
- JSON-LD de negocio local.
- Emails de leads.
- Metadata SEO.
- Sitemap y enlaces de Google Maps.

## 22. Checklist de publicación

- [ ] `npm install` completado.
- [ ] Variables de entorno configuradas sin exponer secretos.
- [ ] `npm test` sin fallos.
- [ ] `npx tsc --noEmit` sin errores.
- [ ] `npm run lint` sin errores.
- [ ] `npm run build` completado.
- [ ] Formularios probados con payload válido e inválido.
- [ ] reCAPTCHA probado en ambos formularios cuando las claves están configuradas.
- [ ] SMTP/webhook probado con un destinatario controlado.
- [ ] Fallback `mailto` verificado.
- [ ] Evento `generate_lead` verificado en el dataLayer/GTM.
- [ ] Las tres versiones lingüísticas revisadas.
- [ ] Sitemap y robots accesibles.
- [ ] Canonical, Open Graph y JSON-LD revisados.
- [ ] Imágenes remotas autorizadas en Next.js.
- [ ] Endpoint de preview de email restringido o confirmado como aceptable.
- [ ] En cPanel se ejecutó `git fetch origin` y `git reset --hard origin/main` después de confirmar que no había cambios locales.
- [ ] La carpeta `.next` fue exportada/subida manualmente mediante File Manager.
- [ ] El servicio Node.js/Passenger fue reiniciado y responde correctamente.
- [ ] No existen secretos, `.env` ni credenciales en el commit.
