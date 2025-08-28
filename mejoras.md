# Sugerencias de Mejora UX/UI para CiudadConecta (ArecoReporta)

Este documento identifica oportunidades para refinar la interfaz y la experiencia de usuario de la aplicación, con el objetivo de hacerla más intuitiva, accesible y eficiente para todos los ciudadanos.

---

### **Mejora 1: Completar el Módulo de Animales**

#### **1. Problema identificado**
El módulo de animales tiene las pantallas de registro y alerta, pero la lógica no está completamente conectada. Un usuario puede registrar una mascota, pero el formulario de alerta de animal perdido aún no utiliza esa información.

#### **2. Propuesta de mejora**
1.  **Conectar Formulario de Alerta:** Modificar la página de "Alerta Animal Perdido" para que muestre una lista de las mascotas registradas por el usuario, permitiéndole seleccionar una para reportar.
2.  **Enviar la Alerta:** Implementar la lógica final para que, al enviar el formulario, se cree una alerta (actualmente simulada con un toast, pero lista para conectarse a un backend).

#### **3. Beneficio para el usuario**
- **Flujo Completo:** El usuario puede completar todo el ciclo: registrar su mascota y, si es necesario, reportarla como perdida, haciendo que el módulo sea funcional de principio a fin.
- **Experiencia Lógica:** Se elimina la confusión de tener un formulario de alerta que no se conecta con las mascotas ya existentes.

#### **4. Prioridad**
**Alta.** Es el paso final para completar una de las funcionalidades principales y más visibles de la aplicación.

---

### **Mejora 2: Implementar Autenticación Real con Firebase**

#### **1. Problema identificado**
La aplicación actualmente no tiene un sistema de usuarios real. Todo es público o simulado para un único "usuario". Esto impide la personalización y la seguridad.

#### **2. Propuesta de mejora**
1.  **Integrar Firebase Authentication:** Conectar la aplicación a un proyecto de Firebase y utilizar su servicio de autenticación.
2.  **Hacer Funcionales el Login/Registro:** Implementar la lógica en las páginas `/login` y `/registro` para que los usuarios puedan crear cuentas e iniciar sesión con email/contraseña o proveedores como Google.
3.  **Proteger Rutas:** Restringir el acceso a páginas como `/reportes`, `/animales` y `/admin` solo a usuarios autenticados.
4.  **Personalizar UI:** Mostrar el nombre y email del usuario real en la barra lateral.

#### **3. Beneficio para el usuario**
- **Personalización:** El usuario podrá ver "Mis Reportes" y "Mis Animales" reales.
- **Seguridad:** Los datos de los usuarios y sus reportes estarán protegidos.
- **Base para el Futuro:** Es el pilar para implementar notificaciones, roles de usuario (admin vs. ciudadano) y persistencia de datos.

#### **4. Prioridad**
**Alta.** Es la mejora más importante para convertir el prototipo en una aplicación productiva y escalable.

---

### **Mejora 3: Onboarding y Guía para Nuevos Usuarios**

#### **1. Problema identificado**
La aplicación asume que el usuario entenderá inmediatamente todas sus funcionalidades. Un nuevo usuario podría no descubrir cómo interpretar los estados de un reporte o el propósito de algunas secciones.

#### **2. Propuesta de mejora**
1.  **Tooltips Guiados:** En la primera visita a secciones clave (Mapa, Reportes), mostrar pequeños tooltips o pop-ups que señalen las funcionalidades principales (ej: "Usa estos filtros para acotar tu búsqueda").
2.  **Estados Vacíos Ilustrativos:** Mejorar las pantallas que pueden estar vacías (ej: "Mis Animales" antes de registrar uno) con ilustraciones amigables y un llamado a la acción claro (ej: "Aún no has registrado mascotas. ¡Anímate a registrar la primera!").

#### **3. Beneficio para el usuario**
- **Curva de Aprendizaje Suave:** Los nuevos usuarios se sienten guiados y descubren el valor de la aplicación más rápidamente.
- **Reducción de la Ambigüedad:** Se clarifica el propósito de cada sección, incluso cuando no hay datos que mostrar.
- **Autonomía del Usuario:** Se empodera al usuario para que explore y utilice todas las herramientas a su disposición.

#### **4. Prioridad**
**Media.** Es muy importante para la adquisición y retención de nuevos usuarios, pero la funcionalidad principal ya es utilizable sin ella.

---

## Mejoras Ya Implementadas

Las siguientes sugerencias fueron propuestas y ya han sido integradas en el sistema:

-   **Claridad y Feedback en el Flujo de Creación de Incidencias:**
    -   **Hecho:** El usuario ahora es redirigido a "Mis Reportes" tras un envío exitoso.
    -   **Hecho:** Se ha implementado la previsualización de imágenes con opción a eliminarlas.
    -   **Hecho:** El botón de envío se deshabilita hasta que el formulario es válido.

-   **Contextualización y Simplificación en la Navegación y Filtros:**
    -   **Hecho:** Los filtros del mapa y de la lista de reportes ahora están sincronizados mediante un estado global (`Zustand`), proporcionando una experiencia coherente.

-   **Accesibilidad y Legibilidad Visual:**
    -   **Hecho:** Se han añadido patrones de línea a los caminos rurales en el mapa para mejorar la accesibilidad, además del color.
    -   **Hecho:** Se ha añadido una leyenda al mapa para clarificar la simbología.
