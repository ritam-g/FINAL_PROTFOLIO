'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Loader2, CheckCircle2, AlertTriangle } from 'lucide-react'
import { profile } from '@/data/profile'
import { SectionWrapper } from '@/components/layout/SectionWrapper'
import { SectionHeading } from '@/components/shared/SectionHeading'
import { Button } from '@/components/ui/Button'
import { CopyEmailButton } from '@/components/ui/CopyEmailButton'
import { fadeInUp } from '@/lib/utils/animations'
import { cn } from '@/lib/utils/cn'

/* ─── Ping counter — shows elapsed time since page loaded ────────────────── */
function PingCounter() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSeconds((s) => s + 1), 1000)
    return () => clearInterval(id)
  }, [])

  const fmt = (n: number) => String(n).padStart(2, '0')
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60

  return (
    <span className="font-mono text-xs text-fog">
      {fmt(h)}:{fmt(m)}:{fmt(s)}
    </span>
  )
}

export function Contact() {
  const [status, setStatus]   = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errors, setErrors]   = useState<{ name?: string; email?: string; message?: string }>({})
  const [touched, setTouched] = useState<{ name?: boolean; email?: boolean; message?: boolean }>({})

  const validateField = (name: string, value: string) => {
    let error = ''
    if (name === 'name' && !value.trim()) error = 'Name is required'
    if (name === 'email') {
      if (!value.trim()) error = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email'
    }
    if (name === 'message' && !value.trim()) error = 'Message is required'
    setErrors((prev) => ({ ...prev, [name]: error }))
    return !error
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    validateField(name, value)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (touched[name as keyof typeof touched]) validateField(name, value)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData) as Record<string, string>

    const isNameValid    = validateField('name', data.name)
    const isEmailValid   = validateField('email', data.email)
    const isMessageValid = validateField('message', data.message)
    setTouched({ name: true, email: true, message: true })
    if (!isNameValid || !isEmailValid || !isMessageValid) return

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
      })
      if (res.ok) setStatus('success')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const inputClass = (fieldName: keyof typeof errors) =>
    cn(
      'bg-background px-4 py-2.5 border focus:border-accent rounded-md focus:outline-none w-full text-primary transition-colors text-sm',
      errors[fieldName] && touched[fieldName]
        ? 'border-accent-rose focus:border-accent-rose'
        : 'border-border-color'
    )

  return (
    <SectionWrapper id="contact">
      <SectionHeading title="Get In Touch" subtitle="Contact" />

      <div className="grid md:grid-cols-[1fr_2fr] border border-border-color divide-border-color rounded-2xl md:divide-x divide-y md:divide-y-0 overflow-hidden">

        {/* ── LEFT PANE: diagnostic / ping aesthetic ──────────────────────── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col justify-between bg-background p-8 md:p-10 gap-8"
        >
          <div>
            {/* Health endpoint header */}
            <div className="font-mono text-xs text-fog mb-5 flex items-center gap-2">
              <span className="text-accent">GET</span>
              <span>/api/contact/ritam</span>
            </div>

            <p className="text-muted leading-relaxed text-sm mb-6">
              I&apos;m currently open to new opportunities. Whether you have a question,
              a project idea, or just want to say hi — I&apos;ll get back to you.
            </p>

            {/* Ping status rows */}
            <div className="space-y-2.5 font-mono text-xs border border-border-color rounded-lg p-4 bg-surface">
              <div className="flex items-center justify-between">
                <span className="text-fog">status</span>
                <span className="text-accent flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-ping inline-block" style={{ animationDuration: '2s' }} />
                  available
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fog">response_time</span>
                <span className="text-stone">~24h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fog">uptime</span>
                <PingCounter />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-fog">channel</span>
                <span className="text-stone">email</span>
              </div>
            </div>
          </div>

          <CopyEmailButton email={profile.email} variant="full" className="w-full" />
        </motion.div>

        {/* ── RIGHT PANE: form ─────────────────────────────────────────────── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-background p-6 md:p-8"
        >
          {status === 'success' ? (
            /* ── Success: delivery receipt ───────────────────────────── */
            <div className="flex flex-col justify-center items-center py-12 h-full text-center">
              <div className="mb-5 relative">
                <div className="absolute inset-0 bg-accent/20 blur-xl rounded-full" />
                <CheckCircle2 size={52} className="relative text-accent" />
              </div>
              <div className="font-mono text-xs text-fog mb-2">202 Accepted</div>
              <h3 className="mb-2 font-bold text-primary text-xl">Message delivered</h3>
              <p className="mb-2 text-muted text-sm">Received and queued for processing.</p>
              <p className="mb-8 font-mono text-xs text-fog">
                expected response: &lt; 24h
              </p>
              <Button onClick={() => setStatus('idle')} size="sm">
                Send another
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute left-[-9999px]"
              />

              <div>
                <label htmlFor="contact-name" className="block mb-1.5 font-medium text-primary text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className={inputClass('name')}
                  placeholder="John Doe"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="name"
                />
                {errors.name && touched.name && (
                  <p className="mt-1.5 text-xs text-accent-rose">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-email" className="block mb-1.5 font-medium text-primary text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className={inputClass('email')}
                  placeholder="john@example.com"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="email"
                />
                {errors.email && touched.email && (
                  <p className="mt-1.5 text-xs text-accent-rose">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block mb-1.5 font-medium text-primary text-sm">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  className={cn(inputClass('message'), 'resize-none')}
                  placeholder="Your message..."
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.message && touched.message && (
                  <p className="mt-1.5 text-xs text-accent-rose">{errors.message}</p>
                )}
              </div>

              <Button type="submit" disabled={status === 'loading'} className="w-full">
                {status === 'loading' ? (
                  <><Loader2 size={16} className="mr-2 animate-spin" /> Sending...</>
                ) : (
                  'Send Message'
                )}
              </Button>

              {status === 'error' && (
                <div className="flex items-start gap-2 p-3 rounded-md bg-fault/10 border border-fault/30">
                  <AlertTriangle size={15} className="text-accent-rose mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-accent-rose">
                    ECONNRESET — message failed to send. Try again or use direct email.
                  </p>
                </div>
              )}
            </form>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
