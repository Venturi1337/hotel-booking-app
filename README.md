# 🏨 Hotel Booking App (NestJS + Hexagonal Architecture)

Aplicación desarrollada en **NestJS** con arquitectura **hexagonal** (puertos y adaptadores), capaz de funcionar tanto con persistencia en **MongoDB** como en el **sistema de archivos** (FS), configurable vía archivo.

---

## 📁 Arquitectura del Proyecto

La aplicación está organizada por **módulos** (`Client`, `Hotel`, `HotelBooking`) siguiendo principios de **Clean Architecture** y **Domain-Driven Design (DDD)**. Cada módulo contiene:

- `domain/`: Entidades, interfaces (puertos), fábricas y esquemas de Mongo
- `application/`: Casos de uso (use-cases)
- `infrastructure/`: Adaptadores de persistencia (FS, Mongo) y fábricas de repositorios (bridge pattern)
- `http/`: Controladores y DTOs
- `module.ts`: Registro dinámico del módulo (`register(config)`)

---

## ⚙️ Configuración

La configuración se carga desde un archivo JSON. Por ejemplo:

`config/config.json`:

```json
{
  "dataType": "FS",
  "fsFolder": "./storage",
}
```

- `dataType`: `"FS"` o `"DB"` para definir el tipo de persistencia
- `fsFolder`: Ruta de almacenamiento para el modo FS

---

## ▶️ Cómo Iniciar la Aplicación (Mongo instalado de manera local)

### 1. Instalar dependencias

```bash
npm install
```

### 2. Compilar y ejecutar

```bash
npm run start:dev
```

> Asegúrate de tener Mongo corriendo si estás usando `"dataType": "DB"`

---


## ▶️ Cómo Iniciar la Aplicación (Con Docker)

### 1. Ejecutar docker-compose up --build(en caso de necesitarlo)


## 🧪 API Docs (Swagger)

Una vez en ejecución, accede a Swagger desde:

```
http://localhost:3000/api
```

Desde ahí puedes probar todos los endpoints (`Clients`, `Hotels`, `HotelBookings`) con sus respectivos DTOs.

---

## 🛠️ Casos de Uso Implementados

### 🔹 Client
- Crear cliente
- Listar clientes
- Actualizar cliente

### 🔹 Hotel
- Crear hotel
- Listar hoteles
- Obtener hotel por ID
- Actualizar hotel

### 🔹 HotelBooking
- Crear reserva
- Listar reservas
- Actualizar reserva

---

## 🧠 Patrón de Arquitectura

El proyecto sigue:

- ✅ **Hexagonal Architecture (Ports & Adapters)**
- ✅ **Inversión de dependencias**
- ✅ **Bridge pattern** para seleccionar el tipo de persistencia
- ✅ **Open/Closed Principle** en la carga de repositorios
- ✅ **Validación de existencia** antes de actualizar entidades

---

## 📦 Estructura de carpetas

```
src/
├── modules/
│   ├── client/
│   ├── hotel/
│   ├── hotel-booking/
│   └── shared/
├── config/
│   └── config.service.ts
└── main.ts
```

---