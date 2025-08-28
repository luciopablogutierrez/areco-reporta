# Documentación del Sistema: CiudadConecta

## 1. Introducción

### 1.1. Breve descripción del sistema
CiudadConecta es una plataforma web cívica diseñada para modernizar y transparentar la gestión de incidencias urbanas y rurales. Permite a los ciudadanos reportar problemas, visualizar su estado en un mapa interactivo y recibir actualizaciones, mientras que ofrece a la administración municipal herramientas para gestionar, analizar y comunicar eficientemente. La implementación actual para el municipio de San Antonio de Areco se denomina "ArecoReporta".

### 1.2. Objetivo principal
El objetivo es crear un canal de comunicación directo y eficiente entre los ciudadanos y el gobierno local para mejorar la calidad de los servicios públicos, optimizar los tiempos de respuesta y fomentar la participación ciudadana a través de la tecnología.

### 1.3. Alcance
El sistema actual incluye las siguientes capacidades:
- **Gestión de Incidencias:** Creación, visualización y seguimiento de reportes ciudadanos.
- **Mapa Interactivo:** Visualización geoespacial de incidencias y estado de caminos rurales con filtros dinámicos.
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
- **Gestión de Estado (Cliente):** `Zustand` para un manejo de estado global ligero, principalmente para los filtros del mapa y reportes.
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
    - Renderización de caminos rurales coloreados según su estado (Verde, Amarillo, Rojo).
    - Pop-ups con información detallada al hacer clic en un reporte o camino.
    - Filtros dinámicos por estado, categoría, zona de la incidencia y término de búsqueda.
- **Ejemplo de Uso:** Un transportista necesita saber si el "Camino a Vagues" está transitable. Abre el mapa, localiza el camino visualmente y ve que está coloreado de Verde. Hace clic sobre él para confirmar que no hay alertas y su última actualización fue reciente.

### 3.2. Módulo: Gestión de Incidencias (`/incidencias` y `/reportes`)
- **Descripción:** Permite a los ciudadanos crear y dar seguimiento a sus reportes.
- **Funcionalidades:**
    - Formulario de creación de incidencias con selección de ubicación en el mapa, descripción y carga de imágenes.
    - Listado de "Mis Reportes", donde el usuario puede ver el historial de sus incidencias.
    - Visualización del estado y la cronología de un reporte.
    - Votar (`upvote`) en reportes para indicar su relevancia.
- **Ejemplo de Uso:** Un ciudadano ve un bache. Abre la app, va a "Crear Incidencia", selecciona la ubicación exacta en el mapa, describe el problema ("Bache grande después de la esquina"), adjunta una foto y envía el reporte.

### 3.3. Módulo: Caminos Rurales (`/caminos-rurales`)
- **Descripción:** Implementa la Ordenanza de Transitabilidad Dinámica. Ofrece información centralizada sobre el estado de la red vial rural.
- **Funcionalidades:**
    - Mapa centrado en la red vial.
    - Lista detallada de todos los caminos con su estado, descripción y última actualización.
    - Resumen de estados (widget de transparencia).
    - Widget con datos climáticos (simulados) y enlace al portal de transparencia.
    - Funcionalidad de "suscripción" (simulada con un toast) para recibir alertas.
- **Ejemplo de Uso:** Un productor agropecuario planea mover maquinaria. Entra a la sección "Caminos Rurales", ve que su camino de interés está "Amarillo", lee la descripción que indica "Precaución, maquinaria trabajando", y decide tomar una ruta alternativa.

### 3.4. Módulo: Panel de Administración (`/admin`)
- **Descripción:** Vista restringida para personal municipal. Ofrece herramientas para gestionar la plataforma.
- **Funcionalidades:**
    - Dashboard con estadísticas de reportes (total, resueltos, tiempo de respuesta).
    - Gráfico de reportes por período.
    - Listado de reportes recientes.
    - Herramienta de IA para verificar si un mensaje es relevante para servicios municipales.
- **Ejemplo de Uso:** Un gestor municipal necesita enviar un comunicado. Usa el "Verificador de Mensajes IA" para analizar el texto "El festival de música se reprograma por lluvia". La IA le informa que el mensaje no es relevante a servicios municipales, sugiriendo que use otro canal de comunicación.

---

## 4. Flujos de Datos y Procesos

### 4.1. Flujo: Crear una Incidencia
- **Paso 1 (Usuario):** Navega a `/incidencias/crear`.
- **Paso 2 (Usuario):** Rellena el formulario: busca una dirección o hace clic en el mapa. La ubicación seleccionada se guarda en el estado del componente.
- **Paso 3 (Sistema):** El mapa verifica si la coordenada seleccionada coincide con un camino rural con restricciones. Si es así, muestra una alerta (`Alert`).
- **Paso 4 (Usuario):** Completa la descripción, categoría y adjunta imágenes.
- **Paso 5 (Usuario):** Presiona "Enviar Incidencia".
- **Paso 6 (Sistema):** Los datos se empaquetan y se envían a un futuro endpoint (actualmente no implementado) que los guardaría en la base de datos.
- **Paso 7 (Sistema):** Se muestra una notificación (`Toast`) de éxito y se redirige al usuario a la página de "Mis Reportes".

### 4.2. Flujo: Verificar Relevancia de Mensaje (Admin)
- **Diagrama de Flujo (Sugerido):**
  `Admin escribe mensaje -> Submit Form -> Server Action (checkRelevanceAction) -> Llama a Genkit Flow (checkMessageRelevanceFlow) -> Gemini analiza el texto -> Devuelve JSON {isRelevant, reason} -> Server Action procesa la respuesta -> El estado se actualiza en el cliente -> Se muestra la alerta de resultado`
