"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check } from "lucide-react";

interface CopyEmailButtonProps {
  email: string;
  /** Extra className forwarded to the outer <button> wrapper */
  className?: string;
  /** Display mode: "icon-only" shows just the Mail/Check icon; "full" shows icon + address */
  variant?: "icon-only" | "full";
}

/**
 * Copy-to-clipboard email button.
 *
 * - Primary click: copies email to clipboard, icon morphs Mail→Check for 1.5 s.
 * - If navigator.clipboard is unavailable, falls back to window.location (mailto:).
 * - A "Copied!" tooltip fades in/out via AnimatePresence.
 * - `:focus-visible` inherits the global accent-green outline from globals.css.
 */
export function CopyEmailButton({
  email,
  className = "",
  variant = "full",
}: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    async (e: React.MouseEvent | React.KeyboardEvent) => {
      // If keyboard: only trigger on Enter or Space
      if ("key" in e && e.key !== "Enter" && e.key !== " ") return;

      try {
        await navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
        // Clipboard blocked — fall back to mailto
        window.location.href = `mailto:${email}`;
      }
    },
    [email]
  );

  return (
    <span className={`copy-email-wrapper ${className}`} style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <button
        type="button"
        onClick={handleCopy}
        onKeyDown={handleCopy}
        aria-label={copied ? "Email copied!" : `Copy email address ${email}`}
        className="copy-email-btn"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "none",
          border: "none",
          padding: "0.25rem",
          cursor: "pointer",
          color: "var(--accent-green)",
          borderRadius: "0.25rem",
          transition: "color 0.15s ease",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            transition: "transform 0.2s ease",
            transform: copied ? "scale(1.15)" : "scale(1)",
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                style={{ display: "flex" }}
              >
                <Check size={18} />
              </motion.span>
            ) : (
              <motion.span
                key="mail"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.15 }}
                style={{ display: "flex" }}
              >
                <Mail size={18} />
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        {variant === "full" && (
          <span style={{ fontFamily: "var(--font-jetbrains-mono, monospace)", fontSize: "0.875rem" }}>
            {email}
          </span>
        )}
      </button>

      {/* "Copied!" tooltip */}
      <AnimatePresence>
        {copied && (
          <motion.span
            key="tooltip"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            aria-live="polite"
            style={{
              position: "absolute",
              bottom: "calc(100% + 6px)",
              left: "50%",
              transform: "translateX(-50%)",
              whiteSpace: "nowrap",
              backgroundColor: "var(--bg-elevated)",
              border: "1px solid var(--border)",
              color: "var(--accent-green)",
              fontSize: "0.75rem",
              fontFamily: "var(--font-jetbrains-mono, monospace)",
              padding: "0.25rem 0.625rem",
              borderRadius: "0.25rem",
              pointerEvents: "none",
            }}
          >
            Copied!
          </motion.span>
        )}
      </AnimatePresence>

      {/* Mailto fallback — visually subtle secondary link */}
      <a
        href={`mailto:${email}`}
        aria-label={`Open mail client to send email to ${email}`}
        tabIndex={-1}
        style={{
          fontSize: "0.65rem",
          color: "var(--text-dim)",
          textDecoration: "none",
          opacity: 0.6,
          display: variant === "full" ? "inline" : "none",
        }}
        title="Open in mail client"
      >
        ↗
      </a>
    </span>
  );
}
