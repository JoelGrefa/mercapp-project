📦 MercApp

MercApp es una aplicación web de catálogo y carrito de compras desarrollada como proyecto académico para la asignatura de Aplicaciones Web.

El sistema está compuesto por dos módulos:

Backend: API REST construida con Node.js, Express y Sequelize.

Frontend: SPA desarrollada con Vue 3 y Vite.

📋 Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

Node.js 18+ → https://nodejs.org

npm (incluido con Node.js)

También puedes usar yarn o pnpm, pero los ejemplos usan npm.

🗂️ Estructura del Proyecto
MercApp/
  backend/    # API REST (Node.js + Express + Sequelize)
  frontend/   # SPA (Vue 3 + Vite)

🚀 Puesta en Marcha del Proyecto
🛠️ 1. Backend
🔧 Instalación

Abrir una terminal dentro del directorio backend:

cd backend
npm install

📦 Datos de prueba (opcional)
npm run seed

▶️ Ejecutar servidor
npm start

🌐 La API estará disponible en:
http://localhost:4000

🎨 2. Frontend
🔧 Instalación

En otra terminal, ingresar a la carpeta del frontend:

cd frontend
npm install

▶️ Iniciar servidor de desarrollo
npm run dev

🌐 Acceder en el navegador
http://localhost:5173

✨ Funcionalidades Principales
📁 Catálogo

Visualización de productos con imágenes

Búsqueda por nombre o descripción

Filtrado por categorías

Vista de detalle mediante rutas dinámicas: /product/:id

🛒 Carrito de Compras

Implementado con Pinia

Agregar, quitar y modificar cantidades

Persistencia automática en localStorage

📝 Gestión de Productos

Crear producto: /product/new

Editar producto: /product/:id/edit

📌 Páginas adicionales

Carrito: /cart

Acerca de: /about

Página 404 personalizada

📜 Scripts Útiles
🔙 Backend (/backend)
npm start       # Inicia la API
npm run seed    # Carga datos de ejemplo

🎨 Frontend (/frontend)
npm run dev       # Servidor de desarrollo
npm run build     # Build de producción
npm run preview   # Previsualización de la build

👤 Autor

Proyecto desarrollado por Joel Grefa como parte de la Unidad 3 del curso Aplicaciones Web.