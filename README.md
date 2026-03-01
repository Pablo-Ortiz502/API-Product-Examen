# Products API

REST API desarrollada con **NestJS**, **Prisma ORM** y **MySQL** para la gestión de productos con paginación, búsqueda y manejo centralizado de errores.

---

## Requisitos

Antes de comenzar asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) v20 o superior
- [npm](https://www.npmjs.com/) v9 o superior
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (para levantar la base de datos)
- [Git](https://git-scm.com/)

---

## Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd products-api

# Instalar dependencias
npm install
```

---

## Configuración del .env

Crea un archivo `.env` en la raíz del proyecto basándote en el archivo `.env.example`:

```bash
cp .env.example .env
```

Contenido del `.env`:

```env
DATABASE_URL="mysql://root:root1234@localhost:5000/products_db"
DB_HOST=localhost
DB_PORT=5000
DB_USER=root
DB_PASSWORD=root1234
DB_NAME=products_db
PORT=3000
```

---

## Cómo ejecutar

### 1. Levantar la base de datos con Docker

```bash
docker-compose -f Docker_products_db.yml up -d
```

Verifica que el contenedor esté corriendo:

```bash
docker-compose -f Docker_products_db.yml ps
```

### 2. Correr las migraciones

```bash
npx prisma migrate dev
```

### 3. Levantar el servidor

```bash
# Modo desarrollo
npm run start:dev

# Modo producción
npm run build
npm run start:prod
```

El servidor estará disponible en `http://localhost:3000`

---

## Endpoints disponibles

| Método | Ruta                                    | Descripción                     |
| ------ | --------------------------------------- | ------------------------------- |
| GET    | `/api/products`                         | Listar productos con paginación |
| GET    | `/api/products?page=1&limit=10&q=mouse` | Buscar productos                |
| GET    | `/api/products/:id`                     | Obtener un producto             |
| POST   | `/api/products`                         | Crear un producto               |
| PUT    | `/api/products/:id`                     | Actualizar un producto          |
| DELETE | `/api/products/:id`                     | Eliminar un producto            |

### Formato de respuesta exitosa

```json
{
  "ok": true,
  "data": {},
  "error": null
}
```

### Formato de respuesta con error

```json
{
  "ok": false,
  "data": null,
  "error": {
    "statusCode": 404,
    "message": "Producto con id 10 no encontrado"
  }
}
```

---

## Cómo importar y usar en Postman

### Opción 1: Importar colección

1. Abre **Postman**
2. Click en **Import** (esquina superior izquierda)
3. Selecciona el archivo `postman_collection.json` que está en la raíz del proyecto
4. Click en **Import**

### Opción 2: Configurar manualmente

1. Abre Postman y crea una nueva colección llamada `Products API`
2. Crea una variable de entorno llamada `base_url` con el valor `http://localhost:3000/api`
3. Agrega los siguientes requests:

**Listar productos**

```
GET {{base_url}}/products?page=1&limit=10
```

**Buscar productos**

```
GET {{base_url}}/products?q=mouse
```

**Obtener un producto**

```
GET {{base_url}}/products/1
```

**Crear producto**

```
POST {{base_url}}/products
Content-Type: application/json

{
  "name": "Mouse inalámbrico",
  "description": "Mouse ergonómico RGB",
  "price": 25.99,
  "stock": 100
}
```

**Actualizar producto**

```
PUT {{base_url}}/products/1
Content-Type: application/json

{
  "price": 19.99,
  "stock": 80
}
```

**Eliminar producto**

```
DELETE {{base_url}}/products/1
```

---

## Estructura del proyecto

```
src/
├── common/
│   ├── filters/
│   │   └── http-exception.filter.ts
│   └── interceptors/
│       └── response.interceptor.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── products/
│   ├── dto/
│   │   └── create-product.dto.ts
│   ├── pipes/
│   │   └── validate-meta-data/
│   │       └── validate-meta-data.pipe.ts
│   ├── products.controller.ts
│   ├── products.module.ts
│   └── products.service.ts
├── app.module.ts
└── main.ts
prisma/
├── migrations/
└── schema.prisma
```

---

## Comandos útiles de Prisma

```bash
# Correr migraciones en desarrollo
npx prisma migrate dev

# Regenerar el cliente
npx prisma generate

```

## Comandos de Docker

```bash
# Levantar base de datos
docker-compose -f Docker_products_db.yml up -d

# Detener base de datos
docker-compose -f Docker_products_db.yml down

# Detener y borrar datos
docker-compose -f Docker_products_db.yml down -v
```
