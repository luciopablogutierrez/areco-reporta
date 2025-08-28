
# Sugerencias de Mejora UX/UI para CiudadConecta (ArecoReporta)

Este documento identifica oportunidades para refinar la interfaz y la experiencia de usuario de la aplicación, con el objetivo de hacerla más intuitiva, accesible y eficiente para todos los ciudadanos.

---

### **Mejora Pendiente: El Salto a Producción**

#### **1. Problema identificado**
La aplicación actualmente es un prototipo robusto del lado del cliente, pero no tiene un sistema de usuarios real ni persistencia de datos. Todo es público o simulado para un único "usuario". Esto impide la personalización, la colaboración y la seguridad necesarias para un entorno productivo.

#### **2. Propuesta de mejora**
1.  **Integrar Firebase Authentication:** Conectar la aplicación a un proyecto de Firebase y utilizar su servicio de autenticación. Implementar la lógica en las páginas `/login` y `/registro` para que los usuarios puedan crear cuentas e iniciar sesión.
2.  **Conectar a Base de Datos (Firestore):** Migrar los datos simulados (`mock-data`, `mock-roads`, `pet-storage`) a colecciones en una base de datos NoSQL como Firestore.
3.  **Implementar Server Actions para Escritura:** Reemplazar la lógica de cliente (como `addPet` en Zustand) por `Server Actions` que escriban directamente en Firestore para garantizar la persistencia de los datos.
4.  **Proteger Rutas y Personalizar UI:** Restringir el acceso a páginas como `/reportes`, `/animales` y `/admin` solo a usuarios autenticados, y mostrar la información del usuario real en la interfaz.

#### **3. Beneficio para el usuario**
- **Personalización Real:** El usuario podrá ver "Mis Reportes" y "Mis Animales" reales, guardados en su cuenta.
- **Persistencia y Seguridad:** Los datos estarán seguros y no se perderán al recargar la página.
- **Colaboración:** Múltiples usuarios (ciudadanos y administradores) podrán interactuar con el mismo sistema.
- **Base para el Futuro:** Es el pilar para implementar notificaciones, roles de usuario (admin vs. ciudadano) y funcionalidades en tiempo real.

#### **4. Prioridad**
**Crítica.** Es la mejora indispensable para convertir el prototipo en una aplicación productiva y escalable.

---

## Mejoras Ya Implementadas

Las siguientes sugerencias fueron propuestas y ya han sido integradas en el sistema:

-   **Claridad y Feedback en el Flujo de Creación de Incidencias:**
    -   **Hecho:** El usuario es redirigido a "Mis Reportes" tras un envío exitoso.
    -   **Hecho:** Se ha implementado la previsualización de imágenes con opción a eliminarlas.
    -   **Hecho:** El botón de envío se deshabilita hasta que el formulario es válido.
    -   **Hecho:** Se añadió búsqueda de direcciones y alertas contextuales sobre caminos rurales.

-   **Contextualización y Simplificación en la Navegación y Filtros:**
    -   **Hecho:** Los filtros del mapa y de la lista de reportes ahora están sincronizados mediante un estado global (`Zustand`), proporcionando una experiencia coherente.

-   **Funcionalidad Completa del Módulo de Animales (Simulado):**
    -   **Hecho:** El usuario puede registrar, listar, editar (simulado) y eliminar sus mascotas.
    -   **Hecho:** El formulario de alerta de animal perdido ahora utiliza las mascotas registradas por el usuario, completando el flujo.
    -   **Hecho:** El portal de animales ahora cuenta con filtros avanzados por texto, tipo de animal y zona.

-   **Panel de Administración Dinámico:**
    -   **Hecho:** Las estadísticas y la lista de reportes recientes ahora se cargan dinámicamente desde los datos simulados.

-   **Visualización de Historial de Reportes:**
    -   **Hecho:** Los usuarios pueden hacer clic en el estado de un reporte para ver una línea de tiempo visual de todos sus cambios.

-   **Mejora de la Interfaz de Caminos Rurales:**
    -   **Hecho:** Al seleccionar un camino rural en el mapa, ahora se resalta visualmente en la lista para una mejor contextualización.

-   **Accesibilidad y Legibilidad Visual:**
    -   **Hecho:** Se han añadido patrones de línea a los caminos rurales en el mapa para mejorar la accesibilidad, además del color.
    -   **Hecho:** Se ha añadido una leyenda al mapa para clarificar la simbología.

-   **Onboarding y Guía para Nuevos Usuarios:**
    -   **Hecho:** Se han mejorado las pantallas de estado vacío (ej: "Mis Animales") con ilustraciones amigables y un llamado a la acción claro.
