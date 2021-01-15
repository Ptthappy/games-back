# Pasos para ejecutar el servidor

## Crear la base de datos que utilizará el servidor

## Crear el archivo .env en la raíz del proyecto y configurar las variables del proyecto
Puede utilizar el archivo .env.example, ubicado también en la raíz del proyecto, y sustituir los valores de ejemplo por los valores reales:

PORT: El puerto en el que trabajará el servidor
DB_USER: El usuario de base de datos
DB: El nombre de la base de datos
DB_PASS: Contraseña para ingresar a la base de datos
DB_HOST: Host de la base de datos
DB_PORT= Puerto de la base de datos
DB_MAX_CLIENTS: Máxima cantidad de conexiones simultáneas a la base de datos (Para el pool)
DB_IDLE_TIMEOUT_MS: Duración máxima de una petición a la base de datos antes de fallar por timeout

## Scripts disponibles

### `npm start`
Ejecuta el servidor (El código primero debe ser compilado para que pueda funcionar)

### `npm build`
Compila el código typescript a javascript dentro de la carpeta /build para que pueda ser ejecutado

### `npm rebuild`
Compila el código y posteriormente se ejecuta