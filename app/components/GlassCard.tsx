"use client";

import React from "react";

/**
 * GlassCard Component
 * A reusable translucent card with blur, glow hover, and soft shadows.
 * Works perfectly with dark backgrounds (like Job Scout’s theme).
 */
export default function GlassCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="group relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-lg p-5 shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:shadow-[0_8px_40px_rgba(80,200,120,0.25)] transition duration-300 ease-out">
      {/* Subtle gradient highlight overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-10 transition"></div>

      {/* Content */}
      <h2 className="text-xl font-semibold text-white mb-1">{title}</h2>
      {subtitle && <p className="text-sm text-neutral-400 mb-2">{subtitle}</p>}
      <div className="text-neutral-300 text-sm">{children}</div>
    </div>
  );
}
