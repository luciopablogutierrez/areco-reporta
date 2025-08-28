# Documentación del Sistema: CiudadConecta

## 1. Introducción

### 1.1. Breve descripción del sistema
CiudadConecta es una plataforma web cívica diseñada para modernizar y transparentar la gestión de incidencias urbanas y rurales. Permite a los ciudadanos reportar problemas, visualizar su estado en un mapa interactivo y recibir actualizaciones, mientras que ofrece a la administración municipal herramientas para gestionar, analizar y comunicar eficientemente. La implementación actual para el municipio de San Antonio de Areco se denomina "ArecoReporta".

### 1.2. Objetivo principal
El objetivo es crear un canal de comunicación directo y eficiente entre los ciudadanos y el gobierno local para mejorar la calidad de los servicios públicos, optimizar los tiempos de respuesta y fomentar la participación ciudadana a través de la tecnología.

### 1.3. Alcance
El sistema actual incluye las siguientes capacidades:
- **Gestión de Incidencias:** Creación, visualización y seguimiento de reportes ciudadanos.
- **Mapa Interactivo:** Visualización geoespacial de incidencias y estado de caminos rurales con filtros dinámicos y leyenda.
- **Panel de Administración:** Métricas, gestión de reportes y herramientas de análisis de comunicaciones.
- **Módulo de Caminos Rurales:** Publicación y consulta del estado de transitabilidad de la red vial rural.
- **Módulo de Animales:** Registro de mascotas y gestión de alertas por animales perdidos.

---

## 2. Arquitectura General

El sistema está construido sobre una arquitectura moderna basada en componentes, utilizando Next.js para renderizado híbrido (servidor y cliente) y Genkit para las funcionalidades de Inteligencia Artificial.

### 2.1. Descripción de Componentes Principales
- **Frontend:** `Next.js` con `React` y `TypeScript`. Se utiliza el App Router para la gestión de rutas y Server Components para optimizar el rendimiento.
- **UI/UX:** `ShadCN` para los componentes de interfaz, estilizados con `Tailwind CSS`. Los iconos son de `Lucide-React`.
- **Mapas:** `Leaflet.js` para la renderización de mapas interactivos, con `react-leaflet` como adaptador para React.
- **Gestión de Estado (Cliente):** `Zustand` para un manejo de estado global ligero, utilizado para los filtros del mapa/reportes y para la gestión de mascotas registradas.
- **Inteligencia Artificial:** `Genkit` se utiliza para orquestar flujos de IA, como el análisis de relevancia de mensajes en el panel de administración.
- **Servidor:** El propio entorno de `Node.js` proporcionado por Next.js maneja las Server Actions para la comunicación segura con el backend sin necesidad de crear una API REST tradicional.

### 2.2. Diagrama de Arquitectura (Sugerido)
Un diagrama de alto nivel mostraría los siguientes componentes y flujos:

```
      +------------------+
      |      Usuario     |
      | (Navegador Web)  |
      +--------+---------+
               |
               v
+-----------------------------+       +------------------------------+
|     Frontend (Next.js)      |       |                              |
| - React Components (ShadCN) |------>|     Servidor (Next.js)     |
| - Mapas (Leaflet.js)        |       |  - Server Components         |
| - Estado (Zustand)          |       |  - Server Actions            |
+-----------------------------+       +--------------+---------------+
                                                     |
                                                     v
                                          +---------------------+
                                          |   Genkit (AI Flows)   |
                                          | - Gemini Pro (Google) |
                                          +---------------------+
```

---

## 3. Módulos del Sistema

### 3.1. Módulo: Mapa Interactivo (`/mapa`)
- **Descripción:** Es la vista principal de la aplicación. Muestra un mapa de San Antonio de Areco con todas las incidencias públicas y los caminos rurales.
- **Funcionalidades:**
    - Visualización de reportes como marcadores de colores según su categoría.
    - Renderización de caminos rurales coloreados según su estado y con patrones de línea para accesibilidad.
    - Pop-ups con información detallada al hacer clic en un reporte o camino.
    - Filtros dinámicos por estado, categoría, zona y término de búsqueda, sincronizados con la vista de "Mis Reportes".
    - Leyenda interactiva que explica la simbología del mapa.
- **Ejemplo de Uso:** Un transportista necesita saber si el "Camino a Vagues" está transitable. Abre el mapa, localiza el camino visualmente y ve que está coloreado de Verde. Hace clic sobre él para confirmar que no hay alertas y su última actualización fue reciente.

### 3.2. Módulo: Gestión de Incidencias (`/incidencias` y `/reportes`)
- **Descripción:** Permite a los ciudadanos crear y dar seguimiento a sus reportes.
- **Funcionalidades:**
    - Formulario de creación de incidencias con selección de ubicación en el mapa, previsualización de imágenes y botón de envío inteligente.
    - Listado de "Mis Reportes", donde el usuario puede ver el historial de sus incidencias con filtros persistentes.
    - Visualización del estado y la cronología de un reporte en un diálogo interactivo.
    - Votar (`upvote`) en reportes para indicar su relevancia.
