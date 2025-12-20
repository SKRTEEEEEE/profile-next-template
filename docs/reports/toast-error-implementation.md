# Sistema de Toast para Errores DomainError

## 📋 Resumen
Implementación completa de un sistema de toasts automáticos para errores `DomainError` con soporte i18n (4 idiomas) y adaptación a los 6 temas de shadcn/ui.

## ✅ Implementado

### 1. Hook `useErrorToast`
**Ubicación:** `log-ui-ts/lib/hooks/use-error-toast.tsx`

**Características:**
- Detecta automáticamente errores DomainError
- Muestra toasts con sonner integrado a los temas
- Soporte i18n completo (es, en, ca, de)
- Callback opcional `onError` para lógica adicional

**Comportamiento según `friendlyDesc`:**
| friendlyDesc | Comportamiento |
|--------------|----------------|
| `'d'` | NO muestra toast (error silencioso para logs) |
| `'tryAgainOrContact'` | Usa traducción i18n predefinida |
| `'credentials'` | Usa traducción i18n predefinida |
| `'credentials--mock'` | Usa traducción i18n predefinida |
| `IntlBase` object | Muestra mensaje directo según locale |
| `undefined` | Muestra mensaje genérico |

**Uso:**
```tsx
"use client";
import { useState } from "react";
import { useErrorToast } from "@log-ui/lib/hooks";
import type { DomainError } from "@skrteeeeee/profile-domain";

export function MyComponent() {
  const [error, setError] = useState<DomainError | null>(null);
  
  // Detecta y muestra toast automáticamente
  useErrorToast(error);

  const handleAction = async () => {
    try {
      await someAction();
    } catch (err) {
      setError(err as DomainError);
    }
  };
}
```

**Uso directo (sin hook):**
```tsx
import { showErrorToast } from "@log-ui/lib/hooks";
import { useLocale, useTranslations } from "next-intl";

const locale = useLocale();
const t = useTranslations();

try {
  await someAction();
} catch (error) {
  showErrorToast(error as DomainError, locale, t);
}
```

### 2. Traducciones i18n
**Ubicación:** `log-ui-ts/i18n/{es,en,ca,de}/common.json`

**Estructura agregada:**
```json
{
  "errors": {
    "generic": {
      "title": "Título del error genérico",
      "description": "Descripción del error genérico"
    },
    "predefined": {
      "tryAgainOrContact": {
        "title": "...",
        "description": "..."
      },
      "credentials": {
        "title": "...",
        "description": "..."
      },
      "credentials--mock": {
        "title": "...",
        "description": "..."
      }
    }
  }
}
```

### 3. Componente de Ejemplo
**Ubicación:** `log-ui-ts/components/examples/error-toast-demo.tsx`

Componente demo que muestra todos los tipos de errores:
- Silent Error (`'d'`)
- Predefined Error (`'credentials'`)
- Custom Error (IntlBase)
- Generic Error (undefined)

### 4. Integración en Componente Existente
**Actualizado:** `log-ui-ts/components/site-header/user-form-dialog.tsx`

Cambios:
- Agregado estado `error` de tipo `DomainError | null`
- Integrado `useErrorToast(error)` para detección automática
- Captura de errores en `setImageData()` y `onSubmit()`
- Reseteo de error en `onSubmit()` antes de acciones

### 5. Export Central
**Ubicación:** `log-ui-ts/lib/hooks/index.ts`

```typescript
export { useErrorToast, showErrorToast } from "./use-error-toast";
export { useMediaQuery } from "./use-media-query";
```

### 6. Documentación
**Actualizado:** `log-ui-ts/README.md`

Sección completa agregada sobre el sistema de toast con ejemplos de uso.

### 7. Tests
**Ubicación:** `tests/pw/unit/hooks/use-error-toast.spec.ts`

**16 tests implementados:**
- ✅ Verificación de existencia del archivo
- ✅ Exports correctos
- ✅ Imports de dependencias
- ✅ Manejo de caso `'d'` (silent)
- ✅ Manejo de strings predefinidos
- ✅ Manejo de IntlBase object
- ✅ Manejo de undefined (genérico)
- ✅ Uso de useEffect
- ✅ Validación de tipo DomainError
- ✅ Soporte de callback onError
- ✅ Tipos TypeScript correctos
- ✅ Traducciones i18n (4 idiomas)
- ✅ Export desde index

**Resultado:** 16/16 passed ✅

## 🎨 Integración con Temas

El sistema usa el componente `Toaster` de sonner que ya está configurado con:
- Variables CSS de shadcn/ui (`--popover`, `--popover-foreground`, `--border`)
- Soporte para los 6 temas: light-grays, dark-grays, light-gold, dark-gold, light-soft, dark-soft
- Toggle automático con next-themes

**Ubicación:** `src/components/ui/sonner.tsx`
```tsx
<Sonner
  theme={theme}
  style={{
    "--normal-bg": "var(--popover)",
    "--normal-text": "var(--popover-foreground)",
    "--normal-border": "var(--border)",
  }}
/>
```

## 📊 Resultados de Tests

### Lint
```bash
npm run lint
✅ Passed (0 warnings, 0 errors)
```

### Tests Unitarios
```bash
npm run test:unit
✅ 69 tests passed (todos los existentes)

npm run test:unit -- tests/pw/unit/hooks/use-error-toast.spec.ts
✅ 16 tests passed (nuevos)
```

## 🔄 Flujo de Errores

```
[Controller/Repository/Service]
  ↓ throw createDomainError(...)
[Component try/catch]
  ↓ setError(err)
[useErrorToast hook]
  ↓ detecta DomainError
  ↓ verifica friendlyDesc
  ↓ obtiene traducción según locale
[toast.error()]
  ↓ muestra toast adaptado al tema
[Usuario ve el mensaje]
```

## 🎯 Objetivos Cumplidos

- ✅ Implementar funcionalidad de toast en log-ui-ts
- ✅ Detectar llamada a createDomainError()
- ✅ Usar campo friendlyDesc para determinar mensaje
- ✅ NO mostrar toast cuando friendlyDesc === 'd'
- ✅ Crear mensajes predefinidos con i18n
- ✅ Utilizar toast() con estilo error
- ✅ Adaptarse a los 6 temas de shadcn/ui
- ✅ Mantener compatibilidad con arquitectura Clean Architecture
- ✅ Tests completos (16 nuevos)
- ✅ Documentación actualizada

## 📝 Notas de Implementación

1. **Clean Architecture respetada**: El hook está en Presentation Layer (framework-specific)
2. **DomainError intacto**: No se modificó el package de domain
3. **Backward compatible**: Los componentes existentes siguen funcionando
4. **Template-ready**: Listo para usar en agora-next y profile-next
5. **Type-safe**: TypeScript estricto en todo el flujo

## 🚀 Próximos Pasos

1. Probar visualmente en dev server (`npm run dev`)
2. Replicar en agora-next y profile-next si es necesario
3. Considerar agregar más casos predefinidos según necesidades
4. Opcional: Agregar toast.success() para operaciones exitosas
