# Rest Project + TypeScript

Este proyecto está construido con TypeScript, Express y proporciona una API REST completa. Permite crear y autenticar usuarios y manejar la subida de archivos como imágenes y GIFs.

## Características principales

- **Autenticación de usuarios**: Registra nuevos usuarios con correo electrónico y contraseña, y los autentica mediante tokens JWT.
- **Subida de archivos**: Permite subir archivos de diferentes tipos, como imágenes (JPG, PNG), GIFs y otros formatos compatibles.

## Instalación

1. Clonar el repositorio y acceder al directorio del proyecto.
2. Copiar el archivo `.env.template` a `.env` y configurar las variables de entorno necesarias, como las credenciales de la base de datos y los secretos de JWT.
3. Ejecutar `npm install` para instalar las dependencias.
4. Si se requiere una base de datos, configurar el `docker-compose.yml` y ejecutar `docker-compose up -d` para levantar los servicios necesarios.
5. Ejecutar `npm run dev` para iniciar el servidor en modo desarrollo.

## Uso

- **Registro de usuarios**: Envía una solicitud POST a `/auth/register` con los campos `email` y `password` en el cuerpo de la solicitud.
- **Inicio de sesión**: Envía una solicitud POST a `/auth/login` con los campos `email` y `password` en el cuerpo de la solicitud. Recibirás un token JWT válido para futuras solicitudes autenticadas.
- **Subida de archivos**: Envía una solicitud POST a `/files/upload` con los archivos adjuntos en el cuerpo de la solicitud. Asegúrate de incluir el token JWT en el encabezado 

## Tecnologías utilizadas

- TypeScript
- Express
- JSON Web Tokens (JWT)
- Docker (para servicios adicionales, como la base de datos)
- express-fileupload (para subida de archivos)
- Nodemailer (para envío de correos electrónicos)


## Contribución

Si deseas contribuir a este proyecto, por favor, sigue los siguientes pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama con una descripción clara de la funcionalidad a agregar o el problema a solucionar: `git checkout -b mi-nueva-funcionalidad`
3. Realiza tus cambios y commítelos: `git commit -m 'Agrega mi nueva funcionalidad'`
4. Envía tus cambios al repositorio remoto: `git push origin mi-nueva-funcionalidad`
5. Crea un nuevo Pull Request en GitHub.
