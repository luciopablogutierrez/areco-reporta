# Sugerencias de Mejora UX/UI para CiudadConecta (ArecoReporta)

Este documento identifica oportunidades para refinar la interfaz y la experiencia de usuario de la aplicación, con el objetivo de hacerla más intuitiva, accesible y eficiente para todos los ciudadanos.

---

### **Mejora 1: Claridad y Feedback en el Flujo de Creación de Incidencias**

#### **1. Problema identificado**
El formulario de creación de reportes es la interacción más crítica. Actualmente, tras enviar un reporte, el usuario solo recibe una notificación temporal (toast) y permanece en la misma página. Esto puede generar incertidumbre: *¿Se envió correctamente? ¿Dónde lo puedo ver ahora?* Además, la carga de imágenes no ofrece previsualización.

#### **2. Propuesta de mejora**
1.  **Redirección Post-Envío:** Tras un envío exitoso, redirigir automáticamente al usuario a la página "Mis Reportes".
2.  **Previsualización de Imágenes:** Permitir al usuario ver las imágenes que ha seleccionado antes de enviarlas, con la opción de eliminarlas individualmente.
3.  **Botón de Envío Inteligente:** Deshabilitar el botón "Enviar Incidencia" hasta que los campos obligatorios (ubicación, categoría, descripción) estén completos para prevenir errores.

#### **3. Ejemplo práctico**
- **Antes:** Usuario hace clic en "Enviar", ve un toast y se queda en el formulario vacío.
- **Después:** Usuario hace clic en "Enviar", es llevado a `/reportes` y ve su nuevo reporte al inicio de la lista, quizás con un sutil efecto de resaltado que se desvanece.
- **En el formulario:** Debajo del área de carga de fotos, se mostrarían miniaturas de las imágenes seleccionadas, cada una con un ícono de papelera para eliminarla.

#### **4. Beneficio para el usuario**
- **Confianza y Certeza:** El usuario ve inmediatamente el resultado de su acción, confirmando que el reporte fue creado y está en el sistema.
- **Reducción de Errores:** Se evitan envíos de formularios incompletos y se da al usuario control total sobre los archivos adjuntos.
- **Menos Clics:** El usuario no tiene que navegar manualmente para verificar su reporte.

#### **5. Prioridad**
**Alta.** Mejora directamente el flujo de trabajo principal de la aplicación y la percepción de fiabilidad del sistema.

---

### **Mejora 2: Contextualización y Simplificación en la Navegación y Filtros**

#### **1. Problema identificado**
El usuario tiene que aplicar los mismos filtros en dos lugares distintos: en la página del Mapa y en la de "Mis Reportes". Esto es repetitivo y puede llevar a inconsistencias si el usuario olvida qué filtros aplicó en cada sección.

#### **2. Propuesta de mejora**
Unificar el estado de los filtros para que sean globales en toda la aplicación. Si un usuario filtra por "Baches" en el mapa, al navegar a "Mis Reportes", este filtro debería persistir.

#### **3. Ejemplo práctico**
- **Antes:** Usuario filtra por "Alumbrado" en `/mapa`. Luego va a `/reportes` y tiene que volver a seleccionar el filtro "Alumbrado".
- **Después:** Usuario filtra por "Alumbrado" en `/mapa`. Al navegar a `/reportes`, la lista ya está filtrada por "Alumbrado" y se muestra un badge de filtro activo "Alumbrado [x]".

#### **4. Beneficio para el usuario**
- **Experiencia Fluida:** Se crea una sensación de coherencia y continuidad. La aplicación "recuerda" la intención del usuario.
- **Ahorro de Tiempo y Esfuerzo:** Se elimina la necesidad de realizar la misma acción varias veces.
- **Claridad Mental:** El usuario mantiene un único contexto de filtrado mientras navega, reduciendo la carga cognitiva.