- **Ejemplo de Uso:** Un ciudadano ve un bache. Abre la app, va a "Crear Incidencia", selecciona la ubicación, describe el problema, adjunta y previsualiza una foto. Al enviar, es redirigido a "Mis Reportes" donde ve su nueva incidencia al principio de la lista.

### 3.3. Módulo: Caminos Rurales (`/caminos-rurales`)
- **Descripción:** Implementa la Ordenanza de Transitabilidad Dinámica. Ofrece información centralizada sobre el estado de la red vial rural de forma responsiva.
- **Funcionalidades:**
    - Mapa y lista de caminos en una vista unificada y flexible.
    - En dispositivos móviles, el mapa se muestra en un panel deslizable (`Sheet`) al seleccionar un camino, mejorando la UX.
    - Lista detallada de todos los caminos con su estado, descripción y última actualización.
    - Widget con datos climáticos (simulados) y enlace al portal de transparencia.
- **Ejemplo de Uso:** Un productor agropecuario desde su celular entra a la sección, pulsa en un camino y el mapa aparece en un panel inferior mostrándole la traza y el estado sin salir de la lista.

### 3.4. Módulo: Panel de Administración (`/admin`)
- **Descripción:** Vista restringida para personal municipal. Ofrece herramientas para gestionar la plataforma.
- **Funcionalidades:**
    - Dashboard con estadísticas de reportes (total, resueltos) calculadas dinámicamente desde los datos simulados.
    - Gráfico de reportes por período.
    - Listado de los reportes más recientes.
    - Herramienta de IA para verificar si un mensaje es relevante para servicios municipales.
- **Ejemplo de Uso:** Un gestor municipal revisa el panel y ve que el número de reportes resueltos ha aumentado, lo cual se refleja en las tarjetas de estadísticas.

### 3.5. Módulo: Animales (`/animales`)
- **Descripción:** Permite a los ciudadanos registrar sus mascotas y reportarlas como perdidas.
- **Funcionalidades:**
    - Formulario para registrar una mascota (perro, gato, etc.) con sus detalles (nombre, raza, foto).
    - Listado de "Mis Animales" donde el usuario ve todas las mascotas que ha registrado.
    - Formulario para crear una "Alerta de Animal Perdido", donde el usuario selecciona una de sus mascotas registradas y añade detalles de la pérdida.
- **Ejemplo de Uso:** Un ciudadano registra a su perro "Fido". Semanas después, "Fido" se pierde. El ciudadano entra a la app, va a "Alerta Animal Perdido", selecciona a "Fido" de su lista de mascotas y completa la información para generar la alerta.

---

## 4. Flujos de Datos y Procesos

### 4.1. Flujo: Crear una Incidencia (Mejorado)
- **Paso 1 (Usuario):** Navega a `/incidencias/crear`.
- **Paso 2 (Usuario):** Rellena el formulario. El botón "Enviar" está deshabilitado hasta que los campos requeridos son válidos.
- **Paso 3 (Usuario):** Adjunta imágenes y ve una previsualización de las mismas, con opción a eliminarlas.
- **Paso 4 (Usuario):** Presiona "Enviar Incidencia".
- **Paso 5 (Sistema):** Los datos se empaquetan y se envían a un futuro endpoint.
- **Paso 6 (Sistema):** Se muestra una notificación (`Toast`) de éxito y se redirige al usuario a `/reportes` para que vea su nueva incidencia.

### 4.2. Flujo: Verificar Relevancia de Mensaje (Admin)
- **Diagrama de Flujo:**
  `Admin escribe mensaje -> Submit Form -> Server Action (checkRelevanceAction) -> Llama a Genkit Flow (checkMessageRelevanceFlow) -> Gemini analiza el texto -> Devuelve JSON {isRelevant, reason} -> Server Action procesa la respuesta -> El estado se actualiza en el cliente -> Se muestra la alerta de resultado`

---

## 5. APIs e Integraciones (Genkit)

### 5.1. `checkMessageRelevance`
- **Descripción:** Flow de Genkit que determina si un texto está relacionado con servicios municipales.
- **Ubicación:** `src/ai/flows/checkMessageRelevance.ts`
- **Endpoint (conceptual):** Se invoca a través de la Server Action `checkRelevanceAction` en `src/app/(dashboard)/admin/actions.ts`.
- **Parámetros de Entrada:**
  - `message` (string): El texto a analizar.
- **Respuesta de Salida:**
  - `isRelevant` (boolean): `true` si el mensaje es pertinente.
  - `reason` (string): Explicación en español sobre la decisión.

---

## 6. Casos de Uso

