Oil Well Manager App

Aplicación de prueba técnica para gestionar pozos petroleros construida con Angular (frontend), Node + TypeScript (backend con Express + Sequelize) y PostgreSQL como base de datos, todo corriendo en Docker.

Primero debe clonarse el repositorio con:

git clone <url-del-repositorio>

Este repositorio ya incluye el archivo de docker con las variables de ambientes para que todo se conecte de forma automática en el mismo repositorio. Para ejecutarlo al proyecto, se debe entrar en la carpeta raíz y correr el comando:

cd oil-well-manager
docker compose build

Esto crea las imágenes e instala sus dependencias. Luego debe ejeceutarse:

docker compose up

Esto levantará automáticamente los contenedores de la base de datos, el backend y el frontend. Una vez finalizado, el backend estará disponible en http://localhost:3000 y el frontend en http://localhost:4200 y la base de datos de postgres en el puerto 5432. Dejando lista la aplicación para ser utilizada.

Al iniciar el backend, con ayuda de sequelize, se sobreescribe y crea la tabla para manejar los pozos e inserta 5 registros de forma automática para visualizar el funcionamiento de la aplicación.

Descripción Aplicación:
La aplicación permite listar pozos petroleros, crear nuevos registros, cambiar su estado operativo de activo a inactivo, y visualizar métricas rápidas como número de pozos activos, inactivos y la producción total. El backend expone los endpoints:

- GET /wells → Lista todos los pozos.
- POST /wells → Crea un nuevo pozo.
- PATCH /wells/:id → Actualiza el estado de un pozo.

El frontend, desarrollado con Angular y PrimeNG, consume estos servicios mostrando la información en tablas, formularios y tarjetas.
