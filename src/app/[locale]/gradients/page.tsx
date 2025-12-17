import { getTranslations } from "next-intl/server";

export default async function GradientsPage() {
  const t = await getTranslations("gradients");

  return (
    <main className="min-h-dvh bg-background text-foreground p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <header className="space-y-4">
          <h1 className="text-4xl font-bold">{t("title")}</h1>
          <p className="text-lg text-muted-foreground">{t("description")}</p>
        </header>
        
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-xl font-semibold mb-4">Gradient Example</h2>
            <div 
              className="h-32 rounded-md" 
              style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
