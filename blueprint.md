# Blueprint: Aplicación de Tareas (To-Do)

## Visión General

El objetivo es transformar la aplicación React inicial en una aplicación de lista de tareas (To-Do list) funcional, moderna y visualmente atractiva. La aplicación permitirá a los usuarios agregar, completar y eliminar tareas a través de una interfaz limpia y de una sola página.

## Diseño y Estilo

- **Tema:** Moderno y oscuro.
- **Paleta de Colores:**
  - **Fondo:** Un gris oscuro y profundo (ej. `#1a202c`).
  - **Contenedor:** Un gris ligeramente más claro (ej. `#2d3748`).
  - **Acento Principal:** Un color vibrante como el azul eléctrico o el morado para botones, íconos y elementos interactivos (ej. `#6366f1`).
  - **Texto:** Blanco o un gris muy claro para una legibilidad óptima.
- **Tipografía:** Se utilizará una fuente sans-serif limpia y moderna (la predeterminada de Tailwind, `Inter`). El tamaño de la fuente se usará para crear una jerarquía visual clara (título, texto de la tarea, etc.).
- **Estilo de Componentes:**
  - **Tarjetas/Contenedores:** Bordes redondeados y sombras suaves para crear una sensación de profundidad ("lifted").
  - **Botones e Inputs:** Estilo consistente, con estados `hover` y `focus` claros para una mejor experiencia de usuario.
  - **Iconografía:** Se usarán íconos (ej. para la acción de eliminar) para mejorar la usabilidad y el atractivo visual.

## Funcionalidad y Características

- **Añadir Tarea:** Un campo de entrada de texto y un botón de "Añadir" permitirán al usuario crear una nueva tarea.
- **Ver Lista de Tareas:** Todas las tareas se mostrarán en una lista vertical.
- **Marcar como Completada:** Cada tarea tendrá un `checkbox`. Al marcarlo, el texto de la tarea se tachará visualmente, indicando que está completa.
- **Eliminar Tarea:** Cada tarea tendrá un botón con un ícono de "basura" o una "X" para eliminarla permanentemente de la lista.
- **Persistencia de Estado:** El estado de la lista de tareas se gestionará con los hooks de React (`useState`). La lista se reiniciará si se recarga la página (la persistencia en el almacenamiento local podría ser una mejora futura).

## Plan de Implementación Actual

1.  **Crear `blueprint.md`:** Documentar la visión, el diseño y el plan. *(Completado)*
2.  **Limpiar Estilos:**
    -   Reemplazar el contenido de `src/index.css` con las directivas base de Tailwind CSS.
    -   Eliminar el archivo `src/App.css` que ya no es necesario.
3.  **Reconstruir `src/App.jsx`:**
    -   Eliminar todo el código de la plantilla de Vite.
    -   Implementar la estructura JSX para la aplicación de tareas, estilizada con clases de Tailwind CSS.
    -   Añadir la lógica de estado y los manejadores de eventos (`handleAddTodo`, `handleToggleComplete`, `handleDeleteTodo`) para que la aplicación sea interactiva.
