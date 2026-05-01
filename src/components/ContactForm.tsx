import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().trim().min(1, "Tu nombre es requerido").max(100),
  email: z.string().trim().email("Correo inválido").max(255),
  phone: z
    .string()
    .trim()
    .max(30, "Teléfono demasiado largo")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(5, "Cuéntanos un poco más")
    .max(2000, "Mensaje demasiado largo"),
});

export const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Revisa los campos");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("contact_requests").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });
    setLoading(false);

    if (error) {
      toast.error("No pudimos enviar tu solicitud. Intenta de nuevo.");
      return;
    }

    toast.success("¡Recibido! Te contactaremos muy pronto. 🌿");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-sand rounded-[2.5rem] p-8 md:p-12 shadow-card text-left flex flex-col gap-6 w-full max-w-2xl"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name" className="text-xs uppercase tracking-widest text-ink/60">
            Nombre
          </Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Tu nombre"
            maxLength={100}
            className="h-14 rounded-2xl border-ink/15 bg-sand text-base"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-xs uppercase tracking-widest text-ink/60">
            Correo
          </Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="tu@correo.com"
            maxLength={255}
            className="h-14 rounded-2xl border-ink/15 bg-sand text-base"
            required
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-ink/60">
          Teléfono <span className="lowercase opacity-60">(opcional)</span>
        </Label>
        <Input
          id="phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          placeholder="+593 …"
          maxLength={30}
          className="h-14 rounded-2xl border-ink/15 bg-sand text-base"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message" className="text-xs uppercase tracking-widest text-ink/60">
          Cuéntanos sobre tu proyecto
        </Label>
        <Textarea
          id="message"
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Tipo de espacio, dimensiones de la ventana, ciudad…"
          maxLength={2000}
          rows={5}
          className="rounded-2xl border-ink/15 bg-sand text-base resize-none"
          required
        />
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={loading}
        className="rounded-full bg-ink text-sand hover:bg-ink/90 h-16 px-10 text-base self-start"
      >
        {loading ? "Enviando…" : "Enviar solicitud"}
      </Button>
    </form>
  );
};
