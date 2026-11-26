"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";

import { useTranslations } from "next-intl";

import {
  contactSubjects,
  contactFormLimits,
} from "@/data/contact";

type Props = {
  enabled: boolean;
};

type ContactField =
  | "name"
  | "email"
  | "phone"
  | "subject"
  | "message";

type FieldErrors = Partial<
  Record<ContactField, boolean>
>;

type FormStatus =
  | "idle"
  | "success"
  | "validation"
  | "general"
  | "rateLimit"
  | "unavailable";

type ContactApiResponse = {
  ok: boolean;
  code?: string;
  errors?: FieldErrors;
};

const labelClassName = `
  mb-2.5 block

  font-sans text-[11px]
  font-semibold uppercase
  tracking-[0.1em]
  text-text-label
`;

const inputClassName = `
  block w-full min-w-0
  h-12

  rounded-none
  border border-black/30
  bg-brand-paper

  px-4

  font-sans text-[16px]
  font-normal text-brand-dark

  outline-none

  transition-colors duration-200

  focus:border-brand-dark
  focus:ring-1 focus:ring-brand-dark

  disabled:cursor-not-allowed
  disabled:opacity-70

  motion-reduce:transition-none
`;

export default function ContactForm({
  enabled,
}: Props) {
  const t = useTranslations("ContactPage.form");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [status, setStatus] =
    useState<FormStatus>("idle");

  const [errors, setErrors] =
    useState<FieldErrors>({});

  const submittingRef = useRef(false);

  const disabled = isSubmitting || !enabled;

  function getInputClassName(
    field: ContactField
  ) {
    return `
      ${inputClassName}
      ${errors[field] ? "border-red-700" : ""}
    `;
  }

  function renderFieldError(
    field: ContactField
  ) {
    if (!errors[field]) return null;

    return (
      <p
        id={`contact-error-${field}`}
        className="mt-2 font-sans text-xs text-red-700"
      >
        {t(`errors.${field}`)}
      </p>
    );
  }

  function clearFieldError(
    field: ContactField
  ) {
    setErrors((previous) => {
      if (!previous[field]) return previous;

      const next = { ...previous };

      delete next[field];

      return next;
    });

    setStatus("idle");
  }

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!enabled || submittingRef.current) {
      return;
    }

    const form = event.currentTarget;

    const formData = new FormData(form);

    const payload = {
      name: String(
        formData.get("name") ?? ""
      ),

      email: String(
        formData.get("email") ?? ""
      ),

      phone: String(
        formData.get("phone") ?? ""
      ),

      subject: String(
        formData.get("subject") ?? ""
      ),

      message: String(
        formData.get("message") ?? ""
      ),

      website: String(
        formData.get("website") ?? ""
      ),
    };

    submittingRef.current = true;

    setIsSubmitting(true);
    setStatus("idle");
    setErrors({});

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(payload),

          credentials: "same-origin",
          cache: "no-store",
        }
      );

      const result =
        (await response.json()) as ContactApiResponse;

      if (
        response.ok &&
        result.ok === true
      ) {
        setStatus("success");
        form.reset();

        return;
      }

      if (
        response.status === 422 &&
        result.code === "validation"
      ) {
        setErrors(result.errors ?? {});
        setStatus("validation");

        return;
      }

      if (response.status === 429) {
        setStatus("rateLimit");

        return;
      }

      if (response.status === 503) {
        setStatus("unavailable");

        return;
      }

      setStatus("general");
    } catch {
      setStatus("general");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  return (
    <form
      id="contactForm"
      action="/api/contact"
      method="post"
      onSubmit={handleSubmit}
      aria-busy={isSubmitting}
      className="
        grid min-w-0
        grid-cols-1
        gap-x-6 gap-y-6

        border-t-2 border-brand-dark
        bg-white

        p-6

        sm:grid-cols-2
        md:p-9
        xl:p-12
      "
    >
      {/* Honeypot */}
      <div hidden aria-hidden="true">
        <label htmlFor="contactWebsite">
          Website
        </label>

        <input
          id="contactWebsite"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Name */}
      <div className="min-w-0">
        <label
          htmlFor="contactName"
          className={labelClassName}
        >
          {t("fields.name")}
        </label>

        <input
          id="contactName"
          name="name"
          type="text"
          autoComplete="name"
          maxLength={contactFormLimits.name}
          required
          disabled={disabled}
          aria-invalid={!!errors.name}
          aria-describedby={
            errors.name
              ? "contact-error-name"
              : undefined
          }
          onChange={() =>
            clearFieldError("name")
          }
          className={getInputClassName("name")}
        />

        {renderFieldError("name")}
      </div>

      {/* Email */}
      <div className="min-w-0">
        <label
          htmlFor="contactEmail"
          className={labelClassName}
        >
          {t("fields.email")}
        </label>

        <input
          id="contactEmail"
          name="email"
          type="email"
          autoComplete="email"
          maxLength={contactFormLimits.email}
          required
          disabled={disabled}
          aria-invalid={!!errors.email}
          aria-describedby={
            errors.email
              ? "contact-error-email"
              : undefined
          }
          onChange={() =>
            clearFieldError("email")
          }
          className={getInputClassName("email")}
        />

        {renderFieldError("email")}
      </div>

      {/* Phone */}
      <div className="min-w-0">
        <label
          htmlFor="contactPhone"
          className={labelClassName}
        >
          {t("fields.phone")}
        </label>

        <input
          id="contactPhone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={contactFormLimits.phone}
          disabled={disabled}
          aria-invalid={!!errors.phone}
          aria-describedby={
            errors.phone
              ? "contact-error-phone"
              : undefined
          }
          onChange={() =>
            clearFieldError("phone")
          }
          className={getInputClassName("phone")}
        />

        {renderFieldError("phone")}
      </div>

      {/* Subject */}
      <div className="min-w-0">
        <label
          htmlFor="contactSubject"
          className={labelClassName}
        >
          {t("fields.subject")}
        </label>

        <select
          id="contactSubject"
          name="subject"
          defaultValue="reservation"
          required
          disabled={disabled}
          aria-invalid={!!errors.subject}
          aria-describedby={
            errors.subject
              ? "contact-error-subject"
              : undefined
          }
          onChange={() =>
            clearFieldError("subject")
          }
          className={`
            ${getInputClassName("subject")}
            cursor-pointer
          `}
        >
          {contactSubjects.map((subject) => (
            <option
              key={subject}
              value={subject}
            >
              {t(`subjects.${subject}`)}
            </option>
          ))}
        </select>

        {renderFieldError("subject")}
      </div>

      {/* Message */}
      <div className="min-w-0 sm:col-span-2">
        <label
          htmlFor="contactMessage"
          className={labelClassName}
        >
          {t("fields.message")}
        </label>

        <textarea
          id="contactMessage"
          name="message"
          rows={5}
          maxLength={contactFormLimits.message}
          required
          disabled={disabled}
          aria-invalid={!!errors.message}
          aria-describedby={
            errors.message
              ? "contact-error-message"
              : undefined
          }
          onChange={() =>
            clearFieldError("message")
          }
          className={`
            ${getInputClassName("message")}

            h-auto min-h-[132px]
            resize-y py-3
            leading-relaxed
          `}
        />

        {renderFieldError("message")}
      </div>

      {/* Submit */}
      <div className="mt-2 sm:col-span-2">
        <button
          type="submit"
          disabled={disabled}
          aria-describedby="contactFormNote"
          className="
            group
            inline-flex items-center
            justify-center gap-7

            min-h-12
            rounded-full
            bg-brand-dark
            px-7 py-3.5

            font-sans text-[11px]
            font-semibold uppercase
            tracking-[0.08em]
            text-white

            transition-colors duration-300

            hover:bg-brand-charcoal

            focus-visible:outline-2
            focus-visible:outline-offset-4

            disabled:cursor-not-allowed
            disabled:opacity-60

            motion-reduce:transition-none
          "
        >
          {isSubmitting
            ? t("sending")
            : t("submit")}

          {isSubmitting ? (
            <span
              aria-hidden="true"
              className="
                h-4 w-4
                animate-spin
                rounded-full

                border-2
                border-white/40
                border-t-white

                motion-reduce:animate-none
              "
            />
          ) : (
            <span
              aria-hidden="true"
              className="
                text-[17px] leading-none

                transition-transform duration-300
                group-enabled:group-hover:translate-x-1

                motion-reduce:transition-none
                motion-reduce:transform-none
              "
            >
              →
            </span>
          )}
        </button>
      </div>

      {/* Form note */}
      <p
        id="contactFormNote"
        className="
          font-sans text-[12px]
          leading-[1.7]
          text-text-body

          sm:col-span-2
        "
      >
        {enabled
          ? t("note")
          : t("unavailable")}
      </p>

      {/* Form status */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="empty:hidden sm:col-span-2"
      >
        {status === "success" && (
          <p className="font-sans text-sm text-green-800">
            {t("success")}
          </p>
        )}

        {(status === "general" ||
          status === "validation") && (
          <p className="font-sans text-sm text-red-700">
            {t("errors.general")}
          </p>
        )}

        {status === "rateLimit" && (
          <p className="font-sans text-sm text-red-700">
            {t("errors.rateLimit")}
          </p>
        )}

        {status === "unavailable" && (
          <p className="font-sans text-sm text-red-700">
            {t("unavailable")}
          </p>
        )}
      </div>
    </form>
  );
}