# Sugerencias de Mejora UX/UI para CiudadConecta (ArecoReporta)

Este documento identifica oportunidades para refinar la interfaz y la experiencia de usuario de la aplicación, con el objetivo de hacerla más intuitiva, accesible y eficiente para todos los ciudadanos.

---

### **Mejora 1: Implementar Autenticación Real con Firebase**

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

## Mejoras Ya Implementadas

Las siguientes sugerencias fueron propuestas y ya han sido integradas en el sistema:

-   **Claridad y Feedback en el Flujo de Creación de Incidencias:**
    -   **Hecho:** El usuario ahora es redirigido a "Mis Reportes" tras un envío exitoso.
    -   **Hecho:** Se ha implementado la previsualización de imágenes con opción a eliminarlas.
    -   **Hecho:** El botón de envío se deshabilita hasta que el formulario es válido.

-   **Contextualización y Simplificación en la Navegación y Filtros:**
    -   **Hecho:** Los filtros del mapa y de la lista de reportes ahora están sincronizados mediante un estado global (`Zustand`), proporcionando una experiencia coherente.

-   **Funcionalidad Completa del Módulo de Animales (Simulado):**
    -   **Hecho:** El usuario puede registrar, listar, editar (simulado) y eliminar sus mascotas.
    -   **Hecho:** El formulario de alerta de animal perdido ahora utiliza las mascotas registradas por el usuario, completando el flujo.

-   **Accesibilidad y Legibilidad Visual:**
    -   **Hecho:** Se han añadido patrones de línea a los caminos rurales en el mapa para mejorar la accesibilidad, además del color.
    -   **Hecho:** Se ha añadido una leyenda al mapa para clarificar la simbología.

-   **Onboarding y Guía para Nuevos Usuarios:**
    -   **Hecho:** Se han mejorado las pantallas de estado vacío (ej: "Mis Animales") con ilustraciones amigables y un llamado a la acción claro, en lugar de cajas grises genéricas. Esto suaviza la curva de aprendizaje y reduce la ambigüedad.

-   **Mejora de la Interfaz de Caminos Rurales:**
    -   **Hecho:** Al seleccionar un camino rural en el mapa, ahora se resalta visualmente en la lista para una mejor contextualización.
