# Retrospectiva del Sprint 1 - Dinámica Estrella de Mar 🌟

En esta retrospectiva analizamos el desempeño durante la fase de inicialización y diseño del proyecto **PetSpace**.

## 1. Start Doing (Empezar a hacer) 🟢
*   **Validación de requisitos específicos:** Confirmar detalles como el idioma de los entregables antes de comenzar la generación masiva de assets.
*   **Gestión de cuotas de API:** Planificar mejor el uso de algunas herramientas de para no perdeer demasiado tiempo en la espera de respuestas.

## 2. More Of (Hacer más) 📈
*   **Prototipado rápido con IA:** La inspiración de wireframes y logos mediante IA aceleró drásticamente el proceso al buscar ideas rápidas y que puedan ser llevadas a cabo en herramientas como Figma.
*   **Organización estructurada:** Mantener una estructura de carpetas limpia (`Wireframes`, `Design`) desde el inicio facilita la escalabilidad.

## 3. Keep Doing (Seguir haciendo) ✅
*   **Documentación clara:** El `README.md` y el `design_system.md` proveen una base sólida y clara para el equipo.
*   **Feedback iterativo:** La rápida corrección de los wireframes al español demostró capacidad de adaptación ante el feedback del cliente.
*   **Benchmarking:** La investigación previa de sitios referentes aportó valor y dirección al diseño.

## 4. Less Of (Hacer menos) 📉
*   **Asunciones implícitas:** Evitar realizar demasiadas iteraciones de wireframes sin validación previa. Luego en el maquetado HTML y CSS se puede realizar un mejor ajuste.

## 5. Stop Doing (Dejar de hacer) 🛑
*   **Ejecución masiva sin validación previa:** No generar todos los entregables de una sola vez si existe riesgo de que algún requisito base no esté confirmado, para evitar re-trabajo y consumo innecesario de recursos.

---
*Fecha: 4 de Diciembre, 2025*

# Retrospectiva del Sprint 2 - Maquetación HTML/CSS 🌟

En esta etapa nos enfocamos en traducir los diseños a código funcional (HTML/CSS).

## 1. Start Doing (Empezar a hacer) 🟢
*   **Mobile First real:** Aunque el diseño es responsivo, pensar primero en la vista móvil simplificaría el CSS de las media queries.
*   **Validación de accesibilidad:** Comenzar a verificar contrastes y etiquetas ARIA desde el maquetado inicial.

## 2. More Of (Hacer más) 📈
*   **Ajustes en código:** Como se identificó previamente, realizar los ajustes finos visuales directamente en CSS resultó más eficiente que iterar infinitamente en los wireframes.
*   **Uso de Variables CSS:** La definición centralizada de colores y tipografías en `styles.css` facilitó mucho la implementación y los cambios globales.

## 3. Keep Doing (Seguir haciendo) ✅
*   **Estructura semántica:** El uso de etiquetas HTML5 correctas (`header`, `main`, `article`, `footer`) mantiene el código limpio y legible.
*   **Generación de Assets:** El uso de imágenes generadas por IA para los placeholders dio un aspecto profesional inmediato al prototipo.
*   **Separación de estilos:** Mantener un CSS global y archivos específicos por página (`home.css`, `cart.css`) ayudó a la organización.

## 4. Less Of (Hacer menos) 📉
*   **Complejidad en selectores:** Evitar selectores CSS demasiado específicos o anidados que dificulten la sobreescritura futura.

## 5. Stop Doing (Dejar de hacer) 🛑
*   **Estilos en línea:** Aunque fue mínimo, asegurar que absolutamente ningún estilo quede dentro de las etiquetas HTML para mantener la separación de intereses.

---
*Fecha: 4 de Diciembre, 2025*
