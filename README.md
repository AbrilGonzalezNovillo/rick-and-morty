# Rick & Morty - Explorador de Personajes

Proyecto de estudio desarrollado para practicar y aprender tecnologias modernas de desarrollo web frontend.

## Sobre el proyecto

Aplicacion web que permite explorar los 826 personajes del universo de Rick & Morty. Los personajes se cargan automaticamente al iniciar sesion y se pueden filtrar por ID. Tambien incluye un sistema de favoritos.

## Tecnologias utilizadas

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Rick and Morty API** (https://rickandmortyapi.com)

## Funcionalidades

- Login con credenciales (autenticacion simulada)
- Listado completo de personajes con paginacion
- Filtro por ID de personaje
- Sistema de favoritos (agregar/quitar)
- Pagina dedicada de favoritos
- Diseno responsive
- Tema oscuro

## Como ejecutar

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

**Credenciales de acceso:** usuario@usuario.com / password

## Estructura del proyecto

```
src/
  app/           # Paginas y API routes (App Router)
  components/    # Componentes reutilizables
  context/       # Estado global (React Context)
  lib/           # Tipos, utilidades y datos
```
