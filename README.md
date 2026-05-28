# VetCare Landing Page

Proyecto de landing page para una clínica veterinaria llamada **VetCare**.

## Descripción

La página incluye:
- Landing page principal con navegación, hero, servicios, especialidades, equipo, testimonios y footer.
- Formulario de registro completo para dueño y mascota.
- Validación en tiempo real con retroalimentación visual por campo.
- Confirmación dinámica al enviar el formulario exitosamente.
- Diseño responsive con paleta de colores verdes, blancos y azules.

## Estructura del proyecto

- `index.html` - Página principal de la landing.
- `style.css` - Estilos generales de la landing.
- `registro.html` - Página de registro de dueño y mascota.
- `registro.css` - Estilos específicos del formulario de registro.
- `validaciones.js` - Lógica de validación del registro.

## Cómo usar

1. Abrir `index.html` en un navegador.
2. Navegar a la sección de registro o acceder directamente a `registro.html`.
3. Completar los datos del dueño y la mascota.
4. El formulario validará los campos en tiempo real.
5. Si todo es correcto, se mostrará una sección de confirmación y se ocultará el formulario.

## Características principales

- Validación de campos obligatorios.
- Retroalimentación visual con clases `campo-error` y `campo-ok`.
- Validación de email, DNI, teléfono, fechas y contraseñas.
- Generación de un ID de registro aleatorio usando `Math.random()`.
- Botones para volver al inicio o registrar otra mascota.

## Notas

- El proyecto está preparado para funcionar como una página estática sin servidor.
- Si se desea publicar en GitHub Pages, basta con subir el repositorio y activar Pages en la rama `main`.
