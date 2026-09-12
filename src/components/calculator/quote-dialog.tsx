import { useEffect, useState, type FormEvent } from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Estimate } from "@/lib/calculator";
import { formatArea, formatRange } from "@/lib/utils";

type QuoteDialogProps = {
  open: boolean;
  onClose: () => void;
  estimate: Estimate;
};

const SUCCESS_COPY = "Dziękujemy! Twoje zapytanie zostało wysłane.";
const ERROR_COPY = "Nie udało się wysłać formularza. Spróbuj ponownie.";

export function QuoteDialog({ open, onClose, estimate }: QuoteDialogProps) {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setSent(false);
      setSending(false);
      setError(null);
    }
  }, [open]);

  if (!open) return null;

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (sending) return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const city = String(data.get("city") ?? "").trim();
    const note = String(data.get("message") ?? "").trim();

    const accessKey = String(import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ?? "").trim();
    if (!accessKey) {
      setError(ERROR_COPY);
      return;
    }

    setSending(true);
    setError(null);

    const extras =
      estimate.extras.length > 0 ? estimate.extras.map((line) => line.label).join(", ") : "Brak";

    const message = [
      "DANE KLIENTA:",
      `Imię: ${name}`,
      `E-mail: ${email}`,
      `Telefon: ${phone}`,
      city ? `Miasto: ${city}` : null,
      note ? `Wiadomość: ${note}` : null,
      "",
      "DANE Z KALKULATORA:",
      `Powierzchnia mieszkania: ${formatArea(estimate.area)}`,
      `Liczba pokoi: ${estimate.rooms.name}`,
      `Liczba łazienek: ${estimate.baths.name}`,
      `Rodzaj remontu: ${estimate.renovation.name}`,
      `Standard materiałów: ${estimate.standard.name}`,
      `Wybrane prace dodatkowe: ${extras}`,
      `Szacowany koszt remontu: ${formatRange(estimate.totalLow, estimate.totalHigh)}`,
      `Szacowany czas realizacji: ${estimate.weeksMin}–${estimate.weeksMax} tygodni`,
    ]
      .filter((line) => line !== null)
      .join("\n");

    try {
      const payload = new FormData();
      payload.append("access_key", accessKey);
      payload.append("subject", "Nowe zapytanie — wycena remontu Livora");
      payload.append("from_name", "Livora");
      payload.append("name", name);
      payload.append("email", email);
      payload.append("phone", phone);
      payload.append("message", message);
      payload.append("botcheck", "");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: payload,
      });
      const result = (await response.json()) as { success?: boolean };
      if (result.success) {
        setSent(true);
      } else {
        setError(ERROR_COPY);
      }
    } catch {
      setError(ERROR_COPY);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-navy/50"
        aria-label="Zamknij"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-title"
        className="relative w-full max-w-md rounded-3xl bg-card p-6 shadow-navy sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 flex size-11 items-center justify-center rounded-full text-muted hover:bg-paper"
          aria-label="Zamknij"
        >
          <X className="size-5" />
        </button>
        {sent ? (
          <div className="py-4 text-center">
            <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-lime text-lime-ink">
              <Check className="size-6" strokeWidth={2.5} />
            </span>
            <h2 id="quote-title" className="mt-4 font-display text-2xl font-bold tracking-tight">
              {SUCCESS_COPY}
            </h2>
            <Button className="mt-6" onClick={onClose}>
              Zamknij
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <div>
              <h2 id="quote-title" className="font-display text-2xl font-bold tracking-tight">
                Poproś o dokładną wycenę
              </h2>
              <p className="mt-1 text-sm text-muted">Zostaw kontakt. Dołączymy Twój szacunek z kalkulatora.</p>
            </div>
            <Field name="name" label="Imię" autoComplete="name" required />
            <Field name="phone" label="Telefon" type="tel" autoComplete="tel" required />
            <Field name="email" label="E-mail" type="email" autoComplete="email" required />
            <Field name="city" label="Miasto" autoComplete="address-level2" />
            <Button type="submit" size="lg" className="mt-2" disabled={sending}>
              Wyślij zapytanie
            </Button>
            {error ? <p className="text-sm font-medium text-navy">{error}</p> : null}
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required,
  autoComplete,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-1.5 h-12 w-full rounded-xl bg-paper px-3 text-base text-ink outline-none ring-1 ring-line focus:ring-2 focus:ring-blue"
      />
    </label>
  );
}