- **Ejemplo Práctico:**
  - **Entrada:** El administrador introduce: "Recuerden que mañana no habrá recolección de residuos en la zona céntrica por el feriado."
  - **Proceso:** La `Server Action` envía este texto al `Flow` de Genkit. El prompt de Genkit está diseñado para pedirle al modelo LLM (Gemini) que evalúe si el texto se relaciona con servicios municipales.
  - **Salida:** El LLM devuelve `{"isRelevant": true, "reason": "El mensaje se refiere directamente a la recolección de residuos, un servicio municipal clave."}`.
  - **Resultado:** La interfaz muestra una alerta verde indicando que el mensaje es relevante y la razón proporcionada por la IA.

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
- **Ejemplo de `request/response` (a nivel de Flow):**
  ```typescript
  // Request al Flow
  await checkMessageRelevance("Hay un corte de luz programado para el barrio norte.");

  // Response del Flow
  {
    isRelevant: true,
    reason: "El mensaje informa sobre un corte de luz, lo cual afecta un servicio público esencial."
  }
  ```

---

## 6. Casos de Uso

### 6.1. Caso 1: Ciudadano reporta una luminaria rota
  - **Paso 1:** El usuario abre la app y selecciona "Crear Incidencia".
  - **Paso 2:** En el mapa, hace clic en la esquina exacta donde se encuentra el poste de luz sin funcionar.
  - **Paso 3:** Selecciona la categoría "Alumbrado".
  - **Paso 4:** En la descripción, escribe: "La luz de este poste parpadea y se apaga constantemente. Lleva así 3 noches."
  - **Paso 5:** Hace clic en "Enviar Incidencia".
  - **Resultado esperado:** El sistema confirma la recepción del reporte. El usuario es redirigido a "Mis Reportes", donde ve su nueva incidencia con estado "Pendiente".

### 6.2. Caso 2: Productor rural verifica un camino antes de salir
  - **Paso 1:** El usuario accede a la sección "Caminos Rurales" desde el menú lateral.
  - **Paso 2:** En la lista de caminos, busca "Camino del Medio". Ve que el indicador de estado es "Amarillo".
  - **Paso 3:** Hace clic en ese camino en la lista. El mapa se centra automáticamente en el trazado del camino.
  - **Paso 4:** En el pop-up del mapa, lee la descripción: "Calzada con barro. Circular a baja velocidad. Restringido a 10t."
  - **Resultado esperado:** El usuario está informado de la restricción y puede tomar una decisión informada, evitando dañar el camino o su vehículo.

---

## 7. Manejo de Errores y Validaciones

### 7.1. Errores Comunes
- **Formulario de Incidencia Incompleto:** Los campos obligatorios como ubicación, categoría y descripción no se rellenan.
  - **Solución:** El formulario utiliza `zod` para la validación del esquema. Si un campo no es válido, se muestra un mensaje de error específico debajo del campo correspondiente.
- **Búsqueda de Dirección sin Resultados (Nominatim):** El servicio de geocodificación no encuentra la dirección.
  - **Solución:** La UI muestra una lista vacía. No se muestra un error explícito para no ser intrusivo, pero el usuario no puede seleccionar ninguna opción.
- **Fallo en el Flow de IA:** La llamada al modelo de Genkit falla por problemas de red o de la API.
  - **Solución:** El `flow` de IA está envuelto en un bloque `try/catch`. Si ocurre un error, la Server Action devuelve un mensaje de error genérico al cliente, como "Error al procesar el mensaje con la IA.", que se muestra en la interfaz.

---

## 8. Buenas Prácticas

- **Modularidad de Componentes:** La UI está construida con componentes React pequeños y reutilizables (ej. `ReportCard`, `RuralRoadsList`). Esto facilita el mantenimiento y las pruebas.
- **Datos Simulados Centralizados:** Toda la información de ejemplo (`mock-data`, `mock-roads`) está aislada en la carpeta `src/lib`, lo que facilitará su reemplazo por una conexión a base de datos real.
- **Uso de Server Actions:** Para las mutaciones de datos y llamadas a la IA, se utilizan Server Actions en lugar de crear rutas de API manuales. Esto simplifica el código y mejora la seguridad.
- **Estado Global Mínimo:** Se utiliza `Zustand` solo para el estado que es verdaderamente global (filtros del mapa). El resto del estado se maneja localmente en los componentes para evitar complejidad.

---

## 9. Glosario

- **Server Action:** Una función de Next.js que se ejecuta de forma segura en el servidor, invocada desde un componente de cliente.
- **Flow (Genkit):** Una función orquestadora que define un proceso de IA, como una cadena de prompts o la llamada a una herramienta.
- **ShadCN:** Una colección de componentes de UI reutilizables construidos sobre Radix UI y Tailwind CSS, no una librería de componentes tradicional.
- **Zustand:** Un gestor de estado minimalista para React.
- **Transitabilidad:** Condición de un camino que determina si puede ser transitado por vehículos y bajo qué condiciones.

---

## 10. Referencias

- **Next.js:** [https://nextjs.org/docs](https://nextjs.org/docs)
- **Genkit:** [https://firebase.google.com/docs/genkit](https://firebase.google.com/docs/genkit)
- **ShadCN/UI:** [https://ui.shadcn.com/](https://ui.shadcn.com/)
- **Tailwind CSS:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Leaflet.js:** [https://leafletjs.com/reference.html](https://leafletjs.com/reference.html)
