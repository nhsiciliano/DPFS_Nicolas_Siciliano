# PetSpace - E-commerce para Mascotas 🐾

¡Bienvenido a **PetSpace**! Este proyecto es un e-commerce Fullstack desarrollado como parte del desafío de DH Venture Capitals. Nuestro objetivo es ofrecer una experiencia de compra única para los amantes de las mascotas, combinando tecnología moderna con un diseño amigable.

## 🛍️ Oferta de Productos y Servicios

En **PetSpace**, nos dedicamos al bienestar integral de tus compañeros peludos. Nuestra oferta incluye:

*   **Alimentación Premium:** Una selección curada de alimentos balanceados y naturales para perros y gatos de todas las edades y necesidades específicas.
*   **Confort y Descanso:** Camas, mantas y accesorios diseñados para asegurar el mejor descanso de tu mascota.
*   **Diversión y Entretenimiento:** Juguetes interactivos, mordedores y rascadores para mantener a tu mascota activa y feliz.
*   **Accesorios de Paseo:** Correas, collares y arneses que combinan seguridad y estilo.

### 🎯 Público Objetivo

Nuestro sitio está pensado para:
*   Dueños de mascotas que buscan productos de alta calidad y confianza.
*   Personas que valoran la comodidad de comprar online con envíos rápidos y seguros.
*   Usuarios que aprecian una interfaz intuitiva y una experiencia de usuario fluida en dispositivos móviles y de escritorio.

---

## 👨‍💻 Sobre el Desarrollador

Soy un desarrollador Fullstack apasionado por crear soluciones web que no solo funcionan bien, sino que también se ven increíbles. Me especializo en el ecosistema de JavaScript (Node.js y React) y tengo un fuerte enfoque en:

*   **UI/UX Design:** Crear interfaces limpias, modernas y fáciles de usar.
*   **Clean Code:** Escribir código mantenible, escalable y bien documentado.
*   **Performance:** Optimizar la velocidad y el rendimiento de las aplicaciones web.

Este proyecto es una oportunidad para demostrar mis habilidades en la construcción de una aplicación completa, desde el diseño de la base de datos hasta la interfaz de usuario final.

---

## 🔎 Benchmarking y Referencias

Para el diseño y funcionalidades de **PetSpace**, hemos analizado varios sitios líderes en la industria. Aquí presentamos 5 referencias clave:

1.  **[Chewy](https://www.chewy.com/)**
    *   **Por qué:** Es el estándar de oro en e-commerce de mascotas.
    *   **Destacado:** Su funcionalidad de "Autoship" (suscripción recurrente) y su excepcional atención al cliente. La navegación es muy clara a pesar de tener un catálogo inmenso.

2.  **[Wild One](https://wildone.com/)**
    *   **Por qué:** Referente estético (UI).
    *   **Destacado:** Diseño minimalista, moderno y muy visual. Uso excelente de fotografía de producto y una paleta de colores coherente que transmite "premium".

3.  **[Butternut Box](https://butternutbox.com/)**
    *   **Por qué:** Personalización y Experiencia de Usuario (UX).
    *   **Destacado:** Su proceso de onboarding mediante un "quiz" para personalizar la dieta de la mascota es un gran ejemplo de cómo guiar al usuario y ofrecer valor agregado.

4.  **[Petco](https://www.petco.com/)**
    *   **Por qué:** Integración de servicios.
    *   **Destacado:** Cómo combinan la venta de productos con servicios (veterinaria, peluquería). Es interesante ver cómo manejan la jerarquía de información para no abrumar al usuario.

5.  **[BarkBox (Bark)](https://www.barkbox.com/)**
    *   **Por qué:** Branding y Modelo de Suscripción.
    *   **Destacado:** Una identidad de marca muy fuerte y divertida. Su flujo de suscripción es simple y atractivo, enfocado totalmente en la "experiencia" de recibir una caja mensual.

---

Tablero de trabajo: https://trello.com/invite/b/693a0998f3d35432ac8739ba/ATTI069275917dc99a65097aa53aabb04cb22ED1F80A/e-commerce-dh

*Proyecto desarrollado para Digital House - DH Venture Capitals*

---

## 🚀 Guía de Instalación y Pruebas

Para correr este proyecto localmente y probar todas las funcionalidades, sigue estos pasos:

### 1. Prerrequisitos
Asegúrate de tener instalado en tu máquina:
- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MySQL](https://www.mysql.com/) o MariaDB

### 2. Clonar el Repositorio
Abre tu terminal y ejecuta:
```bash
git clone <URL_DEL_REPOSITORIO>
cd fullstack_digitalhouse
```

### 3. Instalar Dependencias
Ejecuta el siguiente comando para instalar las librerías necesarias:
```bash
npm install
```

### 4. Configuración de Base de Datos
1. Crea una base de datos vacía llamada `petspace_db` en tu motor MySQL.
2. Importa la estructura y datos iniciales ubicados en `src/database/`. Puedes hacerlo desde tu cliente SQL favorito (Workbench, DBeaver) o por línea de comandos:

```bash
# Primero la estructura
mysql -u root -p petspace_db < src/database/structure.sql

# Luego la data (usuarios, productos, categorías)
mysql -u root -p petspace_db < src/database/data.sql
```

> **Nota:** La configuración por defecto asume usuario `root` sin contraseña en localhost. Si tu configuración es distinta, edita el archivo `src/database/config/config.js`.

### 5. Iniciar la Aplicación
Ejecuta el servidor con:
```bash
npm start
```
El servidor iniciará en `http://localhost:3000`.

### 6. Probar el Sitio
Para probar los diferentes roles y permisos, utiliza las siguientes credenciales de prueba (la contraseña es `12345678` para ambos):

#### 🔑 Usuario Administrador
*   **Email:** `admin@petspace.com`
*   **Password:** `12345678`
*   **Permisos:** Puede Crear, Editar y Eliminar productos. Verás estos botones en el listado de productos y en el perfil.

#### 👤 Usuario Cliente
*   **Email:** `juan.perez@example.com`
*   **Password:** `12345678`
*   **Permisos:** Puede navegar, ver detalles, agregar productos al carrito y gestionar su carrito de compras, pero NO puede administrar productos.

¡Que disfrutes navegando por PetSpace! 🐾
