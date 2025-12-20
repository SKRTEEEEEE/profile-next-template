import { test, expect } from "@playwright/test";
import { readFileSync } from "fs";
import { join } from "path";

test.describe("useErrorToast Hook", () => {
  const hookPath = join(process.cwd(), "log-ui-ts/lib/hooks/use-error-toast.tsx");

  test("hook file should exist", () => {
    expect(() => readFileSync(hookPath, "utf-8")).not.toThrow();
  });

  test("should export useErrorToast and showErrorToast", () => {
    const content = readFileSync(hookPath, "utf-8");
    
    expect(content).toContain("export function useErrorToast");
    expect(content).toContain("export function showErrorToast");
  });

  test("should import required dependencies", () => {
    const content = readFileSync(hookPath, "utf-8");
    
    // Verificar imports críticos
    expect(content).toContain('import { useEffect } from "react"');
    expect(content).toContain('import { useLocale, useTranslations } from "next-intl"');
    expect(content).toContain('import { toast } from "sonner"');
    expect(content).toContain('import type { DomainError } from "@skrteeeeee/profile-domain"');
  });

  test("should handle friendlyDesc 'd' case (silent error)", () => {
    const content = readFileSync(hookPath, "utf-8");
    
    // Verificar que existe lógica para NO mostrar toast cuando friendlyDesc === 'd'
    expect(content).toContain('friendlyDesc === "d"');
    expect(content).toContain("return");
  });

  test("should handle predefined string cases", () => {
    const content = readFileSync(hookPath, "utf-8");
    
    // Verificar que maneja strings predefinidos
    expect(content).toContain("typeof friendlyDesc === \"string\"");
    expect(content).toContain("predefined.");
  });

  test("should handle IntlBase object case", () => {
    const content = readFileSync(hookPath, "utf-8");
    
    // Verificar que maneja objetos con locale keys
    expect(content).toContain("typeof friendlyDesc === \"object\"");
    expect(content).toContain("locale in friendlyDesc");
  });

  test("should handle undefined friendlyDesc (generic error)", () => {
    const content = readFileSync(hookPath, "utf-8");
    
    // Verificar que existe fallback para errores genéricos
    expect(content).toContain("!friendlyDesc");
    expect(content).toContain("generic");
  });

  test("should use useEffect hook", () => {
    const content = readFileSync(hookPath, "utf-8");
    
    expect(content).toContain("useEffect(");
    expect(content).toContain("if (!error) return");
  });

  test("should validate DomainError type", () => {
    const content = readFileSync(hookPath, "utf-8");
    
    // Verificar que existe verificación de tipo DomainError
    expect(content).toContain('"type" in error');
    expect(content).toContain('"friendlyDesc" in error');
  });

  test("should support optional onError callback", () => {
    const content = readFileSync(hookPath, "utf-8");
    
    expect(content).toContain("onError?:");
    expect(content).toContain("if (onError)");
  });

  test("should have proper TypeScript types", () => {
    const content = readFileSync(hookPath, "utf-8");
    
    // Verificar definiciones de tipos
    expect(content).toContain("error: Error | DomainError | null");
    expect(content).toContain('locale: "es" | "en" | "ca" | "de"');
  });
});

test.describe("Error Toast i18n Files", () => {
  const locales = ["es", "en", "ca", "de"];

  for (const locale of locales) {
    test(`${locale}/common.json should have error translations`, () => {
      const i18nPath = join(process.cwd(), `log-ui-ts/i18n/${locale}/common.json`);
      const content = JSON.parse(readFileSync(i18nPath, "utf-8"));

      // Verificar estructura de errors
      expect(content.errors).toBeDefined();
      expect(content.errors.generic).toBeDefined();
      expect(content.errors.generic.title).toBeDefined();
      expect(content.errors.generic.description).toBeDefined();

      // Verificar casos predefinidos
      expect(content.errors.predefined).toBeDefined();
      expect(content.errors.predefined.tryAgainOrContact).toBeDefined();
      expect(content.errors.predefined.credentials).toBeDefined();
      expect(content.errors.predefined["credentials--mock"]).toBeDefined();
    });
  }
});

test.describe("Hook Index Export", () => {
  test("should be exported from hooks index", () => {
    const indexPath = join(process.cwd(), "log-ui-ts/lib/hooks/index.ts");
    
    // Verificar que el archivo existe
    expect(() => readFileSync(indexPath, "utf-8")).not.toThrow();
    
    const content = readFileSync(indexPath, "utf-8");
    
    // Verificar exports
    expect(content).toContain('export { useErrorToast, showErrorToast } from "./use-error-toast"');
  });
});
