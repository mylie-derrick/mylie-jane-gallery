import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { seo } from "@/lib/seo";

const formEndpoint = "https://formsubmit.co/ajax/myliederrick@icloud.com";

const searchSchema = z.object({
  painting: z.string().optional(),
});

export const Route = createFileRoute("/contact")({
  validateSearch: searchSchema,
  head: () =>
    seo({
      title: "Contact Mylie Jane Derrick | Painting Inquiries",
      description:
        "Contact Mylie Jane Derrick to inquire about an available original oil painting, request a custom commission, or send a note.",
      path: "/contact",
      image: "/images/mylie-studio-portrait.jpg",
    }),
  component: Contact,
});

function Contact() {
  const { painting } = Route.useSearch();
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError("Please fill out your name, email, and message before sending.");
      return;
    }

    formData.set("name", name);
    formData.set("email", email);
    formData.set("message", message);

    try {
      const response = await fetch(formEndpoint, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setSent(true);
        form.reset();
        return;
      }
    } catch {
      // Fall through to the friendly error below.
    }

    setError("Something went wrong sending your note. Please try again.");
  };

  return (
    <section className="mx-auto max-w-5xl px-6 py-16 md:px-10 md:py-24">
      <div className="grid gap-16 md:grid-cols-12">
        <header className="md:col-span-5">
          <p className="eyebrow" style={{ color: "var(--brand-cream)" }}>
            Inquiries
          </p>
          <h1
            className="mt-4 font-serif text-4xl md:text-5xl"
            style={{ color: "var(--brand-cream)" }}
          >
            Let's talk.
          </h1>
          <img
            src="/images/mylie-contact-portrait.jpg"
            alt="Mylie Jane Derrick smiling in a studio portrait."
            loading="lazy"
            decoding="async"
            className="mt-8 h-36 w-36 rounded-full object-cover md:h-40 md:w-40"
            style={{ objectPosition: "center 32%" }}
          />
          <div
            className="mt-8 space-y-5 text-base leading-relaxed"
            style={{ color: "rgba(247, 243, 236, 0.84)" }}
          >
            <p>
              Thanks for stopping by. If you're interested in a painting, have a question, or would
              like to talk about a commission, I'd love to hear from you.
            </p>
            <p>I personally respond to every message and usually reply within a day or two.</p>
          </div>
          <div className="mt-10 text-sm" style={{ color: "var(--brand-cream)" }}>
            <p className="eyebrow" style={{ color: "var(--brand-cream)" }}>
              Studio
            </p>
            <p className="mt-2">Salt Lake City, Utah</p>
            <p className="mt-1" style={{ color: "rgba(247, 243, 236, 0.78)" }}>
              myliederrick@icloud.com
            </p>
          </div>
        </header>

        <div className="md:col-span-7">
          {sent ? (
            <div className="border border-[color:var(--brand-footer-moss)] bg-[color:var(--brand-header-green)] p-10 text-center">
              <p className="eyebrow" style={{ color: "var(--brand-cream)" }}>
                Thank you
              </p>
              <h2 className="mt-4 font-serif text-2xl" style={{ color: "var(--brand-cream)" }}>
                Your note is on its way.
              </h2>
              <p className="mt-3 text-sm" style={{ color: "rgba(247, 243, 236, 0.78)" }}>
                I'll be in touch soon.
              </p>
            </div>
          ) : (
            <form
              action={formEndpoint}
              method="POST"
              onSubmit={onSubmit}
              className="space-y-7"
            >
              <input type="hidden" name="_subject" value="New Mylie Jane Design inquiry" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />
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
                  className="block text-xs uppercase tracking-[0.22em] text-[color:rgba(247,243,236,0.78)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="mt-3 w-full border border-[color:var(--brand-footer-moss)] bg-transparent px-4 py-3 text-base text-[color:var(--brand-cream)] placeholder:text-[color:rgba(247,243,236,0.62)] focus:border-[color:var(--brand-cream)] focus:outline-none"
                  placeholder="Tell me a little about what you're hoping for."
                />
              </div>
              {error && (
                <p className="text-sm leading-relaxed text-[color:var(--brand-cream)]">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="bg-[color:var(--brand-header-green)] px-7 py-3 text-sm uppercase tracking-[0.22em] text-[color:var(--brand-cream)] transition-colors hover:bg-[color:var(--brand-footer-moss)]"
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
        className="block text-xs uppercase tracking-[0.22em] text-[color:rgba(247,243,236,0.78)]"
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
        className="mt-3 w-full border border-[color:var(--brand-footer-moss)] bg-transparent px-4 py-3 text-base text-[color:var(--brand-cream)] placeholder:text-[color:rgba(247,243,236,0.62)] focus:border-[color:var(--brand-cream)] focus:outline-none"
      />
    </div>
  );
}
