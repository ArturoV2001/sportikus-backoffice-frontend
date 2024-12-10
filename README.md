
# Sportikus-Backoffice-Frontend

![Sportikus Logo](src/assets/img/logo_cf.jpg)

Sportikus-Backoffice-Frontend es el frontend diseñado para la gestión y visualización de datos relacionados con la actividad física y la salud. Este proyecto utiliza Vue.js 3 con Vite, brindando una experiencia de desarrollo rápida y eficiente.

## Instalación

Sigue estos pasos para configurar el proyecto en tu entorno local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/ArturoV2001/sportikus-backoffice-frontend.git
   cd sportikus-backoffice-frontend
   ```

2. Instala las dependencias con npm:
   ```bash
   npm install
   ```

3. Configura el archivo `.env`:
   Crea un archivo `.env` en la raíz del proyecto si no existe, y define las variables necesarias para tu entorno (como `VITE_API_BASE_URL`).

4. Compila y carga el proyecto en modo desarrollo:
   ```bash
   npm run dev
   ```

   Accede al proyecto desde tu navegador en [http://localhost:5173](http://localhost:5173).

## Uso

### Comandos principales

- **Compilación para desarrollo**:
  ```bash
  npm run dev
  ```

- **Compilación y minificación para producción**:
  ```bash
  npm run build
  ```

- **Lint para el código**:
  ```bash
  npm run lint
  ```

## Estructura del Proyecto

El proyecto sigue una arquitectura basada en componentes y utiliza las siguientes tecnologías:

- **Vue.js 3**: Framework para construir interfaces de usuario reactivas.
- **Vite**: Herramienta para el empaquetado y desarrollo rápido.
- **PrimeVue/TailwindCSS**: (si aplica) Para estilos y componentes preconstruidos.
- **Axios**: Para las peticiones HTTP hacia el backend.

## Contribuciones

Si deseas contribuir a este proyecto:

1. Haz un fork del repositorio.
2. Crea una nueva rama para tu funcionalidad:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
3. Realiza tus cambios y súbelos.
4. Envía un pull request.

## Licencia

Sportikus-Backoffice-Frontend está licenciado bajo la [MIT License](LICENSE).
