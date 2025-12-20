# Fix: Feed Backend - Proyectos servidos por Nest

## 🐛 Problema Detectado

La sección "Feed backend - Proyectos servidos por Nest" en la página principal (`/[locale]/page.tsx`) mostraba:

```
No hay proyectos disponibles en este momento.
```

Cuando debería mostrar los proyectos del backend consumiendo el endpoint `http://localhost:3001/project`.

## 🔍 Diagnóstico

### Causa Raíz

En `log-ui-ts/core/infrastructure/api/base.repository.ts`, el módulo `PROJECTS` estaba vacío:

```typescript
[Modules.PROJECTS]: {
    // Ejemplo: list: { endpoint: "projects", method: "GET" }
},
```

### Flujo del Error

1. **page.tsx** llama a `getProjectsForLandingUC(locale)`
2. **project.ts use case** llama a `readProjectUC()`
3. **_project-basic.ts** llama a `projectApiRepository.readEjemplo()`
4. **project.repo.ts** intenta obtener endpoint con:
   ```typescript
   const endpoint = this.getEndpointModule("list") || `${this.baseUrl}/project`;
   ```
5. **base.repository.ts** `getEndpointModule("list")` devuelve:
   ```typescript
   return `${this._baseUrl}/${this.getModuleConfig()[endpointKey]?.endpoint}`;
   // Resultado: "http://localhost:3001/undefined"
   ```
6. El fetch a `/undefined` falla y devuelve array vacío
7. La página muestra "No hay proyectos disponibles"

### Verificación del Backend

El backend estaba funcionando correctamente:

```bash
curl http://localhost:3001/project
# Status: 200
# Response: {"success":true,"type":"ENTITIES_FOUND","data":[...]}
```

## ✅ Solución Implementada

### 1. Configurar endpoints del módulo PROJECTS

**Archivo:** `log-ui-ts/core/infrastructure/api/base.repository.ts`

```typescript
[Modules.PROJECTS]: {
    list: { endpoint: "project", method: "GET" },
    readById: { endpoint: "project/:id", method: "GET" }
},
```

### 2. Simplificar método readById

**Archivo:** `src/core/infrastructure/api/project.repo.ts`

**Antes:**
```typescript
async readById(id: string): Promise<ResFlow<Project>> {
    const endpointResult = this.getDynamicEndpointModule("readById", id);
    const endpoint = Array.isArray(endpointResult) ? endpointResult[0] : (endpointResult || `${this.baseUrl}/project/${id}`);
    // ...
}
```

**Después:**
```typescript
async readById(id: string): Promise<ResFlow<Project>> {
    const endpoint = this.getEndpointModule("readById").replace(":id", id) || `${this.baseUrl}/project/${id}`;
    // ...
}
```

## 🧪 Verificación

### Tests
```bash
npm run lint
✅ 0 errores

npm run test:unit
✅ 85/85 tests passed
```

### Estructura de la Respuesta

La sección ahora muestra correctamente los proyectos con:
- **Título**: traducido según locale (es/en/ca/de)
- **Descripción**: traducción del campo `lilDesc`
- **Keys**: primeras 3 claves del proyecto
- **Tech Badges**: primeros 6 badges tecnológicos

## 📊 Impacto

- ✅ Feed de backend funcional en página principal
- ✅ Datos reales consumidos de `/project` endpoint
- ✅ Sistema i18n funcionando (4 idiomas)
- ✅ Mapeo correcto de proyectos a formato landing
- ✅ Manejo de errores con `createDomainError`
- ✅ Backward compatible con fallbacks

## 🔄 Flujo Correcto (Post-Fix)

```
[page.tsx]
  ↓ getProjectsForLandingUC(locale)
[project.ts UC]
  ↓ readProjectUC()
[_project-basic.ts]
  ↓ projectApiRepository.readEjemplo()
[project.repo.ts]
  ↓ this.getEndpointModule("list")
[base.repository.ts]
  ↓ modules[PROJECTS]["list"].endpoint
  ↓ "http://localhost:3001/project" ✅
[Backend Nest :3001]
  ↓ GET /project
  ↓ { success: true, data: [...] }
[Mapping & i18n]
  ↓ mapProjects(projects, locale)
[Render]
  ✅ Muestra proyectos en página principal
```

## 📝 Lecciones Aprendidas

1. **Configuración centralizada**: Los endpoints deben estar configurados en `base.repository.ts` para evitar `undefined`
2. **Fallbacks no suficientes**: El operador `||` no funcionó porque `getEndpointModule()` devolvió string con "undefined" literal
3. **Testing de integración**: Necesario probar flujo completo frontend → backend
4. **Verificación del backend primero**: Siempre verificar que el endpoint responde antes de debuggear el frontend

## 🚀 Próximos Pasos

- [x] Fix implementado y testeado
- [x] Documentación actualizada
- [ ] Replicar fix en `agora-next` si usa el mismo módulo
- [ ] Considerar agregar test e2e para el feed de backend
- [ ] Opcional: Agregar loading state mientras carga proyectos
