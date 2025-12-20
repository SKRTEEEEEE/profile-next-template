# Fix: Detección de Errores Silenciosos ('d')

## 🐛 Problema Detectado

El hook `useErrorToast` NO estaba respetando los errores silenciosos con `friendlyDesc: 'd'`. Al hacer click en el botón "Silent Error (friendlyDesc: 'd')" del componente demo, se mostraba un toast cuando **NO debería mostrar nada**.

## 🔍 Diagnóstico

### Flujo del Problema

1. **ErrorToastDemo** crea error con:
   ```typescript
   createDomainError(
     ErrorCodes.DATABASE_ACTION,
     ErrorToastDemo,
     "simulateSilentError",
     'd' // ← String literal 'd'
   );
   ```

2. **createDomainError (profile-domain package)** transforma `'d'` en:
   ```typescript
   return new Ctor(
     location,
     func,
     {  // ← friendlyDesc ya NO es 'd', es objeto IntlBase
       es: 'Inténtalo de nuevo más tarde o contáctanos si persiste',
       en: 'Try again after or contact us if persist',
       ca: "Torna-ho a provar més tard o contacta'ns si persisteix",
       de: 'Versuche es später erneut oder kontaktiere uns, falls das Problem weiterhin besteht',
     },
     Object.assign({}, meta, {
       desc: {
         es: 'Ups, ha ocurrido un error',
         en: 'Oops, an error occurred',
         ca: 'Ups, ha ocorregut un error',
         de: 'Ups, ein Fehler ist aufgetreten',
       },
     }),
   );
   ```

3. **useErrorToast** recibe el error con:
   - `friendlyDesc` = objeto IntlBase (NO es string `'d'`)
   - `meta.desc` = objeto con mensajes "Ups..."

4. La condición original NO detectaba esto:
   ```typescript
   if (friendlyDesc === "d") {  // ❌ NUNCA true porque friendlyDesc es objeto
     return;
   }
   ```

5. ✅ El hook seguía procesando y mostraba el toast

### Causa Raíz

El package `@skrteeeeee/profile-domain` **transforma internamente** el string `'d'` en un objeto `IntlBase` con mensajes completos. Esto es por diseño del package para mantener consistencia en la estructura de errores.

## ✅ Solución Implementada

### Estrategia

Como NO podemos modificar el package externo, debemos **detectar el patrón específico** que crea `createDomainError` cuando recibe `'d'`.

### Patrón de Detección

Un error silencioso (`'d'`) se reconoce por:

1. **meta.silent === true** (para futuras versiones del package)
2. **O** combinación específica:
   - `friendlyDesc` es objeto con `es: "Inténtalo de nuevo más tarde o contáctanos si persiste"`
   - `meta.desc` es objeto con `es: "Ups, ha ocurrido un error"`

### Código Implementado

**Archivo:** `log-ui-ts/lib/hooks/use-error-toast.tsx`

```typescript
// Caso 1: 'd' → NO mostrar toast (error silencioso)
// Detectar patrón creado por createDomainError cuando friendlyDesc === 'd':
// - meta.desc existe con "Ups, ha ocurrido un error"
// - friendlyDesc es objeto con "Inténtalo de nuevo más tarde..."
if (
  meta?.silent === true ||  // ← Para futuras versiones
  (
    typeof friendlyDesc === "object" && 
    "es" in friendlyDesc && 
    friendlyDesc.es === "Inténtalo de nuevo más tarde o contáctanos si persiste" &&
    meta?.desc && 
    typeof meta.desc === "object" && 
    "es" in meta.desc &&
    meta.desc.es === "Ups, ha ocurrido un error"
  )
) {
  return; // ← NO muestra toast
}

// Fallback: si friendlyDesc es 'd' literal
if (friendlyDesc === "d") {
  return;
}
```

### Mismo patrón en `showErrorToast`

Se implementó la misma lógica en la función helper `showErrorToast` para consistencia.

## 🧪 Verificación

### Tests
```bash
npm run lint
✅ 0 errores

npm run test:unit -- tests/pw/unit/hooks/use-error-toast.spec.ts
✅ 16/16 tests passed
```

### Prueba Manual con ErrorToastDemo

| Botón | friendlyDesc | Resultado Esperado | Estado |
|-------|--------------|-------------------|---------|
| Silent Error | `'d'` | ❌ NO muestra toast | ✅ CORRECTO |
| Predefined Error | `'credentials'` | ✅ Muestra toast i18n | ✅ CORRECTO |
| Custom Error | IntlBase object | ✅ Muestra toast custom | ✅ CORRECTO |
| Generic Error | undefined | ✅ Muestra toast genérico | ✅ CORRECTO |

## 📊 Impacto

- ✅ Errores silenciosos (`'d'`) ya NO muestran toast
- ✅ Backward compatible con futuro flag `meta.silent`
- ✅ No requiere modificar package de domain
- ✅ Mantiene compatibilidad con todos los casos de uso existentes

## 🔄 Alternativas Consideradas

### 1. ❌ Modificar package domain
**Descartado:** Sería un breaking change y afectaría a otros proyectos.

### 2. ❌ Detectar solo por friendlyDesc.es
**Descartado:** Muy frágil, podría coincidir con otros errores legítimos.

### 3. ✅ Detectar patrón combinado (Implementado)
**Elegido:** Detecta la combinación específica de `friendlyDesc.es` + `meta.desc.es` que solo se da cuando `createDomainError` recibe `'d'`.

### 4. 🔮 Agregar flag `meta.silent` en futuro
**Recomendado:** Si se actualiza el package, agregar `meta.silent = true` cuando `friendlyDesc === 'd'` haría la detección más robusta.

## 📝 Lecciones Aprendidas

1. **Package transformations**: Los packages externos pueden transformar datos antes de devolverlos
2. **Pattern matching**: Cuando no puedes modificar la fuente, detecta el patrón resultante
3. **Future-proofing**: Agregar soporte para flag futuro (`meta.silent`) mantiene compatibilidad
4. **Testing en producción**: El componente demo fue crucial para detectar el bug

## 🚀 Recomendaciones Futuras

### Para el package `@skrteeeeee/profile-domain`

Considerar agregar en futuras versiones:

```typescript
else if (friendlyDesc === 'd') {
  return new Ctor(
    location,
    func,
    { /* ... mensajes IntlBase ... */ },
    Object.assign({}, meta, {
      silent: true,  // ← Agregar flag explícito
      desc: { /* ... */ }
    }),
  );
}
```

Esto haría la detección más limpia:
```typescript
if (meta?.silent === true) {
  return; // ← Mucho más simple
}
```

## 🎯 Estado Final

✅ **Sistema de toast funcionando correctamente:**
- Errores silenciosos no muestran toast
- Errores predefinidos usan i18n
- Errores custom muestran mensajes directos
- Errores genéricos tienen fallback
- Compatible con futuras versiones del package
