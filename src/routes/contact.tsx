import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";

const searchSchema = z.object({
  painting: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Inquiries — Mylie Jane Design" },
      {
        name: "description",
        content:
          "Ask about an available painting, request a commission, or send a note to Mylie Jane Derrick.",
      },
      { property: "og:title", content: "Inquiries — Mylie Jane Design" },
      {
        property: "og:description",
        content: "Ask about a painting, request a commission, or just say hello.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { painting } = Route.useSearch();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const formspreeEndpoint = (import.meta.env as Record<string, string | undefined>)
    .NEXT_PUBLIC_FORMSPREE_ENDPOINT;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // TODO for Mylie: add NEXT_PUBLIC_FORMSPREE_ENDPOINT to your environment with the endpoint from Formspree.
    if (!formspreeEndpoint) {
      setError(
        "This form is ready for Formspree. Add NEXT_PUBLIC_FORMSPREE_ENDPOINT to send messages.",
      );
      return;
    }

    const form = e.currentTarget;
    const response = await fetch(formspreeEndpoint, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setSent(true);
      form.reset();
      return;
    }

    setError("Something went wrong sending your note. Please try again.");
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-16 md:grid-cols-12">
        <header className="md:col-span-5">
          <p className="eyebrow">Inquiries</p>
          <h1 className="mt-4 font-serif text-4xl text-foreground md:text-5xl">Let's talk.</h1>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              Every painting is one of a kind, so purchases happen through a short conversation.
              Send a note about a piece you're drawn to or just say hello.
            </p>
            <p>I reply personally — usually within a day or two.</p>
          </div>
          <div className="mt-10 text-sm text-foreground">
            <p className="eyebrow">Studio</p>
            <p className="mt-2">Salt Lake City, Utah</p>
            <p className="mt-1 text-muted-foreground">hello@myliejanedesign.com</p>
          </div>
        </header>

        <div className="md:col-span-7">
          {sent ? (
            <div className="border border-border bg-card p-10 text-center">
              <p className="eyebrow">Thank you</p>
              <h2 className="mt-4 font-serif text-2xl text-foreground">Your note is on its way.</h2>
              <p className="mt-3 text-sm text-muted-foreground">I'll be in touch soon.</p>
            </div>
          ) : (
            <form
              action={formspreeEndpoint}
              method="POST"
              onSubmit={onSubmit}
              className="space-y-7"
            >
              <Field label="Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field
                label="Which painting (optional)"
                name="painting"
                defaultValue={painting ?? ""}
                placeholder="Title of a piece, or leave blank"
              />
              <div>
                <label
                  htmlFor="message"
                  className="block text-xs uppercase tracking-[0.22em] text-muted-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="mt-3 w-full border border-input bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
                  placeholder="Tell me a little about what you're hoping for."
                />
              </div>
              {error && (
                <p className="text-sm leading-relaxed text-[color:var(--brand-forest-green)]">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="bg-primary px-7 py-3 text-sm uppercase tracking-[0.22em] text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Send note
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block text-xs uppercase tracking-[0.22em] text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-3 w-full border border-input bg-transparent px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-foreground focus:outline-none"
      />
    </div>
  );
}
