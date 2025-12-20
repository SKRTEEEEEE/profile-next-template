# Resumen de sesión Droid
## Ctx
Hola droid, fijate en mi carpeta/proyecto en ./admin-next, si te fijas este es una copia de agora-next/profile-next. La question de este proyecto esque estoy migrando de un frontend/backend nextjs (profile-page), a una estructura de backend monolitico (profile-nest) y frontends micro (admin, profile, agora). 
- **`admin-next` = template base para nuevos micro-frontend**
- En el issue de ahora, debes centrarte en la parte de admin-next y log-ui-ts, para crear el **template definitivo para los nuevos micro-frontend de este proyecto**


- Estos micro-frontend's comparten dominio con './profile-domain' como package y con el backend
- Estos micro-frontend's comparten las funcionalidades con ./*/log-ui-ts/ como submodule, [ver README.md](../log-ui-ts/README.md)

- Tienes un **reporte MUY IMPORTANTE de la arquitectura** en [./docs/cleanarch.md](../../docs/cleanarch.md)
- Tienes un reporte del test en [./admin-next/test/README.md](../tests/README.md)
- Tienes un servidor del backend corriendo en :3001
- Tienes un servidor del frontend (`admin-next`) en :3000
## Objetivo
Aconseguir un buen template para next.js, con un ui-log-ts que junte todas las funcionalidades 'UI' que compartirán los distintos micro-frontend's. Para ello, implementar la nueva funcionalidad de toast cuando salten errores, utilizando el standard de 'domain' createDomainError()
## Key points
- Implementar funcionalidad de muestra de 'toast()' **en log-ui-ts** siempre que aparezca un error.
- [ ] Detectar llamada a createDomainError() y utilizar el campo 'friendlyDesc' para detectar cuando y que mensaje mostrar:
  - [ ] Si 'friendlyDesc' es 'd' -> NO mostrar mensaje
  - [ ] Crear mensajes predefinidos para el usuario con i18n para el resto de 'string Cases' ('tryAgainOrContact', etc...)
- [ ] Utilizar toast() con estilo 'error' pero utilizando los standards de shadcnui para adaptar-se a los distintos 'token style' disponibles.