#### **5. Prioridad**
**Alta.** Impacta directamente en la eficiencia de navegación entre las dos vistas más importantes.

---

### **Mejora 3: Onboarding y Guía para Nuevos Usuarios**

#### **1. Problema identificado**
La aplicación asume que el usuario entenderá inmediatamente todas sus funcionalidades. Un nuevo usuario podría no descubrir la utilidad de los filtros, la sección de caminos rurales o cómo interpretar los estados de un reporte.

#### **2. Propuesta de mejora**
1.  **Tooltips Guiados:** En la primera visita a secciones clave (Mapa, Reportes), mostrar pequeños tooltips o pop-ups que señalen las funcionalidades principales (ej: "Usa estos filtros para acotar tu búsqueda").
2.  **Estados Vacíos Ilustrativos:** En secciones como "Mis Reportes" o "Notificaciones", si están vacías, mostrar un mensaje útil con una ilustración amigable y un llamado a la acción claro (ej: "Aún no has creado reportes. ¡Anímate a crear el primero!" con un botón que lleve al formulario).
3.  **Leyenda Interactiva en el Mapa:** Añadir un pequeño botón de "Leyenda" en el mapa que, al pulsarlo, explique qué significa cada color de pin de reporte y cada color de trazado de camino.

#### **3. Ejemplo práctico**
- Al abrir por primera vez `/mapa`, un pequeño pop-up señala el botón de filtros con el texto: "Filtra los reportes por categoría, estado o zona para encontrar lo que buscas".
- Un usuario sin reportes ve en `/reportes` una ilustración y el texto "Aquí verás el estado de todas las incidencias que crees", en lugar de una pantalla en blanco.

#### **4. Beneficio para el usuario**
- **Curva de Aprendizaje Suave:** Los nuevos usuarios se sienten guiados y descubren el valor de la aplicación más rápidamente.
- **Reducción de la Ambigüedad:** Se clarifica el propósito de cada sección, incluso cuando no hay datos que mostrar.
- **Autonomía del Usuario:** Se empodera al usuario para que explore y utilice todas las herramientas a su disposición.

#### **5. Prioridad**
**Media.** Es muy importante para la adquisición y retención de nuevos usuarios, pero la funcionalidad principal ya es utilizable sin ella.

---

### **Mejora 4: Accesibilidad y Legibilidad Visual**

#### **1. Problema identificado**
Aunque el diseño es limpio, se podrían mejorar pequeños detalles de accesibilidad. Por ejemplo, depender únicamente del color para diferenciar estados (como en los caminos rurales) puede ser un problema para usuarios con daltonismo.

#### **2. Propuesta de mejora**
1.  **Patrones para Estados:** Además del color, usar patrones de línea para los caminos rurales en el mapa (ej: línea continua para Verde, punteada para Amarillo, discontinua para Rojo).
2.  **Contraste de Texto:** Revisar que todos los textos, especialmente los `muted-foreground`, tengan un ratio de contraste suficiente sobre el fondo, según las directrices WCAG.
3.  **Foco del Teclado Visible:** Asegurar que todos los elementos interactivos (botones, enlaces, filtros) tengan un estado de `:focus` visualmente claro para la navegación con teclado.

#### **3. Ejemplo práctico**
- En el mapa, el "Camino a Vagues" (Amarillo) se mostraría no solo en color amarillo, sino también con una línea de guiones.
- Al navegar con la tecla `Tab`, el botón "Crear Incidencia" ganaría un borde azul (usando la variable `--ring`) claramente visible.

#### **4. Beneficio para el usuario**
- **Inclusividad:** La aplicación se vuelve utilizable para un espectro más amplio de personas, incluyendo aquellas con discapacidades visuales.
- **Navegación Alternativa:** Facilita el uso para usuarios avanzados que prefieren el teclado.

#### **5. Prioridad**
**Media.** Aunque no bloquea el uso, es fundamental para crear un producto cívico verdaderamente inclusivo y profesional.
