# Prueba técnica Nexu

Esta preuba es realizada por David Sandoval, con el usuario de github https://github.com/LDavid-Sandoval

## Instalación

Se requiere clonar el repositorio del siguiente enlace: https://github.com/LDavid-Sandoval/technical-test-nexu.git

O por medio de SSH

```bash
  git clone git@github.com:LDavid-Sandoval/technical-test-nexu.git
```

Abrir la carpeta de archivos dentro de Visual Studio Code, para poder instalar dependencias requeridas.

```bash
  npm i
```

## Ejecución

Se tiene que agregar in archivo .env con los siguientes valores

```bash
  MONGODB_USER=''
  MONGODB_PASSWORD=''
  MONGODB_CLUSTER=''
  MONGODB_URI=''
```

Para ejecutar el proyecto ejecuté lo siguiente

```bash
  npm start
```

Las rutas son las siguientes

```bash
  GET    /brands
  GET    /brands/:id/models
  POST   /brands
  POST   /brands/:id/models
  PUT    /models/:id
  GET    /models
```
