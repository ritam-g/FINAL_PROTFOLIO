"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import { profile } from "@/data/profile";
import { SectionWrapper } from "@/components/layout/SectionWrapper";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { fadeInUp } from "@/lib/utils/animations";
import { cn } from "@/lib/utils/cn";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({});

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "name" && !value.trim()) error = "Name is required";
    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = "Please enter a valid email";
    }
    if (name === "message" && !value.trim()) error = "Message is required";
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (touched[name as keyof typeof touched]) {
      validateField(name, value);
    }
  };
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData) as Record<string, string>;
    
    // Validate all fields before submit
    const isNameValid = validateField("name", data.name);
    const isEmailValid = validateField("email", data.email);
    const isMessageValid = validateField("message", data.message);
    
    setTouched({ name: true, email: true, message: true });
    
    if (!isNameValid || !isEmailValid || !isMessageValid) return;

    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      });
      
      if (res.ok) setStatus("success");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  const inputClass = (fieldName: keyof typeof errors) => cn(
    "bg-background px-4 py-2.5 border focus:border-accent rounded-md focus:outline-none w-full text-primary transition-colors",
    errors[fieldName] && touched[fieldName] ? "border-accent-rose focus:border-accent-rose" : "border-border-color"
  );

  return (
  <SectionWrapper id="contact">
    <SectionHeading title="Get In Touch" subtitle="Contact" />

    <div className="grid md:grid-cols-[1fr_2fr] border border-border-color divide-border-color rounded-2xl md:divide-x divide-y md:divide-y-0 overflow-hidden">

      {/* LEFT PANE */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col justify-center bg-background p-8 md:p-10"
      >
        <p className="mb-6 text-muted leading-relaxed">
          I&apos;m currently open to new opportunities. Whether you have a question, a project idea, or just want to say hi, I&apos;ll try my best to get back to you!
        </p>
        <div className="flex items-center gap-2 mb-8 font-mono text-accent text-sm">
          <span>Usually responds within 24 hours</span>
        </div>

        <Button asChild variant="outline" className="justify-start gap-3 w-full">
          <a href={`mailto:${profile.email}`}>
            <Mail size={18} />
            {profile.email}
          </a>
        </Button>
      </motion.div>

      {/* RIGHT PANE (form) */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="bg-background p-6 md:p-8"
      >
        {status === "success" ? (
          <div className="flex flex-col justify-center items-center py-12 h-full text-center">
            <CheckCircle2 size={48} className="mb-4 text-success" />
            <h3 className="mb-2 font-bold text-primary text-xl">Message Sent!</h3>
            <p className="mb-6 text-muted">Thanks for reaching out. I&apos;ll get back to you soon.</p>
            <Button onClick={() => setStatus("idle")}>Send Another</Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Honeypot: hidden from real users, catches bots that auto-fill all fields */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px]"
            />
            <div>
              <label htmlFor="name" className="block mb-2 font-medium text-primary text-sm">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className={inputClass("name")}
                placeholder="John Doe"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.name && touched.name && <p className="mt-1.5 text-xs text-accent-rose">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 font-medium text-primary text-sm">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className={inputClass("email")}
                placeholder="john@example.com"
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.email && touched.email && <p className="mt-1.5 text-xs text-accent-rose">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block mb-2 font-medium text-primary text-sm">Message</label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={cn(inputClass("message"), "resize-none")}
                placeholder="Your message..."
                onBlur={handleBlur}
                onChange={handleChange}
              />
              {errors.message && touched.message && <p className="mt-1.5 text-xs text-accent-rose">{errors.message}</p>}
            </div>
            <Button type="submit" disabled={status === "loading"} className="w-full">
              {status === "loading" ? (
                <><Loader2 size={18} className="mr-2 animate-spin" /> Sending...</>
              ) : "Send Message"}
            </Button>
            {status === "error" && (
              <p className="mt-2 text-sm text-center text-accent-rose">Failed to send message. Please try again or use direct email.</p>
            )}
          </form>
        )}
      </motion.div>

    </div>
  </SectionWrapper>
  );
}