### 6.1. Caso 1: Ciudadano reporta una luminaria rota
  - **Paso 1:** El usuario abre la app y selecciona "Crear Incidencia".
  - **Paso 2:** En el mapa, hace clic en la esquina exacta donde se encuentra el poste de luz sin funcionar.
  - **Paso 3:** Selecciona la categoría "Alumbrado" y describe el problema.
  - **Paso 4:** Hace clic en "Enviar Incidencia" y es redirigido a "Mis Reportes", donde ve su nueva incidencia con estado "Pendiente".

### 6.2. Caso 2: Productor rural verifica un camino antes de salir
  - **Paso 1:** El usuario accede a la sección "Caminos Rurales".
  - **Paso 2:** En la lista de caminos, busca "Camino del Medio" y ve que está "Amarillo".
  - **Paso 3:** En el mapa, el camino se muestra con una línea de guiones amarilla. Hace clic y lee la descripción: "Calzada con barro. Circular a baja velocidad".
  - **Resultado esperado:** El usuario está informado de la restricción y puede tomar una decisión informada.

---

## 7. Manejo de Errores y Validaciones

- **Formulario Incompleto:** Se utiliza `zod` y `react-hook-form` para la validación del esquema. Los mensajes de error se muestran debajo de cada campo y el botón de envío se deshabilita si el formulario no es válido.
- **Fallo en el Flow de IA:** La llamada al modelo de Genkit está envuelta en un bloque `try/catch`. Si ocurre un error, la Server Action devuelve un mensaje de error genérico al cliente.

---

## 8. Buenas Prácticas

- **Modularidad de Componentes:** La UI está construida con componentes React pequeños y reutilizables.
- **Datos Simulados Centralizados:** Toda la información de ejemplo (`mock-data`, `mock-roads`) está aislada en la carpeta `src/lib`.
- **Uso de Server Actions:** Se utilizan para las mutaciones de datos y llamadas a la IA.
- **Estado Global Mínimo:** Se utiliza `Zustand` solo para el estado que es verdaderamente global (filtros del mapa, listado de mascotas), evitando complejidad.

---

## 9. Hoja de Ruta a Producción (Próximos Pasos)

Para que CiudadConecta (ArecoReporta) pase de ser un prototipo funcional a un sistema productivo robusto, es necesario abordar las siguientes áreas clave:

### 9.1. Integración con Backend y Base de Datos (Firebase)
- **Reemplazar Datos Simulados:** El paso más crítico es sustituir los archivos `mock-data.ts` y `mock-roads.ts` por una conexión a una base de datos real como **Firestore**.
  - **Colecciones sugeridas:** `reports`, `users`, `ruralRoads`, `municipalities`, `pets`.
- **Servicios de Backend:** Implementar `Server Actions` para todas las operaciones de escritura (crear/actualizar reportes, registrar usuarios, etc.) y lectura de datos desde Firestore.
- **Almacenamiento de Archivos:** Utilizar **Firebase Storage** para la subida de imágenes en los reportes de incidencias y en el registro de mascotas.

### 9.2. Autenticación de Usuarios
- **Implementar Firebase Authentication:** Configurar el sistema de inicio de sesión y registro utilizando proveedores como Email/Contraseña y Google.
- **Rutas Protegidas:** Asegurar que las secciones como "Mis Reportes" o "Panel de Administración" solo sean accesibles para usuarios autenticados.
- **Gestión de Roles:** Implementar un sistema de roles (`citizen`, `admin`) en la base de datos para gestionar los permisos, especialmente para el acceso al `/admin`.

### 9.3. Funcionalidad en Tiempo Real
- **Actualizaciones en el Mapa:** Utilizar los listeners en tiempo real de Firestore (`onSnapshot`) para que los reportes y los estados de los caminos rurales se actualicen en el mapa de todos los usuarios conectados sin necesidad de recargar la página.
- **Notificaciones Instantáneas:** Desarrollar el backend para enviar notificaciones push o por email (utilizando **Firebase Functions** y **Cloud Messaging**) cuando el estado de un reporte cambie o un usuario reciba un comentario.

---

## 10. Glosario

- **Server Action:** Una función de Next.js que se ejecuta de forma segura en el servidor, invocada desde un componente de cliente.
- **Flow (Genkit):** Una función orquestadora que define un proceso de IA.
- **ShadCN:** Una colección de componentes de UI reutilizables construidos sobre Radix UI y Tailwind CSS.
- **Zustand:** Un gestor de estado minimalista para React.
- **Transitabilidad:** Condición de un camino que determina si puede ser transitado por vehículos y bajo qué condiciones.

---

## 11. Referencias

- **Next.js:** [https://nextjs.org/docs](https://nextjs.org/docs)
- **Genkit:** [https://firebase.google.com/docs/genkit](https://firebase.google.com/docs/genkit)
- **ShadCN/UI:** [https://ui.shadcn.com/](https://ui.shadcn.com/)
- **Tailwind CSS:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Leaflet.js:** [https://leafletjs.com/reference.html](https://leafletjs.com/reference.html)
- **Firebase:** [https://firebase.google.com/docs](https://firebase.google.com/docs)
