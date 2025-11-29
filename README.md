# MercApp

MercApp es una aplicación web de catálogo y carrito de compras desarrollada como proyecto académico para la asignatura de **Aplicaciones Web**.  

El sistema está dividido en dos partes:

- **Backend**: API REST construida con Node.js, Express y Sequelize.
- **Frontend**: Single Page Application (SPA) construida con Vue 3 y Vite.

---

## Requisitos previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- npm (incluido con Node.js)

> Opcionalmente, puedes usar `yarn` o `pnpm`, pero los comandos aquí están escritos con `npm`.

---

## Estructura del proyecto

```text
MercApp/
  backend/   # API REST (Node.js + Express + Sequelize)
  frontend/  # SPA (Vue 3 + Vite)


🚀 Puesta en Marcha del Proyecto
🛠️ 1. Backend
🔧 Instalación y ejecución

Abrir una terminal en la carpeta del backend:

cd backend


Instalar dependencias:

npm install


Cargar datos de prueba (opcional, pero recomendado):

npm run seed


Iniciar el servidor:

npm start


🌐 API disponible en:

http://localhost:4000

🎨 2. Frontend

Abrir otra terminal y dirigirse al frontend:

cd frontend


Instalar dependencias:

npm install


Iniciar el servidor de desarrollo (Vite):

npm run dev


Acceder en el navegador:

http://localhost:5173

✨ 3. Funcionalidades Principales

🖼️ Catálogo de productos con imágenes

🔍 Búsqueda por nombre o descripción

🏷️ Filtrado por categorías

📄 Detalle de producto por ruta dinámica (/product/:id)

🛒 Carrito de compras con Pinia:

Añadir, quitar y modificar cantidades

Persistencia en localStorage

📝 Formularios para creación y edición de productos:

Nuevo: /product/new

Editar: /product/:id/edit

📌 Páginas adicionales:

Carrito: /cart

Acerca de: /about

❌ Página 404 personalizada

📜 4. Scripts Útiles
🔙 Backend (/backend)

npm start → Inicia la API

npm run seed → Carga datos de ejemplo

🎨 Frontend (/frontend)

npm run dev → Servidor de desarrollo

npm run build → Build de producción

npm run preview → Previsualización de la build

👤 5. Autor

Proyecto desarrollado por Joel Grefa como parte de la Unidad 3 del curso de Aplicaciones Web.
