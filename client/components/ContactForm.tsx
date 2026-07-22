"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-md border border-[var(--color-teal)] bg-[var(--color-surface)] px-6 py-8 text-center">
        <p className="font-mono text-sm text-[var(--color-teal)]">
          MESSAGE SENT
        </p>
        <p className="mt-2 text-sm text-[var(--color-text-dim)]">
          Thanks for reaching out. I&apos;ll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block font-mono text-xs tracking-wider text-[var(--color-text-dim)]">
          NAME
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          maxLength={100}
          className="mt-2 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-amber)]"
        />
      </div>

      <div>
        <label htmlFor="email" className="block font-mono text-xs tracking-wider text-[var(--color-text-dim)]">
          EMAIL
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-amber)]"
        />
      </div>

      <div>
        <label htmlFor="message" className="block font-mono text-xs tracking-wider text-[var(--color-text-dim)]">
          MESSAGE
        </label>
        <textarea
          id="message"
          name="message"
          required
          maxLength={2000}
          rows={5}
          className="mt-2 w-full resize-none rounded-md border border-[var(--color-border)] bg-[var(--color-surface)] px-4 py-3 text-sm text-[var(--color-text)] outline-none focus:border-[var(--color-amber)]"
        />
      </div>

      {status === "error" && (
        <p className="font-mono text-xs text-red-400">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-md bg-[var(--color-amber)] px-6 py-3 font-mono text-sm font-medium text-[#0B0E11] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === "loading" ? "SENDING..." : "SEND MESSAGE"}
      </button>
    </form>
  );
}
