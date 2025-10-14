"use client";
import { useState } from "react";

export default function ContactPage() {
  const [status, setStatus] = useState("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if (!res.ok) throw new Error("Bad response");
      setStatus("ok");
      (e.target as HTMLFormElement).reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section>
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-sm text-neutral-400">This demo logs your message server-side.</p>

      <form onSubmit={onSubmit} className="grid gap-3 max-w-xl mt-4">
        <input className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"
               name="name" placeholder="Your name" required />
        <input className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"
               name="email" type="email" placeholder="Your email" required />
        <textarea className="bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"
                  name="message" rows={5} placeholder="Your message" required />
        <button className="inline-flex px-4 py-2 bg-emerald-300 text-black font-bold rounded-lg"
                disabled={status === "sending"}>
          {status === "sending" ? "Sending..." : "Send"}
        </button>
        {status === "ok" && <p className="text-sm text-emerald-300">✅ Message sent!</p>}
        {status === "error" && <p className="text-sm text-red-300">❌ Something went wrong.</p>}
      </form>
    </section>
  );
}
