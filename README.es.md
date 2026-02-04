# APEX Side Navigation Smart Search 🔍

Una barra de búsqueda dinámica y de alto rendimiento para el menú de navegación lateral (Side Navigation) de Oracle APEX. Permite filtrar los elementos del menú en tiempo real sin necesidad de modificar las plantillas (Templates) del Universal Theme.

![Vista Previa](preview.gif)

## 🚀 Características

* **Inyección "Cero Configuración":** Inyecta automáticamente el input de búsqueda en el DOM (no requiere cambios en las plantillas de interfaz de usuario).
* **Filtrado en Tiempo Real:** Filtra las opciones del menú instantáneamente mientras escribes.
* **Auto-Expansión Inteligente:** Despliega automáticamente los nodos padres (carpetas) cuando un elemento hijo coincide con la búsqueda.
* **Diseño Nativo:** Hereda los estilos del Universal Theme para integrarse visualmente como un componente nativo.
* **Soporte de Teclado:** Presiona `Esc` para limpiar la búsqueda y colapsar el menú.

## 📋 Requisitos

* **Oracle APEX 20.2** o superior.
* **Universal Theme (Theme 42)**.

## 📦 Instalación

1.  Descarga el archivo más reciente `plugin_install.sql` desde la sección de [Releases](../../releases).
2.  Ingresa a tu Espacio de Trabajo (Workspace) de Oracle APEX.
3.  Ve a **App Builder > Tu Aplicación > Shared Components > Plug-ins**.
4.  Haz clic en **Import** y selecciona el archivo `.sql`.
5.  Sigue los pasos del asistente para completar la instalación.

## ⚙️ Uso

Para activar la barra de búsqueda globalmente en tu aplicación:

1.  Ve a la **Página 0 (Global Page)**.
2.  Crea una nueva **Acción Dinámica** (Dynamic Action).
    * **Nombre:** `Global - Menu Search`
    * **Evento:** `Page Load` (Carga de página)
3.  En la acción **True**:
    * **Acción:** Selecciona el plugin `APEX Side Navigation Smart Search`.
4.  Guarda y Ejecuta tu aplicación.

## 🤝 Contribuir

Los reportes de errores (Issues) y las solicitudes de cambios (Pull Requests) son bienvenidos. Este proyecto busca ser un espacio seguro y colaborativo.

## 📄 Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

## Demo
[https://oracleapex.com/ords/r/hussein/apex-side-navigation-smart-search/home?session=115483674139892]
